import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faPinterest, faTiktok, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { useState } from 'react'
import Field from './Field'
import Button from './Button'
import { addFirebaseDoc, generateFirebaseId } from '../firebase/index'
import router from 'next/router'

export default ({recipe}) => {
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

  const randomRecipe = async () => {
    const randomInteger = Math.floor(Math.random() * (3 - 1)) + 1
    router.push(`/recipes/${recipe[randomInteger].id}`)
  }

  return (
    <footer>
      <div className='footerInfoContainer'>
        <div className='footerInfoImg'>
          <Image src='/logotest.png' alt='Chairy Cooks Logo' priority layout='fill' />
        </div>
        <div className='footerInfo'>
          <ul>
            <li>
              <Link href='/about'>About</Link>
            </li>
            <li onClick={randomRecipe} className='cursor-pointer'>Random Recipe</li>
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
      <Link href='https://www.tiktok.com/@chairycooks'>
        <a target="_blank"><FontAwesomeIcon icon={faTiktok} /></a>
      </Link>
      <Link href='https://www.instagram.com/?hl=en'>
        <a target="_blank"><FontAwesomeIcon icon={faFacebook} /></a>
      </Link>
      <Link href='https://www.pinterest.co.uk/chairycooks/_created/'>
        <a target="_blank"><FontAwesomeIcon icon={faPinterest} /></a>
      </Link>
      </div>
      <p>Copyright 2022 chairy cooks</p>
    </footer>
  )
}
