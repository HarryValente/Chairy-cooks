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
            <div className="feature border border-gray-100 hover:border-gray-200 rounded">
              <Image
                src='/ad-placeholder.png'
                // layout='fill'
                width={100}
                height={100}
              />
              
              <div className="feature-text">
              <div> 
                <h1>{rec.name}</h1>
                <p>Comfort, Wintery</p>
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
            width: 350px;
            height: 300px;
            overflow-y: hidden;
            transition: 0.3s;
          }
          .feature:hover{
            background-color: #3e8e41;
            color: white;
            margin-bottom: 35px;
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