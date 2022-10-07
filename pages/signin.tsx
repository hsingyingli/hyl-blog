import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';
import React, { useState } from "react";
import toast from 'react-hot-toast';
import supabase from "../utils/supabaseClient";


const SignIn: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleOnSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    const toastId = toast.loading('Loading...');
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    })

    if (error) {
      toast.error(error.message, {
        id: toastId,
      });
      return
    }

    setEmail("")
    setPassword("")

    toast.success("Successfully sign in!", {
      id: toastId
    })
    router.push("/")
  }

  return (
    <div className="min-h-[calc(100vh_-_40px)] flex items-center justify-center">
      <div className="rounded-xl border-2 border-black dark:border-gray-200 p-6 max-w-md w-full">
        <h1 className="text-2xl mb-6 text-center">Sign In</h1>
        <form className="flex gap-3 flex-col" onSubmit={handleOnSubmit}>
          <input className="p-2 rounded-lg border-2 border-gray-500 bg-transparent dark:text-white text-black" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' autoComplete="false" required />
          <input className="p-2 rounded-lg border-2 border-gray-500 bg-transparent dark:text-white text-black" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' required />
          <button className="p-2 rounded-lg border-2 border-gray-500 dark:hover:border-white hover:border-black" type='submit'>Submit</button>
        </form>
        <hr className="w-full border-[1px] border-black dark:border-white my-6" />
        <p className="text-center">Dont have account yet? <span className="dark:text-cyan-400 text-cyan-600"><a href="/signup">signup</a></span></p>
      </div>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user, error } = await supabase.auth.api.getUserByCookie(req)
  if (user) {
    return {
      redirect: {
        destination: "/",
      },
      props: {}
    }
  }

  return {
    props: {
    }
  }
}

export default SignIn
