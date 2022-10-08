import React, { useMemo } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import useTheme from '../../hooks/useTheme'

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className='flex rounded-full dark:bg-gray-400 bg-yellow-400 cursor-pointer text-xl' onClick={toggleTheme}>
      <div className='p-2 rounded-full dark:bg-white dark:text-black text-gray-600'>
        <FaMoon />
      </div>
      <div className='p-2 rounded-full dark:bg-transparent dark:text-gray-600 text-black bg-white'>
        <FaSun />
      </div>
    </div >
  )
}

export default ThemeToggleButton
