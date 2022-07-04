// Context
import { useAuthContext } from '../../context/auth'
import Grid from '../../components/Grid'
import useLocalStorage from '../../hooks/useLocalStorage'
import Link from 'next/link'
import Image from 'next/image'

export default () => {
  const [_recipes] = useLocalStorage('_recipes')
  console.log(_recipes)
  console.log('_recipes')
  return (
    <>
    <div className="searchedContainer">
      <h1>Recipes Results</h1>
      <h3>From your search this is what we've found :)</h3>

      <div className='searchedRecipesHead'>
        <h1>Searched Recipes</h1>
        <div className='line'></div>
      </div>
      <div className='searchedRecipes'>
        {_recipes &&
          _recipes.map(food => (
            <Link key={food.id} href={`/recipes/${food.id}`}>
              <div className="searchedRecipe">
                <div className='searchedRecipeImage'>
                  <Image
                    src={food.main_image.url}
                    placeholder='blue'
                    layout="fill"
                  />
                </div>
                    
                <div className="searchedRecipeText">
                  <h5>{food.tags.join(', ')}</h5>
                  <h1>{food.name}</h1>
                  <div className='searchedRecipeTime'>
                    <p>{food.time} Mins</p>
                    <div className='searchedRecipeTimeLine'></div>
                    <p>{food.difficulty} difficulty</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
    </>
  )
}
