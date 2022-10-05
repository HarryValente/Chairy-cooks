import Image from "next/image";

export default () => {
  return (
    <div className='advert'>
      <Image 
        src='/ad-placeholder.png'
        layout='fill'
      />
      <style jsx>{`
        .advert{
          position: relative;
          margin: 120px auto;
          width: 1000px;
          height: 300px;
        }
      `}
      </style>
    </div>
  )
}