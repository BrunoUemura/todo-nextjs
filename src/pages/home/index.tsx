import React, { useEffect, useState } from 'react'
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
      <div>{hasToken ? <Todo token={token} /> : <Login />}</div>
    </>
  )
}
