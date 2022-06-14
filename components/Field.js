import React from 'react'

import Label from '../components/Label'

const Field = ({
  autoFocus,
  className,
  disabled,
  icon,
  inputMode,
  label,
  placeholder,
  required,
  tooltip,
  type = 'text',
  value,

  onChange
}) => {
  return (
    <div className='w-full'>
      <Label text={label} tooltip={tooltip} required={required} />
      <span className='relative'>
        {icon && (
          <span className='absolute bg-red-100 flex h-5 items-center justify-center left-1.5 rounded text-red-500 top-1/2 transform -translate-y-1/2 w-5'>
            <i className={`fa-regular fa-${icon} fa-xs`} />
          </span>
        )}
        <input
          autoFocus={autoFocus}
          disabled={disabled}
          inputMode={inputMode}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          type={type}
          value={value}
          className={
            className +
            ' ' +
            (icon && 'pl-8') +
            ' bg-transparent border borer-gray-300 outline-none px-2 py-1 rounded text-sm w-full'
          }
          required={required}
        />
      </span>
    </div>
  )
}

export default Field