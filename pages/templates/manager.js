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
          <Widget title='Category page selectors' className={'mt-4'}>
              <Label className={'mt-4'} text='Beef'/>
              <Grid columns={2}>
                <RecipeList quote={recipes.filter(recipe => recipe.category === 'Beef')}  />
                <RecipeList quote={recipes.filter(recipe => recipe.category_feature === true)} />
              </Grid>
              <Label className={'mt-4'} text='Vegetarian'/>
              <Grid columns={2}>
                <RecipeList quote={recipes.filter(recipe => recipe.category === 'Vegetarian')}  />
                <RecipeList quote={recipes.filter(recipe => recipe.category_feature === true)} />
              </Grid>
              <Label className={'mt-4'} text='Chicken'/>
              <Grid columns={2}>
                <RecipeList quote={recipes.filter(recipe => recipe.category === 'Chicken')}  />
                <RecipeList quote={recipes.filter(recipe => recipe.category_feature === true)} />
              </Grid>
          </Widget>
      </>
  )
}
