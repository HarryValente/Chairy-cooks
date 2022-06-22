import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../context/auth";
import Link from 'next/link'
import Footer from './Footer'
import Button from './Button'
// Components
import Search from './Search'
import useFirebase from '../hooks/useFirebase';
import useToggle from '../hooks/useToggle';
import Fuse from "fuse.js";

export default function Layout({ children }) {
  const { user } = useAuthContext()
  const [recipe] = useFirebase([], '/recipe_templates/')
  const [visible, toggle] = useToggle(false)
  // Recipe Search
  const searchInput = useRef(null)
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])

  const clearSearch = () => {
    toggle(state => !state)
    setResults([])
    setSearch('')
  }

  const recipeLibrary = new Fuse(recipe, {
    keys: ['name', 'category'],
    threshold: 0.2
  })

  useEffect(() => {
    const searchField = document.querySelector('.searchInput')

    searchField.addEventListener('keyup', e => {
      if (e.key === 'Enter' && search !== '') {
        const results = recipeLibrary.search(search).map(({item}) => item)
        console.log(results)
        console.log('results')
        if (results.length > 0) {
          setResults(results)
        }
      }
    })
  }, [search])
console.log(results)
console.log('results')
  return (
    <div className="layout">
      <header>
        <div>
          <Link href="/">
            <a>
              <h3>Chairy</h3>
              <h1>Cooks</h1>
              <h2>Spread The Joy</h2>
            </a>
          </Link>
        </div>

        <input className="searchInput" type='text' placeholder="Search" onChange={(e) => setSearch(e.target.value)} onClick={() => toggle(true)}></input>

        {user ? (
          <>
            <Link href="/profile">
              <button className="profileBtn" role="button"><span class="text">Profile</span></button>
            </Link>
          </>
        ) : (
          <Link href="/login">
            <button className="profileBtn" role="button"><span class="text">Login</span></button>
          </Link>
        )}
      </header>

      {visible && (
        <div className="searchFeatureLayout">
          <div className="searchFeatureHide" onClick={() => toggle(state => !state)}>X</div>
          
          <div className="searchFeatureContentContainer">
            {results.length > 0 && results.map(rec => (
              <Link key={rec.id} href={`/recipes/${rec.id}`}>
                <a className='block hover:bg-gray-50 border border-gray-100 hover:border-gray-200 gap-4 grid grid-cols-4 p-2 rounded text-sm' onClick={() => toggle(state => !state)}>
                  <p className='flex items-center text-gray-500'>{rec.recipe_information.details.name}</p>
                </a>
              </Link>
            ))}
          </div>

        </div>
      )}

      <div className="page-content">
        { children }
      </div>

      <Footer />
    </div>
  )
}