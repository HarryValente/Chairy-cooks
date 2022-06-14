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
              <div> 
                <h1>{rec.recipe_information.details.name}</h1>
                <p>{rec.recipe_information.tags.join(', ')}</p>
              </div>
              <Button className={'absolute bottom-0 left-0'} onClick={card => saveRecipeToSavedRecipes(rec)}>
                +
              </Button>
              </div>
            </div>
          </Link>
        ))
      }
      <style jsx>{`
          .feature{
            margin: auto;
            width: 275px;
            height: 350px;
            overflow-y: hidden;
            transition: 0.3s;
            padding: 20px;
            border-radius: 10px;
            background-color: #fecbc4;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
            cursor: pointer;
          }
          .featureImage{
            width: 100%;
            height: 60%;
            position: relative;
            border-radius: 5px;
          }
          .img-here{
            width: 350px;
            height: 230px;
            background-color: #f00
          }
          .feature-text{
            display:flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px;
          }
          .feature-text p{
            color: #f14400;
            font-size: 14px;
          }
          .feature-text h1{
            font-size: 16px;
          }
        `}
      </style>
   </>
  )
}