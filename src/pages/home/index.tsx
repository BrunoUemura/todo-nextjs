import React, { useEffect, useState } from 'react'

import styles from '../../styles/Home.module.scss'
// import { AuthContext } from '../../context/auth'
import Todo from '../../components/Todo'
import Login from '../login'

export default function Home() {
  const [token, setToken] = useState<string>('')
  const [hasToken, setHasToken] = useState<boolean>(false)
  // const { user } = useContext(AuthContext)

  useEffect(() => {
    if (localStorage.getItem('@auth:token') !== null) {
      setHasToken(true)
      setToken(localStorage.getItem('@auth:token'))
    }
  }, [])

  return (
    <>
      <div className={styles.main}>
        {hasToken ? <Todo token={token} /> : <Login />}
      </div>
    </>
  )
}
