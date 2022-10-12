import { Menu, Transition } from '@headlessui/react'
import { Cog8ToothIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import { useState } from 'react'

import { useOutsideClick } from '../../hooks/useOutsideClick'
import AuthService from '../../services/auth.service'

export default function MenuItem() {
  const router = useRouter()
  const logOut = () => {
    AuthService.logout()
    router.push('/login/SignIn')
  }

  const [toggle, setToggle] = useState(false)

  const handleClickOutside = () => {
    setToggle(false)
  }

  const ref = useOutsideClick(handleClickOutside)

  const toggleButton = () => {
    setToggle(!toggle)
  }
  return (
    <div className="w-10 ml-2 mr-10">
      <Menu as="div" className="relative ">
        <div>
          <Menu.Button
            ref={ref}
            onClick={toggleButton}
            className={clsx('rounded-full w-11 h-11 text-center text-lg')}
          >
            <span className="sr-only">Open user menu</span>
            <Cog8ToothIcon
              className={clsx(
                'h-7 w-7 justify-end',
                toggle && 'text-indigo-500 ring-4 rounded-full'
              )}
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={clsx(
              'absolute right-5 top-10 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg',
              'ring-1 ring-black ring-opacity-5 focus:outline-none'
            )}
          >
            <Menu.Item>
              {({ active }) => (
                <Link href="/Profile">
                  <a
                    className={clsx(
                      active && 'bg-gray-100 ',
                      'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    Profile settings
                  </a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={clsx(
                    active && 'bg-gray-100',
                    'block px-4 py-2 text-sm text-red-500'
                  )}
                  onClick={logOut}
                >
                  Sign out
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
