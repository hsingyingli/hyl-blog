import React from 'react'

const Footer: React.FC = () => {
  return (
    <div className='text-center dark:text-white text-black'>
      &copy; {new Date().getFullYear()} Hsing Ying Li. All Rights Reserved.
    </div>
  )
}


export default Footer
