import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import useTheme from '../../hooks/useTheme'

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className='flex items-center justify-center rounded-lg w-10 h-10 dark:bg-purple-500 dark:hover:bg-purple-600 duration-300 bg-yellow-300 hover:bg-yellow-400 cursor-pointer text-xl' onClick={toggleTheme}>
      {theme === 'light' ? <FaSun /> : <FaMoon />}
    </div >
  )
}

export default ThemeToggleButton
