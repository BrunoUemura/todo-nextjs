/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/link-passhref */
import React, { FormEvent, useEffect, useState } from 'react'
// import { AuthContext } from '../../context/auth'
import styles from './styles.module.scss'
import { BiEdit } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'
import { api } from '../../services/api'
import { decode } from 'jsonwebtoken'
import checkUserSession from '../../utils/CheckAuthentication'

type TodoResponse = {
  id?: string
  title?: string
  userId?: string
}

type AuthToken = {
  token?: string
}

export default function Todo({ token }: AuthToken) {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { data } = await api.get<TodoResponse[]>(`/api/v1/tasks`)
      setTodos(data)
      setRefresh(false)
    })()

    checkUserSession()
  }, [refresh])

  async function handleAddTodo(event: FormEvent, title: string) {
    event.preventDefault()

    const { id: userId }: any = decode(token)
    await api.post(
      '/api/v1/tasks',
      { title, userId },
      {
        headers: {
          authorization: token,
        },
      }
    )

    setTodo('')
    setRefresh(true)
  }

  async function handleDeleteTodo(id: string) {
    await api.delete(`/api/v1/tasks/${id}`, {
      headers: {
        authorization: token,
      },
    })

    setRefresh(true)
  }

  return (
    <div className={styles.todoBoxWrapper}>
      <div className={styles.todoTitleBox}>
        <h1 className={styles.todoTitle}>Todo App</h1>
        <form className={styles.todoInputForm}>
          <input
            className={styles.todoInput}
            type="text"
            placeholder="e.g wash dishes"
            value={todo}
            onChange={(event) => {
              setTodo(event.target.value)
            }}
          />
          <button
            className={styles.todoInputButton}
            onClick={(event) => {
              handleAddTodo(event, todo)
            }}
          >
            submit
          </button>
        </form>
      </div>
      <div className={styles.todoListBox}>
        {todos.map((todo) => (
          <div className={styles.todoListItem} key={todo.id}>
            <h5>{todo.title}</h5>
            <div className={styles.todoActionButtons}>
              <BiEdit
                className={styles.todoEdit}
                onClick={() => {
                  console.log('Edit task')
                }}
              />
              <FaTrash
                className={styles.todoDelete}
                onClick={() => {
                  handleDeleteTodo(todo.id)
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
