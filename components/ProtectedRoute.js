// Next
import { useRouter } from 'next/router'

// Context
import { useAuthContext } from '../context/auth'

// Components
import AppLoader from '../components/AppLoader'

export default ({ children }) => {
  const router = useRouter()

  const { user, loading } = useAuthContext()

  if (loading) {
    return <AppLoader />
  } else {
    if (user) {
      return children
    } else {
      return router.replace('/')
    }
  }
}
