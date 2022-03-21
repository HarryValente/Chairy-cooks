// Next
import Link from 'next/link'
import Image from 'next/image'
import Button from './Button'

export default function FeaturedRecipe() {
  const saveRecipeToLS = async (card) => {
    console.log('hi')
    console.log(card)
  }

  return (
    <div className="feature hover:mt-5">
      <div className="img-here"></div>
      <div className="feature-text">
        <div> 
          <h1>Peanut butter smoothie</h1>
          <p>Comfort, Wintery</p>
        </div>
        <Button className={'absolute bottom-0 left-0'} onClick={card => saveRecipeToLS(card)}>
          +
        </Button>
      </div>

      <style jsx>{`
        .featured-container {
          position: relative;
          max-width: 1200px;
          height: 300px;
          margin: auto;
          margin-top: 50px;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .feature{
          width: 350px;
          height: 300px;
          overflow-y: hidden;
        }
        .img-here{
          width: 350px;
          height: 230px;
          background-color: #f00
        }
        .feature-text{
          display:flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px;
        }
        .feature-text p{
          color: #f14400;
          font-size: 14px;
        }
        .feature-text h1{
          font-size: 16px;
        }
      `}
      </style>
   </div>
  )
}