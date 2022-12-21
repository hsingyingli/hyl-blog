import React from 'react'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'
import { useState } from "react";
import toast from 'react-hot-toast'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Editbar from '../../components/Editbar';
import { Category, Note } from '../../utils/types/database.type';
import useNotes from '../../hooks/useNotes';

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


const Editor: React.FC = () => {
  const [markdown, setMarkdown] = useState(`---
# title: 
---
`);
  const [category, setCategory] = useState<Category | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("");
  const router = useRouter();
  const user = useUser();
  const supabase = useSupabaseClient();
  const { addNote } = useNotes()

  const handleChangeMarkdown = (value: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setMarkdown(value)
  }

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleChangeCategory = (c: Category | null) => {
    setCategory(c)
  }

  const handleOnSave = async () => {
    setIsLoading(true)
    const toastId = toast.loading('Loading...');
    if (category === null) {
      toast.error("Please set category", {
        id: toastId
      })
      setIsLoading(false)
      return
    }

    const newNote = {
      title: title,
      owner_id: user?.id,
      content: markdown,
      updated_at: ((new Date()).toISOString()),
      category_id: category?.id
    }

    const { data, error } = await supabase
      .from('notes')
      .insert([
        newNote,
      ])
      .select()
      .single()

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

    const note: Note = {
      id: data.id,
      title: data.title,
      category
    }
    addNote(note)

    router.push(`/notes/${data.id}`)
  }

  return (
    <div className='w-full mx-auto'>
      <Editbar title={title} category={category} handleChangeTitle={handleChangeTitle} handleChangeCategory={handleChangeCategory} isLoading={isLoading} handleOnSave={handleOnSave} />
      <div className='grid grid-cols-1 auto-rows-auto md:grid-cols-2 gap-4 text-lg'>
        <div className='h-screen overflow-auto'>
          <AceEditor value={markdown} onChange={handleChangeMarkdown} />
        </div>
        <div className='h-screen overflow-auto'>
          <Markdown md={markdown} />
        </div>
      </div>
    </div>
  )
}

export default Editor
