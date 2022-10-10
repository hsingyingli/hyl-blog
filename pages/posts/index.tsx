import dynamic from 'next/dynamic';
import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import supabase from "../../utils/supabaseClient";
import { Posts } from "../../utils/types/post";
import Drawer from "../../components/Drawer";
import { MdDelete, MdEditNote } from 'react-icons/md'
import Loading from '../../components/Loading';
import usePost from '../../hooks/usePost';
const Markdown = dynamic(
  () => {
    return import("../../components/Markdown");
  },
  { ssr: false }
);

const Posts: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState<Posts | null>(null)
  const { post, selectPost } = usePost()
  const user = supabase.auth.user()


  const welcome = `# Hello friend
---
***This is Hsing-Blog***
> a simple markdown blog
- [x] Write, Save Markdown Content
- [ ] Update, Delete blog
- [ ] Landing Page is still uncompleted
---
## Notes
1. delete post is quit easy. Just delete post in the database. In order not to re fetch the whole post list again. In client side, We can just remove the deleted post from the pre-fetched post array (if it is deleted successfully).
2. For updating post, I can redirect to /post/edit page. However, I need to add extra logic for unauthorized action. I can also redirect to new route ('/post/update').
`
  useEffect(() => {
    const getPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('owner_id', user?.id)
        .order('created_at')

      if (error) {
        toast.error(error.message)
      }

      if (data) {
        setPosts(data)
      }
      setIsLoading(false)
    }

    getPost()
  }, [])

  const handleOnDelete = async () => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .match({ id: post?.id, owner_id: user?.id })
    if (error) {
      toast.error(error.message)
      return
    }

    setPosts((prevPosts) => {
      const newPosts = prevPosts?.filter((p) => {
        return p?.id != post?.id
      })
      return newPosts || null
    })
    selectPost(null)
  }

  return isLoading ? <Loading />
    :
    (
      <div className='flex gap-10 min-h-[calc(100vh_-_64px)]'>
        <div className='hidden md:block'>
          <Drawer posts={posts} />
        </div>
        <div className='md:pl-[300px] p-0  flex-grow'>
          <div className='flex items-center justify-end p-3 gap-3 text-2xl' style={{ display: post ? 'flex' : 'none' }}>
            <div className='group relative'>
              <a href={`/posts/edit?postId=${post?.id}`}><MdEditNote /></a>
              <span className='absolute text-sm font-medium rounded-lg bg-gray-500 text-white py-1 px-2 invisible group-hover:visible top-8 left-[-50%]'>Edit</span>
            </div>

            <div className='group relative'>
              <button onClick={handleOnDelete}><MdDelete /></button>
              <span className='absolute text-sm font-medium rounded-lg bg-gray-500 text-white py-1 px-2 invisible group-hover:visible top-8 left-[-50%]'>Delete</span>
            </div>
          </div>

          <Markdown md={post?.content || welcome} />
        </div>
      </div>
    )
}

export default Posts
