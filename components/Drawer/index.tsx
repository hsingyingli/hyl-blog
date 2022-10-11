import Link from 'next/link'
import React, { useMemo } from 'react'
import useNote from '../../hooks/useNote'
import useTheme from '../../hooks/useTheme'
import { Notes } from '../../utils/types/note'
import { MdOutlineClose, MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md'
import { Disclosure } from '@headlessui/react'

interface Props {
  notes: Notes | null
  closeDrawer: () => void
}

interface LooseObject {
  [key: string]: any
}

const Drawer: React.FC<Props> = ({ notes, closeDrawer }) => {
  const { theme } = useTheme()
  const { note, selectNote } = useNote()
  const category = useMemo(() => {
    if (notes) {
      const groupByCategory = notes.reduce((group: LooseObject, note) => {
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
    <div className='h-[calc(100vh_-_60px)] w-[min(90%,_300px)] py-3 px-2 flex flex-col gap-5 overflow-auto fixed top-0 left-0 md:top-auto bg-amber-50 dark:bg-black'>
      <button onClick={closeDrawer} className='ml-auto text-xl float-right md:hidden'><MdOutlineClose /></button>
      <Link href='/notes/edit' passHref><a className='w-full inline-block p-2 text-center text-lg bg-teal-500 rounded-lg text-white hover:text-gray-100 hover:bg-teal-400 duration-500'>Create Note</a></Link>
      <div>
        {Object.entries(category).map((data) => {
          const key = data[0]
          const value = data[1] as Notes
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
                      {value.map((v) => {
                        const isActive = v.id === note?.id
                        const textColor = theme === 'dark' ? 'white' : 'rgb(156, 163, 175)'
                        return (
                          <li
                            onClick={() => {
                              selectNote(v)
                              closeDrawer()
                            }}
                            key={v.id}
                            style={{ color: isActive ? textColor : '' }}
                            className='cursor-pointer mb-3 hover:text-gray-400 dark:text-gray-400 dark:hover:text-white'>
                            {v.title}
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
