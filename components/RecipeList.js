// Hooks
import { useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import useFirebase from '../hooks/useFirebase'

// Components
import Grid from '../components/Grid'

// Modules
import moment from 'moment'

export default ({ quote: data, quote, selectQuote }) => {
  const [quotes, set] = useState([])
  const [snapshot, setSnaphot] = useState([])

  useEffect(() => {
    if (data) {
      set(data)
      setSnaphot(data)
    }
  }, [data])

  useEffect(() => {
    if (quotes) {
      set(quotes)
      setSnaphot(quotes)
    }
  }, [quotes])

  console.log(quotes)
  console.log('quotes')
  return (
    <Grid columns={1}>
      {/* <Search
        data={snapshot}
        setData={e => set(e)}
        keys={['desc', 'job_number', 'registration_number']}
        placeholder='Search Quotes..'
      /> */}
      <Grid columns={3} className='bg-gray-100 p-2 rounded text-xs'>
        <p>Recipe</p>
        <p>Catagory</p>
        <p>Author</p>
      </Grid>
      {quotes.length > 0
        ? quotes.map(quote => {
            return (
              <Grid
                key={quote.id}
                columns={3}
                onClick={() => selectQuote(quote.id)}
                className={`hover:bg-gray-50 border hover:border-gray-200 cursor-pointer p-2 relative rounded text-sm`}
              >
                <span className='flex items-center'>{quote.recipe_information.details.name}</span>
                <span className='flex items-center'>{quote.recipe_information.details.category}</span>
                {/* <span className='flex items-center'>{quote.recipe_information.details.author[0]}</span> */}
              </Grid>
            )
          })
        : 'No quotes found'}
    </Grid>
  )
}
