// Next
import Link from 'next/link'

// Components
import Button from '../../components/Button'
import TemplateList from "../../components/TemplateList";

// Hooks
import useFirebase from '../../hooks/useFirebase';


export default () => {
  const [templates] = useFirebase([], '/recipe_templates/')
console.log(templates)
console.log('templates')
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
