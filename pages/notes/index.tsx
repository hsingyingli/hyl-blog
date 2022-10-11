import dynamic from 'next/dynamic';
import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import supabase from "../../utils/supabaseClient";
import { Notes } from "../../utils/types/note";
import Drawer from "../../components/Drawer";
import { MdOutlineList, MdDelete, MdMode } from 'react-icons/md'
import Loading from '../../components/Loading';
import useNote from '../../hooks/useNote';
import Link from 'next/link';
const Markdown = dynamic(
  () => {
    return import("../../components/Markdown");
  },
  { ssr: false }
);

const Notes: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [notes, setNotes] = useState<Notes | null>(null)
  const { note, selectNote } = useNote()
  const [isOpen, setIsOpen] = useState(false)
  const user = supabase.auth.user()


  const welcome = `# Hello friend
---
***This is Hsing-Blog***
> a simple markdown blog
- [x] Write, Save Markdown Content
- [x] Update, Delete blog
- [ ] Landing Page is still uncompleted
---
`
  useEffect(() => {
    const fetchNote = async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('owner_id', user?.id)
        .order('created_at')

      if (error) {
        toast.error(error.message)
      }

      if (data) {
        setNotes(data)
      }
      setIsLoading(false)
    }

    fetchNote()
  }, [user])

  const handleOnDelete = async () => {
    const { error } = await supabase
      .from('notes')
      .delete()
      .match({ id: note?.id, owner_id: user?.id })
    if (error) {
      toast.error(error.message)
      return
    }

    setNotes((prevNotes) => {
      const newNotes = prevNotes?.filter((n) => {
        return n?.id != note?.id
      })
      return newNotes || null
    })
    selectNote(null)
  }

  const closeDrawer = () => {
    setIsOpen(false)
  }


  return isLoading ? <Loading />
    :
    (
      <div className='flex gap-10 min-h-[calc(100vh_-_64px)]'>
        <div className={`${isOpen ? 'block' : 'hidden'} md:block z-50`}>
          <Drawer notes={notes} closeDrawer={closeDrawer} />
        </div>
        <div className='md:pl-[300px] p-0  flex-grow'>
          <div className='flex items-center p-3 gap-3 text-2xl' >
            <div className='group md:hidden relative h-8 w-8 p-1 text-white hover:text-gray-500 duration-500'>
              <button onClick={() => setIsOpen(true)}><MdOutlineList /></button>
              <span className='absolute text-sm font-medium rounded-lg bg-gray-500 text-white py-1 px-2 invisible group-hover:visible top-8 left-[-50%]'>Show Drawer</span>
            </div>
            <div className='group relative h-8 w-8 p-1 text-white hover:text-gray-500 duration-500' style={{ display: note ? 'flex' : 'none' }}>
              <Link href={`/notes/edit?noteId=${note?.id}`} passHref><a><MdMode /></a></Link>
              <span className='absolute text-sm font-medium rounded-lg bg-gray-500 text-white py-1 px-2 invisible group-hover:visible top-8 left-[-50%]'>Edit</span>
            </div>

            <div className='group relative h-8 w-8 p-1 text-white hover:text-gray-500 duration-500' style={{ display: note ? 'flex' : 'none' }}>
              <button onClick={handleOnDelete}><MdDelete /></button>
              <span className='absolute text-sm font-medium rounded-lg bg-gray-500 text-white py-1 px-2 invisible group-hover:visible top-8 left-[-50%]'>Delete</span>
            </div>
          </div>

          <Markdown md={note?.content || welcome} />
        </div>
      </div>
    )
}

export default Notes
