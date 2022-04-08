export default ({ text, tooltip }) => {
  return (
    <label className='flex items-center'>
      {text}
      {
        tooltip && 
        <span className='flex group items-center ml-2'>
          <i className='fa-regular fa-info-circle cursor-pointer mr-2' />
          <span className='bg-gray-100 opacity-0 group-hover:opacity-100 px-2 rounded text-xs'>
            {tooltip}
          </span>
        </span>
      }
    </label>
  )
}