import React, { useEffect, useState } from "react"
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { FaAngleRight } from "react-icons/fa"
import { Category } from "../../utils/types/database.type"
import ListBox from "./Listbox"

interface Props {
  title: string | null
  handleChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void
  category: Category | null
  handleChangeCategory: (c: Category | null) => void
  isLoading: boolean
  handleOnSave: () => Promise<void>
}


const Editbar: React.FC<Props> = ({ title, handleChangeTitle, category, handleChangeCategory, isLoading, handleOnSave }) => {
  const user = useUser()
  const [categoryList, setCategoryList] = useState<Array<Category>>([])
  const supabase = useSupabaseClient()

  useEffect(() => {
    const fetchCategory = async () => {
      const { data, error } = await supabase.from("category").select(`id, category`).eq("user_id", user?.id)

      if (error) return
      setCategoryList(data)
    }

    if (user) {
      fetchCategory()
    }

  }, [user])

  return (
    <div className='flex mb-5 gap-3 items-center'>
      <p className='text-md rounded-lg border-2 border-gray-600 py-1 px-2'>{user?.user_metadata.username}</p>
      <FaAngleRight className='text-lg' />
      <ListBox categoryList={categoryList} selected={category} selectCategory={handleChangeCategory} />
      <FaAngleRight className='text-lg' />
      <input className='text-md rounded-lg border-2 border-gray-600 py-1 px-2 bg-transparent'
        type='text'
        placeholder='title'
        value={title || ""}
        onChange={handleChangeTitle}
      />
      <FaAngleRight className='text-lg' />
      <button className='text-md rounded-lg border-2 border-gray-600 py-1 px-2 bg-transparent'
        disabled={isLoading}
        onClick={handleOnSave}
      >Save</button>
    </div>
  )
}

export default Editbar
