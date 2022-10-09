import React, { useState, createContext } from 'react'
import { Post } from '../utils/types/post'

interface PostContextInterface {
  post: Post | null
  selectPost: (v: Post | null) => void
}

const PostContext = createContext<PostContextInterface>({
  post: null,
  selectPost: (v = null) => { console.log('default') }
})

interface Props {
  children: React.ReactNode
}

const PostSelector: React.FC<Props> = ({ children }) => {
  const [post, setPost] = useState<Post | null>(null)

  const selectPost = (v: Post | null) => {
    setPost(v)
  }

  return (
    <PostContext.Provider value={{ post, selectPost }}>
      {children}
    </PostContext.Provider>
  )
}

export default PostSelector

export {
  PostContext
}
