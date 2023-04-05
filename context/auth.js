// React
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

// Next
import { useRouter } from 'next/router'

// Firebase
import { authentication } from '../firebase/index'
import {
  addFirebaseDoc,
  getFirebaseDoc
} from '../firebase/index'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

// Modules
import useLocalStorage from '../hooks/useLocalStorage'

// Context
const AuthContext = createContext({ user: null, loading: true })

// Format the User, ready to use around the application
const format = async user => {
  const existing = await getFirebaseDoc('users', user.uid)

  if (existing) {
    return {
      uid: user.uid,
      ...existing
    }
  } else {
    const data = {
      uid: user.uid,
      email: user.email,
      subscriptions: {
        parts: {
          enabled: false,
          date_enabled: null,
          date_expires: null
        }
      }
    }

    await addFirebaseDoc('users', user.uid, data)

    return data
  }
}

// Auth handler
const getAuth = () => {
  const router = useRouter()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const [_user, setLocalStorage] = useLocalStorage('_user', '')

  const handle = async raw => {
    if (!raw) {
      localStorage.clear()
    } else {
      const user = await format(raw)

      setUser(user)

      return user
    }
  }
// harry-joevalente@live.co.uk
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(authentication, email, password)
        .then(async response => {
          await handle(response.user)
          setLocalStorage(response.user.uid)
          resolve()
          return setLoading(false)
        })
        .catch(error => {
          reject(error)

          return setLoading(false)
        })
    })
  }

  const logout = useCallback(async () => {
    await signOut(authentication)
    await handle()
    setLoading(false)
  })

  useEffect(async () => {
    const fn = await onAuthStateChanged(authentication, user => handle(user))

    return () => fn()
  }, [])

  return { user, loading, login, logout }
}

export const AuthProvider = ({ children }) => {
  let auth = getAuth()

  useEffect(() => {
    const fn = () => (auth = getAuth())

    return () => fn()
  }, [])

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)
