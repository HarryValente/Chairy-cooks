// React
import { useEffect, useState } from 'react'

// Components
import Button from './Button'
import Label from './Label'

// Modules
// import moment from 'moment'
// import { motion } from 'framer-motion'

export const Form = ({ children, onSubmit, error: e }) => {
  const [error, setError] = useState(null)

  useEffect(() => {
    if (e) {
      e = e.toString()

      if (e.includes('invalid-email')) {
        setError("Whoah, that's an invalid email. Please try again.")
      } else if (e.includes('internal-error')) {
        setError('Please make sure all fields are complete and try again.')
      } else if (e.includes('wrong-password')) {
        setError('That password is incorrect. Please try again.')
      } else {
        setError(`Unhandled: ${e}`)
      }
    }
  }, [e])

  return (
    <form autoComplete='off' onSubmit={onSubmit}>
      {error && <FormError error={error} />}
      {children}
    </form>
  )
}

export const FormError = ({ error }) => {
  return (
    <motion.div
      className='bg-red-100 bg-opacity-90 col-span-full font-medium mb-4 px-3 py-2 rounded text-red-600 text-sm'
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
    >
      <i className='fa-solid fa-square-exclamation fa-lg mr-2' />
      {error}
    </motion.div>
  )
}

export const FormField = ({
  autoFocus,
  className,
  disabled,
  label,
  icon,
  inputMode,
  onChange,
  placeholder,
  required,
  rows,
  tooltip,
  type,
  value
}) => {
  if (icon) {
    icon = 'fa-' + icon
  }

  if (type == 'password' || !type) {
    return (
      <div className='w-full'>
        <Label text={label} tooltip={tooltip} required={required} />
        <span className='relative'>
          {icon && (
            <span className='absolute bg-red-100 flex h-5 items-center justify-center left-1.5 rounded text-red-500 top-1/2 transform -translate-y-1/2 w-5'>
              <i className={`fa-regular ${icon} fa-xs`} />
            </span>
          )}
          <input
            autoFocus={autoFocus}
            disabled={disabled || !onChange}
            inputMode={inputMode}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            type={type ?? 'text'}
            value={value ?? ''}
            className={className + ' ' + (icon && 'pl-8')}
            required={required}
          />
        </span>
      </div>
    )
  } else if (type == 'textarea') {
    return (
      <div className='w-full'>
        <Label text={label} tooltip={tooltip} required={required} />
        <span className='relative'>
          {icon && (
            <span className='absolute bg-red-100 flex h-5 items-center justify-center left-1.5 rounded text-red-500 top-1/2 transform -translate-y-1/2 w-5'>
              <i className={`fa-regular ${icon} fa-xs`} />
            </span>
          )}
          <textarea
            autoFocus={autoFocus}
            disabled={disabled}
            inputMode={inputMode}
            onChange={e => onChange(e.target.value)}
            value={value ?? ''}
            className={className + ' ' + (icon && 'pl-8')}
            required={required}
            rows={rows}
            placeholder={placeholder}
          />
        </span>
      </div>
    )
  } else if (type == 'date') {
    return (
      <div className='w-full'>
        <Label text={label} tooltip={tooltip} required={required} />
        <span className='relative'>
          {icon && (
            <span className='absolute bg-red-100 flex h-5 items-center justify-center left-1.5 rounded text-red-500 top-1/2 transform -translate-y-1/2 w-5'>
              <i className={`fa-regular ${icon} fa-xs`} />
            </span>
          )}
          <input
            type='date'
            disabled={disabled}
            inputMode={inputMode}
            value={
              value ?? moment(new Date()).add(1, 'day').format('YYYY-MM-DD')
            }
            onChange={e => onChange(e.target.value)}
            className={className}
            required={required}
            rows={rows}
          />
        </span>
      </div>
    )
  }
}

export const FormSelect = ({
  className,
  disabled,
  label,
  onChange,
  options: data,
  tooltip,
  required,
  value
}) => {
  const [options, set] = useState([])

  useEffect(() => {
    if (data) set(data)
  }, [data])

  return (
    <div className='w-full'>
      <Label text={label} tooltip={tooltip} required={required} />
      <select
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        className={className}
      >
        <option value='' hidden>
          Please select an option
        </option>
        {options &&
          options.map(
            option =>
              option &&
              option.name &&
              option.value && (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              )
          )}
      </select>
    </div>
  )
}

export const FormSubmit = ({ children, icon, onClick, variant }) => {
  return (
    <div className='col-span-full text-center'>
      <Button
        type={!onClick ? 'submit' : 'button'}
        variant={variant ?? 'primary'}
        icon={icon ?? 'check'}
        onClick={onClick}
        className='mx-auto'
      >
        {children ?? 'Submit'}
      </Button>
    </div>
  )
}