import Link from "next/link";

const SimilarRecipe = ({simRecipes}) => {
  const { slug, title, shortDescription, featuredImage } = simRecipes.fields
  return ( 
    <Link key={slug} href={`/recipes/${slug}`}>         
      <div className='recipeSimilarRecipe'>
        <img src={featuredImage.fields.file.url}></img>
        <div className="recipeSimilarDetails">
          <h4>{title}</h4>
        </div>
      </div>
    </Link>
   );
}
 
export default SimilarRecipe;