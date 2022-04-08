// Context
import { useState, useEffect } from 'react'
import { useAuthContext } from '../../context/auth'
import Grid from '../../components/Grid'
import Image from 'next/image'

export default () => {
  const { user } = useAuthContext()

  const [admin, setAdmin] = useState(false)
  
  return (
    <>
      <Grid columns={2}>
        <span className='bg-gray-200 px-1 rounded'>{JSON.stringify(user)}</span>
        <span className='bg-gray-200 px-1 rounded'>testing234</span>
      </Grid>
      
    </>
  )
}
