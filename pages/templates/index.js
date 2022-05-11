// Next
import Link from 'next/link'

// Components
import Button from '../../components/Button'
import TemplateList from "../../components/TemplateList";

// Hooks
import useFirebase from '../../hooks/useFirebase';


export default () => {
  const [templates] = useFirebase([], '/recipe_templates/')

  return (
    <>
      <Link href='/templates/new'>
        <Button variant='action' children={'Add new template'} />
      </Link>

      <TemplateList templates={templates} />
    </>
  )
}
