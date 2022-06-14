// Firebase
import { addFirebaseDoc, createFirebaseUser, signOutFirebaseUser, loginFirebaseUser } from '../firebase/index'
import { auth } from '../firebase'

// React
import { useState, useEffect } from 'react'

// Next
import { useRouter } from 'next/router'

// Components
import { Form, FormField, FormSubmit } from './Form'
import Grid from './Grid'
import Button from './Button'

// Context
import { useAuthContext } from '../context/auth'
import useLocalStorage from '../hooks/useLocalStorage'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Widget from './Widget'
import Field from './Field'

export default () => {
  const router = useRouter()
  const [form, setForm] = useState({
    email: 'harry-joevalente@live.co.uk',
    password: 'chairy123',
    saved_recipes: []
  })
  const { login, logout} = useAuthContext()
  const [error, setError] = useState(null)
  
  const [newAccount, setNewAccount] = useState(false)
  const [_user] = useLocalStorage('_user')

  const handleLogin = async event => {
    event.preventDefault()

    // await loginFirebaseUser(form.email, form.password)
    await login(form.email, form.password).catch(error => setError(error))
    router.push('/profile')
  }

  const handleLogout = async e => {
    e.preventDefault()

    await logout()
    await router.reload()
  }
      // harry-joevalente@live.co.uk
  const createAccount = async event => {
    event.preventDefault()

    await createFirebaseUser( form.email, form.password)
    .then(async id => {
      const data = { ...form, id }
      setForm(data)
      toast.info("Account created");
      await addFirebaseDoc('users', data, id)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  return (

    <Widget title='Login'>
      {!newAccount &&
      <Form onSubmit={handleLogin} error={error}>
        <Grid columns={1}>
          <Field
            autoFocus
            label='Email Address'
            value={form.email}
            inputMode='email'
            onChange={e => setForm(state => ({...state, email: e}))}
            className='text-black'
          />
          <Field
            type='password'
            label='Password'
            value={form.password}
            onChange={e => setForm(state => ({...state, password: e}))}
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
        {/* TODO this title thats commented out find another solution */}
        {/* <WidgetTitle icon='file-lines'>Create New Account</WidgetTitle> */}
        <Grid columns={2}>
          <Field
            autoFocus
            label='Email Address'
            value={form.email}
            inputMode='email'
            onChange={e => setForm(state => ({...state, email: e}))}
            className='text-black'
          />
          <Field
            type='password'
            label='Password'
            value={form.password}
            onChange={e => setForm(state => ({...state, password: e}))}
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
    </Widget>
  )
}
