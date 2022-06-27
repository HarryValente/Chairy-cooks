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
import SEO from '../../components/SEO'

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
            <SEO title={recipe.name} description={recipe.desc}/>
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
                <h2>{ recipe.name }</h2>
              </div>
              <div className="recipeInfo">
                <div className="recipeDescription">
                  <p>{recipe.desc}</p>
                </div>
                <div className="recipeCookingInfo">
                  <p>Takes approx 20 mins to cook.</p>
                  <p>{ recipe.details ? recipe.difficulty : '' }</p>
                  <div>
                    <p>{recipe.tags.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="recipeLineBreak"></div>

            <div className="recipeInformationContainer">
              <div className="recipeInformationIngredients">
                <h3>Ingredients:</h3>
                <ul>
                  {recipe.ingredients && recipe.ingredients.length > 0 && 
                    recipe.ingredients.map((ingredient, index) => {
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
                  {recipe.steps &&
                    recipe.steps.map((step, index) => {
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
              {recipe.similar_recipe &&
                recipe.similar_recipe.map(id => {
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
                              <h4>{similarRecipe.name}</h4>
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
