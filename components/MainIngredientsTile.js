// Next
import Link from 'next/link'
import Image from 'next/image'

export default function MainIngrdientsTile({ingredientName, image}) {


  return (
    <div className="feature">         
      <Image 
        src={image}
        width={85} 
        height={85} 
      />
      <div className="feature-text">
        {`${ingredientName}`}
      </div>

      <style jsx>{`
        .feature{
          height: 200px;
          overflow-y: hidden;
          border: 1px black solid;
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-direction: column;
        }
        .feature:hover{
          transition: 0.3s;
          background-color: #f00;
        }
        
      `}
      </style>
   </div>
  )
}