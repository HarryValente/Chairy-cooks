// Contentful
import { createClient } from "contentful"

// Components
import RecipeCard from "../components/RecipeCard";

export async function getStaticProps() {
  // Link to contentful with API-Key / process.env is in the .env.local file for github concerns
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  // Gets items from contentful space
  const res = await client.getEntries({content_type: 'recipe'})
  return {
    props: { recipes: res.items },
    revalidate: 1
  }
}

export default function Recipes({recipes}) {
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.sys.id} recipe={recipe}/>
      ))}

      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}
      </style>
    </div>
  )
}