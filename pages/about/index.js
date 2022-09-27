import Image from 'next/image'

export const About = () => {
  return(
    <div className="aboutUsContainer">
      <h1>About Us</h1>
      <h3>Hi we're Ciara & Harry a couple who love to cook together! We found our passion of cooking by spending countless hours in the kitchen bonding over our love for not just food but the craft of creating food.</h3>
      <div className="aboutUsMain">
        <div className='aboutUsPhoto'>
          <Image 
            src={'/ad-placeholder.png'}
            width={550}
            height={650}
          />
        </div>
        <div className='aboutUsText'>
          We started Chairy cooks in 2021 when we both graduated from university. It was seen as a new passion project for us both to embark on and continue to explore new foods and different cuisines from around the world. By expanding our cooking habits we believe to have curated a tasty portfolio of easy and delicious dishes which will go down a treat for any household. Our recipes range from simple student meals to extravagant Asian dishes all without losing out on that punchy flavour we all desire in our food. We are in no way professional chefs but we pride ourselves in our authentic homely cooking that we believe can be made by anyone. 
          <br />
          <br />
          At this point, we believe that it is time to share Chairycooks to the world and for everyone to have a taste of some of our favourite dishes that we've made over the years.
          <br />
          <br />
          Inspired by others in the food industry, we believe our recipes are a blend of what we find online mixed in with our love and passion for the hobby and we hope you see this when recreating any of our recipes. We would encourage anyone to add their own takes to recipes and share them with us as we'd love to hear how you've transformed our recipes into your own creations and made them your own. For example neither of us are very tolerant to spice when it comes to food so if you feel like adding chilli flakes etc to our food be our guest! 
        </div>
      </div>
      <div className="aboutUsMainTwo">
        <div className='aboutUsTextTwo'>
          Chairycooks was created by Harry and his girlfriend Ciara, they both bring something different to the table when it comes to cooking. Harry very much started as a "uni-chef" with very little experience in the kitchen and kind of winged it, however Harry had the passion to learn and when Ciara came along with her lifelong joy of cooking and baking it was a match made in heaven. Food has always been something they've bonded over and cooking together is something they hold close to their hearts. 
          <br />
          <br />
          As time has progressed Harry has become the "Chief chopper" and Ciara likes to think of herself as the headchef but best believe they both create their dishes and as much as Ciara likes to think she is in charge she couldn't do it without her trusty assistant.
          <br />
          <br />
          In terms of Ciara's background she brings a Irish homely cooking feel to a lot of the dishes which makes some of the winter warming dishes amazing and a must try. As well as this, baking has been a big part of Ciaras upbringing which has given her a warchest of family recipes to indulge in and makes any cheat day/week worthwhile. Harry's experience growing up around his Italian nonna allowed him to experirence Italian flavours from a young age and has passed down a few authentic Italian recipes for him to share.
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
          <h5>We now have plans to continue building our Chairycooks recipe collection. We really hope you enjoy what we've made along on our journey and we really hope you join us for the ride!</h5>
      </div>
    </div>
  )
}

export default About