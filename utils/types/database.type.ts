type Category = {
  id?: number
  category: string
}

type Note = {
  id: number,
  title: string,
  category: Category
}

export type {
  Category, Note
}
