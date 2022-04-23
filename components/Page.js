// Helpers
import { handleColor } from '../helpers/index'

// Modules
import { motion } from 'framer-motion'

export default ({ children: c, title: t, icon: i, color, meta: m }) => {
  const colors = handleColor(color)

  return (
    <div className={`grid ${c ? 'grid-cols-2' : 'grid-cols-1'} mb-4`}>
      <div>
        <motion.h1
          className='flex flex-row items-center space-y-2'
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1,
            transition: {
              delay: 0.15
            }
          }}
        >
          {i && (
            <motion.span
              className={`${colors.bg} flex h-8 items-center justify-center mr-4 p-4 rounded w-8`}
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1,
                transition: {
                  delay: 0.25
                }
              }}
            >
              <i className={`fa-light fa-${i} h-5 ${colors.text} w-5`} />
            </motion.span>
          )}
          {t}
        </motion.h1>
        <motion.p
          className={`text-slate-700 text-sm`}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1,
            transition: {
              delay: 0.5
            }
          }}
        >
          {m}
        </motion.p>
      </div>
      {c && (
        <motion.div
          className='flex items-end justify-end space-x-4 w-full'
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 0.75
            }
          }}
        >
          {c}
        </motion.div>
      )}
    </div>
  )
}
