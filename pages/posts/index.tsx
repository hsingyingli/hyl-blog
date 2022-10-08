import dynamic from 'next/dynamic';
import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import supabase from "../../utils/supabaseClient";
import { Post, Posts } from "../../utils/types/post";
import Drawer from "../../components/Drawer";
import useAuth from '../../hooks/useAuth';
const Markdown = dynamic(
  () => {
    return import("../../components/Markdown");
  },
  { ssr: false }
);

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Posts | null>(null)
  const [post, setPost] = useState<Post | null>(null)
  const user = supabase.auth.user()

  const welcome = "# Testing"
  useEffect(() => {
    const getPost = async () => {

      const { data, error } = await supabase
        .from('posts')
        .select('*, category!inner(cls_name)')
        .eq('owner_id', user?.id)
        .order('created_at')

      if (error) {
        toast.error(error.message)
      }

      if (data) {
        setPosts(data)
      }

    }

    getPost()
  }, [])

  return (
    <div className='flex gap-10 min-h-[calc(100vh_-_64px)]'>
      <div className='hidden md:block'>
        <Drawer posts={posts} setPost={setPost} />
      </div>
      <div className='md:pl-[300px] p-0 overflow-x-auto'>
        <Markdown md={post?.content || welcome} />
      </div>
    </div>
  )
}

export default Posts
