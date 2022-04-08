// React
import React, { useEffect, useState } from 'react'
// import { filter } from 'react-children-utilities'

// Context
import { useAuthContext } from '../context/auth'

// Helpers
import { handleColor } from '../helpers/index'

// Modules
// import _ from 'lodash'
import { motion } from 'framer-motion'

export const Widget = ({ children, className: classes }) => {
  const { user, loading } = useAuthContext()

  return (
    <div
      className={`bg-white border p-4 ${classes} rounded`}
      initial={{
        opacity: 0
      }}
      whileInView={{
        opacity: 1
      }}
    >
      {children}
    </div>
  )
}

export const WidgetAdmin = ({ children }) => (
  <div
    initial={{
      opacity: 0,
      y: -20
    }}
    whileInView={{
      opacity: 1,
      y: 0
    }}
  >
    {children}
  </div>
)

export const WidgetActions = ({ children, className: classes }) => {
  return <div className={`${classes} flex flex-row items-center justify-end mt-4`}>{children}</div>
}

export const WidgetTitle = ({ children, className: classes, icon: i, color }) => {
  const icon = 'fa-' + i

  const styles = handleColor(color)

  return (
    <div
      className={`${classes} flex font-medium items-center mb-4 text-sm`}
      initial={{
        opacity: 0,
        y: -20
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
    >
      {i && (
        <span className={`${styles.bg} flex h-7.5 items-center justify-center mr-2 p-2 rounded ${styles.text} w-7.5`}>
          <i className={`fa-regular ${icon} block`} />
        </span>
      )}
      {children}
    </div>
  )
}

export const WidgetContent = ({ children, className: classes }) => {
  return (
    <div
      className={`${classes} text-sm`}
      initial={{
        opacity: 0,
        y: -20
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
    >
      {children}
    </div>
  )
}
