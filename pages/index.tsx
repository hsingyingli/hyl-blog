import type { NextPage } from 'next'
import Banner from '../components/Banner'


const Home: NextPage = () => {
  return (
    <div className='min-h-[calc(100vh_-_70px)] bg-transparent'>
      <Banner />
      <div className='mx-auto max-w-screen-md h-[calc(100vh_-_70px)] flex flex-col items-center justify-center gap-8'>
        <h1 className='prose prose-xl dark:prose-invert xs:text-3xl sm:text-4xl md:text-5xl font-black text-center leading-relaxed'>Write NoteBook With Speed Using Markdown</h1>
        <p className='max-w-screen-sm mx-auto text-center sm:text-sm md:text-lg font-medium'>this markdown notebook is a practical web project using <span className='text-teal-500'>Nextjs</span>, <span className='text-teal-500'>TailwindCSS</span>, and <span className='text-teal-500'>Supabase</span>.
        </p>
      </div>
    </div>
  )
}


export default Home
