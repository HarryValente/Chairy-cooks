import { useState, useEffect } from "react";
import { useAuthContext } from "../context/auth";
import Link from 'next/link'
import Image from 'next/image'
import Footer from './Footer'
// Components
import useFirebase from '../hooks/useFirebase';
import useToggle from '../hooks/useToggle';
import useLocalStorage from '../hooks/useLocalStorage';
import { getFirebaseDocs } from "../firebase/index";
import Fuse from "fuse.js";
import router from "next/router";

export default function Layout({ children }) {
  const { user } = useAuthContext()
  const [recipe, setRecipe] = useState()
  console.log(recipe)
  console.log('recipe')
  // const [visible, toggle] = useToggle()
  const [visible, toggle] = useState(false)
  const [_recipes, setLocalStorage] = useLocalStorage('_recipes', '')
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])

  const recipeLibrary = new Fuse(recipe, {
    keys: ['name', 'category'],
    threshold: 0.2
  })

  /**
   * When a user clicks on view more recipes it sets the search result into LS redirects then searches on that page using the saved LS 
   */
  const viewAllRecipes = () => {
    setLocalStorage(results)
    toggle(false)
    router.push('/allRecipes')
  }

  useEffect(async () => {
    if (!recipe) {
      const _report = await getFirebaseDocs('all_recipes/')
      setRecipe(_report)
    }

  }, [])

  useEffect(() => {
    const searchField = document.querySelector('.searchInput')

    searchField.addEventListener('keyup', e => {
      if (e.key === 'Enter' && search !== '') {
        const results = recipeLibrary.search(search).map(({item}) => item)
        console.log(results)
        console.log('results')
        console.log('enter')
        if (results.length > 0) {
          // Cut off so only limited amount of recipes show up
          // let length = results.length - 11
          // if (results.length > 10) {
          //   results.slice(11, length)
          // }
          toggle(true)
          setResults(results)
        }
      }
    })
  }, [search])

  return (
    <div className="layout">
      <header>
        <div className="logoHeaderContainer">
          <Link href="/">
            <Image src='/logotest.png' alt='Chairy Cooks Logo' priority layout='fill' onClick={() => toggle(false)}/>
          </Link>
        </div>

        <div className="searchContainer">
          <input className="searchInput" type='text' placeholder="Search" onChange={(e) => setSearch(e.target.value)} onClick={() => toggle(true)}></input>
          {visible && (
            <>
              <div className="searchFeatureLayout">   
              <div className="searchFeatureContentContainer">
                {results.length > 0 && results.map(rec => (
                  <Link key={rec.id} href={`/recipes/${rec.id}`}>
                    <a className='block hover:bg-gray-50 border border-gray-100 hover:border-gray-200 w-full p-2 rounded text-sm'>
                      <p className='flex items-center text-gray-500' onClick={() => toggle(false)}>{rec.name}</p>
                    </a>
                  </Link>
                ))}
              </div>
                {results.length > 0 ? <h1 className="viewMore" onClick={viewAllRecipes}>View More Recipes</h1> : <h1 className="viewMore">No Recipes</h1>}
              </div>
            </>
          )}
        </div>


        {/* {user ? (
          <>
            <Link href="/profile">
              <button className="profileBtn" role="button"><span className="text">Profile</span></button>
            </Link>
          </>
        ) : (
          <Link href="/login">
            <button className="profileBtn" role="button"><span className="text">Login</span></button>
          </Link>
        )} */}
      </header>

      <div className="page-content" onClick={() => toggle(false)}>
        { children }
      </div>

      <Footer recipe={recipe}/>
    </div>
  )
}