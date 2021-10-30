/* eslint-disable @typescript-eslint/no-explicit-any */
import router from 'next/router'
import jwt_decode from 'jwt-decode'

export default function checkUserSession() {
  if (localStorage.getItem('@auth:token') === null) {
    alert('Your need to sign in to proceed!')
    router.push('/login')
    return
  }

  const token = localStorage.getItem('@auth:token')
  const tokenDecoded: any = jwt_decode(token)
  const { id, exp } = tokenDecoded

  // Check the session expiration with jwt.exp.
  const currentTimestamp = new Date().getTime() / 1000
  if (exp < currentTimestamp) {
    alert('Your session expired, Sign in again to continue!')
    localStorage.removeItem('@auth:token')
    router.push('/login')
    return
  }
  return id
}
