
import { useState } from 'react'

export default (initial = {}) => {
  const [state, setState] = useState(initial)
  
  const set = value => setState(state => ({ ...state, ...value }))
  
  return [state, set]
}

// import { useState } from 'react'

// const Form = (initial = {}) => {
//   const [state, setState] = useState(initial)

// const set = (value: Object) => setState((state) => ({ ...state, ...value }))

//   return [state, set]
// }

// export default Form
