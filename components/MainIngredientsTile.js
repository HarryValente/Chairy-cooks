// Next
import Link from 'next/link'
import Image from 'next/image'
import Button from './Button'

export default function MainIngrdientsTile({ingredientName}) {


  return (
    <div className="feature">
      <div className="img-here"></div>
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
          
          background-color: #f00;
        }
        .img-here{
          background-color: grey;
          width: 50px;
          height: 50px;
        }
        
      `}
      </style>
   </div>
  )
}