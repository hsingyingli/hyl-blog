import React, { useState } from "react";
import { MdDelete, MdMode, MdOutlineList } from "react-icons/md";
import Drawer from "../Drawer";
import useNotes from "../../hooks/useNotes"
import Link from "next/link";

interface Props {
  children: React.ReactNode
}

const NoteLayout: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)
  const { selectedNote, deleteNote } = useNotes()

  const closeDrawer = () => {
    setIsOpen(false)
  }

  return (
    <div className="min-h-[calc(100vh_-_72px)] max-w-screen ">
      <div className={`z-50 ${!isOpen && 'hidden'} fixed top-0 left-0 md:inline md:top-[64px] w-[300px] h-screen md:h-[calc(100vh_-_64px)] overflow-y-auto bg-amber-50 dark:bg-black`}>
        {/* left drawer*/}
        <Drawer closeDrawer={closeDrawer} />
      </div>
      <div className="m-0 md:ml-[300px]">
        <div className='flex items-center p-3 gap-3 text-2xl' >
          <div className='group md:hidden relative h-8 w-8 p-1  hover:text-gray-500 duration-500'>
            <button onClick={() => setIsOpen(true)}><MdOutlineList /></button>
            <span className='absolute text-sm font-medium rounded-lg bg-gray-500 text-white py-1 px-2 invisible group-hover:visible top-8 left-[-50%]'>Show Drawer</span>
          </div>
          <div className='group relative h-8 w-8 p-1  hover:text-gray-500 duration-500' style={{ display: selectedNote ? 'flex' : 'none' }}>
            <Link href={`/notes/edit/${selectedNote}`} passHref><a><MdMode /></a></Link>
            <span className='absolute text-sm font-medium rounded-lg bg-gray-500 text-white py-1 px-2 invisible group-hover:visible top-8 left-[-50%]'>Edit</span>
          </div>

          <div className='group relative h-8 w-8 p-1  hover:text-gray-500 duration-500' style={{ display: selectedNote ? 'flex' : 'none' }}>
            <button onClick={() => selectedNote && deleteNote(selectedNote)}><MdDelete /></button>
            <span className='absolute text-sm font-medium rounded-lg bg-gray-500 text-white py-1 px-2 invisible group-hover:visible top-8 left-[-50%]'>Delete</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}


export default NoteLayout
