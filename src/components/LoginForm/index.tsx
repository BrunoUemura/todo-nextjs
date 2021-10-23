/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/link-passhref */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import router from 'next/router'
// import { AuthContext } from '../../context/auth'
import styles from './styles.module.scss'
import Todo from '../Todo'
import { api } from '../../services/api'

export default function LoginBox() {
  const [hasToken, setHasToken] = useState<boolean>(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const { user } = useContext(AuthContext)

  useEffect(() => {
    if (localStorage.getItem('@auth:token') !== null) {
      setHasToken(true)
    }
  }, [])

  async function handleLogin() {
    const { data }: any = await api.post('api/v1/auth/login', {
      email,
      password,
    })

    if (data.token) {
      localStorage.setItem('@auth:token', data.token)
      router.push('/home')
    }
  }

  return (
    <>
      {!hasToken ? (
        <div className={styles.loginBoxWrapper}>
          <h1 className={styles.loginTitle}>Sign In</h1>
          <input
            type="email"
            placeholder="jhon.doe@gmail.com"
            onChange={(event) => {
              setEmail(event.target.value)
            }}
            className={styles.loginName}
          />
          <input
            type="password"
            placeholder="*********"
            onChange={(event) => {
              setPassword(event.target.value)
            }}
            className={styles.loginPassword}
          />
          <button className={styles.loginButton} onClick={handleLogin}>
            sign in
          </button>
          <h4 className={styles.signupLink}>Not registered yet?</h4>
          <Link href="/register">
            <button type="submit" className={styles.signupButton}>
              Sign up
            </button>
          </Link>
        </div>
      ) : (
        <Todo />
      )}
    </>
  )
}
