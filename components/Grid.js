let columns = {
  default: 'grid-cols-1',
  sm: 'sm:grid-cols-2 gap-4',
  md: 'md:grid-cols-3',
  lg: 'lg:grid-cols-4'
}

export default ({
  children,
  className: classes,
  columns: cols,
  gap,
  onClick
}) => {
  switch (cols) {
    case 1:
      columns = {
        default: 'grid-cols-1 gap-4'
      }
      break
    case 2:
      columns = {
        default: 'grid-cols-2',
        sm: 'sm:grid-cols-1 gap-4',
        md: 'md:grid-cols-2'
      }
      break
    case 3:
      columns = {
        default: 'grid-cols-2',
        sm: 'sm:grid-cols-1 gap-2',
        md: 'md:grid-cols-2',
        lg: 'lg:grid-cols-3'
      }
      break
    case 4:
      columns = {
        default: 'grid-cols-2',
        sm: 'sm:grid-cols-1 gap-4',
        md: 'md:grid-cols-2',
        lg: 'lg:grid-cols-4'
      }
      break
    case 5:
      columns = {
        default: 'grid-cols-2',
        sm: 'sm:grid-cols-1 gap-4',
        md: 'md:grid-cols-4',
        lg: 'lg:grid-cols-5'
      }
      break
    case 6:
      columns = {
        default: 'grid-cols-2',
        sm: 'sm:grid-cols-1 gap-2',
        md: 'md:grid-cols-4',
        lg: 'lg:grid-cols-6'
      }
      break
    case 7:
      columns = {
        default: 'grid-cols-2',
        sm: 'sm:grid-cols-1 gap-4',
        md: 'md:grid-cols-4',
        lg: 'lg:grid-cols-7'
      }
      break
    case 8:
      columns = {
        default: 'grid-cols-2',
        sm: 'sm:grid-cols-1 gap-4',
        md: 'md:grid-cols-4',
        lg: 'lg:grid-cols-8'
      }
      break
    default:
      columns = {
        default: 'grid-cols-1',
        sm: 'sm:grid-cols-2 gap-4',
        md: 'md:grid-cols-3',
        lg: 'lg:grid-cols-4'
      }
  }

  switch (gap) {
    case 1:
      classes += ' gap-1'
      break
    case 2:
      classes += ' gap-2'
      break
    case 3:
      classes += ' gap-3'
      break
    case 4:
      classes += ' gap-4'
      break
    default:
      classes += ' gap-4'
  }

  return (
    <div
      className={`${classes} grid ${columns.default} ${columns.sm} ${columns.md} ${columns.lg}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}