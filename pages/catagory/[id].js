// Hooks
import { useEffect, useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'

// Next
import { useRouter } from 'next/router'

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
        {/* {catagoryFood && (
          catagoryFood.map(food => {
            {JSON.stringify(food)}
            <h1>{food.recipe_information.details.name}</h1>
          })
        )} */}
      </div>
    </>
  )
}
