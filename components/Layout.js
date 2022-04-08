import Link from 'next/link'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <a>
            <h3 className='test'>Chairy</h3>
            <h1>Cooks</h1>
            <h2>Spread The Joy</h2>
          </a>
        </Link>

        <Link href="/profile">
          <div className='loginContainer'>
            <a>
              Login
            </a>
          </div>
        </Link>

      </header>

      <div className="page-content">
        { children }
      </div>

      <footer>
        <p>Copyright 2021 chairy cooks</p>
      </footer>
      {/* <Footer /> */}
    </div>
  )
}