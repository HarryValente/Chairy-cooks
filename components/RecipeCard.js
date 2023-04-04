// Next
import Link from 'next/link'
import Image from 'next/image'

export default ({recipe}) => {
  const { featuredImage, title, slug, shortDescription } = recipe.fields

  return (
    <>
      <Link key={title} href={`/recipes/${slug}`}>
        <div className="homepageCard">
          <div className="homepageCardImage">
            <Image 
              alt={'https:' + featuredImage.fields.description}
              src={'https:' + featuredImage.fields.file.url}
              layout='fill'  
            />
          </div>
          <div className='homepageContent'>
            <p>Italian, Vegetarian, Light</p>
            <h1>{title}</h1>
            <h4>{shortDescription}</h4>
              <button className="homepageButton" role="button">Full recipe</button>
          </div>
        </div>
      </Link>
    </>
  )
}