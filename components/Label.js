export default ({ text, tooltip, required }) => {
  return (
    <label className='flex items-center'>
      {text}
      {required && <span className='mx-1 text-red-500'>*</span>}
      {tooltip && (
        <span className='flex group items-center ml-2'>
          <span className='bg-gray-100 hidden group-hover:inline px-2 rounded text-xs'>
            {tooltip}
          </span>
        </span>
      )}
    </label>
  )
}