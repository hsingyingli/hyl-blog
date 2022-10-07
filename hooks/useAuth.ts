import { useContext } from 'react'
import { SupaContext } from '../providers/SupaProvider'

const useAuth = () => {
  return useContext(SupaContext)
}

export default useAuth
