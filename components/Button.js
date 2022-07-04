// React
import { useState } from 'react'

export default ({
  children,
  className,
  disabled,
  icon,
  onClick,
  onMouseDown,
  size,
  type,
  variant
}) => {
  const [hovering, toggleHover] = useState(false)

  let attributes = {
    classes: 'text-sm',
    icon: 'fa-solid fa-' + icon,
    variant: ''
  }

  switch (size) {
    case 'lg':
      attributes.size = 'text-lg'
      break
    case 'md':
      attributes.size = 'text-md'
      break
    case 'sm':
      attributes.size = 'text-sm'
      break
    case 'xs':
      attributes.size = 'text-xs'
      break
    default:
      attributes.size = 'text-sm'
  }

  switch (variant) {
    case 'action':
      attributes.classes =
        'bg-emerald-500 hover:bg-emerald-100 text-white hover:text-emerald-600'
      break
    case 'cancel':
      attributes.classes =
        'bg-gray-100 hover:bg-gray-50 text-gray-400 hover:text-gray-500'
      break
    case 'delete':
      attributes.classes =
        'bg-transparent hover:bg-red-500 border border-red-500 text-red-500 hover:text-white'
      break
    case 'primary':
      attributes.classes = 'bg-red-500 text-white'
      break
    case 'secondary':
      attributes.classes = 'bg-blue-500 text-white'
      break
    default:
      attributes.classes = 'bg-gray-100 text-gray-600'
  }

  if (disabled) {
    attributes.classes += ' cursor-not-allowed'
  }

  return (
    <button
      className={`${attributes.classes} ${className} flex font-medium items-center justify-center px-4 py-1 relative rounded-full ${attributes.size} transition-colors whitespace-nowrap`}
      disabled={disabled}
      type={type ?? 'button'}
      onClick={onClick}
      onMouseEnter={() => toggleHover(true)}
      onMouseDown={onMouseDown}
      onMouseLeave={() => toggleHover(false)}
    >
      {children && children}
      {icon && (
        <div
          animate={
            !hovering
              ? {
                  scale: 1
                }
              : {
                  scale: 1.5
                }
          }
        >
          <i className={attributes.icon + ' ml-3 origin-center'} />
        </div>
      )}
    </button>
  )
}