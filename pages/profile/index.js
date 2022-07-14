// React
import { useEffect, useState } from "react";

// Next
import Link from 'next/link'
import { useRouter } from 'next/router'

// Firebase
import { getFirebaseDocs } from "../../firebase/index";
import { where } from 'firebase/firestore'

// Hooks
import useLocalStorage from '../../hooks/useLocalStorage'
import { useAuthContext } from "../../context/auth";
import Grid from "../../components/Grid";
import Button from "../../components/Button";
import Widget from "../../components/Widget";
import SEO from "../../components/SEO";

const profile = () => {
  const router = useRouter()
  const { user, logout} = useAuthContext()

  const [_user] = useLocalStorage('_user')

  const [savedRecipes, setSavedRecipes] = useState([])

  const handleLogout = async e => {
    e.preventDefault()

    await logout()
    await router.push('/')
    await router.reload()
  }

  /**
   * Gathers all recipes that the user has saved and stores them in state
   * @param {Array} recipes array of recipe IDs 
   */
  useEffect(async () => {
    if (user) {
      if (user.saved_recipes.length > 0) {
        const recipes = user.saved_recipes

        recipes.map(async recipeID => {
          const [faveRecipes] = await getFirebaseDocs(`/all_recipes`, where('id', '==', recipeID))
          setSavedRecipes(savedRecipes => [...savedRecipes, faveRecipes])
        })
      }
    }
  }, [user])

  return ( 
    <>
      <SEO title={'Chairy cooks - Account'} description={'Chairy cooks accounts page where you can view saved recipes!'}/>
      {user && user.admin && (
        <Link href="/templates">
          <Button variant='action'>Admin recipe section</Button>
        </Link>
      )}
      <Grid columns={2} className='mt-4'>
        <Widget title='Saved Recipes'>
            {savedRecipes.length > 0 && savedRecipes.map(recipe => {
              return (
                <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
                  <Grid
                    key={recipe.id}
                    columns={4}
                    className={`hover:bg-gray-50 border hover:border-gray-200 cursor-pointer p-1 relative rounded text-sm`}
                  >
                    <span className='flex items-center'>{recipe.name}</span>
                  </Grid>
                </Link>
              )
              })
            }
        </Widget>
        <button onClick={handleLogout}>Sign out</button>
      </Grid>
    </>
  );
}
 
export default profile;