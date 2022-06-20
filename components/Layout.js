import { useAuthContext } from "../context/auth";
import Link from 'next/link'
import Footer from './Footer'
import Button from './Button'
// Components
import Search from './Search'
import useFirebase from '../hooks/useFirebase';

export default function Layout({ children }) {
  const { user } = useAuthContext()
  const [templates] = useFirebase([], '/recipe_templates/')
  console.log(templates)

  function fullSearchScreen() {
    console.log('test')
  }

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

         <input className="searchInput" placeholder="Search" onClick={fullSearchScreen}></input>


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

      <div className="page-content">
        { children }
      </div>

      <Footer />
    </div>
  )
}