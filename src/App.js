import { Route, Redirect } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { userStorageKey } from "./components/auth/authSettings"
import { ApplicationViews } from "./components/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import 'bootstrap/dist/css/bootstrap.min.css';


export const App = () => (
  <>
  <Route
    render={() => {
      if (sessionStorage.getItem(userStorageKey)) {
        return (
          <>
        {/* Components that are rendered when the user is authenticated go inside this React fragment */}
          <NavBar />
          <ApplicationViews />
      </>
    )
  } else {
    return <Redirect to="/login" />;
  }
}}
/>

  <Route path="/login">
    <Login />
  </Route>
  <Route path="/register">
    <Register />
  </Route>
</>
)
