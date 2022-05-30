// React
import { useEffect, useState } from 'react'
// Components
import SEO from '../../components/SEO'
import Grid from '../../components/Grid'
import Modal from '../../components/Modal'
import RecipeList from '../../components/RecipeList'
import { Widget, WidgetTitle, WidgetContent } from '../../components/Widget'
import useFirebase from '../../hooks/useFirebase'
import useToggle from '../../hooks/useToggle'
import { getFirebaseDoc } from "../../firebase";

export default () => {
  const [quote, updateQuote, removeQuote] = useFirebase([], 'recipe_templates')
  const [selected, setSelected] = useState(null)
  const [recipeModal, toggleRecipeModal] = useToggle()

  const selectRecipe = async id => {
    const quote = await getFirebaseDoc('recipe_templates', id)
    if (quote) {
      setSelected(quote)
    }
  }
console.log(selected)
console.log('selected')
  return (
      <>
        <SEO title={'Chairy cooks - Homepage Manager'} description={'Homepage Manager section for Chairy cooks home of cheap tasty homemade meals from all around the world!'}/>

        <Grid columns={2} className={'h-screen'}>
          <Widget>

          <WidgetTitle icon='file-lines'>Featured recipes homepage</WidgetTitle>
            <WidgetContent>
              <RecipeList quote={quote.sort((a, b) => b['date'] - a['date'])} selectQuote={selectRecipe} />
            </WidgetContent>
          </Widget>
        </Grid>

        {selected && (
          <Modal
          title='Raise Quote From Job'
          icon='memo'
          visible={recipeModal && selected}
          close={() => {
            setSelected(null)
            toggleRecipeModal()
          }}
          >
            {console.log('hi')}
            <h1>test</h1>
            {/* <QuoteForm job={selected} /> */}
          </Modal>
      )}
      </>
  )
}
