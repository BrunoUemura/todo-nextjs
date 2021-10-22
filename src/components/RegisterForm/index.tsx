/* eslint-disable @next/next/link-passhref */
import React, { useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from '../../context/auth'
import styles from './styles.module.scss'

export default function RegisterBox() {
  const { user } = useContext(AuthContext)

  console.log(user)

  return (
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
      <button className={styles.registerButton}>sign un</button>
      <h4 className={styles.signupLink}>Already registered?</h4>
      <Link href="/login">
        <button type="submit" className={styles.signupButton}>
          sign in
        </button>
      </Link>
    </div>
  )
}
