// Hooks
import { useEffect, useState } from 'react'

// Context
import { useAuthContext } from '../context/auth'

// Components
import { FormSubmit, FormField } from '../components/Form'
import Grid from '../components/Grid'
import Label from './Label'

// Modules
import useLocalStorage from '../hooks/useLocalStorage'
import useForm from '../hooks/useForm'
import useFirebase from '../hooks/useFirebase'

export default ({ recipe }) => {
  const { user } = useAuthContext()

  const [form, setForm] = useForm()

  const [_user] = useLocalStorage('_user')

  const handleSubmit = async event => {
    event.preventDefault()

    let _recipe = {
      homepage_feature: form.homepageFeature ? true : false
    }

    console.log(_recipe)
    console.log('_recipe')
  }
  console.log(form)
  console.log('form')
  return (
    <form onSubmit={handleSubmit}>
      <Grid columns={1}>
        <Grid columns={3} className='bg-gray-100 p-2 rounded text-xs'>
          {/* <FormField
            type='checkbox'
            label='Put this recipe on the homepage?'
            checked={form.homepageFeature}
            onChange={e => setForm({ homepageFeature: e })}
          /> */}
          <Label text='Put this recipe on the homepage?' className='mb-0 text-sm w-fit' />
          <input
            type='checkbox'
            checked={form.homepageFeature}
            onChange={e => setForm({ homepageFeature: e.target.checked })}
            style={{ scale: 1.4, width: '10px' }}
          />
        </Grid>

        <FormSubmit>Submit</FormSubmit>
      </Grid>
    </form>
  )
}
