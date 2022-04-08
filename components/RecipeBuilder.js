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

export default ({ report: r }) => {
  const router = useRouter()

  const [form, setForm] = useForm() // Report information/details
  const [report, setReport] = useState({}) // Report Fields

  const [category, setSteps] = useForm() // Temporary hold for creating categories
  const [ingredient, setIngredient] = useForm() // Temporary hold for creating categories
  const [field, setField] = useForm() // Temporary hold for creating fields

  const [selectedChecks, setChecks] = useState([])

  // const [templates] = useFirebase([], '/report_templates/')

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

  const REPORT_CHECKS = [
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
      const _report = {
        ...form,
        fields: report,
        checks: selectedChecks
      }

      await addFirebaseDoc('/report_templates/', _report)

      toast.success('Woo! That template went in with no problems')
    } else {
      const _report = {
        id: r,
        ...form,
        fields: report,
        checks: selectedChecks
      }

      await updateFirebaseDoc('/report_templates/', r, _report)

      toast.success('Wicked man! That template was updated')
    }

    return router.push('/dashboard/templates')
  }

  const addFormSteps = event => {
    event.preventDefault()

    setReport(state => {
      return { ...state, [category.id]: { name: category.name, id: category.id, fields: [] } }
    })

    setSteps({ id: null, name: null })
  }

  const addFormIngredient = event => {
    event.preventDefault()

    setReport(state => {
      return { ...state, ingredient: ingredient.name }
    })

    setIngredient({ name: null })
  }

  const addFieldToCategory = event => {
    event.preventDefault()

    setReport(state => {
      return {
        ...state,
        [field.category_id]: {
          ...state[field.category_id],
          fields: [
            ...state[field.category_id].fields,
            { id: field.id ?? null, im_code: field.im_code ?? null, status: null }
          ]
        }
      }
    })

    setField({ id: null, category_id: null, im_code: null })
  }

  const setFieldStatus = (category_id, field_id, status) => {
    setReport(state => {
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
    if (category.name) {
      setSteps({ id: category.name.replaceAll(' ', '-').toLowerCase() })
    }
  }, [category.name])

  // Place Report details if existing
  useEffect(async () => {
    if (r) {
      const _report = await getFirebaseDoc('/report_templates/', r)

      setForm({
        id: r,
        name: _report.name,
        desc: _report.desc,
        category: _report.category,
        type: _report.type
      })

      setReport(_report.fields)

      setChecks(_report.checks)
    }
  }, [r])

  return (
    <>
 
      <Button variant='action' onClick={() => handleSubmit()}>
        {!r ? 'Add' : 'Update'} Recipe Template
      </Button>

      <Grid columns={2} className='mb-8'>
          <div>
            <Grid columns={1}>
              <Widget>
                <WidgetTitle icon='file-lines'>Recipe Details</WidgetTitle>
                <WidgetContent>
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
                        value={form.category}
                        onChange={e => setForm({ category: e })}
                        options={RECIPE_CATEGORIES}
                      />
                    </Grid>
                  </Grid>
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
                    <FormField label='Name' value={category.name} onChange={e => setSteps({ name: e })} />
                    <FormField label='ID' value={category.id} disabled />
                  </Grid>
                  <FormSubmit disabled={!category.name || !category.id}>Add A Step</FormSubmit>
                </form>
              </WidgetContent>
            </Widget>
          </div>
          <div>
            <Widget>
              <WidgetTitle icon='folder-tree'>Ingredients</WidgetTitle>
              <WidgetContent>
                <form onSubmit={addFormIngredient}>
                  {JSON.stringify(category.ingredient)}
                  <Grid columns={2}>
                    <FormField label='Ingredient' value={category.ingredient} onChange={e => setIngredient({ ingredient: e })} />
                  </Grid>
                  <FormSubmit disabled={!category.ingredient || !category.id}>Add Ingredient</FormSubmit>
                  {/* <FormField label='Step Instructions' value={field.id} onChange={e => setField({ id: e })} /> */}
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
                        report &&
                        Object.values(report).map(report => {
                          return {
                            name: report.name,
                            value: report.id
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
        <Widget className='col-span-2 mt-8'>
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
                    <p>{form.ingredient}</p>
                  </span>
                  <span>
                    <Label text='Category' />
                    <p>{form.category}</p>
                  </span>
                </Grid>
              </div>
              <div className='border p-2 rounded'>
                <Grid columns={1} className='text-center p-2 rounded gap-18 text-xs'>
                  <Label text='Ingredients'/>
                </Grid>
              </div>
              {Object.values(report).map((report, index) => {
                return (
                  <div key={index} className='border p-2 rounded'>
                    <Label text={report.name} />
                    <Grid columns={1}>
                      <ul>
                        {report &&
                          report.fields.map((field, index) => {
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
      {/* </Grid> */}
    </>
  )
}
