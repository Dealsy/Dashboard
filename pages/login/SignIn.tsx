import { useRouter } from 'next/router'
import { useState } from 'react'

import AuthInput from '../../components/login/AuthInput'
import AuthLink from '../../components/login/AuthLink'
import LoginCard from '../../components/login/LoginCard'
import Button from '../../components/reuseable_components/Button'
import AuthService from '../../services/auth.service'

export default function SignIn() {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [forgotEmailStatus, setForgotEmailStatus] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [mailerState, setMailerState] = useState({
    email: '',
  })

  const backToLogin = () => {
    setIsLogin(true)
    setForgotEmailStatus('')
    setUsername('')
    setMailerState({ email: '' })
  }

  const handleStateChange = (e: any) => {
    const email = e.target.value
    setMailerState({ email })
  }

  const onChangeUsername = (e: any) => {
    const username = e.target.value
    setUsername(username)
  }

  const onChangePassword = (e: any) => {
    const password = e.target.value
    setPassword(password)
  }

  const handleLogin = (e: any) => {
    e.preventDefault()

    setMessage('')
    setLoading(true)

    AuthService.login(username, password).then(
      () => {
        router.push('/')
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()

        setLoading(false)
        setMessage(resMessage)
      }
    )
  }

  const submitEmail = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    const response = await fetch('http://localhost:8080/send', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ mailerState }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        const resData = await res
        setForgotEmailStatus(resData.status)
      })
      .then(() => {
        setMailerState({
          email: '',
        })
      })
    setLoading(false)
  }

  return (
    <div className="flex h-screen bg-gradient-to-b from-indigo-300 via-indigo-400 to-purple-800">
      <LoginCard header={isLogin ? 'Sign in' : 'Forgot password'}>
        <form onSubmit={submitEmail} className="flex flex-col w-full gap-2">
          <AuthInput
            placeholder={isLogin ? 'Username' : 'Enter your email'}
            type={isLogin ? 'text' : 'email'}
            onChange={(e) => {
              isLogin ? onChangeUsername(e) : handleStateChange(e)
            }}
            value={isLogin ? username : mailerState.email}
          />
          {isLogin && (
            <AuthInput
              placeholder="Password"
              type="password"
              onChange={(e) => {
                onChangePassword(e)
              }}
            />
          )}
          {isLogin
            ? message && <p className="danger">Username or Password is wrong</p>
            : forgotEmailStatus === 'fail' && (
                <p className="danger">You must enter a vaild email</p>
              )}

          {forgotEmailStatus === 'success' && (
            <p className="success">Email has been sent!</p>
          )}
          <div className="flex flex-col justify-center">
            {isLogin && (
              <AuthLink
                text="Don't have an account?"
                linkText="Sign up"
                hrefPath="Register"
                className="mt-5 mb-1"
              />
            )}
            {isLogin && (
              <Button
                text="Sign in"
                className="btn-blue"
                onClick={(e) => {
                  handleLogin(e)
                }}
              />
            )}
            {!isLogin && (
              <Button
                text={loading ? 'sending email...' : 'Send password reset link'}
                className="btn-blue"
                onClick={() => {}}
              />
            )}

            <div className="flex justify-end">
              {!isLogin && (
                <Button
                  onClick={backToLogin}
                  className="text-indigo-400 text-sm border-0"
                  text="Back to login"
                  type="button"
                />
              )}
              {isLogin && (
                <Button
                  onClick={() => setIsLogin(false)}
                  className="text-indigo-400 text-sm border-0 w-32"
                  text="Forgot password?"
                  type="button"
                />
              )}
            </div>
          </div>
        </form>
      </LoginCard>
    </div>
  )
}
