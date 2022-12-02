import { User } from "@supabase/supabase-js";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from 'next/router'
import React, { useState } from "react";
import toast from 'react-hot-toast'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'


const Reset: React.FC = () => {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const user = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState(user?.user_metadata.username)
  const [email, setEmail] = useState(user?.email)
  const [password, setPassword] = useState("")


  const handleOnSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const toastId = toast.loading('Loading...');

    if (password.length < 8) {
      toast.error("password must at least 8 characters", {
        id: toastId,
      });
    }

    const { error } = await supabase.auth.updateUser({
      email,
      password,
      data: { username }
    })

    if (error) {
      toast.error(error.message, {
        id: toastId,
      });
      setIsLoading(false)
      return
    }

    setUsername("")
    setEmail("")
    setPassword("")

    toast.success("Updated", {
      id: toastId
    })

    router.push('/')
  }

  return (
    <div className="min-h-[calc(100vh_-_40px)] flex items-center justify-center">
      <div className="rounded-xl border-2 border-black dark:border-gray-200 p-6 max-w-md w-full">
        <h1 className="text-2xl mb-6 text-center">Reset User Info</h1>
        <form className="flex gap-3 flex-col" onSubmit={handleOnSubmit}>
          <input className="p-2 rounded-lg border-2 border-gray-500 bg-transparent dark:text-white text-black" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required />
          <input className="p-2 rounded-lg border-2 border-gray-500 bg-transparent dark:text-white text-black" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' autoComplete="false" required />
          <input className="p-2 rounded-lg border-2 border-gray-500 bg-transparent dark:text-white text-black" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' required />
          <button disabled={isLoading} className="p-2 rounded-lg border-2 border-gray-500 dark:hover:border-white hover:border-black" type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

//export const getServerSideProps: GetServerSideProps = async ({ req }) => {

//const { user } = await supabase.auth.api.getUserByCookie(req)

//if (!user) {
//return {
//redirect: {
//destination: "/signin",
//permanent: false,
//},
//props: {
//}
//}
//}
//return {
//props: {
//user
//}
//}
//}

export default Reset
