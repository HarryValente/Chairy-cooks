// Hooks
import { useEffect, useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'

// Next
import { useRouter } from 'next/router'
import Link from 'next/link'

// Firebase
import { getFirebaseDocs } from '../../firebase/index'
import { where } from 'firebase/firestore'

// Components
import Grid from '../../components/Grid'
import SEO from '../../components/SEO'
import {Widget} from '../../components/Widget'


export default () => {
  const router = useRouter()
  const [catagoryName, setCatagoryName] = useState()
  const [_user] = useLocalStorage('_user')

  const [catagoryFood, setCatagoryFood] = useState()
  
  useEffect( async () => {
    setCatagoryName(router.query.id)

    // THIS WORKS WEIRD FB BUG REDUCES TIME AS NO NEED TO FILTER
    // const test = await getFirebaseDocs(`/recipe_templates`, where('category', '==', router.query.id))

    let catagorisedRecipes = await getFirebaseDocs('/recipe_templates/')
    catagorisedRecipes = catagorisedRecipes.filter(recipe => recipe.recipe_information.details.category == router.query.id)
    
    if (catagorisedRecipes) {
      setCatagoryFood(catagorisedRecipes)
    }
  }, [router])

  console.log(catagoryFood)
  console.log('catagoryFood')

  return (
    <>
      <SEO title={`Chairy cooks - ${catagoryName}`} description={`${catagoryName} chicken`}/>
      <div className='catagoryTitleContainer'>
        <h1>{catagoryName} Recipes</h1>

        {catagoryFood &&
          catagoryFood.map(food => (
            <Link key={food.id} href={`/recipes/${food.id}`}>
              <p>{food.recipe_information.details.name}</p>
            </Link>
          ))
        }

      </div>
    </>
  )
}
