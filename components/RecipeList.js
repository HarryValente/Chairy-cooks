// Hooks
import { useEffect, useState } from 'react'
import { updateFirebaseDoc } from '../firebase'

import {useRouter} from 'next/router'
// Components
import Grid from '../components/Grid'
import Search from '../components/Search'
import { toast } from 'react-toastify'
import Widget from './Widget'
import Button from './Button'

export default ({ quote: data, selectRecipe, categoryType, homepage}) => {
  const router = useRouter()
  const [recipes, setRecipes] = useState([])
  const [snapshot, setSnaphot] = useState([])
  const [category, setCategory] = useState()

  const toggle = async (id, alt, categ) => {
    let recipe = recipes.find(r => r.id === id)

    if (recipe) {
      if (alt == 'categ') {
        let _recipe = {
          ...recipe,
        }

        if (categ) {
          _recipe.category_feature = recipe.category_feature ? false : true
        }

        let cat = categoryType.toLowerCase()
        await updateFirebaseDoc(`/recipes/categories/${cat + '_recipes'}`, recipe.id, _recipe)

      } else if(alt == 'pageHome'){
        let _recipe = {
          ...recipe,
          homepage_page: recipe.homepage_page ? false : true
        }
        await updateFirebaseDoc(`all_recipes`, recipe.id, _recipe)
      } else {
        let _recipe = {
          ...recipe,
          homepage_feature: recipe.homepage_feature ? false : true
        }
        await updateFirebaseDoc(`all_recipes`, recipe.id, _recipe)
      }
      router.reload()
    }
  }

  useEffect(() => {
    if (categoryType) {
      switch (categoryType) {
        case 'Rice':
          setCategory(categoryType)
          break;
        case 'Pasta':
          setCategory(categoryType)
          break;
        case 'Potato':
          setCategory(categoryType)
          break;
        case 'Chicken':
          setCategory(categoryType)
          break;
        case 'Beef':
          setCategory(categoryType)
          break;
        case 'Seafood':
          setCategory(categoryType)
          break;
        case 'Lamb':
          setCategory(categoryType)
          break;
        case 'Egg':
          setCategory(categoryType)
          break;
        case 'Pork':
          setCategory(categoryType)
          break;
        case 'Cheese':
          setCategory(categoryType)
          break;
        case 'Vegetarian':
          setCategory(categoryType)
          break;
        case 'Dessert':
          setCategory(categoryType)
          break;
        default:
        break;
      }
    }
  }, [categoryType])

  useEffect(() => {
    if (data) {
      setRecipes(data)
      setSnaphot(data)
    }
  }, [data])

  return (
    <>
      <Grid columns={1}>
        <Search
          data={snapshot}
          setData={e => setRecipes(e)}
          keys={['name']}
          placeholder='Search recipes..'
        />
        <Grid columns={2} className='bg-gray-100 p-2 rounded text-xs'>
          <p>Recipe</p>
          <p>Add / Remove</p>
        </Grid>
        {recipes.length > 0
          ? recipes.map(recipe => {
              return (
                <Grid
                  key={recipe.id}
                  columns={2}
                  // onClick={() => selectRecipe(recipe.id)}
                  className={`hover:bg-gray-50 border hover:border-gray-200 cursor-pointer p-2 relative rounded text-sm`}
                >
                  <span className='flex items-center'>{recipe.name}</span>
                  {homepage ? (
                    <span className='flex items-center' onClick={() => toggle(recipe.id, 'pageHome')}>
                      {recipe.homepage_page ?
                        <Button variant='delete'>Remove From Home</Button>
                        : 
                        <Button variant='action'>Add To Home</Button>
                      }
                    </span>
                  ) : category ? (
                    <span className='flex items-center' onClick={() => toggle(recipe.id, 'categ', categoryType)}>
                      {recipe.category_feature ? 
                        <Button variant='delete'>Remove {categoryType} Feature</Button> 
                        : 
                        <Button variant='action'>Add {categoryType} Feature</Button>
                      }
                      {/* // <Button variant='action'>Toggle {categoryType} Feature</Button> */}
                    </span>
                  ) : (
                    <span className='flex items-center' onClick={() => toggle(recipe.id)}>
                      {recipe.homepage_feature ?
                      <Button variant='delete'>Remove Home Feature</Button>
                      : 
                      <Button variant='action'>Add Home Feature</Button>
                      }
                    </span>
                  )
                  }
                </Grid>
              )
            })
          : 'No recipes found'}
      </Grid>
    </>
  )
}
