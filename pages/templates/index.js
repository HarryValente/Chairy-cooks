// Next
import Link from 'next/link'

// Components
import Button from '../../components/Button'
import TemplateList from "../../components/TemplateList";
import SEO from '../../components/SEO';

// Hooks
import useFirebase from '../../hooks/useFirebase';
import Grid from '../../components/Grid';


export default () => {
  const [templates] = useFirebase([], '/recipe_templates/')

  return (
    <>
      <SEO title={'Chairy cooks - Recipe Builder'} description={'Recipe builder section for Chairy cooks home of cheap tasty homemade meals from all around the world!'}/>
      <Grid columns={6}>
        <Link href='/templates/new'>
          <Button variant='action' children={'Add new template'} />
        </Link>
        <Link href='/templates/manager'>
          <Button variant='action' children={'Manage Recipes'} />
        </Link>
      </Grid>

      <TemplateList templates={templates} />
    </>
  )
}
