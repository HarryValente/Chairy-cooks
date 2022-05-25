// Next
import Link from 'next/link'
import Image from 'next/image'

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function MainIngrdientsTile({ingredientName, image, test}) {

  return (
    <div className="feature">         
      {/* <Image 
        src={image}
        width={85} 
        height={85} 
      /> */}
      <FontAwesomeIcon icon={faStar}/>
      <div className="feature-text">
        {`${ingredientName}`}
      </div>

      <style jsx>{`
        .feature{
          height: 200px;
          overflow-y: hidden;
          border: 1px #B0B3B8 solid;
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-direction: column;
        }
        .feature:hover{
          transition: 0.3s;
          background-color: #f00;
          box-shadow: rgb(0 0 0 / 10%) 0px 4px 6px -1px, rgb(0 0 0 / 6%) 0px 2px 4px -1px;
          border: 1px solid rgba(71, 71, 71, 0.1);
        }
        
      `}
      </style>
   </div>
  )
}