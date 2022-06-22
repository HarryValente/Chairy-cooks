// Next
import Link from 'next/link'
import Image from 'next/image'
import Button from './Button'

export default function RecipeCard({recipe}) {
  const { title, slug, cookingTime, thumbnail } = recipe.fields

  const saveRecipeToLS = async (card) => {
    console.log('hi')
    console.log(card)
  }

  return (
    <div className="homepageCard">
      <div className="homepageCardImage">
        <Image 
          src={'https:' + thumbnail.fields.file.url} 
          // width={285} 
          // height={285} 
          layout='fill' 
          // height={thumbnail.fields.file.details.image.height} 
        />
      </div>
      <div className='homepageContent'>
        <p>Italian, Vegetarian, Light</p>
        <h1>{title}</h1>
        <h4>Super thick blueberry banana smoothies are a breeze to whip up for a morning on the go. This recipe can be made with or without dairy pick whichever version works best for you!</h4>
        
        <Link href={'/recipe/' + slug}>
          <button className="homepageButton" role="button">Full recipe</button>
        </Link>
        {/* <Button className={'absolute bottom-0 left-0'} onClick={card => saveRecipeToLS(card)}>
          +
        </Button> */}
      </div>
    </div>
  )
}