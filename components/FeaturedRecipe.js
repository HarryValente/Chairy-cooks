// React
import { useState, useEffect } from 'react'

// Firebase
import { updateFirebaseDoc } from '../firebase'

// Hooks
import useLocalStorage from '../hooks/useLocalStorage'
// Next
import Link from 'next/link'
import Image from 'next/image'

// Components
import Button from './Button'

export default ({recipes: data}) => {
  const [recipe, set] = useState()
  const [_user] = useLocalStorage('_user')
  
  const saveRecipeToSavedRecipes = async (rec) => {
    if (rec.id) {
      console.log('only one thing gets added push things onto firebase array!!!!')
      console.log(rec)
      await updateFirebaseDoc('users', `${_user}`, { saved_recipes: [rec.id] })
    }
  }

  useEffect(() => {
    if (data) {
      set(data)
    }
  }, [data])

  return (
    <>
      {recipe &&
        recipe.map(rec => (
          <Link key={rec.id} href={`/recipes/${rec.id}`}>
            <div className="feature">

              <div className='featureImage'>
                <Image
                  src={rec.main_image.url}
                  // width={275}
                  // height={275}
                  placeholder='blue'
                  layout="fill"
                />
              </div>
              
              <div className="feature-text">
                <h2>{rec.recipe_information.details.name}</h2>
              </div>
            </div>
          </Link>
        ))
      }
   </>
  )
}