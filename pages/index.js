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
        <MainIngrdientsTile ingredientName="Chicken" image="/ad-placeholder.png" test='1' />
        <MainIngrdientsTile ingredientName="Beef" image="/ad-placeholder.png" test='1'/>
        <MainIngrdientsTile ingredientName="Egg" image="/ad-placeholder.png" test='2'/>
        <MainIngrdientsTile ingredientName="Cheese" image="/ad-placeholder.png" test='2'/>
        <MainIngrdientsTile ingredientName="Lamb" image="/ad-placeholder.png" test='3'/>
        <MainIngrdientsTile ingredientName="Pasta" image="/ad-placeholder.png" test='3'/>
        <MainIngrdientsTile ingredientName="Dessert" image="/ad-placeholder.png" test='3'/>
        <MainIngrdientsTile ingredientName="Vegetarian" image="/ad-placeholder.png" test='4'/>
        <MainIngrdientsTile ingredientName="Vegan" image="/ad-placeholder.png" test='4'/>
        <MainIngrdientsTile ingredientName="Fish" image="/ad-placeholder.png" test='4'/>
        <MainIngrdientsTile ingredientName="Sausage" image="/ad-placeholder.png" test='4'/>
        <MainIngrdientsTile ingredientName="Pork" image="/ad-placeholder.png" test='4'/>
      </Grid>

      <Advert/>

    </>
  )
}