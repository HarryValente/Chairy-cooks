// Contentful
import { createClient } from "contentful"

// Components
import RecipeCard from "../components/RecipeCard";
import FeaturedRecipe from "../components/FeaturedRecipe";
import Advert from "../components/Advert";
import MainIngrdientsTile from "../components/MainIngredientsTile";
import SEO from "../components/SEO";
import Grid from "../components/Grid";

import { getFirebaseDocs } from "../firebase";

// Hooks
import useFirebase from '../hooks/useFirebase';

// Fontawesome
import { useEffect, useState } from "react";

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
  const [recipe] = useFirebase([], '/recipe_templates/')
  const [featuredRecipes, setFeaturedRecipes] = useState()
  
  useEffect( async () => {
    setFeaturedRecipes(
      await getFirebaseDocs('/recipe_templates/')
    )

  }, [])

  return (
    <>
      <SEO title={'Chairy cooks - Homepage'} description={'Welcome to the homepage for Chairy cooks home of cheap tasty homemade meals from all around the world!'}/>

      <div className="featuredContainer">
        <FeaturedRecipe recipes={featuredRecipes}/>
      </div>

      <div className="homepageRecipes">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.sys.id} recipe={recipe}/>
        ))}
      </div>

      <Advert/>

      <Grid columns={3} className='col-span-full'>
        <MainIngrdientsTile ingredientName="Chicken" image="/chicken-leg.png" />
        <MainIngrdientsTile ingredientName="Beef" image="/beef.png"/>
        <MainIngrdientsTile ingredientName="Egg" image="/fried-egg.png"/>
        <MainIngrdientsTile ingredientName="Cheese" image="/cheese.png"/>
        <MainIngrdientsTile ingredientName="Lamb" image="/lamb.png"/>
        <MainIngrdientsTile ingredientName="Pasta" image="/spaguetti.png"/>
        <MainIngrdientsTile ingredientName="Dessert" image="/cupcake.png"/>
        <MainIngrdientsTile ingredientName="Vegetarian" image="/coca-leaves.png"/>
        <MainIngrdientsTile ingredientName="Vegan" image="/vegan.png"/>
        <MainIngrdientsTile ingredientName="Fish" image="/fish.png"/>
        <MainIngrdientsTile ingredientName="Sausage" image="/sausages.png"/>
        <MainIngrdientsTile ingredientName="Pork" image="/ham.png"/>
      </Grid>

      <Advert/>

    </>
  )
}