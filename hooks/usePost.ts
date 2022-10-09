import { useContext } from 'react'
import { PostContext } from '../providers/PostSelector'
const usePost = () => {
  return useContext(PostContext)
}

export default usePost
