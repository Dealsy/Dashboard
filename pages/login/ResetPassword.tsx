import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import AuthInput from '../../components/login/AuthInput'
import LoginCard from '../../components/login/LoginCard'
import Button from '../../components/reuseable_components/Button'
import AuthService from '../../services/auth.service'

export default function ResetPassword() {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const emailString = router.asPath
    const emailFinal = emailString.split('?')[1]
    setEmail(emailFinal)
  }, [router.asPath])

  const onChangePassword = (e: any) => {
    const password = e.target.value
    setPassword(password)
  }

  const backToLogin = (e: any) => {
    e.preventDefault()
    router.push('/login/SignIn')
  }

  const onPasswordConfirm = (e: any) => {
    const confirmPassword = e.target.value
    setConfirmPassword(confirmPassword)
  }

  // Calls resetPassword() in auth.service.ts
  const handleResetPassword = async (e: any) => {
    e.preventDefault()

    if (password === '' || confirmPassword === '') {
      setMessage('fail')
    } else if (password !== '' && confirmPassword !== '') {
      AuthService.resetPassword(email, password).then(
        () => {
          setMessage('success')
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()

          console.log(error.response)

          setLoading(false)
          setMessage(resMessage)
        }
      )
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-b from-blue-500 via-blue-300 to-indigo-500">
      <LoginCard header="Reset password">
        <form className="flex flex-col">
          <div className="ml-4 bg-gray-700 p-2 mb-5">
            <p className="font-medium text-white"> Email: </p>{' '}
            <p className="text-gray-400">{email}</p>
          </div>
          <AuthInput onChange={onChangePassword} placeholder="New password" />
          {message && password === '' && (
            <p className="error"> Please enter a password </p>
          )}
          <AuthInput
            onChange={onPasswordConfirm}
            placeholder="Confirm new password"
          />
          {message && confirmPassword === '' && (
            <p className="error mb-2"> Please confirm your password </p>
          )}
          {message === 'success' && (
            <p className="success">Password reset successfully</p>
          )}
          <Button
            onClick={message === 'success' ? backToLogin : handleResetPassword}
            text={message === 'success' ? 'Go back to login' : 'Reset password'}
            className={
              message === 'success'
                ? 'btn-blue bg-purple-500 hover:bg-purple-600'
                : 'btn-blue'
            }
          />
        </form>
      </LoginCard>
    </div>
  )
}
