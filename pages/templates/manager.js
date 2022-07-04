// Components
import SEO from '../../components/SEO'
import Grid from '../../components/Grid'
import RecipeList from '../../components/RecipeList'
import RecipeCategoryList from '../../components/RecipeCategoryList'
import Widget from '../../components/Widget'
import useFirebase from '../../hooks/useFirebase'
import Image from 'next/image'

export default () => {
  const [recipes, updateRecipe, removeRecipe] = useFirebase([], 'all_recipes')
  const [beef_recipes] = useFirebase([], `/recipes/categories/beef_recipes`)
  const [vegetarian_recipes] = useFirebase([], `/recipes/categories/vegetarian_recipes`)
  const [chicken_recipes] = useFirebase([], `/recipes/categories/chicken_recipes`)
  const [rice_recipes] = useFirebase([], `/recipes/categories/rice_recipes`)
  const [pasta_recipes] = useFirebase([], `/recipes/categories/pasta_recipes`)
  const [potato_recipes] = useFirebase([], `/recipes/categories/potato_recipes`)
  const [seafood_recipes] = useFirebase([], `/recipes/categories/seafood_recipes`)
  const [lamb_recipes] = useFirebase([], `/recipes/categories/lamb_recipes`)
  const [egg_recipes] = useFirebase([], `/recipes/categories/egg_recipes`)
  const [pork_recipes] = useFirebase([], `/recipes/categories/pork_recipes`)
  const [cheese_recipes] = useFirebase([], `/recipes/categories/cheese_recipes`)
  const [dessert_recipes] = useFirebase([], `/recipes/categories/dessert_recipes`)

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
                  <RecipeList quote={beef_recipes} categoryType='Beef'/>
                  <RecipeList quote={beef_recipes && beef_recipes.filter(rec => rec.category_feature === true)} categoryType='Beef'/>
                </Grid>
              </Widget>
              <Widget title='Beef Page Recipes'>
                <Grid columns={2}>
                  <RecipeCategoryList quote={beef_recipes} categoryType='Beef'/>
                  <RecipeCategoryList quote={beef_recipes && beef_recipes.filter(rec => rec.category_page === true)} categoryType='Beef'/>
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
                <RecipeList quote={vegetarian_recipes} categoryType='Vegetarian'/>
                <RecipeList quote={vegetarian_recipes && vegetarian_recipes.filter(rec => rec.category_feature === true)} categoryType='Vegetarian' />
              </Grid>
            </Widget>
            <Widget title='Vegetarian Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={vegetarian_recipes} categoryType='Vegetarian'/>
                <RecipeCategoryList quote={vegetarian_recipes && vegetarian_recipes.filter(rec => rec.category_page === true)} categoryType='Vegetarian'/>
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
                <RecipeList quote={chicken_recipes} categoryType='Chicken'/>
                <RecipeList quote={chicken_recipes && chicken_recipes.filter(rec => rec.category_feature === true)} categoryType='Chicken'/>
              </Grid>
            </Widget>
            <Widget title='Chicken Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={chicken_recipes} categoryType='Chicken'/>
                <RecipeCategoryList quote={chicken_recipes && chicken_recipes.filter(rec => rec.category_page === true)} categoryType='Chicken'/>
              </Grid>
            </Widget>
          </Widget>
          <Widget title='Rice Category Page' className='mt-4'>
            <div>
              <Image 
                src="/rice.png"
                width={40} 
                height={40} 
              />
            </div>
            <Widget title='Rice Feature'>
              <Grid columns={2}>
                <RecipeList quote={rice_recipes} categoryType='Rice'/>
                <RecipeList quote={rice_recipes && rice_recipes.filter(rec => rec.category_feature === true)} categoryType='Rice'/>
              </Grid>
            </Widget>
            <Widget title='Rice Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={rice_recipes} categoryType='Rice'/>
                <RecipeCategoryList quote={rice_recipes && rice_recipes.filter(rec => rec.category_page === true)} categoryType='Rice'/>
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
                <RecipeList quote={pasta_recipes} categoryType='Pasta'/>
                <RecipeList quote={pasta_recipes && pasta_recipes.filter(rec => rec.category_feature === true)} categoryType='Pasta'/>
              </Grid>
            </Widget>
            <Widget title='Pasta Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={pasta_recipes} categoryType='Pasta'/>
                <RecipeCategoryList quote={pasta_recipes && pasta_recipes.filter(rec => rec.category_page === true)} categoryType='Pasta'/>
              </Grid>
            </Widget>
          </Widget>
          <Widget title='Potato Category Page' className='mt-4'>
            <div>
              <Image 
                src="/potato.png"
                width={40} 
                height={40} 
              />
            </div>
            <Widget title='Potato Feature'>
              <Grid columns={2}>
                <RecipeList quote={potato_recipes} categoryType='Potato'/>
                <RecipeList quote={potato_recipes && potato_recipes.filter(rec => rec.category_feature === true)} categoryType='Potato'/>
              </Grid>
            </Widget>
            <Widget title='Potato Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={potato_recipes} categoryType='Potato'/>
                <RecipeCategoryList quote={potato_recipes && potato_recipes.filter(rec => rec.category_page === true)} categoryType='Potato'/>
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
                <RecipeList quote={seafood_recipes} categoryType='Seafood'/>
                <RecipeList quote={seafood_recipes && seafood_recipes.filter(rec => rec.category_feature === true)} categoryType='Seafood'/>
              </Grid>
            </Widget>
            <Widget title='Seafood Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={seafood_recipes} categoryType='Seafood'/>
                <RecipeCategoryList quote={seafood_recipes && seafood_recipes.filter(rec => rec.category_page === true)} categoryType='Seafood'/>
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
                <RecipeList quote={lamb_recipes} categoryType='Lamb'/>
                <RecipeList quote={lamb_recipes && lamb_recipes.filter(rec => rec.category_feature === true)} categoryType='Lamb'/>
              </Grid>
            </Widget>
            <Widget title='Lamb Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={lamb_recipes} categoryType='Lamb'/>
                <RecipeCategoryList quote={lamb_recipes && lamb_recipes.filter(rec => rec.category_page === true)} categoryType='Lamb'/>
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
                <RecipeList quote={egg_recipes} categoryType='Egg'/>
                <RecipeList quote={egg_recipes && egg_recipes.filter(rec => rec.category_feature === true)} categoryType='Egg'/>
              </Grid>
            </Widget>
            <Widget title='Egg Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={egg_recipes} categoryType='Egg'/>
                <RecipeCategoryList quote={egg_recipes && egg_recipes.filter(rec => rec.category_page === true)} categoryType='Egg'/>
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
                <RecipeList quote={pork_recipes} categoryType='Pork'/>
                <RecipeList quote={pork_recipes && pork_recipes.filter(rec => rec.category_feature === true)} categoryType='Pork'/>
              </Grid>
            </Widget>
            <Widget title='Pork Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={pork_recipes} categoryType='Pork'/>
                <RecipeCategoryList quote={pork_recipes && pork_recipes.filter(rec => rec.category_page === true)} categoryType='Pork'/>
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
                <RecipeList quote={cheese_recipes} categoryType='Cheese'/>
                <RecipeList quote={cheese_recipes && cheese_recipes.filter(rec => rec.category_feature === true)} categoryType='Cheese'/>
              </Grid>
            </Widget>
            <Widget title='Cheese Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={cheese_recipes} categoryType='Cheese'/>
                <RecipeCategoryList quote={cheese_recipes && cheese_recipes.filter(rec => rec.category_page === true)} categoryType='Cheese'/>
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
                <RecipeList quote={dessert_recipes} categoryType='Dessert'/>
                <RecipeList quote={dessert_recipes && dessert_recipes.filter(rec => rec.category_feature === true)} categoryType='Dessert'/>
              </Grid>
            </Widget>
            <Widget title='Dessert Page Recipes'>
              <Grid columns={2}>
                <RecipeCategoryList quote={dessert_recipes} categoryType='Dessert'/>
                <RecipeCategoryList quote={dessert_recipes && dessert_recipes.filter(rec => rec.category_page === true)} categoryType='Dessert'/>
              </Grid>
            </Widget>
          </Widget>
      </>
  )
}
