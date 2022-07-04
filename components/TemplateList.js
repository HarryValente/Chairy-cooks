// React
import { useEffect, useState } from 'react'

// Next
import Link from 'next/link'

// Components
import Search from '../components/Search'

export default ({ templates: data }) => {
  const [templates, set] = useState([])
  const [snapshot, setSnapshot] = useState([])

  useEffect(() => {
    if (data) {
      set(data)
      setSnapshot(data)
    }
  }, [data])

  return (
    <div className='gap-y-4 grid grid-cols-1 mt-4'>
      <Search data={snapshot} setData={e => set(e)} keys={['name']} placeholder='Search Templates..' />
      <div className='bg-gray-100 gap-4 grid grid-cols-4 p-2 rounded text-xs'>
        <p>Name</p>
      </div>
      {templates &&
        templates.map(template => (
          <Link key={template.id} href={`/recipes/${template.id}`}>
            <a className='block hover:bg-gray-50 border border-gray-100 hover:border-gray-200 gap-4 grid grid-cols-4 p-2 rounded text-sm'>
              <p className='flex items-center text-gray-500'>{template.name}</p>
            </a>
          </Link>
        ))}
    </div>
  )
}
