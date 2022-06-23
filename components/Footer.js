import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTiktok, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { useState } from 'react'
import Field from './Field'
import Button from './Button'
import { addFirebaseDoc, generateFirebaseId } from '../firebase/index'

export default () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()

  const emailListUpload = async () => {
    const _emailList = {
      id: generateFirebaseId(),
      name: name,
      email: email
    }
    await addFirebaseDoc('/email_list/', _emailList, _emailList.id)
  }

  return (
    <footer>
      <div className='footerInfoContainer'>
        <div className='footerInfo'>
          <h1>LOGO</h1>
        </div>
        <div className='footerInfo'>
          <ul>
            <li>
              <Link href='/about'>About</Link>
            </li>
            <li>Random Recipe</li>
            <li>
              <Link href='/recipeIndex'>Recipe Index</Link>
            </li>
          </ul>
        </div>
        <div className='footerInfo'>
          <ul>
            <li>
              <Link href='/resources'>Recipe Resources</Link>
            </li>
            <li>
              <Link href='/sponsered'>Sponsered Content</Link>
            </li>
            <li>
              <Link href='/contact'>Contact</Link>
            </li>
          </ul>
        </div>
        <div className='footerEmailList'>
          <h3>SIGN UP FOR EMAIL UPDATES</h3>
          <Field required placeholder='First Name' onChange={value => setName(value)}/>
          <Field required placeholder='Email' onChange={value => setEmail(value)}/>
          <Button onClick={emailListUpload} children={'Sign up'} className='mt-2'/>
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
