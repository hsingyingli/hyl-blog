import { GetServerSideProps } from "next";
import React from "react";
import supabase from "../../utils/supabaseClient";
import { Posts } from "../../utils/types/post";

interface Props {
  posts: Posts
}

const Posts: React.FC<Props> = ({ posts }) => {
  console.log(posts)
  return (
    <div>
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
