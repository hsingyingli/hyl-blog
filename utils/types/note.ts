type Note = {
  id: number
  created_at: string
  owner_id: string
  updated_at: string
  content: string
  title: string
  cls_id: number
  category: string
}

type Notes = Array<Note>

export type {
  Note,
  Notes
}
