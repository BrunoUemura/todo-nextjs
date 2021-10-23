/* eslint-disable @next/next/link-passhref */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
// import { AuthContext } from '../../context/auth'
import styles from './styles.module.scss'
import Todo from '../Todo'

export default function RegisterBox() {
  const [hasToken, setHasToken] = useState<boolean>(false)
  // const { user } = useContext(AuthContext)

  useEffect(() => {
    if (localStorage.getItem('@auth:token') !== null) {
      setHasToken(true)
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      const url = window.location.href
      const pathName = window.location.pathname
      const [splittedUrl] = url.split(pathName)
      window.history.pushState({}, '', splittedUrl)
    })()
  }, [])

  return (
    <>
      {!hasToken ? (
        <div className={styles.registerBoxWrapper}>
          <h1 className={styles.registerTitle}>sign up</h1>
          <input
            type="text"
            placeholder="Jhon Doe"
            className={styles.registerName}
          />
          <input
            type="password"
            placeholder="*********"
            className={styles.registerPassword}
          />
          <button className={styles.registerButton}>sign up</button>
          <h4 className={styles.signupLink}>Already registered?</h4>
          <Link href="/login">
            <button type="submit" className={styles.signupButton}>
              sign in
            </button>
          </Link>
        </div>
      ) : (
        <Todo />
      )}
    </>
  )
}
