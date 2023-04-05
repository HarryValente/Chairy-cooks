// Components
import RecipeCard from "../components/RecipeCard";
import FeaturedRecipe from "../components/FeaturedRecipe";
// import Advert from "../components/Advert";
import MainIngrdientsTile from "../components/MainIngredientsTile";
// import SEO from "../components/SEO";
import Grid from "../components/Grid";
// import { getFirebaseDocs } from "../firebase/index";
// import { useEffect, useState } from "react";
import { createClient } from 'contentful'
import safeJsonStringify from 'safe-json-stringify'

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  })

  let res = await client.getEntries({ content_type: 'pageLanding' })
  const stringifiedData = safeJsonStringify(res)
  const data = JSON.parse(stringifiedData)

  // that revalidate will need to be higher that means every 10 seconds if a new user goes on it'll do an api call to see if any data has changed
  return {
    props: {
      homepage: data.items,
      revalidate: 10
    }
  }
}

export default function Recipes({ homepage }) {
  const info = homepage[0].fields
  const { seoFields, featuredBlogPost, featuredRecipes, latestRecipes } = info

  return (
    <>
      <div className="featuredContainer">
        {featuredRecipes.map(recipe => (
          <FeaturedRecipe recipe={recipe}/>
        ))}
      </div>

      <div className="homepageRecipes">
        {latestRecipes.map(recipe => (
          <RecipeCard recipe={recipe}/>
        ))}
      </div>

      {/* <Advert/> */}
      <div className="tempSpace"></div>

      <Grid columns={3} className='col-span-full'>
        <MainIngrdientsTile ingredientName="Rice" image="/rice.png"/>
        <MainIngrdientsTile ingredientName="Pasta" image="/spaguetti.png"/>
        <MainIngrdientsTile ingredientName="Potato" image="/potato.png"/>
        <MainIngrdientsTile ingredientName="Chicken" image="/chicken-leg.png" />
        <MainIngrdientsTile ingredientName="Beef" image="/beef.png"/>
        <MainIngrdientsTile ingredientName="Seafood" image="/fish.png"/>
        <MainIngrdientsTile ingredientName="Lamb" image="/lamb.png"/>
        <MainIngrdientsTile ingredientName="Egg" image="/fried-egg.png"/>
        <MainIngrdientsTile ingredientName="Pork" image="/ham.png"/>
        <MainIngrdientsTile ingredientName="Cheese" image="/cheese.png"/>
        <MainIngrdientsTile ingredientName="Vegetarian" image="/coca-leaves.png"/>
        <MainIngrdientsTile ingredientName="Dessert" image="/cupcake.png"/>
      </Grid>

      <div className="tempSpace"></div>
      {/* <Advert/> */}
    </>
  )
}