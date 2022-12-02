import Link from "next/link"
import { useRouter } from 'next/router';
import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import Loading from "../components/Loading";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'


const SignIn: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const supabase = useSupabaseClient()
  const user = useUser()

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false)
    }
    router.events.on('routeChangeComplete', handleComplete);
    return () => {
      router.events.off('routeChangeComplete', handleComplete)
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)
    if (user) {
      router.push('/')
    } else {
      setIsLoading(false)
    }
  }, [user])

  const handleOnSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const toastId = toast.loading('Loading...');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast.error(error.message, {
        id: toastId,
      });
      setIsLoading(false)
      return
    }

    setEmail("")
    setPassword("")

    toast.success("Successfully sign in!", {
      id: toastId
    })
    router.push("/")
  }

  return isLoading ? <Loading /> : (
    <div className="min-h-[calc(100vh_-_40px)] flex items-center justify-center">
      <div className="rounded-xl border-2 border-black dark:border-gray-200 p-6 max-w-md w-full">
        <h1 className="text-2xl mb-6 text-center">Sign In</h1>
        <form className="flex gap-3 flex-col" onSubmit={handleOnSubmit}>
          <input className="p-2 rounded-lg border-2 border-gray-500 bg-transparent dark:text-white text-black" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' autoComplete="false" required />
          <input className="p-2 rounded-lg border-2 border-gray-500 bg-transparent dark:text-white text-black" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' required />
          <button disabled={isLoading} className="p-2 rounded-lg border-2 border-gray-500 dark:hover:border-white hover:border-black" type='submit'>Submit</button>
        </form>
        <hr className="w-full border-[1px] border-black dark:border-white my-6" />
        <p className="text-center">Dont have account yet? <span className="dark:text-cyan-400 text-cyan-600"><Link href="/signup" passHref><a>signup</a></Link></span></p>
      </div>
    </div>
  )
}

export default SignIn
