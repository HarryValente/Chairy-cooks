// React
import { useRef, useState } from 'react'

// Modules
import Fuse from 'fuse.js'

export default ({ data, setData, keys, placeholder }) => {
  const [input, set] = useState('')
  const ref = useRef(null)

  const snapshot = data

  const fuse = new Fuse(snapshot, {
    keys: keys,
    threshold: 0.2
  })

  const clear = () => {
    set('')
    return setData(snapshot)
  }

  const search = input => {
    set(input)

    return setData(
      input !== ''
        ? fuse.search(input).map(item => {
            return item.item
          })
        : snapshot
    )
  }

  return (
    <>
      <div className='relative'>
        {/* <div className='absolute bg-gray-100 flex h-5 items-center justify-center left-1.5 rounded top-1/2 transform -translate-y-1/2 w-5'>
          <i className='fa-regular fa-magnifying-glass h-3 text-gray-500 w-3' />
        </div> */}
        <input
          id='search'
          placeholder={placeholder ?? 'Search..'}
          ref={ref}
          value={input}
          onChange={e => search(e.target.value)}
        />
        {/* {(document.activeElement == ref.current || input !== '') && ( */}
          <div
            className='absolute hover:bg-gray-100 cursor-pointer flex h-5 items-center justify-center right-1.5 rounded top-1/2 transform -translate-y-1/2 w-5'
            onClick={() => clear()}
          >
            <i className='fa-regular fa-xmark h-3 text-gray-500 w-3' />
          </div>
        {/* )} */}
      </div>
    </>
  )
}
