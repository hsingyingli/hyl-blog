import React, { useState, useEffect, createContext } from 'react'
import { Note } from '../utils/types/database.type'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Loading from '../components/Loading'
import toast from 'react-hot-toast'
import { useRouter } from "next/router"

interface NotesContextInterface {
  notes: Array<Note>
  selectedNote: number | null
  selectNote: (id: number | null) => void
  deleteNote: (id: number) => Promise<void>
}

const NotesContext = createContext<NotesContextInterface>({
  notes: [],
  selectedNote: null,
  selectNote: (id = null) => { },
  deleteNote: async (id = -1) => { }
})

interface Props {
  children: React.ReactNode
}

const NotesProvider: React.FC<Props> = ({ children }) => {
  const [selectedNote, setSelectedNote] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notes, setNotes] = useState<Array<Note>>([])
  const user = useUser()
  const supabase = useSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from('notes')
        .select(`
          id,
          title,
          category (
            category
          )
        `)
        .eq('owner_id', user?.id)
        .order('created_at')

      if (data) {
        setNotes(data as Array<Note>)
      }
      setIsLoading(false)
    }
    if (user) {
      fetchNotes()
    }

  }, [user])

  const deleteNote = async (id: number) => {
    const { error } = await supabase
      .from('notes')
      .delete()
      .match({ id: id, owner_id: user?.id })
    if (error) {
      toast.error(error.message)
      return
    }

    setNotes((prevNotes) => {
      const newNotes = prevNotes?.filter((n) => {
        return n?.id != id
      })
      return newNotes || null
    })

    setSelectedNote(null)

    router.push("/notes")
  }

  const selectNote = (id: number | null) => {
    setSelectedNote(id)
  }

  return isLoading ?
    <Loading />
    : (
      <NotesContext.Provider value={{ notes, selectedNote, deleteNote, selectNote }}>
        {children}
      </NotesContext.Provider>
    )
}

export default NotesProvider

export {
  NotesContext
}
