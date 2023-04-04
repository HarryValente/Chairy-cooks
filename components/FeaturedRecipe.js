// Next
import Link from 'next/link'
import Image from 'next/image'

export default function FeaturedRecipe({ recipe }) {
  const { featuredImage, title, slug } = recipe.fields
  return (
    <Link key={title} href={`/recipes/${slug}`}>
      <div className="feature">

        <div className='featureImage'>
          <Image
            src={'https:' + featuredImage.fields.file.url}
            placeholder='blue'
            layout="fill"
          />
        </div>
              
        <div className="feature-text">
          <h2>{title}</h2>
        </div>
      </div>
    </Link>
  )
}