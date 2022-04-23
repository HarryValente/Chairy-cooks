// React
import { useEffect, useState } from 'react'

// Context
import { useAuthContext } from '../context/auth'

// Firebase
import { addFirebaseDoc, getFirebaseDocs, updateFirebaseDoc } from '../firebase/index'
import { where } from 'firebase/firestore'

export default (initial = [], collection, filter = null) => {
  const [state, setState] = useState(initial)

  const { user } = useAuthContext()

  const remove = data => setState(state => state.filter(item => item.id !== data))

  const update = async data => {
    const existing = state.find(item => item.id == data.id)

    if (existing) {
      const _update = state.map(item => (item.id == data.id ? data : item))

      setState(_update)

      await updateFirebaseDoc(collection, data.id, data)
    } else {
      setState(state => [...state, data])

      if (data.id) {
        await addFirebaseDoc(collection, data, data.id)
      } else {
        await addFirebaseDoc(collection, data)
      }
    }
  }

  useEffect(async () => {
    if (user) {
      let data = []

      switch (filter) {
        case 'user_id':
          data = await getFirebaseDocs(collection, where('user_id', '==', user.id))
          break
        default:
          data = await getFirebaseDocs(collection)
      }

      if (data) {
        setState(data)
      }
    }
  }, [user])

  return [state, update, remove]
}
