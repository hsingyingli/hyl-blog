import Link from "next/link";
import { useRouter } from 'next/router'
import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast'
import Loading from "../components/Loading";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'


const SignUp: React.FC = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const supabase = useSupabaseClient()
  const user = useUser()

  useEffect(() => {
    setIsLoading(true)
    if (user) {
      router.push('/')
    }
    setIsLoading(false)
  }, [user])

  const handleOnSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const toastId = toast.loading('Loading...');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username
        }
      }
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

    toast.success("Created Account", {
      id: toastId
    })

    router.push('/')
  }

  return isLoading ? <Loading /> : (
    <div className="min-h-[calc(100vh_-_40px)] flex items-center justify-center">
      <div className="rounded-xl border-2 border-black dark:border-gray-200 p-6 max-w-md w-full">
        <h1 className="text-2xl mb-6 text-center">Sign Up</h1>
        <form className="flex gap-3 flex-col" onSubmit={handleOnSubmit}>
          <input className="p-2 rounded-lg border-2 border-gray-500 bg-transparent dark:text-white text-black" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required />
          <input className="p-2 rounded-lg border-2 border-gray-500 bg-transparent dark:text-white text-black" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' autoComplete="false" required />
          <input className="p-2 rounded-lg border-2 border-gray-500 bg-transparent dark:text-white text-black" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' required />
          <button disabled={isLoading} className="p-2 rounded-lg border-2 border-gray-500 dark:hover:border-white hover:border-black" type='submit'>Submit</button>
        </form>
        <hr className="w-full border-[1px] border-black dark:border-white my-6" />
        <p className="text-center">have account? <span className="dark:text-cyan-400 text-cyan-600"><Link href="/signin"><a >signin</a></Link></span></p>
      </div>
    </div>
  )
}

export default SignUp
