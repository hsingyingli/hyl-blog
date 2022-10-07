import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Cls, Clses } from '../../utils/types/cls'

interface Props {
  items: Clses
  selected: Cls
  setSelected: React.Dispatch<React.SetStateAction<Cls>>
}


const ListBox: React.FC<Props> = ({ items, selected, setSelected }) => {

  return (
    <div className="z-40 max-w-[10rem] w-full">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default border-2 border-gray-600 rounded-lg bg-transparent text-left py-1 px-2 shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300  text-md">
            <span className="block truncate">{selected.cls_name}</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-80 w-full overflow-auto rounded-md bg-white dark:bg-gray-600 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:text-white">
              {items.map((item) => (
                <Listbox.Option
                  key={item.id}
                  className={({ active }) =>
                    `relative cursor-default select-none p-2  ${active ? 'bg-amber-100 text-amber-900' : 'text-white'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {item.cls_name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default ListBox
