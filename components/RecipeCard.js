import { useState, useEffect } from 'react'
// Next
import Link from 'next/link'
import Image from 'next/image'

export default ({recipe: data}) => {
  const [recipes, set] = useState()

  useEffect(() => {
    if (data) {
      set(data)
    }
  }, [data])

  return (
    <>
      {recipes &&
        recipes.map(rec => (
          <Link key={rec.id} href={`/recipes/${rec.id}`}>
            <div className="homepageCard">
              <div className="homepageCardImage">
                <img src={rec.main_image.url} alt={rec.main_image.name}></img>
              </div>
              <div className='homepageContent'>
                <p>{rec.tags.join(', ')}</p>
                <h1>{rec.name}</h1>
                <h4>{rec.desc}</h4>
                <Link href={`/recipes/${rec.id}`}>
                  <button className="homepageButton" role="button">Full recipe</button>
                </Link>
              </div>
            </div>
          </Link>
        ))
      }
    </>
  )
}