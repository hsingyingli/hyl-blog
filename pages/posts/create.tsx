import React from 'react'
import { useRouter } from 'next/router'
import { useState } from "react";
import { FaAngleRight } from 'react-icons/fa'
import useAuth from '../../hooks/useAuth';
import supabase from '../../utils/supabaseClient';
import toast from 'react-hot-toast'
import { GetServerSideProps } from 'next';
import { Clses } from '../../utils/types/cls';
import ListBox from '../../components/Listbox';
import Markdown from '../../components/Markdown';


interface Props {
  clses: Clses
}


const Editor: React.FC<Props> = ({ clses }) => {
  const [markdown, setMarkdown] = useState("**Hello world!!!**");
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState(clses[0])
  const { session } = useAuth()

  const handleOnSave = async () => {
    setIsLoading(true)
    const toastId = toast.loading('Loading...');
    const post = {
      title: title,
      owner_id: session?.user?.id,
      content: markdown,
      updated_at: ((new Date()).toISOString()),
      cls_id: selected.id
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

    const postId = data[0].id
    router.push(`/posts/${postId}`)
  }

  return (
    <div>
      <div className='flex mb-5 gap-3 items-center'>
        <p className='text-md rounded-lg border-2 border-gray-600 py-1 px-2'>{session?.user?.user_metadata.username}</p>
        <FaAngleRight className='text-lg' />
        <ListBox items={clses} selected={selected} setSelected={setSelected} />
        <FaAngleRight className='text-lg' />
        <input className='text-md rounded-lg border-2 border-gray-600 py-1 px-2 bg-transparent'
          type='text'
          placeholder='Untitle'
          value={title}
          onChange={(e) => setTitle(e.target.value)} />
        <FaAngleRight className='text-lg' />
        <button className='text-md rounded-lg border-2 border-gray-600 py-1 px-2 bg-transparent'
          onClick={handleOnSave}
          disabled={isLoading}
        >Save</button>
      </div>
      <Markdown />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await supabase.from('category').select('*')

  return {
    props: {
      clses: data
    }
  }
}

export default Editor
