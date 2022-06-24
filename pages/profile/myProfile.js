// Context
import { useAuthContext } from '../../context/auth'
import Grid from '../../components/Grid'

export default () => {
  const { user } = useAuthContext()
  
  return (
    <>
      <Grid columns={2}>
        <span className='bg-gray-200 px-1 rounded'>{JSON.stringify(user)}</span>
        <span className='bg-gray-200 px-1 rounded'>testing234</span>
      </Grid>
      
    </>
  )
}
