import Link from "next/link";

const SimilarRecipe = ({recipe}) => {
  return ( 
    <Link key={recipe.id} href={`/recipes/${recipe.id}`}>         
      <div className='recipeSimilarRecipe'>
        <img src={recipe.main_image.url}></img>
        <div className="recipeSimilarDetails">
          <h4>{recipe.name}</h4>
        </div>
      </div>
    </Link>
   );
}
 
export default SimilarRecipe;