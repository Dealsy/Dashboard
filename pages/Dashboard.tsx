import { useEffect, useState } from 'react'

import Card from '../components/dashboard/Card'
import { useUser } from '../hooks/UseUser'
import SignIn from './login/SignIn'

export default function Dashboard() {
  const user = useUser()
  const [userRole, setUserRole] = useState('')
  const [adminRole, setAdminRole] = useState('')
  const [modRole, setModRole] = useState('')

  const roles = user?.roles[0]

  useEffect(() => {
    if (roles === 'ROLE_USER') {
      setUserRole('User')
    }
    if (roles === 'ROLE_ADMIN') {
      setAdminRole('Admin')
    }
    if (roles === 'ROLE_MODERATOR') {
      setModRole('Moderator')
    }
  }, [roles])

  if (!user) {
    return <SignIn />
  }

  return (
    <div className="flex flex-wrap flex-row justify-between m-10">
      <Card header="Personal Details">
        <ul>
          <li>Username: {user.username}</li>
          <li>Email: {user.email}</li>
          <h3 className="flex justify-center font-medium mt-2"> Roles: </h3>
          <li>{userRole && userRole}</li>
          <li>{adminRole && adminRole}</li>
          <li>{modRole && modRole}</li>
        </ul>
      </Card>
    </div>
  )
}
