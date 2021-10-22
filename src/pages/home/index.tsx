import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth'
import Todo from '../../components/Todo'
import Login from '../login'

export default function Home() {
  const { user } = useContext(AuthContext)
  console.log(user)

  return (
    <>
      <div>{user !== undefined ? <Login /> : <Todo />}</div>
    </>
  )
}
