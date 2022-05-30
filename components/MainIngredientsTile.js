// Next
import Link from 'next/link'
import Image from 'next/image'

export default function MainIngrdientsTile({ingredientName, image}) {

  return (
    <Link href={'/catagory/' + ingredientName}>
      <div className="catagory">         
        <Image 
          src={image}
          width={70} 
          height={70} 
          />
        <div className="catagory-text">
          {`${ingredientName}`}
        </div>
      </div>
    </Link>
  )
}