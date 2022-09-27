// React
import { useEffect, useState, useRef } from 'react'

// Hooks
import useForm from '../hooks/useForm'
import useFirebase from '../hooks/useFirebase'

// Next
import { useRouter } from 'next/router'
import Image from "next/image";

// Firebase
import { addFirebaseDoc, updateFirebaseDoc, addStorageItem, generateFirebaseId } from '../firebase/index'

// Components
import Button from '../components/Button'
import Grid from '../components/Grid'
import Label from '../components/Label'
import Widget from '../components/Widget'
import { FormSubmit } from '../components/Form'

import { uniqueId } from 'lodash'
import Field from './Field';
import Select from './Select';

export default ({ recipe: r }) => {
  const router = useRouter()

  const [form, setForm] = useForm()
  const [recipe, setRecipe] = useState({
    ingredients: [],
    tags: [],
    similar_recipe: [],
    author: '',
    affiliate: [],
    category: [],
    steps: []
  })

  const uploader = useRef(null)

  const [steps, setSteps] = useForm()
  const [ingredient, setIngredient] = useState([])
  const [ingredientList, setIngredientList] = useState([])
  const [stepsList, setStepsList] = useState([])
  const [tag, setTag] = useState([])
  const [author, setAuthor] = useState([])
  const [affiliate, setAffiliate] = useState([])
  const [category, setCategory] = useState([])
  const [tagList, setTagList] = useState([])
  const [file, setFile] = useState(null)
  const [instruction, setInstruction] = useForm()

  const [selectedSimilar, setSelectedSimilar] = useState('')

  const [templates] = useFirebase([], '/all_recipes/')

  const RECIPE_CATEGORIES = [
    { name: 'Chicken', value: 'Chicken' },
    { name: 'Beef', value: 'Beef' },
    { name: 'Egg', value: 'Egg' },
    { name: 'Cheese', value: 'Cheese' },
    { name: 'Lamb', value: 'Lamb' },
    { name: 'Pasta', value: 'Pasta' },
    { name: 'Dessert', value: 'Dessert' },
    { name: 'Vegetarian', value: 'Vegetarian' },
    { name: 'Rice', value: 'Rice' },
    { name: 'Seafood', value: 'Seafood' },
    { name: 'Potato', value: 'Potato' },
    { name: 'Pork', value: 'Pork' }
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
        id: generateFirebaseId(),
        author: recipe.author,
        name: recipe.details.name,
        desc: recipe.details.desc,
        difficulty: recipe.details.difficulty,
        serves: parseFloat(recipe.details.serves),
        time: parseFloat(recipe.details.time),
        ingredients: recipe.ingredients,
        similar_recipe: recipe.similar_recipe,
        steps: recipe.steps,
        tags: recipe.tags,
        rating: 0,
        affiliate: recipe.affiliate,
        homepage_feature: false,
        homepage_page: false,
        category: recipe.category
      }

      await addFirebaseDoc('/all_recipes/', _recipe, _recipe.id)
      await handleImageUpload(_recipe)
        
      _recipe.category.map(async rec => {
        await addFirebaseDoc(`recipes/categories/${rec.toLowerCase() + '_recipes'}/`, _recipe, _recipe.id)
        await handleImageUpload(_recipe, rec.toLowerCase() + '_recipes')
      })
      
    } else {
      const _recipe = {
        id: r,
        recipe_information: recipe,
        ingredients: ingredientList,
        serves: serves,  
        steps: stepsList,
        tags: tagList  
      }
      await updateFirebaseDoc('/all_recipes/', r, _recipe)
    }

    return router.push('/templates')
  }

  const handleImageUpload = async (_recipe, catego) => {
    try {
      addStorageItem(`/recipes/${_recipe.id}/main_image/`, file).then(async url => {
        const mainImage = {
          name: file.name,
          url: url
        }

        const update = await updateFirebaseDoc('/all_recipes/', `${_recipe.id}`, {
          main_image: mainImage
        })

        if (catego) {
          await updateFirebaseDoc(`recipes/categories/${catego}/`, `${_recipe.id}`, {
            main_image: mainImage
          })
        }

        setFile(null)
      })
    } catch (error) {
      console.error({ error })
      toast.error('There was a problem contact hario')
    }
  }

  const addFormDetails = event => {
    event.preventDefault()
    
    if (form.desc && form.difficulty && form.name && form.time) {
      setRecipe(state => ({
        ...state,
        details: form
      }))
      setForm({name: '', desc: '', time: '', serves: '', difficulty: null})
    } else {
      alert('You need to fill out the whole details section beany!!!')
    }
    
  }

  const addFormIngredient = event => {
    event.preventDefault()

    setRecipe({...recipe, ingredients:[...recipe.ingredients, ingredient ]})
    setIngredient([])
  }

  const addFormTag = event => {
    event.preventDefault()
    
    setRecipe({...recipe, tags:[...recipe.tags, tag ]})
    setTag([])
  }

  const addFormAffiliate = event => {
    event.preventDefault()
    
    setRecipe({...recipe, affiliate:[...recipe.affiliate, affiliate ]})
    setAffiliate([])
  }

  const addFormCategory = event => {
    event.preventDefault()
    
    setRecipe({...recipe, category:[...recipe.category, category ]})
    setCategory([])
  }

  const addFormSimilarRecipe = event => {
    event.preventDefault()
    
    setRecipe({...recipe, similar_recipe:[ ...recipe.similar_recipe, selectedSimilar ]})
    setSelectedSimilar('')
  }

  const addFormAuthor = event => {
    event.preventDefault()
    
    setRecipe({...recipe, author:[ author ]})
    setAuthor([])
  }
  
  const addFormSteps = event => {
    event.preventDefault()
    
    setRecipe({...recipe, steps:[...recipe.steps, steps ]})
    setSteps({ id: null, name: null })
  }

  const addInstructionToStep = event => {
    event.preventDefault()

    setRecipe(state => {
      return {
        ...state,
        steps: [
          ...state.steps,
          state.steps.find(step => (step.id == instruction.category_id ? step.instruction = instruction.id : null))
        ]
      }
    })

    let uniqueArray = recipe.steps.filter(function(item, pos) {
      return recipe.steps.indexOf(item) == pos;
    })
    setRecipe(state => {
      return {
        ...state,
        steps: uniqueArray
      }
    })

    setInstruction({ id: '', category_id: null })
  }

  // Auto generate step ID
  useEffect(() => {
    if (steps.name) {
      setSteps({ id: steps.name.replaceAll(' ', '_').toLowerCase() })
    }
  }, [steps.name])

  // Place recipe details if existing
  useEffect(async () => {
    if (r) {
      const _recipe = await getFirebaseDoc('/all_recipes/', r)

      setForm({
        id: r,
        name: _recipe.name,
        desc: _recipe.desc,
        difficulty: _recipe.difficulty
      })

      setRecipe(_recipe.fields)
    }
  }, [r])

  return (
    <>
      <Button variant='action' onClick={() => handleSubmit()}>
        {!r ? 'Add' : 'Update'} Recipe Template
      </Button>

      <Grid columns={2} className='bg-gray-100 p-4 rounded text-xs'>
        <Grid columns={1}>
          <Widget title='Recipe Details'>
              <form onSubmit={addFormDetails}>

                {!recipe.details ? (
                  <p className='font-medium text-vapta-red text-sm'>You still need to link this recipes details</p>
                ) : (
                  <p className='font-medium text-emerald-500 text-sm'>Recipe details added</p>
                )}

                <Grid columns={2}>
                  <Field label='Name' value={form.name} onChange={e => setForm({ name: e })} />
                  <Field label={form.desc ? 'Description ' + form.desc.length + '/250' : 'Description'} value={form.desc} onChange={e => setForm({ desc: e })} />
                  <Field label='Time' type='number' value={form.time} onChange={e => setForm({ time: e })} />
                  <Field label='Serves' type='number' value={form.serves} onChange={e => setForm({ serves: e })} />
                  <Select 
                    label='Difficulty'
                    value={form.difficulty}
                    onChange={e => setForm({ difficulty: e })}
                    options={RECIPE_DIFFICULTY}
                  />
                </Grid>
                <FormSubmit disabled={!form}>Add Details</FormSubmit>
              </form>
          </Widget>
        </Grid>

        <Widget title='Recipe Images' icon='image' color='red'>
          {!file ? (
            <p className='font-medium text-vapta-red text-sm'>You still need to add an image</p>
          ) : (
            <p className='font-medium text-emerald-500 text-sm'>Image added</p>
          )}
          <Label text={'Main image upload'} />
          <input
            type='file'
            className='hidden'
            ref={uploader}
            onChange={e => setFile(e.target.files[0])}
          />

          <div
            className='bg-gray-100 border cursor-pointer flex flex-col items-center justify-center p-2 py-4 rounded text-sm'
            onClick={() => uploader.current.click()}
          >
            {file ? `${file.name}` : 'No file selected (.png)'}
          </div>

          <Grid columns={4}></Grid>
        </Widget>

        <Widget title='Author'>
          <form onSubmit={addFormAuthor}>
            {recipe.author.length == 0 ? (
              <p className='font-medium text-vapta-red text-sm'>You still need to add an author</p>
            ) : (
              <p className='font-medium text-emerald-500 text-sm'>Author added</p>
            )}

            <Grid columns={1}>
              <Field label='Recipe author' required value={author} onChange={e => setAuthor(e)} />
            </Grid>
            <FormSubmit>Add Author</FormSubmit>
          </form>
        </Widget>

        <Widget title='Similar recipes'>
          <form onSubmit={addFormTag}>
            {recipe.similar_recipe.length == 0 ? (
              <p className='font-medium text-vapta-red text-sm'>You still need to link similar recipes</p>
            ) : (
              <p className='font-medium text-emerald-500 text-sm'>Similar recipes added {recipe.similar_recipe.length}/4</p>
            )}

            <Select
              label='All recipes'
              value={selectedSimilar}
              onChange={e => setSelectedSimilar(e)}
              options={templates
                .map(template => {
                  return {
                    name: template.name,
                    value: template.id
                  }
                })}
              className='bg-white'
            />

            <FormSubmit
              variant='action'
              icon='circle-plus'
              onClick={addFormSimilarRecipe}
              className='ml-auto w-fit'
            >
              Add similar recipe
            </FormSubmit>

            {form.similar_recipe_ids &&
              form.similar_recipe_ids.map(id => {
                const technician = templates.find(item => item.id == id)
                if (technician) {
                  return (
                    <p className='flex items-end space-x-4 group'>
                      <p className='text-sm'>{technician.name}</p>
                    </p>
                  )
                } else {
                  return null
                }
              })
            }
          </form>

        </Widget>

        <Widget title='Tags'>
            <form onSubmit={addFormTag}>
              {recipe.tags.length == 0 ? (
                <p className='font-medium text-vapta-red text-sm'>You still need to add relevant tags for this recipe</p>
              ) : (
                <p className='font-medium text-emerald-500 text-sm'>Tags added {recipe.tags.length}/3</p>
              )}
              <Grid columns={1}>
                <Field label='Recipe tags' required value={tag} onChange={e => setTag(e)} />
              </Grid>
              <FormSubmit>Add tag</FormSubmit>
            </form>
        </Widget>

        <Widget title='Ingredients'>
            <form onSubmit={addFormIngredient}>

              {recipe.ingredients.length == 0 ? (
                <p className='font-medium text-vapta-red text-sm'>You still need to add ingredients</p>
              ) : (
                <p className='font-medium text-emerald-500 text-sm'>{recipe.ingredients.length} Ingredients added</p>
              )}

              <Grid columns={1}>
                <Field label='Ingredient' required value={ingredient} onChange={e => setIngredient(e)} />
              </Grid>
              <FormSubmit>Add Ingredient</FormSubmit>
            </form>
        </Widget>

        <Widget title='Steps'>
          <form onSubmit={addFormSteps}>
            {recipe.steps.length == 0 ? (
              <p className='font-medium text-vapta-red text-sm'>You still need to link add the steps to this recipe</p>
            ) : (
              <p className='font-medium text-emerald-500 text-sm'>Steps added, Make sure you add text to each step!</p>
            )}

            <Grid columns={2}>
              <Field label='Name' value={steps.name} onChange={e => setSteps({ name: e })} />
              <Field label='ID' value={steps.id} disabled />
            </Grid>
            <FormSubmit disabled={!steps.name || !steps.id}>Add A Step</FormSubmit>
          </form>
        </Widget>

        <Widget title='Instructions'>
          <form onSubmit={addInstructionToStep}>

            {recipe.steps.length > 0 && (
              <p className='font-medium text-yellow-500 text-sm'>Steps have been added make sure to add instructions to all:)</p>
            )}

            <Grid columns={2}>
              <Select
                label='Step'
                value={instruction.category_id}
                onChange={e => setInstruction({ category_id: e })}
                options={
                  recipe &&
                  Object.values(recipe.steps).map(recipe => {
                    return {
                      name: recipe.name,
                      value: recipe.id
                    }
                  })
                }
              />
              <Field label='Step Instructions' value={instruction.id} onChange={e => setInstruction({ id: e })} />
            </Grid>
            <FormSubmit disabled={!instruction.id || !instruction.category_id}>Add Instructions</FormSubmit>
          </form>
        </Widget>

        <Widget title='Affiliate Links'>
          <form onSubmit={addFormAffiliate}>
            {recipe.affiliate.length == 0 ? (
              <p className='font-medium text-vapta-red text-sm'>You still need to add an affiliate links</p>
            ) : (
              <p className='font-medium text-emerald-500 text-sm'>Affiliate links added {recipe.affiliate.length}/3</p>
            )}

            <Grid columns={1}>
              <Field label='Affiliate links' required value={affiliate} onChange={e => setAffiliate(e)} />
            </Grid>
            <FormSubmit>Add Affiliate</FormSubmit>
          </form>
        </Widget>

        <Widget title='Category'>
          <form onSubmit={addFormCategory}>
            {recipe.category.length == 0 ? (
              <p className='font-medium text-vapta-red text-sm'>You still need to add a category</p>
            ) : (
              <p className='font-medium text-emerald-500 text-sm'>Category added</p>
            )}

            <Grid columns={1}>
              <Select 
                label='Category'
                value={category}
                required
                onChange={e => setCategory(e)}
                options={RECIPE_CATEGORIES}
              />
            </Grid>
            <FormSubmit disabled={!category}>Add Category</FormSubmit>
          </form>
        </Widget>
      </Grid>

      <>
        <div className='mt-5'>
          <div className="recipeHeadlineContainer">
            <div className="recipePageImageContainer">
              <Image 
                src={'/ad-placeholder.png'}
                width={650}
                height={650}
              />
              <h2>{ recipe.details ? recipe.details.name : '' }</h2>
            </div>

            <div className="recipeInfo">
              <div className="recipeDescription">
                <p>{recipe.details ? recipe.details.desc : ''}</p>
                <p>{recipe.category ? recipe.category : ''}</p>
              </div>
              <div className="recipeCookingInfo">
                <p>Takes approx {recipe.details ? recipe.details.time : 0} mins to cook.</p>
                <p>{ recipe.details ? recipe.details.difficulty : '' }</p>
                <div>
                  {recipe.tags &&
                    recipe.tags.map((tag, index) => {
                      return (
                        <p key={index}>{tag}, </p>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>

          <div className="recipeLineBreak"></div>

          <div className="recipeInformationContainer">
              <div className="recipeInformationIngredients">
                <h3>Ingredients:</h3>
                <ul>
                  {recipe.ingredients &&
                    recipe.ingredients.map((ingredient, index) => {
                      const id = uniqueId()
                      return (
                        <li key={id}>
                          <p>○ {ingredient}</p>
                        </li>
                      )
                    })}
                </ul>
              </div>

              <div className="recipeMethodContainer">
              <h3>Method:</h3>
              <ul>
                {recipe.steps &&
                  recipe.steps.map((step, index) => {
                    const id = uniqueId()
                    return (
                      <li key={id}>
                        <h1>{step.name}</h1>
                        <p>{step.instruction}</p>
                      </li>
                    )
                  })
                }
              </ul>
              {recipe.author && (
                <Grid columns={4}>
                  <h1>{recipe.author}</h1>
                </Grid>
              )}
              </div>
          </div>

          <h1 className="recipeSimilarTitle">Similar recipes</h1>
          <div className="recipeSimilarRecipeContainer">
            {form.similar_recipe_ids &&
              form.similar_recipe_ids.map(id => {
                const similarRecipe = templates.find(item => item.id == id)
                if (similarRecipe) {
                  return (
                    <div key={id} className='recipeSimilarRecipe'>
                      <div className="recipeSimilarDetails">
                        <h4>{similarRecipe.name}</h4>
                      </div>
                    </div>
                  )
                } else {
                  return null
                }
              })
            }
          </div>
        </div>
      </>
    </>
  )
}