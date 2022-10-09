import React from 'react'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'
import { useState } from "react";
import { FaAngleRight } from 'react-icons/fa'
import useAuth from '../../hooks/useAuth';
import supabase from '../../utils/supabaseClient';
import toast from 'react-hot-toast'
import { Clses } from '../../utils/types/cls';
import usePost from '../../hooks/usePost';

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
  clses: Clses
}


const Editor: React.FC<Props> = () => {
  const [markdown, setMarkdown] = useState("**Hello world!!!**");
  const [category, setCategory] = useState("")
  const { selectPost } = usePost()
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const { session } = useAuth()

  const handleOnChange = (value: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setMarkdown(value)
  }

  const handleOnSave = async () => {
    setIsLoading(true)
    const toastId = toast.loading('Loading...');
    const post = {
      title: title || "untitled",
      owner_id: session?.user?.id,
      content: markdown,
      updated_at: ((new Date()).toISOString()),
      category: category || "untitled"
    }
    const { data, error } = await supabase
      .from('posts')
      .insert([
        post,
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

    selectPost(data[0])
    router.push(`/posts`)
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
          onClick={handleOnSave}
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

export default Editor
