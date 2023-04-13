// Next
import Link from 'next/link'
import Image from 'next/image'

export default ({recipes: data}) => {
  const [recipe, set] = useState()
  const [_user] = useLocalStorage('_user')
  
  useEffect(() => {
    if (data) {
      set(data)
    }
  }, [data])
  console.log(recipe)

  return (
    <Link key={title} href={`/recipes/${slug}`}>
      <div className="feature">

              <div className='featureImage'>
                {/* <Image
                  src={rec.main_image.url}
                  placeholder='blue'
                  layout="fill"
                /> */}
                <img src={rec.main_image.url} alt={rec.main_image.name}></img>
              </div>
              
        <div className="feature-text">
          <h2>{title}</h2>
        </div>
      </div>
    </Link>
  )
}