export const handleColor = color => {
  let styles = {}

  switch (color) {
    case 'batman': {
      styles = {
        bg: 'bg-black',
        text: 'text-yellow-500'
      }
      break
    }
    case 'blue':
      styles = {
        bg: 'bg-blue-50',
        text: 'text-blue-500'
      }
      break
    case 'green':
      styles = {
        bg: 'bg-green-50',
        text: 'text-green-500'
      }
      break
    case 'indigo':
      styles = {
        bg: 'bg-indigo-50',
        text: 'text-indigo-500'
      }
      break
    case 'orange':
      styles = {
        bg: 'bg-orange-50',
        text: 'text-orange-500'
      }
      break
    case 'purple':
      styles = {
        bg: 'bg-purple-50',
        text: 'text-purple-500'
      }
      break
    case 'red':
      styles = {
        bg: 'bg-red-50',
        text: 'text-red-500'
      }
      break
    case 'vapta-red':
      styles = {
        bg: 'bg-vapta-red bg-opacity-10',
        text: 'text-vapta-red'
      }
      break
    default:
      styles = {
        bg: 'bg-gray-100',
        text: 'text-gray-600'
      }
  }

  return styles
}

export const setLocalItem = (key, type, content) => {
  localStorage.setItem(key, JSON.stringify({ type, content }))
}

export const removeLocalItem = key => {
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key)
  }
}

export * from '../helpers'
