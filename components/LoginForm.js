// Firebase
import { addFirebaseDoc, createFirebaseUser, loginFirebaseUser, signOutFirebaseUser } from '../firebase/index'
import { auth } from '../firebase'

// React
import { useState } from 'react'

// Components
import { Form, FormField, FormSubmit } from './Form'
import Grid from './Grid'
import Button from './Button'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null)

  const [newAccount, setNewAccount] = useState(false)

  const notify = (text) => toast(text);

  const handleLogin = event => {
    event.preventDefault()

    loginFirebaseUser( email, password)
    // todo this .then doesnt run
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      console.log('user')
      notify('Logged in')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    });

  }
  
  const createAccount = event => {
    event.preventDefault()

    createFirebaseUser( email, password)
    .then(async (userCred) => {
      // const user = await addFirebaseDoc('users',)
      console.log(userCred)
      console.log('userCred')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  const signOut = event => {
    event.preventDefault()

    signOutFirebaseUser()
    notify('Signed out')
  }


  return (
    <>
      {!newAccount &&
      <Form onSubmit={handleLogin} error={error}>
        <Grid columns={2}>
          <FormField
            autoFocus
            label='Email Address'
            value={email}
            inputMode='email'
            onChange={e => setEmail(e)}
            className='text-black'
          />
          <FormField
            type='password'
            label='Password'
            value={password}
            onChange={e => setPassword(e)}
            className='text-black'
          />
          <FormSubmit>Login to Chairy Cooks</FormSubmit>
          <Button
          onClick={() => setNewAccount(state => !state)}
          >
            Create account
          </Button>
        </Grid>
      </Form>}
  
      {newAccount && 
      <Form onSubmit={createAccount} error={error}>
        <Grid columns={2}>
          <FormField
            autoFocus
            label='Email Address'
            value={email}
            inputMode='email'
            onChange={e => setEmail(e)}
            className='text-black'
          />
          <FormField
            type='password'
            label='Password'
            value={password}
            onChange={e => setPassword(e)}
            className='text-black'
          />
          <FormSubmit>Create New Account</FormSubmit>
          <Button
          onClick={() => setNewAccount(state => !state)}
          className='text-white'
          >
            Go back to Login
          </Button>
        </Grid>
      </Form>}

      <button onClick={signOut}>Sign out</button>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* <Form onSubmit={signOut} error={error}>
        <Grid columns={2}>
          <FormField
            autoFocus
            label='Email addy'
            value={email}
            inputMode='email'
            onChange={e => setEmail(e)}
            className='text-black'
          />
          <FormField
            type='password'
            label='Password'
            value={password}
            onChange={e => setPassword(e)}
            className='text-black'
          />
          <FormSubmit>Create New Account</FormSubmit>
          <Button
          onClick={() => setNewAccount(state => !state)}
          className='text-white'
          >
            Go back to Login
          </Button>
        </Grid>
      </Form> */}
    </>
  )
}
