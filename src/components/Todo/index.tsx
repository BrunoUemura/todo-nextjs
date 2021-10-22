/* eslint-disable @next/next/link-passhref */
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/auth'
import styles from './styles.module.scss'
import { BiEdit } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'

type TodoResponse = {
  id: string
  text: string
}

export default function Todo() {
  const [todos, setTodos] = useState([])
  const { user } = useContext(AuthContext)
  console.log(user)

  useEffect(() => {
    ;(async () => {
      const url = window.location.href
      const pathName = window.location.pathname
      const [splittedUrl] = url.split(pathName)
      window.history.pushState({}, '', splittedUrl)

      const { data } = await axios.get<TodoResponse[]>('/api/todos')
      setTodos(data)
    })()
  }, [])

  return (
    <div className={styles.todoBoxWrapper}>
      <div className={styles.todoTitleBox}>
        <h1 className={styles.todoTitle}>Todo App</h1>
        <form className={styles.todoInputForm} action="">
          <input
            className={styles.todoInput}
            type="text"
            placeholder="e.g wash dishes"
          />
          <button className={styles.todoInputButton}>submit</button>
        </form>
      </div>
      <div className={styles.todoListBox}>
        {todos.map((todo) => (
          <div className={styles.todoListItem} key={todo.id}>
            <h5>{todo.text}</h5>
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
                  console.log('Delete task')
                }}
              />
            </div>
          </div>
        ))}
        <div className={styles.todoListItem}>
          <h5>Task 1</h5>
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
                console.log('Delete task')
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
