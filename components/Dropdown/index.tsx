import React, { Fragment } from "react";
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import { MdMenu } from 'react-icons/md';
import supabase from "../../utils/supabaseClient";
import useAuth from "../../hooks/useAuth";


const DropdownMenu = () => {
  const router = useRouter();
  const { session } = useAuth();
  console.log(session)

  const redirectToHome = () => router.push('/')
  const redirectToPosts = () => router.push('/posts')
  const redirectToSignIn = () => router.push('/signin')
  const redirectToSignUp = () => router.push('/signup')

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) router.push('/')
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black dark:bg-gray-200 bg-opacity-20 p-2 text-sm font-medium text-white dark:text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <MdMenu />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg focus:outline-none">
            {
              session ?
                (
                  <>
                    <div className="p-1">
                      <Menu.Item>
                        <button className='group flex w-full items-center rounded-md p-2 text-md hover:bg-gray-200' onClick={redirectToHome}>Home</button>
                      </Menu.Item>
                      <Menu.Item>
                        <button className='group flex w-full items-center rounded-md p-2 text-md hover:bg-gray-200' onClick={redirectToPosts}>Posts</button>
                      </Menu.Item>
                    </div>
                    <div className="p-1">
                      <Menu.Item>
                        <button className='group flex w-full items-center rounded-md p-2 text-md hover:bg-gray-200' onClick={logout}>Logout</button>
                      </Menu.Item>
                    </div>
                  </>
                )
                :
                (<div className="p-1">
                  <Menu.Item>
                    <button className='group flex w-full items-center rounded-md p-2 text-md hover:bg-gray-200' onClick={redirectToSignIn}>SignIn</button>
                  </Menu.Item>
                  <Menu.Item>
                    <button className='group flex w-full items-center rounded-md p-2 text-md hover:bg-gray-200' onClick={redirectToSignUp}>SignUp</button>
                  </Menu.Item>
                </div>
                )
            }

          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  )
}


export default DropdownMenu
