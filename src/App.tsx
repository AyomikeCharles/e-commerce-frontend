import AdminRoute from "./routing/AdminRoute"
import PublicRoute from "./routing/PublicRoute"
import UserRoute from "./routing/UserRoute"


const App = () => {
  return (
    <>
      <PublicRoute/>
      <UserRoute/>
      <AdminRoute/>
    </>
  )
}

export default App