import type { NextPage } from 'next'
import Banner from '../components/Banner'
import { Posts } from '../utils/types/post'

interface Props {
  posts: Posts | null
}

const Home: NextPage<Props> = () => {

  return (
    <div className='min-h-[calc(100vh_-_60px)]'>
      <h1 className='text-white z-auto'>Blog</h1>
    </div>
  )
}


export default Home
