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
  <ProtectedRoute>
      <>
        {recipe && (
          <>
            <SEO title={recipe.recipe_information.details.name} description={recipe.recipe_information.details.desc}/>
            <Grid columns={2}>
              <div className='image-container'>
                {recipe.main_image && (
                  <Image 
                  alt={recipe.main_image.name}
                  // src='/ad-placeholder.png'
                  src={recipe.main_image.url}
                  width={650}
                  height={650}
                  />
                )}
                <h2>{ recipe.recipe_information.details.name }</h2>
              </div>
              <div className="info">
                <div className="description">
                  <p>{recipe.recipe_information.details.desc}</p>
                </div>
                <div className="cooking-info">
                  <p>Takes approx 20 mins to cook.</p>
                  <p>{ recipe.recipe_information.details ? recipe.recipe_information.details.difficulty : '' }</p>
                  <div className='flex justify-center'>
                    <p>{recipe.recipe_information.tags.join(', ')}</p>
                  </div>
                </div>
              </div>
            </Grid>

            <div className="line-break"></div>

            <div className="flex items-start justify-around w-full ">
              <div className="w-4/12 h-1/2 p-5 ">
                <h3 className="mb-8">Ingredients:</h3>
                <ul>
                  {recipe.recipe_information.ingredients && recipe.recipe_information.ingredients.length > 0 && 
                    recipe.recipe_information.ingredients.map((ingredient, index) => {
                      return (
                        <li className={'flex flex-col m-1 h-8 items-left justify-left relative w-full'} key={index}>
                          <p>○ {ingredient}</p>
                        </li>
                      )
                    })}
                </ul>
              </div>

              <div className="ad">
                  ADVERT
              </div>

              <div className="method-container">
                <h3 className='mb-8'>Method:</h3>
                <ul>
                  {recipe.recipe_information.steps &&
                    recipe.recipe_information.steps.map((step, index) => {
                      return (
                        <li className={'flex flex-col items-center justify-center relative w-full'} key={index}>
                          <h1>{step.name}</h1>
                          <p>{step.instruction}</p>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
            {console.log(recipe)}
            {console.log('recipe')}
            <h1 className="similar-title">Similar recipes</h1>
            <div className="similar-recipe-container">
              {recipe.recipe_information.similar_recipe &&
                recipe.recipe_information.similar_recipe.map(id => {
                  const similarRecipe = templates.find(item => item.id == id)
                  console.log(similarRecipe)
                  console.log('similarRecipe')
                  if (similarRecipe) {
                    return (
                      <Link key={similarRecipe.id} href={`/recipes/${similarRecipe.id}`}>         
                        <div key={id} className='similar-recipe'>
                            <Image 
                              src={similarRecipe.main_image.url}
                              width={150}
                              height={150}
                            />
                            <div className="similar-details">
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
                

              <style jsx>{`
                  h2,h3 {
                    text-transform: uppercase;
                  }
                  .image-container{
                    display: flex;
                    position: relative;
                  }
                  .image-container h2 {
                    margin: 0;
                    background: #fff;
                    display: inline-block;
                    padding: 20px;
                    position: absolute;
                    bottom: 0px;
                    left: -10px;
                    transform: rotateZ(-1deg);
                    box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
                  }
                  .rating{
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                  }
                  .rating-list{
                    list-style-type: none;
                  }
                  .line-break{
                    width: 100%;
                    height: 5px;
                    margin-top: 40px;
                    background-color: #000;
                  }
                  .info{
                    padding: 40px;
                    background-color: #efece2;
                    font-size: 20px;
                    display: flex;
                    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                    align-items: center;
                    justify-content: space-between;
                    flex-direction: column;
                  }
                  .info p {
                    margin: 0;
                  }
                  .description{
                    padding: 40px;
                    text-align: center;
                  }
                  .cooking-info{
                    height: 33%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                  }
                  .ad{
                    display: none;
                  }
                  .method-container{
                    width: 70%;
                    // font-size: 20px;
                  }
                  .method{
                    margin: 20px;
                  }
                  .similar-recipe-container{
                    margin-top: 40px;
                    width: 100%;
                    height: 320px;
                    display: grid; 
                    grid-template-columns: 1fr 1fr; 
                    grid-template-rows: 1fr 1fr; 
                    grid-gap: 1em;
                  }
                  .similar-title{
                    position: relative;
                    left: 5px;
                    top: 35px;
                    font-size: 18px;
                  }
                  .similar-recipe{
                    height: 100%;
                    background-color: beige;
                    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                    display: flex;
                  }
                  .similar-details{
                    padding: 5px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-around;
                  }
                  .similar-details h4{
                    font-size: 18px;
                  }
                  .similar-details p{
                    font-size: 16px;
                  }
                  @media (max-width:900px) {
                    .banner{
                      flex-direction: column;
                      align-items: center;
                      height: 750px;
                    }
                    .banner h2 {
                      margin-top: -10px;
                      position: relative;
                      transform: rotateZ(0deg);
                      left: 0px;
                    }
                    .info{
                      width: 75%;
                      margin-top: 10px;
                      margin-left: 0px;
                      font-size: 18px;
                      background-color: beige;
                    }
                    .ingredients{
                      font-size: 14px;
                    }
                    .method{
                      font-size: 18px;
                    }
                    .similar-recipe-container{
                      height: 350px;
                      display: grid; 
                      grid-template-columns: 1fr 1fr; 
                      grid-template-rows: 1fr 1fr; 
                      grid-gap: 1em;
                    }
                    .similar-recipe{
                      width: 100%;
                    }
                    .similar-details{
                      margin-left: 15px;
                    }
                    .similar-details h4{
                      font-size: 18px;
                    }
                    .similar-details p{
                      font-size: 18px;
                    }
                  }
                  @media (max-width:550px) {
                    .banner{
                      flex-direction: column;
                      align-items: center;
                      height: 550px;
                    }
                    .banner h2 {
                      font-size: 18px;
                    }
                    .info{
                      width: 90%;
                      background-color: beige;
                      font-size: 16px;
                    }
                    .cooking-content{
                      display: flex;
                      flex-direction: column;
                      align-items: flex-start;
                      justify-content: space-around;
                      width: 100%;
                    }
                    .ingredients{
                      width: 100%;
                    }
                    .ad{
                      position: relative;
                      background-color: grey;
                      margin: 40px auto;
                      display: inline;
                      height: 150px;
                      width: 90%;
                    }
                    .method{
                      width: 100%;
                    }
                    .similar-recipe-container{
                      height: 650px;
                      grid-template-columns: 1fr; 
                      grid-template-rows: 1fr 1fr 1fr 1fr; 
                    }
                  }
              `}</style>
          </>
        )}
      </>
    </ProtectedRoute>
  )
}
