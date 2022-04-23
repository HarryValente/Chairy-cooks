// Next
import Image from 'next/image'

// Components
import Footer from '../components/Footer'
import SEO from '../components/SEO'

// Modules
import { motion } from 'framer-motion'

export default ({ dark }) => {
  return (
    <>
      <SEO />

      <motion.div
        key='app-loader'
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        exit={{ opacity: 0 }}
        className={`${dark ? 'bg-gray-800' : 'bg-white'} flex h-screen items-center justify-center w-full`}
      >
        <div className='flex h-5 items-center justify-center relative w-5'>
          <i className='fa-regular fa-spinner fa-spin-pulse text-red-500 text-4xl z-10' />
          <Image src='/VAPTALogo.png' alt='VAPTA Systems Logo' priority layout='fill' objectFit='cover' />
        </div>
      </motion.div>

      <Footer />
    </>
  )
}
