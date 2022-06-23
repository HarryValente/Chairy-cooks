import Image from 'next/image'

export const About = () => {
  return(
    <div className="aboutUsContainer">
      <h1>About Us</h1>
      <h3>This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test This is a test.</h3>
      <div className="aboutUsMain">
        <div className='aboutUsPhoto'>
          <Image 
            src={'/ad-placeholder.png'}
            width={550}
            height={650}
          />
        </div>
        <div className='aboutUsText'>
          I started deliciously ella back in 2012 whilst I was still at university. In 2011, I had been diagnosed with a condition called postural tachycardia syndrome, as well as ehlers-danlos and mast cell activation disorder, following four months in and out of hospital. The condition affected the workings of my autonomic nervous system  I couldnt control my heart rate and blood pressure properly, while also struggling with digestive issues, chronic fatigue, a series of infections and a whole host of other symptoms. I was prescribed a cocktail of medication, but unfortunately, they had limited success in managing the condition and after about a year I hit rock bottom, both physically and mentally.
          <br />
          <br />
          At this point, I started looking into other ways of managing the condition and began researching whether a change in diet and lifestyle may be able to help.
          <br />
          <br />
          Encouraged by stories I read, I decided to turn to a whole foods, plant-based diet, and overhauled my lifestyle. I had three major obstacles at this point though: 1 I couldnt cook; 2 I had no idea how to make plant-based recipes; and 3 I had lost all of my sense of drive. I decided the way to combat all three issues was to start a diary of my culinary experiments, pushing myself to try new things in the kitchen each day and rediscover a sense of creativity. I did this online through my website deliciouslyella.com.
        </div>
      </div>
      <div className="aboutUsMainTwo">
        <div className='aboutUsTextTwo'>
          I started deliciously ella back in 2012 whilst I was still at university. In 2011, I had been diagnosed with a condition called postural tachycardia syndrome, as well as ehlers-danlos and mast cell activation disorder, following four months in and out of hospital. The condition affected the workings of my autonomic nervous system  I couldnt control my heart rate and blood pressure properly, while also struggling with digestive issues, chronic fatigue, a series of infections and a whole host of other symptoms. I was prescribed a cocktail of medication, but unfortunately, they had limited success in managing the condition and after about a year I hit rock bottom, both physically and mentally.
          <br />
          <br />
          At this point, I started looking into other ways of managing the condition and began researching whether a change in diet and lifestyle may be able to help.
          <br />
          <br />
          Encouraged by stories I read, I decided to turn to a whole foods, plant-based diet, and overhauled my lifestyle. I had three major obstacles at this point though: 1 I couldnt cook; 2 I had no idea how to make plant-based recipes; and 3 I had lost all of my sense of drive. I decided the way to combat all three issues was to start a diary of my culinary experiments, pushing myself to try new things in the kitchen each day and rediscover a sense of creativity. I did this online through my website deliciouslyella.com.
        </div>
        <div className='aboutUsPhotoTwo'>
          <Image 
            src={'/ad-placeholder.png'}
            width={550}
            height={650}
          />
        </div>
      </div>
      <div className='aboutUsGrid'>
          <Image 
            src={'/ad-placeholder.png'}
            width={250}
            height={250}
          />
          <Image 
            src={'/ad-placeholder.png'}
            width={250}
            height={250}
          />
          <h5>we now have six #1 bestselling cookbooks; a plant-based food and wellness app; seven lines of food products in 7,000 stores across the uk; a restaurant, plants by de, in central london; and a podcast.</h5>
      </div>
    </div>
  )
}

export default About