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
    <div className="card">
      <div className="featured">
        <Image 
          src={'https:' + thumbnail.fields.file.url} 
          width={285} 
          height={285} 
          // height={thumbnail.fields.file.details.image.height} 
        />
      </div>
      <div className='content'>
        <p>Italian, Vegetarian, Light</p>
        <h1>{title}</h1>
        <h4>Super thick blueberry banana smoothies are a breeze to whip up for a morning on the go. This recipe can be made with or without dairy pick whichever version works best for you!</h4>
        <Link href={'/recipes/' + slug}>
            <h5>Full recipe</h5>
        </Link>
        <Button className={'absolute bottom-0 left-0'} onClick={card => saveRecipeToLS(card)}>
          +
        </Button>
      </div>
      {/* <div className="content">
        <div className="info">
          <h4>{title}</h4>
          <p>Takes approx {cookingTime} mins to make</p>
          <Button onClick={card => saveRecipeToLS(card)}>
            +
          </Button>
        </div>
        <div className="actions">
          <Link href={'/recipes/' + slug}>
            <a>Cook this</a>
          </Link>
        </div>
      </div> */}

      <style jsx>{`
        .card{
          width: 650px;
          height: 285px;
          display: flex;
          background-color: #ffffff;
          // padding: 5px;
          transition: 0.5s;
          box-shadow: rgb(0 0 0 / 10%) 0px 4px 6px -1px, rgb(0 0 0 / 6%) 0px 2px 4px -1px;
          border: 1px solid rgba(71, 71, 71, 0.1);
        }
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          text-align: center;
          padding: 10px;
          max-width: 360px;
        }
        .content p{
          color: #f14400;
          text-decoration: underline;
          margin: 0 0 0 10px;
          align-self: flex-start;
          font-size: 14px;
        }
        .content h1{
          font-size: 24px;
          font-weight: 700;
          margin-top: -20px;
        }
        .content h4{
          font-size: 12px;
          font-weight: 500;
        }
        .content h5{
          color: #f14400;
          align-self: flex-end;
          margin-right: 10px;
          font-size: 16px;
          font-weight: 600;
        }
        .info {
          padding: 16px;
        }
        .info h4 {
          margin: 4px 0;
          text-transform: uppercase;
        }
        .info p {
          margin: 0;
          color: #777;
        }
        .actions {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
        }
        .actions a {
          color: #fff;
          background: #f01b29;
          padding: 16px 24px;
          text-decoration: none;
        }
      `}</style>
    </div>
  )
}