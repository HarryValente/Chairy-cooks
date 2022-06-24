// Components
import RecipeCard from "../components/RecipeCard";
import FeaturedRecipe from "../components/FeaturedRecipe";
import Advert from "../components/Advert";
import MainIngrdientsTile from "../components/MainIngredientsTile";
import SEO from "../components/SEO";
import Grid from "../components/Grid";
import { getFirebaseDocs } from "../firebase";
import { useEffect, useState } from "react";

export default function Recipes() {
  const [featured, setFeatured] = useState()
  const [recipeHomepage, setRecipeHomepage] = useState()
  
  useEffect( async () => {
    const featuredRecipes = await getFirebaseDocs(`/recipe_templates`)

    if (featuredRecipes) {
      const featured = featuredRecipes.filter(feat => feat.homepage_feature === true)
      const recipeHomepage = featuredRecipes.filter(feat => feat.homepage_page === true)
      setFeatured(featured)
      setRecipeHomepage(recipeHomepage)
    }
  }, [])

  return (
    <>
      <SEO title={'Chairy cooks - Homepage'} description={'Welcome to the homepage for Chairy cooks home of cheap tasty homemade meals from all around the world!'}/>

      <div className="featuredContainer">
        <FeaturedRecipe recipes={featured}/>
      </div>

      <div className="homepageRecipes">
        <RecipeCard recipe={recipeHomepage}/>
        <RecipeCard recipe={recipeHomepage}/>
      </div>

      <Advert/>

      <Grid columns={3} className='col-span-full'>
        <MainIngrdientsTile ingredientName="Rice" image="/vegan.png"/>
        <MainIngrdientsTile ingredientName="Pasta" image="/spaguetti.png"/>
        <MainIngrdientsTile ingredientName="Potato" image="/sausages.png"/>
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

      <Advert/>

    </>
  )
}