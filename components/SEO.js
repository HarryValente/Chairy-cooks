// Next
import Head from 'next/head'

export default (recipeDetails) => {
  const recipe = recipeDetails.recipeDetails
  return (
    <>
      {recipe && (   
        <Head>
          {/* <title>test</title> */}
          <title>{recipe.name}</title>

          <meta name='description' content={recipe.desc} />
        </Head>
      )}
    </>

  )
}
