// Components
import LoginForm from "../../components/LoginForm";
import SEO from "../../components/SEO";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthContext } from "../../context/auth";

const profile = () => {
  // const [templates] = useFirebase([], '/report_templates/')
  const [templates] = 'hello'

  return ( 
    <>
      <SEO title={'Chairy cooks - Login'} description={'Login page for Chairy cooks home of cheap tasty homemade meals from all around the world!'}/>
      <LoginForm/>
    </>
  );
}
 
export default profile;