// Components
import SEO from '../../components/SEO'
import Grid from '../../components/Grid'
import RecipeList from '../../components/RecipeList'
import Label from '../../components/Label'
import Widget from '../../components/Widget'
import useFirebase from '../../hooks/useFirebase'

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
          <Widget title='Beef Category Page' className='mt-4'>
              <Widget title='Beef Feature'>
                <Grid columns={2}>
                  <RecipeList quote={recipes.filter(recipe => recipe.category === 'Beef')} categoryType='Beef'/>
                  <RecipeList quote={recipes.filter(recipe => recipe.category === 'Beef' && recipe.category_feature === true)} categoryType='Beef'/>
                </Grid>
              </Widget>
              {/* <Widget title='Beef Page Recipes'>
                <Grid columns={2}>
                  <RecipeList quote={recipes.filter(recipe => recipe.category === 'Beef')} categoryType='Vegetarian'/>
                </Grid>
              </Widget> */}
          </Widget>
          <Widget title='Vegetarian page selectors' className='mt-4'>
            <Widget title='Vegetarian Feature'>
              <Grid columns={2}>
                <RecipeList quote={recipes.filter(recipe => recipe.category === 'Vegetarian')} categoryType='Vegetarian'/>
                <RecipeList quote={recipes.filter(recipe => recipe.category === 'Vegetarian' && recipe.category_feature === true)} categoryType='Vegetarian' />
              </Grid>
            </Widget>
            {/* <Widget title='Vegetarian Page Recipes'>
              <Grid columns={2}>
                <RecipeList quote={recipes.filter(recipe => recipe.category === 'Vegetarian')} categoryType='Vegetarian'/>
              </Grid>
            </Widget> */}
          </Widget>
          <Widget title='Chicken page selectors' className='mt-4'>
            <Widget title='Chicken Feature'>
              <Grid columns={2}>
                <RecipeList quote={recipes.filter(recipe => recipe.category === 'Chicken')} categoryType='Chicken'/>
                <RecipeList quote={recipes.filter(recipe => recipe.category === 'Chicken' && recipe.category_feature === true)} categoryType='Chicken'/>
              </Grid>
            </Widget>
            {/* <Widget title='Chicken Page Recipes'>
              <Grid columns={2}>
                <RecipeList quote={recipes.filter(recipe => recipe.category === 'Chicken')} categoryType='Chicken'/>
              </Grid>
            </Widget> */}
          </Widget>
      </>
  )
}
