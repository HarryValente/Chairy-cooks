// Hooks
import { useEffect, useState } from 'react'
import { updateFirebaseDoc } from '../firebase'

// Components
import Grid from '../components/Grid'
import Search from '../components/Search'
import { toast } from 'react-toastify'

export default ({ quote: data, quote, selectRecipe }) => {
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

      toast.success('update done nice one')
    }
  }

  useEffect(() => {
    if (data) {
      setRecipes(data)
      setSnaphot(data)
    }
  }, [data])

  return (
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
                <button onClick={() => toggle(recipe.id)}>
                  {/* <i
                    className={`fa-regular fa-toggle-${
                      recipe.homepage_feature ? 'on text-green-500' : 'off text-gray-500'
                    }`}
                  /> */}
                  Hi
                </button>
              </Grid>
            )
          })
        : 'No recipes found'}
    </Grid>
  )
}
