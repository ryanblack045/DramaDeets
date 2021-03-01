import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Theme from './styles/Theme';
import { CssBaseline } from "@material-ui/core";
import Splash from "./components/Splash"
import Home from "./components/Home"
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./services/auth";
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './store/actions/session'

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch()


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
          <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
             <Home />
          </ProtectedRoute>
        </BrowserRouter>
      </Theme>
    </CssBaseline>
  );
}

export default App;
