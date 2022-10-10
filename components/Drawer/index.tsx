import Link from 'next/link'
import React, { useMemo } from 'react'
import useNote from '../../hooks/useNote'
import useTheme from '../../hooks/useTheme'
import { Notes } from '../../utils/types/note'

interface Props {
  notes: Notes | null
  isOpen: boolean
}

const Drawer: React.FC<Props> = ({ notes, isOpen }) => {
  const { theme } = useTheme()
  const { note, selectNote } = useNote()
  const category = useMemo(() => {
    if (notes) {
      const groupByCategory = notes.reduce((group, note) => {
        const { category } = note;
        group[category] = group[category] ?? [];
        group[category].push(note);
        return group;
      }, {});
      return groupByCategory
    }
    return {}
  }, [notes])

  return (
    <div className='h-[calc(100vh_-_88px)] w-[300px] py-3 px-2 divide-y-[1px] divide-gray-100 flex flex-col gap-5 overflow-auto fixed'>
      <Link href='/notes/edit' passHref><a className='w-full inline-block p-2 text-center text-lg bg-teal-500 rounded-lg text-white hover:text-gray-100 hover:bg-teal-400 duration-500'>Create Note</a></Link>
      <div className='divide-y-[1px] divide-[rgba(249, 250, 251, 0.1)]'>
        {Object.entries(category).map((data) => {
          const key = data[0]
          const value = data[1] as Notes
          return (
            <div key={key} className='mb-1 p-2'>
              <p className='text-xl mb-2 text-teal-500'>{key}</p>
              <ul>
                {value.map((v) => {
                  const isActive = v.id === note?.id
                  const textColor = theme === 'dark' ? 'white' : 'rgb(156, 163, 175)'
                  return (
                    <li
                      onClick={() => selectNote(v)}
                      key={v.id}
                      style={{ color: isActive ? textColor : '' }}
                      className='cursor-pointer mb-3 hover:text-gray-400 dark:text-gray-400 dark:hover:text-white'>
                      {v.title}
                    </li>)
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Drawer
