import { useEffect, useState } from 'react'
import '../styles/globals.css'
import Layout from '../components/Layout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../context/auth';

function MyApp({ Component, pageProps, router }) {
  const [loading, setLoading] = useState(0)
  useEffect(() => setLoading(100), [router])

  return (
    <AuthProvider>
      <Layout>
        <Component key={router.route} {...pageProps} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
