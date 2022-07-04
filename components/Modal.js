// Modules
import { motion } from 'framer-motion'

export default ({ children, close, icon, visible, title, width }) => {
  let attributes = {
    icon: 'fa-regular fa-' + icon
  }

  if (visible) {
    return (
      <Overlay close={close}>
        <motion.div
          className={`bg-white relative rounded max-h-full overflow-x-hidden no-scrollbar overflow-y-auto ${
            width ?? 'w-3/4'
          }`}
          // onKeyPress={handleKey}
          initial={{
            opacity: 0,
            y: 300
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.2
          }}
        >
          <div className='border-b flex items-center px-3 py-3'>
            {icon && (
              <div className='bg-red-100 flex h-10 items-center justify-center mr-4 rounded text-red-500 w-10'>
                <i className={attributes.icon} />
              </div>
            )}
            <h3 className='mb-0'>{title}</h3>
            <motion.button
              onClick={() => close()}
              className='absolute bg-vapta-red flex h-6 items-center justify-center -right-0 rounded text-white -top-0 w-8 z-10'
              initial={{
                y: 0
              }}
              whileHover={{
                y: -2
              }}
            >
              <i className='fa-solid fa-xmark' />
            </motion.button>
          </div>
          <div className='p-4'>{children}</div>
        </motion.div>
      </Overlay>
    )
  } else return null
}

const Overlay = ({ children }) => {
  return (
    <motion.div
      className='absolute bg-black bg-opacity-50 flex h-screen items-center justify-center left-0 overflow-hidden top-0 w-full z-30'
      onClick={close}
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      transition={{
        duration: 0.25
      }}
    >
      {children}
    </motion.div>
  )
}
