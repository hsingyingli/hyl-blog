import { GetServerSideProps } from 'next'
import dynamic from "next/dynamic";
import React, { useState } from 'react'
import supabase from '../../utils/supabaseClient'
import { Post } from '../../utils/types/post'

const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

interface Props {
  post: Post
}

const Post: React.FC<Props> = ({ post }) => {
  return (
    <div className='mx-auto max-w-screen-md w-full p-3 min-h-screen'>
      <MarkdownPreview
        className='w-full'
        source={post.content} />
    </div>)
}


export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const postId = params?.postId
  const { user } = await supabase.auth.api.getUserByCookie(req)
  const { data, error } = await supabase.from('posts').select('*').match({ id: postId, owner_id: user?.id }).single()

  if (error) {
    return {
      redirect: {
        destination: '/posts',
        permanent: false
      }, props: {}
    }
  }

  return {
    props: {
      post: data
    }
  }
}

export default Post
