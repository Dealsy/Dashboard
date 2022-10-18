// Hooks/UseUser.jsx
import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'

import AuthService from '../services/auth.service'

interface Props {
  username: string
  accessToken: string
  id: string
  email: string
  roles: string[]
}

type UserContextType = {
  children: React.ReactNode
}

const initialUser = {
  username: '',
  accessToken: '',
  id: '',
  email: '',
  roles: [],
}

const UserContext = createContext<Props | undefined>(initialUser)

export function UserProvider({ children }: UserContextType) {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<Props>()

  useEffect(() => {
    const controller = new AbortController()
    const user: Props = AuthService.getCurrentUser()
    if (!user) {
      router.push('/login/SignIn')
    }
    setCurrentUser(user)

    return () => {
      controller.abort()
    }
  }, [router])

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
