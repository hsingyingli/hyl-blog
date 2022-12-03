import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { HiSelector, HiCheck, HiPlus } from "react-icons/hi";
import { Category } from '../../utils/types/database.type';
import DiagoCreateCategory from './Dialog';

interface Props {
  categoryList: Array<Category>
  selected: Category | null
  selectCategory: (c: Category) => void
}


const ListBox: React.FC<Props> = ({ categoryList, selected, selectCategory }) => {

  const [isDiagoOpen, setIsDiagoOpen] = useState(false)

  const closeModal = () => {
    setIsDiagoOpen(false)
  }

  const openModal = () => {
    setIsDiagoOpen(true)
  }

  return (
    <>
      <div className="z-50 max-w-[15rem] w-full">
        <Listbox value={selected} onChange={selectCategory} >
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md sm:text-sm  border-2 border-gray-600">
              <span className="block truncate">{selected?.category || "category"}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <HiSelector
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-amber-50 dark:bg-black py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {categoryList.map((category) => (
                  <Listbox.Option
                    key={category.category}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 px-4 ${active ? 'bg-amber-100 text-amber-900 dark:bg-gray-100' : 'text-gray-900 dark:text-white'
                      }`
                    }
                    value={category}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                          {category.category}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-3 ">
                            <HiCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
                <Listbox.Option
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${active ? 'bg-amber-100 text-amber-900 dark:bg-gray-100' : 'text-gray-900 dark:text-white'
                    }`
                  }
                  onClick={openModal}
                  value={""}
                >
                  <HiPlus />
                </Listbox.Option>
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <DiagoCreateCategory isOpen={isDiagoOpen} closeModal={closeModal} />
    </>
  )
}

export default ListBox
