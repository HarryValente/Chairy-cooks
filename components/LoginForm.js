// Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
// React
import { useState } from 'react'

// Components
import { Form, FormField, FormSubmit } from './Form'
import Grid from './Grid'
import Button from './Button'

export default () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null)

  const [newAccount, setNewAccount] = useState(false)

  const handleLogin = event => {
    event.preventDefault()
  }
  
  const createAccount = event => {
    event.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
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
    </>
  )
}
