import { useContext } from 'react'
import { NoteContext } from '../providers/NoteSelector'
const useNote = () => {
  return useContext(NoteContext)
}

export default useNote
