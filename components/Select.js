import React, { useEffect, useState } from 'react'

import Label from '../components/Label'

const Select = ({
  className,
  disabled,
  label,
  options,
  tooltip,
  required,
  value,
  onChange
}) => {
  const [opts, set] = useState([])

  useEffect(() => {
    if (options) set(options)
  }, [options])

  return (
    <div className='w-full'>
      <Label text={label} tooltip={tooltip} required={required} />
      <select
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        className={
          className +
          ' ' +
          ' bg-transparent border borer-gray-300 outline-none px-2 py-1 rounded text-sm w-full'
        }
      >
        <option value='' hidden>
          Please select an option
        </option>
        {opts &&
          opts.map(
            option =>
              option && (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              )
          )}
      </select>
    </div>
  )
}

export default Select