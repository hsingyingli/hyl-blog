import type { NextPage } from 'next'
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { Post } from "../../utils/types/post";
import supabase from "../../utils/supabaseClient";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";

const Markdown = dynamic(
  () => {
    return import("../../components/Markdown");
  },
  { ssr: false }
);

const Post: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState<Post | null>(null)
  const router = useRouter()

  useEffect(() => {
    const { postId } = router.query
    const fetchPost = async (id: string) => {
      const { data, error } = await supabase.from('posts').select('*').eq('id', id).single()
      setIsLoading(false)
      if (error) {
        toast.error(error.message)
        router.push('/')
        return
      }
      setPost(data)
    }
    if (postId) {
      fetchPost(postId as string)
    }
  }, [router])

  return isLoading ? <Loading /> : (
    <div className='max-w-screen-lg mx-auto'>
      <Markdown md={post?.content || ''} />
    </div>
  )
}

export default Post

