import React from 'react'

import Label from './Label'

const Checkbox = ({
  checked,
  className,
  label,

  onChange,
}) => {
  return (
    <div className='w-full'>
      <Label text={label} />
      <span className='relative'>
        <input
          type='checkbox'
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className={className}
        />
      </span>
    </div>
  )
}

export default Checkbox