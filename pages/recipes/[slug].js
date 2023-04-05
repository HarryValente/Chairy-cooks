// Hooks
// import { useEffect, useState } from 'react'
// import useFirebase from '../../hooks/useFirebase'
// import useLocalStorage from '../../hooks/useLocalStorage'

// Next
// import { useRouter } from 'next/router'

import Skeleton from '../../components/Skeleton'
import Image from 'next/image'
// import Link from 'next/link'
import { createClient } from 'contentful'
import safeJsonStringify from 'safe-json-stringify'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

// Firebase
// import { getFirebaseDoc } from '../../firebase/index'

// Components
// import SEO from '../../components/SEO'
import SimilarRecipe from '../../components/SimilarRecipe'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'pageBlogPost'
  })

  const paths = res.items.map(item => {
    return {
      params: { slug: item.fields.slug }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: 'pageBlogPost',
    'fields.slug': params.slug
  })

  const stringifiedData = safeJsonStringify(items)
  const data = JSON.parse(stringifiedData)

  if (!data.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  // that revalidate will need to be higher that means every 10 seconds if a new user goes on it'll do an api call to see if any data has changed
  return {
    props: { recipe: data[0] },
    revalidate: 10
  }
}

export default ({recipe}) => {
  if (!recipe) return <Skeleton />

    const {
    intenalName,
    seoFields,
    slug,
    author,
    difficulty,
    time,
    publishedDate,
    title,
    shortDescription,
    featuredImage,
    content,
    ingredients,
    relatedBlogPosts
  } = recipe.fields

  return (
    <>
      {recipe && (
        <>
          <div className='recipeHeadlineContainer'>
            <div className='recipePageImageContainer'>
              {/* {recipe.main_image && (
                <img src={recipe.main_image.url} alt={recipe.main_image.name}></img>
              )} */}
                <Image 
                  alt={featuredImage.fields.description}
                  src={'https:' + featuredImage.fields.file.url}
                  width={650}
                  height={650}
                />
              <h2>{ title }</h2>
            </div>
            <div className="recipeInfo">
              <div className="recipeDescription">
                <p>{shortDescription}</p>
              </div>
              <div className="recipeCookingInfo">
                <p>Takes approx { time.join(', ') } mins to cook and prep.</p>
                <p>{difficulty}</p>
                <div>
                  {/* <p>{recipe.tags.join(', ')}</p> */}
                </div>
              </div>
            </div>
          </div>

          <div className="recipeLineBreak"></div>

          <div className="recipeInformationContainer">
            <div className="recipeInformationIngredients">
              <ul>
                {documentToReactComponents(ingredients)}
              </ul>
            </div>
            <div className="recipeMethodContainer">
              <h3>Method:</h3>
              <ul>
                {documentToReactComponents(content)}
              </ul>
            </div>
          </div>

          <h1 className="recipeSimilarTitle">Similar recipes</h1>
          <div className="recipeSimilarRecipeContainer">
            {relatedBlogPosts &&
             relatedBlogPosts.map(simRecipes => {
               return (      
                 <SimilarRecipe simRecipes={simRecipes} /> 
               )
             })
            }
          </div> 
        </>
      )}
    </>
  )
}
