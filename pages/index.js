// React
import { useState } from "react/cjs/react.development";

// Contentful
import { createClient } from "contentful"

// Components
import RecipeCard from "../components/RecipeCard";
import Image from "next/image";
import FeaturedRecipe from "../components/FeaturedRecipe";

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
      <div className="featured-container">
        <FeaturedRecipe />
        <FeaturedRecipe />
        <FeaturedRecipe />
      </div>

      <div className="recipe-list">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.sys.id} recipe={recipe}/>
        ))}

      </div>

      <style jsx>{`
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
          grid-gap: 20px 60px;
          margin-top: 50px;
        }
      `}
      </style>
    </>
  )
}