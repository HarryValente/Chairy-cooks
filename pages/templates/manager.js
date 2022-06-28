// Components
import SEO from '../../components/SEO'
import Grid from '../../components/Grid'
import RecipeList from '../../components/RecipeList'
import RecipeCategoryList from '../../components/RecipeCategoryList'
import Widget from '../../components/Widget'
import useFirebase from '../../hooks/useFirebase'
import Image from 'next/image'
import { useEffect } from 'react'

export default () => {
  const [recipes, updateRecipe, removeRecipe] = useFirebase([], 'recipe_templates')

  return (
      <>
        <SEO title={'Chairy cooks - Homepage Manager'} description={'Homepage Manager section for Chairy cooks home of cheap tasty homemade meals from all around the world!'}/>
          <Widget title='Featured recipes homepage' className={'mt-4'}>
            <Grid columns={2}>
              <RecipeList quote={recipes.sort((a, b) => b['date'] - a['date'])}  />
              <RecipeList quote={recipes.filter(recipe => recipe.homepage_feature === true)} />
            </Grid>
          </Widget>
          <Widget title='Recipes homepage' className={'mt-4'}>
            <Grid columns={2}>
              <RecipeList quote={recipes.sort((a, b) => b['date'] - a['date'])} homepage={true}/>
              <RecipeList quote={recipes.filter(recipe => recipe.homepage_page === true)} homepage={true}/>
            </Grid>
          </Widget>
          <Widget title='Beef Category Page' className='mt-4'>
              <div>
                <Image 
                  src="/beef.png"
                  width={40} 
                  height={40} 
                />
              </div>
              <Widget title='Beef Feature'>
                <Grid columns={2}>
                  <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Beef'))} categoryType='Beef'/>
                  <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Beef') && recipe.beef_feature === true)} categoryType='Beef'/>
                </Grid>
              </Widget>
              <Widget title='Beef Page Recipes'>
                <Grid columns={2}>
                  <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Beef'))} categoryType='Vegetarian'/>
                  <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Beef') && recipe.beef_page === true)} categoryType='Vegetarian'/>
                </Grid>
              </Widget>
          </Widget>
          <Widget title='Vegetarian Category Page' className='mt-4'>
            <div>
              <Image 
                src="/coca-leaves.png"
                width={40} 
                height={40} 
              />
            </div>
            <Widget title='Vegetarian Feature'>
              <Grid columns={2}>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Vegetarian'))} categoryType='Vegetarian'/>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Vegetarian') && recipe.vegetarian_feature === true)} categoryType='Vegetarian' />
              </Grid>
            </Widget>
            <Widget title='Vegetarian Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Vegetarian'))} categoryType='Vegetarian'/>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Vegetarian') && recipe.vegetarian_page === true)} categoryType='Vegetarian'/>
              </Grid>
            </Widget>
          </Widget>
          <Widget title='Chicken Category Page' className='mt-4'>
            <div>
              <Image 
                src="/chicken-leg.png"
                width={40} 
                height={40} 
              />
            </div>
            <Widget title='Chicken Feature'>
              <Grid columns={2}>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Chicken'))} categoryType='Chicken'/>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Chicken') && recipe.chicken_feature === true)} categoryType='Chicken'/>
              </Grid>
            </Widget>
            <Widget title='Chicken Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Chicken'))} categoryType='Chicken'/>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Chicken') && recipe.chicken_page === true)} categoryType='Chicken'/>
              </Grid>
            </Widget>
          </Widget>
          <Widget title='Rice Category Page' className='mt-4'>
            <div>
              <Image 
                src="/vegan.png"
                width={40} 
                height={40} 
              />
            </div>
            <Widget title='Rice Feature'>
              <Grid columns={2}>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Rice'))} categoryType='Rice'/>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Rice') && recipe.rice_feature === true)} categoryType='Rice'/>
              </Grid>
            </Widget>
            <Widget title='Rice Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Rice'))} categoryType='Rice'/>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Rice') && recipe.rice_page === true)} categoryType='Rice'/>
              </Grid>
            </Widget>
          </Widget>
          <Widget title='Pasta Category Page' className='mt-4'>
            <div>
              <Image 
                src="/spaguetti.png"
                width={40} 
                height={40} 
              />
            </div>
            <Widget title='Pasta Feature'>
              <Grid columns={2}>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Pasta'))} categoryType='Pasta'/>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Pasta') && recipe.pasta_feature === true)} categoryType='Pasta'/>
              </Grid>
            </Widget>
            <Widget title='Pasta Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Pasta'))} categoryType='Pasta'/>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Pasta') && recipe.pasta_page === true)} categoryType='Pasta'/>
              </Grid>
            </Widget>
          </Widget>
          <Widget title='Potato Category Page' className='mt-4'>
            <div>
              <Image 
                src="/sausages.png"
                width={40} 
                height={40} 
              />
            </div>
            <Widget title='Potato Feature'>
              <Grid columns={2}>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Potato'))} categoryType='Potato'/>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Potato') && recipe.potato_feature === true)} categoryType='Potato'/>
              </Grid>
            </Widget>
            <Widget title='Potato Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Potato'))} categoryType='Potato'/>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Potato') && recipe.potato_page === true)} categoryType='Potato'/>
              </Grid>
            </Widget>
          </Widget>
          <Widget title='Seafood Category Page' className='mt-4'>
            <div>
              <Image 
                src="/fish.png"
                width={40} 
                height={40} 
              />
            </div>
            <Widget title='Seafood Feature'>
              <Grid columns={2}>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Seafood'))} categoryType='Seafood'/>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Seafood') && recipe.seafood_feature === true)} categoryType='Seafood'/>
              </Grid>
            </Widget>
            <Widget title='Seafood Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Seafood'))} categoryType='Seafood'/>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Seafood') && recipe.seafood_page === true)} categoryType='Seafood'/>
              </Grid>
            </Widget>
          </Widget>
          <Widget title='Lamb Category Page' className='mt-4'>
            <div>
              <Image 
                src="/lamb.png"
                width={40} 
                height={40} 
              />
            </div>
            <Widget title='Lamb Feature'>
              <Grid columns={2}>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Lamb'))} categoryType='Lamb'/>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Lamb') && recipe.lamb_feature === true)} categoryType='Lamb'/>
              </Grid>
            </Widget>
            <Widget title='Lamb Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Lamb'))} categoryType='Lamb'/>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Lamb') && recipe.lamb_page === true)} categoryType='Lamb'/>
              </Grid>
            </Widget>
          </Widget>
          <Widget title='Egg Category Page' className='mt-4'>
            <div>
              <Image 
                src="/fried-egg.png"
                width={40} 
                height={40} 
              />
            </div>
            <Widget title='Egg Feature'>
              <Grid columns={2}>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Egg'))} categoryType='Egg'/>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Egg') && recipe.egg_feature === true)} categoryType='Egg'/>
              </Grid>
            </Widget>
            <Widget title='Egg Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Egg'))} categoryType='Egg'/>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Egg') && recipe.egg_page === true)} categoryType='Egg'/>
              </Grid>
            </Widget>
          </Widget>
          <Widget title='Pork Category Page' className='mt-4'>
            <div>
              <Image 
                src="/ham.png"
                width={40} 
                height={40} 
              />
            </div>
            <Widget title='Pork Feature'>
              <Grid columns={2}>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Pork'))} categoryType='Pork'/>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Pork') && recipe.pork_feature === true)} categoryType='Pork'/>
              </Grid>
            </Widget>
            <Widget title='Pork Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Pork'))} categoryType='Pork'/>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Pork') && recipe.pork_page === true)} categoryType='Pork'/>
              </Grid>
            </Widget>
          </Widget>
          <Widget title='Cheese Category Page' className='mt-4'>
            <div>
              <Image 
                src="/cheese.png"
                width={40} 
                height={40} 
              />
            </div>
            <Widget title='Cheese Feature'>
              <Grid columns={2}>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Cheese'))} categoryType='Cheese'/>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Cheese') && recipe.cheese_feature === true)} categoryType='Cheese'/>
              </Grid>
            </Widget>
            <Widget title='Cheese Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Cheese'))} categoryType='Cheese'/>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Cheese') && recipe.cheese_page === true)} categoryType='Cheese'/>
              </Grid>
            </Widget>
          </Widget>
          <Widget title='Dessert Category Page' className='mt-4'>
            <div>
              <Image 
                src="/cupcake.png"
                width={40} 
                height={40} 
              />
            </div>
            <Widget title='Dessert Feature'>
              <Grid columns={2}>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Dessert'))} categoryType='Dessert'/>
                <RecipeList quote={recipes.filter(recipe => recipe.category.includes('Dessert') && recipe.dessert_feature === true)} categoryType='Dessert'/>
              </Grid>
            </Widget>
            <Widget title='Dessert Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Dessert'))} categoryType='Dessert'/>
                <RecipeCategoryList quote={recipes.filter(recipe => recipe.category.includes('Dessert') && recipe.dessert_page === true)} categoryType='Dessert'/>
              </Grid>
            </Widget>
          </Widget>
      </>
  )
}
