import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Theme from './styles/Theme';
import { CssBaseline } from "@material-ui/core";
import LoginForm from "./components/auth/LoginForm";
import Splash from "./components/Splash"
import SignUpForm from "./components/auth/SignUpForm";
import ListSideBar from "./components/ListSideBar"
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./services/auth";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <CssBaseline>
      <Theme>
        <BrowserRouter>
          <NavBar setAuthenticated={setAuthenticated} authenticated={authenticated} />
          <Route path="/login" exact={true}>
            <Splash
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
          </Route>
          <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
            <UsersList/>
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
            <User />
          </ProtectedRoute>
          <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
            <ListSideBar />
          </ProtectedRoute>
        </BrowserRouter>
      </Theme>
    </CssBaseline>
  );
}

export default App;
