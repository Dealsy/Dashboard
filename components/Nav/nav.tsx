import { useUser } from '../../hooks/UseUser'
import MenuItem from './MenuItem'

export default function Nav() {
  const user = useUser()

  return (
    <>
      <nav className="flex items-center justify-between bg-gray-800 p-6 text-white">
        <div className="flex flex-col">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-xl tracking-tight mr-2">
              User
            </span>
            <span className="font-semibold text-xl tracking-tight text-gray-300">
              dashboard
            </span>
          </div>
        </div>
        <MenuItem />
      </nav>
      <div className=" bg-gray-700 text-white p-4">
        <div className="mb-5 text-2xl pt-2">Welcome {user?.username} </div>
      </div>
    </>
  )
}
