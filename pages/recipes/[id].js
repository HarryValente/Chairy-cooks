// Hooks
import { useEffect, useState } from 'react'
import useFirebase from '../../hooks/useFirebase'
import useLocalStorage from '../../hooks/useLocalStorage'
import useToggle from '../../hooks/useToggle'

// Next
import { useRouter } from 'next/router'
import Image from 'next/image'
import Advert from '../../components/Advert'

// Firebase
import { getFirebaseDoc } from '../../firebase/index'

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faStar } from '@fortawesome/free-solid-svg-icons'

// Components
import Layout from '../../components/Layout'
import ProtectedRoute from '../../components/ProtectedRoute'
import Grid from '../../components/Grid'
import Button from '../../components/Button'
import Label from '../../components/Label'
import Page from '../../components/Page'
import {Widget, WidgetContent, WidgetTitle} from '../../components/Widget'

// Modules
import moment from 'moment'
import { uniqueId } from 'lodash'
import { motion } from 'framer-motion'

export default ({}) => {
  const router = useRouter()

  const [_user] = useLocalStorage('_user')

  const [report, set] = useState()
  const [templates] = useFirebase([], '/recipe_templates/')

  const setFieldStatus = (category_id, field_id, status) => {
    set(state => {
      return {
        ...state,
        [category_id]: {
          ...state[category_id],
          fields: state[category_id].fields.map(item => (item.id == field_id ? { ...item, status } : item))
        }
      }
    })
  }

  useEffect(async () => {
    if (router.query.id) {
      const _report = await getFirebaseDoc('recipe_templates/', router.query.id)
      // const _template = templates.find(t => t.name == _report.report_code)
      const _template = templates.find(t => t.id == _report.id)

      if (_report && _template)
        set({ ..._report, template: _template })
    }
  }, [router, templates])

  console.log(report)
  console.log('report123')
  return (
    <ProtectedRoute>
      <>
        {report && (
          <>
            <div>
              <div className="banner">
                  <Image 
                    src={'/ad-placeholder.png'}
                    width={650}
                    height={650}
                  />
                  <h2>{ report.name }</h2>

                  <div className="info">
                    <div className="description">
                      <p>{report.desc}</p>
                    </div>
                    <div className="cooking-info">
                      <p>Takes about { report.type } mins to cook.</p>
                      <div className="rating">
                        <p>Rating:</p>
                        <ul className="rating-list">
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                        </ul>
                      </div>
                      <p>Notes Read 141 community space.</p>
                    </div>
                  </div>
              </div>

              <div className="line-break"></div>

              <div className="cooking-content">
                  <div className="ingredients">
                    <h3>Ingredients:</h3>

                    {/* {ingredients.map(ing => (
                      <ul className="ingredients-list">
                        <li key={ing}>{ing}</li>
                      </ul>
                    ))} */}
                  </div>

                  <div className="ad">
                      ADVERT
                  </div>

                  <div className="method-container">
                    <h3>Method:</h3>
                    {/* <div className="method">{documentToReactComponents(method)}</div> */}
                  </div>
              </div>

              <h1 className="similar-title">Similar recipes</h1>
              <div className="similar-recipe-container">

                  {/* creates similar recipes to click on */}
                  {/* {similarRecipesArr.map(similarRecipe => {          
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
                  })} */}

              </div>
                

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
        )}
      </>
    </ProtectedRoute>
  )
}
