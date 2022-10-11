import Link from 'next/link'

import { useUser } from '../../hooks/UseUser'
import Button from '../reuseable_components/Button'
import MenuItem from './MenuItem'

export default function Nav() {
  const user = useUser()

  return (
    <>
      <nav className="flex items-center justify-between bg-gray-800 p-6 text-white">
        <div className="flex flex-row">
          <Link href="/">
            <a className="mt-1.5">
              <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight mr-2">
                  User
                </span>
                <span className="font-semibold text-xl tracking-tight text-gray-300">
                  dashboard
                </span>
              </div>
            </a>
          </Link>

          <Link href="/Todo">
            <a className="btn-black text-center p-2 rounded-md">Todo</a>
          </Link>
          <Link href="/Budget">
            <a className="btn-black text-center p-2 rounded-md">Budget</a>
          </Link>
          <Link href="/Calculator">
            <a className="btn-black text-center p-2 rounded-md">Calculator</a>
          </Link>
        </div>
        <MenuItem />
      </nav>
      <div className=" bg-gray-700 text-white p-4">
        <div className="mb-5 text-2xl pt-2">Welcome {user?.username} </div>
      </div>
    </>
  )
}
