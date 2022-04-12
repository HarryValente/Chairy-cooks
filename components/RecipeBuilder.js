// React
import { useEffect, useState } from 'react'

// Hooks
import useForm from '../hooks/useForm'

// Next
import { useRouter } from 'next/router'
import Image from "next/image";

// Firebase
import { addFirebaseDoc } from '../firebase/index'

// Components
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import Grid from '../components/Grid'
import Label from '../components/Label'
import { Widget, WidgetTitle, WidgetContent } from '../components/Widget'
import { FormField, FormSelect, FormSubmit } from '../components/Form'

import { uniqueId } from 'lodash'
import { fetchSignInMethodsForEmail } from 'firebase/auth';

export default ({ recipe: r }) => {
  const router = useRouter()

  const [form, setForm] = useForm()
  const [recipe, setRecipe] = useState({
    ingredients: [{}]
  })

  const [steps, setSteps] = useForm()
  const [ingredient, setIngredient] = useState([])
  const [ingredientList, setIngredientList] = useState([])
  const [field, setField] = useForm()

  const [selectedChecks, setChecks] = useState([])

  // const [templates] = useFirebase([], '/recipe_templates/')

  const RECIPE_CATEGORIES = [
    { name: 'Chicken', value: 'chicken' },
    { name: 'Beef', value: 'beef' },
    { name: 'Egg', value: 'egg' },
    { name: 'Cheese', value: 'cheese' },
    { name: 'Lamb', value: 'lamb' },
    { name: 'Pasta', value: 'pasta' },
    { name: 'Dessert', value: 'dessert' },
    { name: 'Vegetarian', value: 'vegetarian' },
    { name: 'Vegan', value: 'vegan' },
    { name: 'Fish', value: 'fish' },
    { name: 'Sausage', value: 'sausage' },
    { name: 'Pork', value: 'pork' }
  ]

  const recipe_CHECKS = [
    { name: 'Pass', value: 'pass' },
    { name: 'Defect', value: 'defect' },
    { name: 'Monitor', value: 'monitor' },
    { name: 'N/A', value: 'n/a' },
    { name: 'N/C', value: 'n/c' }
  ]

  const RECIPE_DIFFICULTY = [
    { name: 'Easy', value: 'easy' },
    { name: 'Medium', value: 'medium' },
    { name: 'Hard', value: 'hard' }
  ]

  // Submit Template
  const handleSubmit = async () => {
    const existing = templates.find(t => t.id == r)

    if (!existing) {
      // Create an object with the information and fields
      const _recipe = {
        ...form,
        fields: recipe,
        checks: selectedChecks
      }

      await addFirebaseDoc('/recipe_templates/', _recipe)

      toast.success('Woo! That template went in with no problems')
    } else {
      const _recipe = {
        id: r,
        ...form,
        fields: recipe,
        checks: selectedChecks
      }

      await updateFirebaseDoc('/recipe_templates/', r, _recipe)

      toast.success('Wicked man! That template was updated')
    }

    return router.push('/dashboard/templates')
  }

  const addFormDetails = event => {
    event.preventDefault()
 
    setRecipe(state => ({
      ...state,
      details: form
    }))

    setForm(null)
  }
  
  const addFormIngredient = event => {
    event.preventDefault()

    // TODO Works on first run not second makes inner array so you have an array of arrays make array of objects
    // setRecipe({
    //   ingredients: recipe.ingredients ? {...recipe.ingredients, ingredient} : ingredient
    // })

    setIngredientList([...ingredientList, ingredient])
    setIngredient([])
  }
    console.log(ingredientList)
  const addFormSteps = event => {
    event.preventDefault()

    setRecipe(state => {
      return { ...state, [steps.id]: { name: steps.name, id: steps.id, fields: [] } }
    })

    setSteps({ id: null, name: null })
  }

  const addFieldToCategory = event => {
    event.preventDefault()

    setRecipe(state => {
      return {
        ...state,
        [field.category_id]: {
          ...state[field.category_id],
          fields: [
            ...state[field.category_id].fields,
            { id: field.id ?? null, status: null }
          ]
        }
      }
    })

    setField({ id: null, category_id: null, im_code: null })
  }

  const setFieldStatus = (category_id, field_id, status) => {
    setRecipe(state => {
      return {
        ...state,
        [category_id]: {
          ...state[category_id],
          fields: state[category_id].fields.map(item => (item.id == field_id ? { ...item, status } : item))
        }
      }
    })
  }

  const toggleCheck = (name, value) => {
    setChecks(state => {
      const existing = state.find(i => i.name == name)

      if (existing) {
        setChecks(state => state.filter(i => i.name !== name))
      } else {
        setChecks(state => [...state, { name: name, value }])
      }
    })
  }

  // Auto generate Category ID
  useEffect(() => {
    if (steps.name) {
      setSteps({ id: steps.name.replaceAll(' ', '-').toLowerCase() })
    }
  }, [steps.name])

  // Place recipe details if existing
  useEffect(async () => {
    if (r) {
      const _recipe = await getFirebaseDoc('/recipe_templates/', r)

      setForm({
        id: r,
        name: _recipe.name,
        desc: _recipe.desc,
        steps: _recipe.steps,
        type: _recipe.type
      })

      setRecipe(_recipe.fields)

      setChecks(_recipe.checks)
    }
  }, [r])

  return (
    <>
      <Button variant='action' onClick={() => handleSubmit()}>
        {!r ? 'Add' : 'Update'} Recipe Template
      </Button>

      <Grid columns={2} className='bg-gray-100 p-4 rounded text-xs'>
        <div>
            <Grid columns={1}>
              <Widget>
                <WidgetTitle icon='file-lines'>Recipe Details</WidgetTitle>
                <WidgetContent>
                  <form onSubmit={addFormDetails}>
                    <Grid columns={1}>
                      <FormField label='Name' value={form.name} onChange={e => setForm({ name: e })} /> 
                      <FormField label='Description' value={form.desc} onChange={e => setForm({ desc: e })} /> 
                      <Grid columns={2}>
                        <FormSelect
                          label='Type'
                          value={form.type}
                          onChange={e => setForm({ type: e })}
                          options={RECIPE_DIFFICULTY}
                        />
                        <FormSelect
                          label='Category'
                          value={form.steps}
                          onChange={e => setForm({ steps: e })}
                          options={RECIPE_CATEGORIES}
                        />
                      </Grid>
                    </Grid>
                    <FormSubmit disabled={!form}>Add Details</FormSubmit>
                  </form>
                </WidgetContent>
              </Widget>
            </Grid>
        </div>
        <div>
          <Widget>
            <WidgetTitle icon='folder-tree'>Steps</WidgetTitle>
            <WidgetContent>
              <form onSubmit={addFormSteps}>
                <Grid columns={2}>
                  <FormField label='Name' value={steps.name} onChange={e => setSteps({ name: e })} />
                  <FormField label='ID' value={steps.id} disabled />
                </Grid>
                <FormSubmit disabled={!steps.name || !steps.id}>Add A Step</FormSubmit>
              </form>
            </WidgetContent>
          </Widget>
        </div>
        <div>
          <Widget>
            <WidgetTitle icon='folder-tree'>Ingredients</WidgetTitle>
            <WidgetContent>
              <form onSubmit={addFormIngredient}>
                <Grid columns={1}>
                  <FormField label='Ingredient' value={ingredient} onChange={e => setIngredient(e)} />
                </Grid>
                <FormSubmit disabled={!ingredient}>Add Ingredient</FormSubmit>
              </form>
            </WidgetContent>
          </Widget>
        </div>
        <div>
          <Widget>
            <WidgetTitle icon='list-tree'>Fields</WidgetTitle>
            <WidgetContent>
              <form onSubmit={addFieldToCategory}>
                <Grid columns={2}>
                  <FormSelect
                    label='Category'
                    value={field.category_id}
                    onChange={e => setField({ category_id: e })}
                    options={
                      recipe &&
                      Object.values(recipe).map(recipe => {
                        return {
                          name: recipe.name,
                          value: recipe.id
                        }
                      })
                    }
                  />
                  <FormField label='Step Instructions' value={field.id} onChange={e => setField({ id: e })} />
                </Grid>
                <FormSubmit disabled={!field.id || !field.category_id}>Add Instructions</FormSubmit>
              </form>
            </WidgetContent>
          </Widget>
        </div>
      </Grid>
      <div className='bg-gray-100 mt-4 p-4 rounded text-xs'>
          <Widget className='col-span-2'>
            <WidgetTitle icon='eye'>Preview</WidgetTitle>
            <WidgetContent>
              <Grid columns={2}>
                <div className='border p-2 rounded'>
                  <Grid columns={1}>
                  <Image 
                    src='/ad-placeholder.png'
                    width={85} 
                    height={585} 
                  />
                    <span>
                      <Label text='Name' />
                      <p>{form.name}</p>
                    </span>
                  </Grid>
                </div>
                <div className='border p-2 rounded'>
                  <Grid columns={1} className='text-center p-2 rounded gap-18 text-xs'>
                    <span className='top-24'>
                      <Label text='Description' />
                      <p>{form.desc}</p>
                    </span>
                    <span>
                      <Label text='Difficulty' />
                      <p>{form.type}</p>
                    </span>
                    <span>
                      <Label text='ingredient' />
                      <Grid columns={1}>
                        <ul>
                          {ingredientList &&
                            ingredientList.map((ingredient, index) => {
                              const id = uniqueId()

                              return (
                                <li className={'flex flex-col h-24 items-center justify-center relative w-1/2'} key={id}>
                                  <p>{ingredient}</p>
                                </li>
                              )
                            })}
                        </ul>
                      </Grid>
                    </span>
                    <span>
                      <Label text='Category' />
                      <p>{form.steps}</p>
                    </span>
                  </Grid>
                </div>
                <div className='border p-2 rounded'>
                  <Grid columns={1} className='text-center p-2 rounded gap-18 text-xs'>
                    <Label text='Ingredients'/>
                  </Grid>
                </div>
                {Object.values(recipe).map((recipe, index) => {
                  return (
                    <div key={index} className='border p-2 rounded'>
                      <Label text={recipe.name} />
                      <Grid columns={1}>
                        <ul>
                          {recipe.fields &&
                            recipe.fields.map((field, index) => {
                              const id = uniqueId()

                              return (
                                <li className={'flex flex-col h-24 items-center justify-center relative w-1/2'} >
                                  <p>{field.id}</p>
                                </li>
                              )
                            })}
                        </ul>
                      </Grid>
                    </div>
                  )
                })}
              </Grid>
            </WidgetContent>
          </Widget>
      </div>
    </>
  )
}