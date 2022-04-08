import { useState } from "react";

export default (key, initial) => {
  console.log(key, initial)
  const [stored, setStored] = useState(() => {
    if (typeof window === 'undefined') {
      return initial
    }

    try {
      const item = window.localStorage.getItem(key)

      return item ? JSON.parse(item) : initial
    } catch (error) {
      console.error(error)

      return initial
    }
  })

  const set = value => {
    try {
      const valueToStore = value instanceof Function ? value(stored) : value

      setStored(valueToStore)

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key,JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return [stored, set]
}