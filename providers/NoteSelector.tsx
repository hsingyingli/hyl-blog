import React, { useState, createContext } from 'react'
import { Note } from '../utils/types/note'

interface NoteContextInterface {
  note: Note | null
  selectNote: (v: Note | null) => void
}

const NoteContext = createContext<NoteContextInterface>({
  note: null,
  selectNote: (v = null) => { console.log('default') }
})

interface Props {
  children: React.ReactNode
}

const NoteSelector: React.FC<Props> = ({ children }) => {
  const [note, setNote] = useState<Note | null>(null)

  const selectNote = (v: Note | null) => {
    setNote(v)
  }

  return (
    <NoteContext.Provider value={{ note, selectNote }}>
      {children}
    </NoteContext.Provider>
  )
}

export default NoteSelector

export {
  NoteContext
}
