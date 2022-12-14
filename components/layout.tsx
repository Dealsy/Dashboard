import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { UserProvider } from '../hooks/UseUser'
import AuthService from '../services/auth.service'
import Nav from './Nav/nav'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const router = useRouter()
  // Only the login paths are public right now
  const publicPath = router.pathname.includes('/login')

  //   const adminPath = router.pathname.startsWith('/admin')

  useEffect(() => {
    if (!AuthService.getCurrentUser() && !publicPath) {
      router.push('/login/SignIn')
    }
  }, [router, publicPath])

  if (publicPath) {
    // Using fragment to please the linter
    return <>{children}</>
  }

  return (
    <>
      <main className="flex flex-col bg-gray-50 h-screen">
        <UserProvider>
          <Nav />
          <div className="w-full">{children}</div>
        </UserProvider>
      </main>
    </>
  )
}
