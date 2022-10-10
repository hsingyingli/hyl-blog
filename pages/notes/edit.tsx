import React, { useEffect } from 'react'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'
import { useState } from "react";
import { FaAngleRight } from 'react-icons/fa'
import supabase from '../../utils/supabaseClient';
import toast from 'react-hot-toast'
import useNote from '../../hooks/useNote';
import useAuth from '../../hooks/useAuth';
import { GetServerSideProps } from 'next';
import { Note } from '../../utils/types/note';

const AceEditor = dynamic(
  () => {
    return import("../../components/AceEditor");
  },
  { ssr: false }
);

const Markdown = dynamic(
  () => {
    return import("../../components/Markdown");
  },
  { ssr: false }
);

interface Props {
  isUpdating: boolean
  note: Note | null
}

const Editor: React.FC<Props> = ({ isUpdating, note }) => {
  const [markdown, setMarkdown] = useState(`---
# title: 
---
`);
  const [category, setCategory] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("");
  const { selectNote } = useNote()
  const router = useRouter();
  const { session } = useAuth()

  useEffect(() => {
    if (isUpdating && note) {
      setCategory(note.category)
      setTitle(note.title)
      setMarkdown(note.content)
    }
  }, [])

  const handleOnChange = (value: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setMarkdown(value)
  }

  const handleOnUpdate = async () => {
    setIsLoading(true)
    const toastId = toast.loading('Loading...');
    const newNote = {
      title: title || "untitled",
      owner_id: session?.user?.id,
      content: markdown,
      updated_at: ((new Date()).toISOString()),
      category: category || "untitled"
    }


    const { data, error } = await supabase
      .from('notes')
      .update(newNote)
      .match({ id: note?.id, owner_id: session?.user?.id })

    setIsLoading(false)
    if (error) {
      toast.error(error.message, {
        id: toastId
      })
      return
    }
    toast.success("Updated!", {
      id: toastId
    })

    selectNote(data[0])
    router.push(`/notes`)
  }

  const handleOnSave = async () => {
    setIsLoading(true)
    const toastId = toast.loading('Loading...');
    const newNote = {
      title: title || "untitled",
      owner_id: session?.user?.id,
      content: markdown,
      updated_at: ((new Date()).toISOString()),
      category: category || "untitled"
    }

    const { data, error } = await supabase
      .from('notes')
      .insert([
        newNote,
      ])

    setIsLoading(false)
    if (error) {
      toast.error(error.message, {
        id: toastId
      })
      return
    }
    toast.success("Created!", {
      id: toastId
    })

    selectNote(data[0])
    router.push(`/notes`)
  }

  return (
    <div className='w-full mx-auto'>
      <div className='flex mb-5 gap-3 items-center'>
        <p className='text-md rounded-lg border-2 border-gray-600 py-1 px-2'>{session?.user?.user_metadata.username}</p>
        <FaAngleRight className='text-lg' />
        <input className='text-md rounded-lg border-2 border-gray-600 py-1 px-2 bg-transparent'
          type='text'
          placeholder='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)} />
        <FaAngleRight className='text-lg' />
        <input className='text-md rounded-lg border-2 border-gray-600 py-1 px-2 bg-transparent'
          type='text'
          placeholder='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)} />
        <FaAngleRight className='text-lg' />
        <button className='text-md rounded-lg border-2 border-gray-600 py-1 px-2 bg-transparent'
          onClick={isUpdating ? handleOnUpdate : handleOnSave}
          disabled={isLoading}
        >Save</button>
      </div>
      <div className='grid grid-cols-1 auto-rows-auto md:grid-cols-2 gap-4 text-lg'>
        <div className='h-screen overflow-auto'>
          <AceEditor value={markdown} onChange={handleOnChange} />
        </div>
        <div className='h-screen overflow-auto'>
          <Markdown md={markdown} />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const noteId = ctx.query.noteId

  if (!noteId) return {
    props: {
      isUpdating: false,
      note: null
    }
  }
  const { user } = await supabase.auth.api.getUserByCookie(ctx.req)
  const { data, error } = await supabase.from('notes').select('*').match({ id: noteId, owner_id: user?.id }).single()

  if (error) {
    return {
      redirect: {
        destination: '/notes',
        permanent: true
      }, props: {}
    }
  }

  return {
    props: {
      isUpdating: true,
      note: data
    }
  }
}

export default Editor
