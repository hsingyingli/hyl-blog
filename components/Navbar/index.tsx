import React from "react";
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";
import DropdownMenu from "../Dropdown";
import Link from "next/link";
import { useUser } from '@supabase/auth-helpers-react'

const ThemeToggleButton = dynamic(
  () => {
    return import("../ThemeToggleButton");
  },
  { ssr: false }
);

interface Props {
  path: string
}

const Navbar: React.FC<Props> = ({ path }) => {
  const router = useRouter();
  const user = useUser()
  console.log(user)
  const handleOnClick = () => router.push('/')
  return (
    <div className='backdrop-blur w-full fixed top-0 left-0 z-50 dark:bg-black bg-amber-50'>
      <div className='max-w-screen-2xl w-full mx-auto flex gap-7 items-center justify-between p-3'>
        <div className='font-bold text-2xl cursor-pointer' onClick={handleOnClick}>MD-NoteBook</div>
        <div className="flex gap-3">
          <div className='hidden sm:flex gap-5  item-center justify-center mr-10'>
            <Link href='/' passHref><a className='p-2 rounded-md hover:text-gray-500' style={{ backgroundColor: path === '/' ? '#14B8A6' : 'transparent' }}>Home</a></Link>
            {user &&
              <Link href='/notes'><a className='bg-red-500 p-2 rounded-md hover:text-gray-500' style={{ backgroundColor: path === '/notes' ? '#14B8A6' : 'transparent' }}>Notes</a></Link>}
          </div>
          <ThemeToggleButton />
          <DropdownMenu />
        </div>
      </div>
    </div>
  )
}


export default Navbar
