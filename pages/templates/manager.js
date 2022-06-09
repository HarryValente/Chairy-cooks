// Components
import SEO from '../../components/SEO'
import Grid from '../../components/Grid'
import RecipeList from '../../components/RecipeList'
import Label from '../../components/Label'
import { Widget, WidgetTitle, WidgetContent } from '../../components/Widget'
import useFirebase from '../../hooks/useFirebase'

export default () => {
  const [recipes, updateRecipe, removeRecipe] = useFirebase([], 'recipe_templates')

  return (
      <>
        <SEO title={'Chairy cooks - Homepage Manager'} description={'Homepage Manager section for Chairy cooks home of cheap tasty homemade meals from all around the world!'}/>
          <Widget className={'mt-4'}>
            <WidgetTitle icon='file-lines'>Featured recipes homepage</WidgetTitle>
            <Grid columns={2}>
              <WidgetContent>
                <RecipeList quote={recipes.sort((a, b) => b['date'] - a['date'])}  />
              </WidgetContent>
              <WidgetContent>
                <RecipeList quote={recipes.filter(recipe => recipe.homepage_feature === true)} />
              </WidgetContent>
            </Grid>
          </Widget>
          <Widget className={'mt-4'}>
            <WidgetTitle icon='file-lines'>Category page selectors</WidgetTitle>
              <Label className={'mt-4'} text='Beef'/>
              <Grid columns={2}>
                <WidgetContent>
                  <RecipeList quote={recipes.filter(recipe => recipe.category === 'Beef')}  />
                </WidgetContent>
                <WidgetContent>
                  <RecipeList quote={recipes.filter(recipe => recipe.category_feature === true)} />
                </WidgetContent>
              </Grid>
              <Label className={'mt-4'} text='Vegetarian'/>
              <Grid columns={2}>
                <WidgetContent>
                  <RecipeList quote={recipes.filter(recipe => recipe.category === 'Vegetarian')}  />
                </WidgetContent>
                <WidgetContent>
                  <RecipeList quote={recipes.filter(recipe => recipe.category_feature === true)} />
                </WidgetContent>
              </Grid>
              <Label className={'mt-4'} text='Chicken'/>
              <Grid columns={2}>
                <WidgetContent>
                  <RecipeList quote={recipes.filter(recipe => recipe.category === 'Chicken')}  />
                </WidgetContent>
                <WidgetContent>
                  <RecipeList quote={recipes.filter(recipe => recipe.category_feature === true)} />
                </WidgetContent>
              </Grid>
          </Widget>
      </>
  )
}
