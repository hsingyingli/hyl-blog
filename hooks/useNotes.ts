import { useContext } from 'react'
import { NotesContext } from '../providers/NotesProvider'
const useNotes = () => {
  return useContext(NotesContext)
}

export default useNotes
