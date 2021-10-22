/* eslint-disable @next/next/link-passhref */
import React, { useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from '../../context/auth'
import styles from './styles.module.scss'
import Todo from '../Todo'

export default function LoginBox() {
  const { user } = useContext(AuthContext)

  console.log(user)

  return (
    <>
      {user !== undefined ? (
        <div className={styles.loginBoxWrapper}>
          <h1 className={styles.loginTitle}>Sign In</h1>
          <input
            type="text"
            placeholder="Jhon Doe"
            className={styles.loginName}
          />
          <input
            type="password"
            placeholder="*********"
            className={styles.loginPassword}
          />
          <button className={styles.loginButton}>sign in</button>
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
