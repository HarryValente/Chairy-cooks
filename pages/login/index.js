// Components
import LoginForm from "../../components/LoginForm";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthContext } from "../../context/auth";

const profile = () => {
  // const [templates] = useFirebase([], '/report_templates/')
  const [templates] = 'hello'

  return ( 
    <>
      <LoginForm/>
    </>
  );
}
 
export default profile;