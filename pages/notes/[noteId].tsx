import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import NoteLayout from "../../components/Layout/NoteLayout";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import toast from "react-hot-toast";
import useNotes from "../../hooks/useNotes";

const Markdown = dynamic(
  () => {
    return import("../../components/Markdown");
  },
  { ssr: false }
);

const Notes: React.FC = () => {
  const router = useRouter()
  const { noteId } = router.query
  const [isLoading, setIsLoading] = useState(true)
  const user = useUser()
  const { selectNote } = useNotes()
  const supabase = useSupabaseClient()
  const [markdown, setMarkdown] = useState("")

  useEffect(() => {
    const fetchMarkdown = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("id, content")
        .eq('owner_id', user?.id)
        .eq('id', noteId)
        .single()

      if (error) {
        toast.error(error.message)
        router.push("/notes")
      }

      setMarkdown(data?.content)
      selectNote(data?.id)
      setIsLoading(false)
    }

    fetchMarkdown()

  }, [user, noteId])

  return (
    <NoteLayout>
      {!isLoading && <Markdown md={markdown} />}
    </NoteLayout>
  )
}

export default Notes
