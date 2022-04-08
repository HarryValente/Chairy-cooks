// React
import { useEffect, useState } from 'react'

// Components
import Button from '../components/Button'
import Label from '../components/Label'

// Modules
import { motion } from 'framer-motion'
// import { v4 as uuid } from 'uuid'

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

const FormError = ({ error }) => {
  return (
    <motion.div
      // key={uuid()}
      className='bg-red-100 bg-opacity-90 font-medium mb-4 p-2 rounded text-red-600 text-sm'
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
    >
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
  tooltip,
  type,
  value
}) => {
  if (icon) {
    icon = 'fa-' + icon
  }

  return (
    <div>
      <Label text={label} tooltip={tooltip} required={required} />
      <span className='relative'>
        {icon && (
          <span className='absolute bg-red-100 flex h-5 items-center justify-center left-1.5 rounded text-red-500 top-1/2 transform -translate-y-1/2 w-5'>
            <i className={`fa-regular ${icon} fa-xs`} />
          </span>
        )}
        <input
          autoFocus={autoFocus}
          disabled={disabled}
          inputMode={inputMode}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          type={type ?? 'text'}
          value={value ?? ''}
          className={`${className ?? ''} ${
            icon ? 'pl-8 pr-2 py-1' : 'px-2 py-1'
          }`}
          required={required}
        />
      </span>
    </div>
  )
}

export const FormSelect = ({
  className,
  disabled,
  icon,
  label,
  onChange,
  options: data,
  tooltip,
  value
}) => {
  const [options, set] = useState([])

  useEffect(() => {
    if (data) set(data)
  }, [data])

  return (
    <div>
      <Label text={label} tooltip={tooltip} />
      <span className='relative'>
        {icon && (
          <span className='absolute bg-red-100 flex h-5 items-center justify-center left-1.5 rounded text-red-500 top-1/2 transform -translate-y-1/2 w-5'>
            <i className={`fa-regular ${icon} fa-xs`} />
          </span>
        )}
        <select
          value={value ?? ''}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          className={`${className ?? ''} ${
            icon ? 'pl-8 pr-2 py-1' : 'px-2 py-1'
          }`}
        >
          <option value='' hidden>
            Please select an option
          </option>
          {options &&
            options.map(option => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
        </select>
      </span>
    </div>
  )
}

export const FormSubmit = ({ children, disabled, onClick }) => {
  return (
    <div className='col-span-full text-center'>
      <Button
        // key={uuid()}
        type={!onClick ? 'submit' : 'button'}
        variant='primary'
        icon='check'
        onClick={onClick}
        className='mx-auto'
        disabled={disabled}
      >
        {children ?? 'Submit'}
      </Button>
    </div>
  )
}
