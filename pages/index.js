// React
import { useState } from "react/cjs/react.development";

// Contentful
import { createClient } from "contentful"

// Components
import RecipeCard from "../components/RecipeCard";
import Image from "next/image";
import FeaturedRecipe from "../components/FeaturedRecipe";
import Advert from "../components/Advert";
import MainIngrdientsTile from "../components/MainIngredientsTile";
import Grid from "../components/Grid";

export async function getStaticProps() {
  // Link to contentful with API-Key / process.env is in the .env.local file for github concerns
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  // Gets items from contentful space
  const res = await client.getEntries({content_type: 'recipe'})
  return {
    props: { recipes: res.items },
    revalidate: 1
  }
}

// const [recipeHead, setRecipeHead] = useState

export default function Recipes({recipes}) {
  return (
    <>
      {/* <div className="featured-container"> */}
        <Grid columns={3} className='col-span-full'>
          <FeaturedRecipe />
          <FeaturedRecipe />
          <FeaturedRecipe />
        </Grid>
      {/* </div> */}

      {/* <div className="recipe-list"> */}
      <Grid columns={2} className='mt-5 col-span-full'>
        {recipes.map(recipe => (
          <RecipeCard key={recipe.sys.id} recipe={recipe}/>
        ))}
      </Grid>
      {/* </div> */}

      <Advert/>

      {/* <div className="main-ingredients"> */}
      <Grid columns={3} className='col-span-full'>
        <MainIngrdientsTile ingredientName="Chicken" image="/ad-placeholder.png"/>
        <MainIngrdientsTile ingredientName="Beef" image="/ad-placeholder.png"/>
        <MainIngrdientsTile ingredientName="Egg" image="/ad-placeholder.png"/>
        <MainIngrdientsTile ingredientName="Cheese" image="/ad-placeholder.png"/>
        <MainIngrdientsTile ingredientName="Lamb" image="/ad-placeholder.png"/>
        <MainIngrdientsTile ingredientName="Pasta" image="/ad-placeholder.png"/>
        <MainIngrdientsTile ingredientName="Dessert" image="/ad-placeholder.png"/>
        <MainIngrdientsTile ingredientName="Vegetarian" image="/ad-placeholder.png"/>
        <MainIngrdientsTile ingredientName="Vegan" image="/ad-placeholder.png"/>
        <MainIngrdientsTile ingredientName="Fish" image="/ad-placeholder.png"/>
        <MainIngrdientsTile ingredientName="Sausage" image="/ad-placeholder.png"/>
        <MainIngrdientsTile ingredientName="Pork" image="/ad-placeholder.png"/>
      </Grid>
      {/* </div> */}

      <Advert/>

      {/* <style jsx>{`
        .featured-container {
          position: relative;
          max-width: 1200px;
          height: 300px;
          margin: auto;
          margin-top: 50px;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .feature{
          width: 350px;
          height: 300px;
          overflow-y: hidden;
        }
        .img-here{
          width: 350px;
          height: 230px;
          background-color: #f00
        }
        .feature-text p{
          color: #f14400;
          font-size: 14px;
        }
        .feature-text h1{
          font-size: 16px;
        }
        .recipe-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 40px;
          width: 1210px;
          padding:10px;
          margin: 60px auto;
        }
        .main-ingredients{
          display: grid; 
          grid-template-columns: 1fr 1fr 1fr; 
          grid-template-rows: 0.7fr 0.7fr 0.7fr 0.7fr 0.7fr; 

          width: 1050px;
          margin: auto;
        }
      `}
      </style> */}

    </>
  )
}