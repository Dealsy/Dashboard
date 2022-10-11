import { useEffect, useState } from 'react'

import { useUser } from '../hooks/UseUser'

export const UserRoles = () => {
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

  return (
    <div className="flex flex-row gap-2">
      <p>{adminRole && adminRole}</p>
      <p>{modRole && modRole}</p>
      <p>{userRole && userRole}</p>
    </div>
  )
}
