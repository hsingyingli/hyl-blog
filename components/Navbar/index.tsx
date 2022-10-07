import React from "react";
import { useRouter } from 'next/router'
import ThemeToggleButton from "../ThemeToggleButton";
import DropdownMenu from "../Dropdown";


const Navbar = () => {
  const router = useRouter();
  const handleOnClick = () => router.push('/')
  return (
    <div className='py-1 px-3 backdrop-blur w-full text-black flex gap-7 items-center sticky top-0 left-0 z-50'>
      <div className='dark:text-white font-medium cursor-pointer' onClick={handleOnClick}>HYL-BLOG</div>
      <div className='flex-grow dark:text-white'>Block 2</div>
      <div className="flex gap-3">
        <ThemeToggleButton />
        <DropdownMenu />
      </div>
    </div>
  )
}


export default Navbar
