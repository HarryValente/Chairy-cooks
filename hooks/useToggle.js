import { useCallback, useState } from 'react'

const useToggle = (initial = false) => {
  const [state, setState] = useState(initial)

  const toggle = useCallback(() => setState((state) => !state), [])

  return [state, toggle]
}

export default useToggle