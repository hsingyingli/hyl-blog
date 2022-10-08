import { GetServerSideProps } from 'next'
import React, { useState } from 'react'
import matter from 'gray-matter';
import supabase from '../../utils/supabaseClient'
import { Post } from '../../utils/types/post'

interface Props {
  post: Post
}

const Post: React.FC<Props> = ({ post }) => {
  console.log(post)
  return (
    <div className='mx-auto max-w-screen-md w-full p-3 min-h-screen'>
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
        permanent: true
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
