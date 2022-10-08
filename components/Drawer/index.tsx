import React from 'react'

const dummy = ['hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello',]

const Drawer = () => {
  return (
    <div className='h-[calc(100vh_-_88px)] w-[300px] py-3 px-2 divide-y-[1px] divide-gray-100 flex flex-col gap-5 overflow-auto fixed'>
      <a href='/posts/edit' className='w-full inline-block p-2 text-center text-lg bg-teal-500 rounded-lg text-white hover:text-gray-100 hover:bg-teal-400 duration-500'>Create Post</a>
      <ul>
        {
          dummy.map((item, idx) => {
            return <li className='my-2 rounded-lg text-lg dark:text-gray-400 hover:dark:text-white hover:text-gray-400'>{item}</li>
          })
        }
      </ul>
    </div>
  )
}

export default Drawer
