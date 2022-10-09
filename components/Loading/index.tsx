import React from "react";


const Loading = () => {
  const delayList = [0, 500, 1000, 1500]
  return (
    <div className='h-screen w-full flex items-center justify-center gap-5'>
      <div style={{ animationDelay: '-0.32s' }} className='animate-dot-bounce h-4 w-4 rounded-full bg-gray-500'></div>
      <div style={{ animationDelay: '-0.16s' }} className='animate-dot-bounce h-4 w-4 rounded-full bg-gray-500'></div>
      <div className='animate-dot-bounce h-4 w-4 rounded-full bg-gray-500'></div>
    </div>
  )
}

export default Loading
