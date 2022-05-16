// Next
import Head from 'next/head'

export default ({title, description, image, article}) => {
  return (
    <>  
        <Head>
          <title>{title}</title>
          
          <meta name='description' content={description} />
        </Head>
    </>

  )
}
