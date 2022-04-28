// React
import { useEffect, useState, useRef } from 'react'

// Hooks
import useForm from '../hooks/useForm'
import useFirebase from '../hooks/useFirebase'

// Next
import { useRouter } from 'next/router'
import Image from "next/image";

// Firebase
import { addFirebaseDoc } from '../firebase/index'

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faStar } from '@fortawesome/free-solid-svg-icons'

// Components
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import Grid from '../components/Grid'
import Label from '../components/Label'
import { Widget, WidgetTitle, WidgetContent } from '../components/Widget'
import { FormField, FormSelect, FormSubmit } from '../components/Form'

import { find, uniqueId } from 'lodash'
import { fetchSignInMethodsForEmail } from 'firebase/auth';

export default ({ recipe: r }) => {
  const router = useRouter()

  const [form, setForm] = useForm()
  const [recipe, setRecipe] = useState({
    ingredients: [],
    tags: [],
    steps: []
  })

  const uploader = useRef(null)

  const [steps, setSteps] = useForm()
  const [ingredient, setIngredient] = useState([])
  const [ingredientList, setIngredientList] = useState([])
  const [stepsList, setStepsList] = useState([])
  const [tag, setTag] = useState([])
  const [tagList, setTagList] = useState([])
  const [logo, setLogo] = useState(null)
  const [instruction, setInstruction] = useForm()

  const [selectedChecks, setChecks] = useState([])

  const [templates] = useFirebase([], '/recipe_templates/')

  console.log(recipe)
  console.log('recipe')
  console.log(form)
  console.log('form')

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
        checks: selectedChecks,
        ingredients: ingredientList,  
        steps: stepsList,
        tags: tagList  
      }

      await updateFirebaseDoc('/recipe_templates/', r, _recipe)

      // toast.success('Wicked man! That template was updated')
    }

    return router.push('/templates')
  }

  const uploadLogo = async file => {
    console.log(file)
    console.log(file.name)

    // await addStorageItem(`/users/${_user}/logo/`, file, file.name)
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

    setRecipe({...recipe, ingredients:[...recipe.ingredients, ingredient ]})
    setIngredient([])
  }

  const addFormTag = event => {
    event.preventDefault()
    
    setRecipe({...recipe, tags:[...recipe.tags, tag ]})
    setTag([])
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

    /**
     * TODO - this code above creates 2 state.steps code below removes duplicates fix it so code below isn't needed
     * @author Harry
     */
    let uniqueArray = recipe.steps.filter(function(item, pos) {
      return recipe.steps.indexOf(item) == pos;
    })
    setRecipe(state => {
      return {
        ...state,
        steps: uniqueArray
      }
    })

    setInstruction({ id: null, category_id: null })
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
      const _recipe = await getFirebaseDoc('/recipe_templates/', r)

      setForm({
        id: r,
        name: _recipe.name,
        desc: _recipe.desc,
        category: _recipe.category,
        difficulty: _recipe.difficulty
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
                      label='Difficulty'
                      value={form.difficulty}
                      onChange={e => setForm({ difficulty: e })}
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
                <FormSubmit disabled={!form}>Add Details</FormSubmit>
              </form>
            </WidgetContent>
          </Widget>
        </Grid>

        <Widget>
          <WidgetTitle icon='folder-tree'>Image</WidgetTitle>
          <Label text={'Main image upload'} />
          <input type='file' className='hidden' ref={uploader} onChange={e => uploadLogo(e.target.files[0])} />
          <div
            className='bg-gray-100 border cursor-pointer flex flex-col items-center justify-center p-2 py-4 rounded text-sm'
            onClick={() => uploader.current.click()}
          >
            {logo ? `${logo.name}` : 'No file selected (.png)'}
          </div>
        </Widget>

        <Widget>
          <WidgetTitle icon='folder-tree'>Tags</WidgetTitle>
          <WidgetContent>
            <form onSubmit={addFormTag}>
              <Grid columns={1}>
                <FormField label='Recipe tags' value={tag} onChange={e => setTag(e)} />
              </Grid>
              <FormSubmit disabled={!tag}>Add tag</FormSubmit>
            </form>
          </WidgetContent>
        </Widget>

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

        <Widget>
          <WidgetTitle icon='list-tree'>Instructions</WidgetTitle>
          <WidgetContent>
            <form onSubmit={addInstructionToStep}>
              <Grid columns={2}>
                <FormSelect
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
                <FormField label='Step Instructions' value={instruction.id} onChange={e => setInstruction({ id: e })} />
              </Grid>
              <FormSubmit disabled={!instruction.id || !instruction.category_id}>Add Instructions</FormSubmit>
            </form>
          </WidgetContent>
        </Widget>

      </Grid>

      <>
        <div className='mt-5'>
          <div className="banner">
            <Image 
              src={'/ad-placeholder.png'}
              width={650}
              height={650}
            />
            <h2>{ recipe.details ? recipe.details.name : '' }</h2>

            <div className="info">
              <div className="description">
                <p>{recipe.details ? recipe.details.desc : ''}</p>
                <p>{recipe.details ? recipe.details.category : ''}</p>
              </div>
              <div className="cooking-info">
                <p>Takes approx 20 mins to cook.</p>
                <p>{ recipe.details ? recipe.details.difficulty : '' }</p>
                <div className='flex justify-center'>
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

          <div className="line-break"></div>
          <div className="cooking-content">
              <div className="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                  {recipe.ingredients &&
                    recipe.ingredients.map((ingredient, index) => {
                      const id = uniqueId()
                      return (
                        <li className={'flex flex-col h-16 items-center justify-center relative w-1/2'} key={id}>
                          <p>○ {ingredient}</p>
                        </li>
                      )
                    })}
                </ul>
              </div>

              <div className="ad">
                ADVERT
              </div>

              <div className="method-container">
              <h3>Method:</h3>
              <ul>
                {recipe.steps &&
                  recipe.steps.map((step, index) => {
                    const id = uniqueId()
                    return (
                      <li className={'flex flex-col h-16 items-center justify-center relative w-1/2'} key={id}>
                        <h1>{step.name}</h1>
                        <p>{step.instruction}</p>
                      </li>
                    )
                  })
                }
              </ul>
              {/* <div className="method">{documentToReactComponents(method)}</div> */}
              </div>
          </div>

          {/*<h1 className="similar-title">Similar recipes</h1>
          <div className="similar-recipe-container">
 
           {similarRecipesArr.map(similarRecipe => {          
            return (
              // <Link href={'/recipes/' + slug}>
                <div className="similar-recipe">
                  <Image 
                    src={'https:' + similarRecipe.image}
                    width={190}
                    height={65}
                    objectFit="cover"
                  />
                  <div className="similar-details">
                    <h4>{similarRecipe.title}</h4>
                    <p>Ciara Beecroft</p>
                  </div>
                </div>
              // </Link>
            )
          })} 
          </div>*/}
                
          <style jsx>{`
                  h2,h3 {
                    text-transform: uppercase;
                  }
                  .banner {
                    display: flex;
                    position: relative;
                  }
                  .banner h2 {
                    margin: 0;
                    background: #fff;
                    display: inline-block;
                    padding: 20px;
                    position: absolute;
                    bottom: 0px;
                    left: -10px;
                    transform: rotateZ(-1deg);
                    box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
                  }
                  .rating{
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                  }
                  .rating-list{
                    list-style-type: none;
                  }
                  .line-break{
                    width: 100%;
                    height: 5px;
                    margin-top: 40px;
                    background-color: #000;
                  }
                  .info{
                    margin-left: 25px;
                    padding: 10px;
                    width: 35%;
                    background-color: #efece2;
                    font-size: 20px;
                    display: flex;
                    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                    align-items: center;
                    justify-content: space-around;
                    flex-direction: column;
                  }
                  .info p {
                    margin: 0;
                  }
                  .description{
                    text-align: center;
                  }
                  .cooking-content{
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-around;
                    width: 100%;
                  }
                  .ingredients{
                    width: 30%;
                    height: 50%;
                    padding: 20px;
                    font-size: 20px;
                  }
                  .ingredients h3{
                    margin-bottom: 25px;
                  }
                  .ingredients-list{
                    list-style-type: '-';
                    margin-top: 6px;
                  }
                  .ad{
                    display: none;
                  }
                  .method-container{
                    width: 70%;
                    font-size: 20px;
                  }
                  .method-container h3{
                    margin-bottom: 25px;
                    margin: 20px;
                  }
                  .method{
                    margin: 20px;
                  }
                  .similar-recipe-container{
                    margin-top: 40px;
                    width: 100%;
                    height: 320px;
                    display: grid; 
                    grid-template-columns: 1fr 1fr; 
                    grid-template-rows: 1fr 1fr; 
                    grid-gap: 1em;
                  }
                  .similar-title{
                    position: relative;
                    left: 5px;
                    top: 35px;
                    font-size: 18px;
                  }
                  .similar-recipe{
                    height: 100%;
                    background-color: beige;
                    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                    display: flex;
                  }
                  .similar-details{
                    padding: 5px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-around;
                  }
                  .similar-details h4{
                    font-size: 18px;
                  }
                  .similar-details p{
                    font-size: 16px;
                  }
                  @media (max-width:900px) {
                    .banner{
                      flex-direction: column;
                      align-items: center;
                      height: 750px;
                    }
                    .banner h2 {
                      margin-top: -10px;
                      position: relative;
                      transform: rotateZ(0deg);
                      left: 0px;
                    }
                    .info{
                      width: 75%;
                      margin-top: 10px;
                      margin-left: 0px;
                      font-size: 18px;
                      background-color: beige;
                    }
                    .ingredients{
                      font-size: 14px;
                    }
                    .method{
                      font-size: 18px;
                    }
                    .similar-recipe-container{
                      height: 350px;
                      display: grid; 
                      grid-template-columns: 1fr 1fr; 
                      grid-template-rows: 1fr 1fr; 
                      grid-gap: 1em;
                    }
                    .similar-recipe{
                      width: 100%;
                    }
                    .similar-details{
                      margin-left: 15px;
                    }
                    .similar-details h4{
                      font-size: 18px;
                    }
                    .similar-details p{
                      font-size: 18px;
                    }
                  }
                  @media (max-width:550px) {
                    .banner{
                      flex-direction: column;
                      align-items: center;
                      height: 550px;
                    }
                    .banner h2 {
                      font-size: 18px;
                    }
                    .info{
                      width: 90%;
                      background-color: beige;
                      font-size: 16px;
                    }
                    .cooking-content{
                      display: flex;
                      flex-direction: column;
                      align-items: flex-start;
                      justify-content: space-around;
                      width: 100%;
                    }
                    .ingredients{
                      width: 100%;
                    }
                    .ad{
                      position: relative;
                      background-color: grey;
                      margin: 40px auto;
                      display: inline;
                      height: 150px;
                      width: 90%;
                    }
                    .method{
                      width: 100%;
                    }
                    .similar-recipe-container{
                      height: 650px;
                      grid-template-columns: 1fr; 
                      grid-template-rows: 1fr 1fr 1fr 1fr; 
                    }
                  }
          `}</style>
        </div>
      </>
    </>
  )
}