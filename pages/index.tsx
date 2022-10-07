import type { NextPage } from 'next'
import useAuth from '../hooks/useAuth'

const Home: NextPage = () => {
  const { isLoading, session } = useAuth()
  console.log(session)
  return (
    <div className='text-black min-h-[calc(100vh_-_40px)]'>

    </div>
  )
}

export default Home
