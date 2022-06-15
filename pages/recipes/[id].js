// Hooks
import { useEffect, useState } from 'react'
import useFirebase from '../../hooks/useFirebase'
import useLocalStorage from '../../hooks/useLocalStorage'

// Next
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

// Firebase
import { getFirebaseDoc } from '../../firebase/index'

// Components
import ProtectedRoute from '../../components/ProtectedRoute'
import Grid from '../../components/Grid'
import SEO from '../../components/SEO'


import { getStorage, ref, getDownloadURL } from "firebase/storage";
import RecipeBuilder from '../../components/RecipeBuilder'


export default ({}) => {
  const router = useRouter()

  const [_user] = useLocalStorage('_user')

  const [recipe, setRecipe] = useState()
  const [templates] = useFirebase([], '/recipe_templates/')

  useEffect(async () => {
    if (router.query.id) {
      const _report = await getFirebaseDoc('recipe_templates/', router.query.id)

      if (_report)
        setRecipe(_report)
    }
  }, [router, templates])

return (
      <>
        {recipe && (
          <>
            <SEO title={recipe.recipe_information.details.name} description={recipe.recipe_information.details.desc}/>
            <div className='recipeHeadlineContainer'>
              <div className='recipePageImageContainer'>
                {recipe.main_image && (
                  <Image 
                  alt={recipe.main_image.name}
                  src={recipe.main_image.url}
                  width={650}
                  height={650}
                  />
                )}
                <h2>{ recipe.recipe_information.details.name }</h2>
              </div>
              <div className="recipeInfo">
                <div className="recipeDescription">
                  <p>{recipe.recipe_information.details.desc}</p>
                </div>
                <div className="recipeCookingInfo">
                  <p>Takes approx 20 mins to cook.</p>
                  <p>{ recipe.recipe_information.details ? recipe.recipe_information.details.difficulty : '' }</p>
                  <div>
                    <p>{recipe.recipe_information.tags.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="recipeLineBreak"></div>

            <div className="recipeInformationContainer">
              <div className="recipeInformationIngredients">
                <h3>Ingredients:</h3>
                <ul>
                  {recipe.recipe_information.ingredients && recipe.recipe_information.ingredients.length > 0 && 
                    recipe.recipe_information.ingredients.map((ingredient, index) => {
                      return (
                        <li key={index}>
                          <p>○ {ingredient}</p>
                        </li>
                      )
                    })}
                </ul>
              </div>

              <div className="recipeMethodContainer">
                <h3>Method:</h3>
                <ul>
                  {recipe.recipe_information.steps &&
                    recipe.recipe_information.steps.map((step, index) => {
                      return (
                        <li key={index}>
                          <h1>{step.name}</h1>
                          <p>{step.instruction}</p>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
            <h1 className="recipeSimilarTitle">Similar recipes</h1>
            <div className="recipeSimilarRecipeContainer">
              {recipe.recipe_information.similar_recipe &&
                recipe.recipe_information.similar_recipe.map(id => {
                  const similarRecipe = templates.find(item => item.id == id)
                  if (similarRecipe) {
                    return (
                      <Link key={similarRecipe.id} href={`/recipes/${similarRecipe.id}`}>         
                        <div key={id} className='recipeSimilarRecipe'>
                            <Image 
                              src={similarRecipe.main_image.url}
                              width={150}
                              height={150}
                            />
                            <div className="recipeSimilarDetails">
                              <h4>{similarRecipe.recipe_information.details.name}</h4>
                            </div>
                        </div>
                      </Link>
                    )
                  } else {
                    return null
                  }
                })
              }
            </div>
          </>
        )}
      </>
  )
}
