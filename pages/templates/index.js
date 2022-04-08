// Next
import Link from 'next/link'

// Components
import Button from '../../components/Button'
import TemplateList from "../../components/TemplateList";


export default () => {
  const [templates] = 'dd'

  return (
    <>
      <Link href='/templates/new'>
        <a>
          <Button variant='action'>Add Template</Button>
        </a>
      </Link>

      <TemplateList templates={templates} />
    </>
  )
}
