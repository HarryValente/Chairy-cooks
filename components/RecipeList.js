// Hooks
import { useEffect, useState } from 'react'
import { updateFirebaseDoc } from '../firebase'

import {useRouter} from 'next/router'
// Components
import Grid from '../components/Grid'
import Search from '../components/Search'
import { toast } from 'react-toastify'
import Widget from './Widget'

export default ({ quote: data, quote, selectRecipe }) => {
  const router = useRouter()
  const [recipes, setRecipes] = useState([])
  const [snapshot, setSnaphot] = useState([])

  const toggle = async id => {
    let recipe = recipes.find(r => r.id === id)

    if (recipe) {

      let _recipe = {
        ...recipe,
        homepage_feature: recipe.homepage_feature ? false : true
      }
      await updateFirebaseDoc(`recipe_templates`, recipe.id, _recipe)

      router.reload()
    }
  }

  useEffect(() => {
    if (data) {
      setRecipes(data)
      setSnaphot(data)
    }
  }, [data])
console.log(recipes)
console.log('recipe')
  return (
    <>
      <Grid columns={1}>
        <Search
          data={snapshot}
          setData={e => setRecipes(e)}
          keys={['recipe_information.details.name']}
          placeholder='Search recipes..'
        />
        <Grid columns={3} className='bg-gray-100 p-2 rounded text-xs'>
          <p>Recipe</p>
          <p>Catagory</p>
          <p>Author</p>
        </Grid>
        {recipes.length > 0
          ? recipes.map(recipe => {
              return (
                <Grid
                  key={recipe.id}
                  columns={3}
                  // onClick={() => selectRecipe(recipe.id)}
                  className={`hover:bg-gray-50 border hover:border-gray-200 cursor-pointer p-2 relative rounded text-sm`}
                >
                  <span className='flex items-center'>{recipe.recipe_information.details.name}</span>
                  <span className='flex items-center'>{recipe.recipe_information.details.category}</span>
                  <span className='flex items-center' onClick={() => toggle(recipe.id)}>{recipe.homepage_feature ? 'Take off' : 'Add'}</span>
            
                </Grid>
              )
            })
          : 'No recipes found'}
      </Grid>
    </>
  )
}
