import React from 'react'

const Widget = ({ children, className, icon, title }) => {
  const i = 'fa-regular fa-' + icon

  return (
    <div className={className + ' bg-white border p-4 rounded'}>
      <div className='flex font-semibold items-center mb-4 text-gray-900 text-sm tracking-wide'>
        {icon && (
          <span
            className={`bg-gray-200 flex h-7.5 items-center justify-center mr-3 p-2 rounded text-gray-900 w-7.5`}
          >
            <i className={`${i} block`} />
          </span>
        )}
        {title}
      </div>
      <div className='flex flex-col space-y-4 text-sm'>{children}</div>
    </div>
  )
}

export default Widget