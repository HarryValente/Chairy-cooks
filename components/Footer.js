import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTiktok, faTwitter } from "@fortawesome/free-brands-svg-icons"

export default () => {
  return (
    <footer>
      <div className='footerInfoContainer'>
        <div className='footerInfo'>
          <h1>LOGO</h1>
        </div>
        <div className='footerInfo'>
          <ul>
            <li>About</li>
            <li>About</li>
            <li>About</li>
          </ul>
        </div>
        <div className='footerInfo'>
          <ul>
            <li>About</li>
            <li>About</li>
            <li>About</li>
          </ul>
        </div>
        <div className='footerInfo'>
          <ul>
            <li>About</li>
            <li>About</li>
            <li>About</li>
          </ul>
        </div>
        <div className='footerInfo'>
          <ul>
            <li>About</li>
            <li>About</li>
            <li>About</li>
          </ul>
        </div>
      </div>
        <div className="horizontalLine"></div>
      <div className="footerSocialsContainer">
      <Link href='https://www.instagram.com/?hl=en'>
        <a target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>
      </Link>
      <Link href='https://www.instagram.com/?hl=en'>
        <a target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>
      </Link>
      <Link href='https://www.instagram.com/?hl=en'>
        <a target="_blank"><FontAwesomeIcon icon={faTiktok} /></a>
      </Link>
      <Link href='https://www.instagram.com/?hl=en'>
        <a target="_blank"><FontAwesomeIcon icon={faFacebook} /></a>
      </Link>
      </div>
      <p>Copyright 2022 chairy cooks</p>
    </footer>
  )
}
