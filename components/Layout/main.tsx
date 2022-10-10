import React from 'react'
import Head from 'next/head'
import Footer from '../Footer'
import Navbar from '../Navbar'

interface Props {
  children: React.ReactNode
  path: string
}

const Main: React.FC<Props> = ({ path, children }) => {
  return (
    <div className='dark:text-white text-black duration-500'>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Markdown Blog" />
        <meta name="author" content="Hsing Ying Li" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <title>hyl-MD-NoteBook</title>
      </Head>
      <Navbar path={path} />
      <div className='max-w-screen-2xl w-full mx-auto p-3 mt-[60px] min-h-[calc(100vh_-_60px)]'>
        {children}
      </div>
      <Footer />
    </div>
  )
}


export default Main
