// Hooks
import { useEffect, useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'

// Next
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

// Firebase
import { getFirebaseDocs } from '../../firebase/index'
import { where } from 'firebase/firestore'

// Components
import Grid from '../../components/Grid'
import SEO from '../../components/SEO'
import Widget from '../../components/Widget'


export default () => {
  const router = useRouter()
  const [catagoryName, setCatagoryName] = useState()
  const [_user] = useLocalStorage('_user')

  const [catagoryFood, setCatagoryFood] = useState()
  const [featured, setFeatured] = useState()
  
  useEffect( async () => {
    setCatagoryName(router.query.id)

    if (router.query.id) {
      const catagorisedRecipes = await getFirebaseDocs(`/recipe_templates`, where('category', '==', router.query.id))

      if (catagorisedRecipes) {
        setCatagoryFood(catagorisedRecipes)
        setFeatured(catagorisedRecipes.filter(rec => rec.category_feature == true))
      }
    }
  }, [router])

console.log(featured)
console.log('featured')
console.log(catagoryFood)
console.log('catagoryFood')

  return (
    <>
      <SEO title={`Chairy cooks - ${catagoryName}`} description={`${catagoryName} chicken`}/>
        <h1 className='catagoryTitleContainer'>{catagoryName} Recipes</h1>

        <div className='categoryContainer'>
          {featured && (
            <Link key={featured[0].id} href={`/recipes/${featured[0].id}`}>
              <div className='categoryMainRecipe'>
                <div className='categoryMainRecipeImage'>
                  <Image
                    src={featured[0].main_image.url}
                    // width={275}
                    // height={275}
                    placeholder='blue'
                    layout="fill"
                  />
                </div>
                <div className='categoryMainRecipeText'>
                  <h1>{featured[0].recipe_information.details.name}</h1>
                  <h3>{featured[0].recipe_information.details.desc}</h3>
                  <p>{featured[0].recipe_information.tags.join(', ')}</p>
                </div>
              </div>
            </Link>
          )}

          <div className='categoryGridRecipes'>
            {catagoryFood &&
              catagoryFood.map(food => (
                <Link key={food.id} href={`/recipes/${food.id}`}>
                  <div className="categoryRecipe">
                    <div className='categoryRecipeImage'>
                      <Image
                        src={food.main_image.url}
                        // width={275}
                        // height={275}
                        placeholder='blue'
                        layout="fill"
                      />
                    </div>
                    
                    <div className="categoryRecipeText">
                      <h1>{food.recipe_information.details.name}</h1>
                      <h5>{food.recipe_information.author[0]}</h5>
                      <div className='line'></div>
                      <p>{food.recipe_information.details.time}mins, {food.recipe_information.details.difficulty} difficulty</p>
                      <div className='line'></div>
                      <p>{food.recipe_information.tags.join(', ')}</p>
                    </div>
                  </div>
                </Link>
              ))
            }
            {catagoryFood &&
              catagoryFood.map(food => (
                <Link key={food.id} href={`/recipes/${food.id}`}>
                  <div className="categoryRecipe">
                    <div className='categoryRecipeImage'>
                      <Image
                        src={food.main_image.url}
                        // width={275}
                        // height={275}
                        placeholder='blue'
                        layout="fill"
                      />
                    </div>
                    
                    <div className="categoryRecipeText">
                      <h1>{food.recipe_information.details.name}</h1>
                      <h5>{food.recipe_information.author[0]}</h5>
                      <div className='line'></div>
                      <p>{food.recipe_information.details.time}mins, {food.recipe_information.details.difficulty} difficulty</p>
                      <div className='line'></div>
                      <p>{food.recipe_information.tags.join(', ')}</p>
                    </div>
                  </div>
                </Link>
              ))
            }
            {catagoryFood &&
              catagoryFood.map(food => (
                <Link key={food.id} href={`/recipes/${food.id}`}>
                  <div className="categoryRecipe">
                    <div className='categoryRecipeImage'>
                      <Image
                        src={food.main_image.url}
                        // width={275}
                        // height={275}
                        placeholder='blue'
                        layout="fill"
                      />
                    </div>
                    
                    <div className="categoryRecipeText">
                      <h1>{food.recipe_information.details.name}</h1>
                      <h5>{food.recipe_information.author[0]}</h5>
                      <div className='line'></div>
                      <p>{food.recipe_information.details.time}mins, {food.recipe_information.details.difficulty} difficulty</p>
                      <div className='line'></div>
                      <p>{food.recipe_information.tags.join(', ')}</p>
                    </div>
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
     
     
    </>
  )
}
