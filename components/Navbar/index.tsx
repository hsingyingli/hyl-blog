import React from "react";
import { useRouter } from 'next/router'
import ThemeToggleButton from "../ThemeToggleButton";
import DropdownMenu from "../Dropdown";


const Navbar = () => {
  const router = useRouter();
  const handleOnClick = () => router.push('/')
  return (
    <div className='backdrop-blur w-full fixed top-0 left-0 z-50 dark:bg-black bg-amber-50'>
      <div className='max-w-screen-2xl mx-auto flex gap-7 items-center justify-between p-3'>
        <div className='font-bold text-2xl cursor-pointer' onClick={handleOnClick}>Hsing-Blog</div>
        <div className="flex gap-3">
          <ThemeToggleButton />
          <DropdownMenu />
        </div>
      </div>
    </div>
  )
}


export default Navbar
