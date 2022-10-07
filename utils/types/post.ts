type Post = {
  id: number
  created_at: string
  owner_id: string
  updated_at: string
  content: string
  title: string
  cls_id: number
}

type Posts = Array<Post>

export type {
  Post,
  Posts
}
