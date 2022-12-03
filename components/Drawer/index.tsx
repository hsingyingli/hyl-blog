import Link from 'next/link'
import React, { useMemo } from 'react'
import useNotes from '../../hooks/useNotes'
import useTheme from '../../hooks/useTheme'
import { MdOutlineClose, MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md'
import { Disclosure } from '@headlessui/react'
import { Note } from '../../utils/types/database.type'
import { useRouter } from 'next/router'


interface LooseObject {
  [key: string]: any
}

interface Props {
  closeDrawer: () => void
}

const Drawer: React.FC<Props> = ({ closeDrawer }) => {
  const { theme } = useTheme()
  const router = useRouter()
  const { selectedNote, notes, selectNote } = useNotes()

  const category = useMemo(() => {
    if (notes) {
      const groupByCategory = notes.reduce((group: LooseObject, note) => {
        const { category } = note;
        group[category.category] = group[category.category] ?? [];
        group[category.category].push(note);
        return group;
      }, {});
      return groupByCategory
    }
    return {}
  }, [notes])

  return (
    <div className='h-full md:w-full py-2 px-5 flex flex-col gap-5 bg-amber-50 dark:bg-black '>
      <button onClick={closeDrawer} className='ml-auto text-xl float-right md:hidden'><MdOutlineClose /></button>
      <Link href='/notes/create' passHref><a className='w-full inline-block p-2 text-center text-lg bg-teal-500 rounded-lg text-white hover:text-gray-100 hover:bg-teal-400 duration-500'>Create Note</a></Link>
      <div>
        {Object.entries(category).map((data) => {
          const key = data[0]
          const noteList = data[1] as Array<Note>
          return (
            <Disclosure key={key} defaultOpen={true}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-teal-100 px-4 py-2 my-2 text-left text-sm font-medium text-gray-900 hover:bg-teal-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>{key}</span>
                    <div className='text-lg'>
                      {open ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />}
                    </div>
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    <ul>
                      {noteList.map((n) => {
                        const isActive = n.id === selectedNote
                        const textColor = theme === 'dark' ? 'white' : 'rgb(156, 163, 175)'
                        return (
                          <li
                            onClick={() => {
                              selectNote(n.id)
                              closeDrawer()
                              router.push(`/notes/${n.id}`)
                            }}
                            key={n.id}
                            style={{ color: isActive ? textColor : '' }}
                            className='cursor-pointer mb-3 hover:text-gray-400 dark:text-gray-400 dark:hover:text-white'>
                            {n.title}
                          </li>)
                      })}
                    </ul>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          )
        })}
      </div>
    </div>
  )
}

export default Drawer
