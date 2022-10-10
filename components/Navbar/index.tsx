import React from "react";
import { useRouter } from 'next/router'
import ThemeToggleButton from "../ThemeToggleButton";
import DropdownMenu from "../Dropdown";
import useAuth from "../../hooks/useAuth";
import Link from "next/link";

interface Props {
  path: string
}

const Navbar: React.FC<Props> = ({ path }) => {
  const router = useRouter();
  const { session } = useAuth()
  const handleOnClick = () => router.push('/')
  return (
    <div className='backdrop-blur w-full fixed top-0 left-0 z-50 dark:bg-black bg-amber-50'>
      <div className='max-w-screen-2xl w-full mx-auto flex gap-7 items-center justify-between p-3'>
        <div className='font-bold text-2xl cursor-pointer' onClick={handleOnClick}>MD-NoteBook</div>
        <div className="flex gap-3">
          <div className='hidden sm:flex gap-5 text-lg item-center justify-center mr-10'>
            <Link href='/' passHref><a className='p-1 rounded-md' style={{ backgroundColor: path === '/' ? '#14B8A6' : 'transparent' }}>Home</a></Link>
            {session?.user &&
              <Link href='/notes'><a className='bg-red-500 p-1 rounded-md' style={{ backgroundColor: path === '/notes' ? '#14B8A6' : 'transparent' }}>Notes</a></Link>}
          </div>
          <ThemeToggleButton />
          <DropdownMenu />
        </div>
      </div>
    </div>
  )
}


export default Navbar
