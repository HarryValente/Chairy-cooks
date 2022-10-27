// React
import { useState, useEffect } from 'react'

// Firebase
import { updateFirebaseDoc } from '../firebase'

// Hooks
import useLocalStorage from '../hooks/useLocalStorage'
// Next
import Link from 'next/link'
import Image from 'next/image'

export default ({recipes: data}) => {
  const [recipe, set] = useState()
  const [_user] = useLocalStorage('_user')
  
  useEffect(() => {
    if (data) {
      set(data)
    }
  }, [data])
  console.log(recipe)
  console.log('recipe')
  return (
    <>
      {recipe &&
        recipe.map(rec => (
          <Link key={rec.id} href={`/recipes/${rec.id}`}>
            <div className="feature">

              <div className='featureImage'>
                {/* <Image
                  src={rec.main_image.url}
                  placeholder='blue'
                  layout="fill"
                /> */}
                <img src={rec.main_image.url} alt={rec.main_image.name}></img>
              </div>
              
              <div className="feature-text">
                <h2>{rec.name}</h2>
              </div>
            </div>
          </Link>
        ))
      }
   </>
  )
}