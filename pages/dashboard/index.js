import getFirebaseDocs from "../../firebase";

export const Dashboard = (props) => {
  return (
    <div>
      {
        props.myProp ? (
          <h1>
            Looks like we have our SSR application
          </h1>
        ) : (
          <h1>
            Ooops, SSR props were not passed!
          </h1>
        )
      }
    </div>
  )
}

export async function getServerSideProps() {
  const [faveRecipes] = await getFirebaseDocs(`/all_recipes`)
  
  return { props: JSON.stringify(faveRecipes) }
}

export default Dashboard