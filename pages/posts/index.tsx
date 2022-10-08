import { GetServerSideProps } from "next";
import dynamic from 'next/dynamic';
import React, { useState } from "react";
import supabase from "../../utils/supabaseClient";
import { Posts } from "../../utils/types/post";
import { PostgrestError } from "@supabase/supabase-js";
import Drawer from "../../components/Drawer";
const Markdown = dynamic(
  () => {
    return import("../../components/Markdown");
  },
  { ssr: false }
);

interface Props {
  posts: Posts
  error: PostgrestError | null
}




const Posts: React.FC<Props> = ({ posts }) => {
  console.log(posts[0].content)
  return (
    <div className='flex gap-10 min-h-[calc(100vh_-_64px)]'>
      <div className='hidden md:block'>
        <Drawer />
      </div>
      <div className='md:pl-[300px] p-0 overflow-x-auto'>
        <Markdown md={posts[0].content} />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user, error } = await supabase.auth.api.getUserByCookie(req)
  if (!user) {
    return {
      redirect: {
        destination: "/signin",
      },
      props: {}
    }
  }
  const { data, error: e } = await supabase.from('posts')
    .select('*')
    .eq('owner_id', user.id)

  return {
    props: {
      posts: data,
      error: e
    }
  }
}

export default Posts
