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
import SEO from '../../components/SEO'

export default () => {
  const router = useRouter()
  const [catagoryName, setCatagoryName] = useState()
  const [_user] = useLocalStorage('_user')

  const [catagoryFood, setCatagoryFood] = useState()
  const [featured, setFeatured] = useState()
  
  useEffect( async () => {
    
    if (router.query.id) {
      setCatagoryName(router.query.id)

      const catagorisedRecipes = await getFirebaseDocs(`/recipes/categories/${router.query.id.toLowerCase() + '_recipes'}`, where('category_page', "==", true))
      const catagorisedFeatureRecipes = await getFirebaseDocs(`/recipes/categories/${router.query.id.toLowerCase() + '_recipes'}`, where('category_feature', "==", true))
      console.log(catagorisedRecipes)
      console.log('catagorisedRecipes')
      catagorisedRecipes ? setCatagoryFood(catagorisedRecipes) : null
      catagorisedFeatureRecipes ? setFeatured(catagorisedFeatureRecipes) : null
    }
  }, [router])
console.log(catagoryFood)
console.log('catagoryFood')
  return (
    <>
      <SEO title={`Chairy cooks - ${catagoryName}`} description={`${catagoryName} chicken`}/>
        <div className='categoryContainer'>
          <h1 className='catagoryTitle'>{catagoryName} Recipes</h1>
          {featured && (
            <Link key={featured[0].id} href={`/recipes/${featured[0].id}`}>
              <div className='categoryMainRecipe'>
                <div className='categoryMainRecipeImage'>
                  <Image
                    src={featured[0].main_image.url}
                    placeholder='blue'
                    layout="fill"
                  />
                </div>
                <div className='categoryMainRecipeText'>
                  <h1>{featured[0].name}</h1>
                  <h3>{featured[0].desc}</h3>
                  <p>{featured[0].tags.join(', ')}</p>
                </div>
              </div>
            </Link>
          )}

          <div className='categoryRecipesHead'>
            <h1>Searched Recipes</h1>
            <div className='line'></div>
          </div>

          <div className='categoryGridRecipes'>
            {catagoryFood &&
              catagoryFood.map(food => (
                <Link key={food.id} href={`/recipes/${food.id}`}>
                  <div className="categoryRecipe">
                    <div className='categoryRecipeImage'>
                      <Image
                        src={food.main_image.url}
                        placeholder='blue'
                        layout="fill"
                      />
                    </div>
                    
                    <div className="categoryRecipeText">
                      <h1>{food.name}</h1>
                      <h5>{food.author[0]}</h5>
                      <div className='line'></div>
                      <p>{food.time}mins, {food.difficulty} difficulty</p>
                      <div className='line'></div>
                      <p>{food.tags.join(', ')}</p>
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
