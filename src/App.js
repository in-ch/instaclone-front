import { useState } from "react";
import { BrowserRouter as Router,Switch, Route, Redirect } from "react-router-dom";
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/signUp';
import NotFound from './screens/404';
import { useReactiveVar } from "@apollo/client";
import { darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, GlobalStyles } from "./styles";

function App() {
 
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
            <Router>
              <Switch>

                <Route path="/" exact>
                  {isLoggedIn ? <Home />: <Login />}
                </Route>

                <Route path="/sign-up" exact>
                  {isLoggedIn ? <SignUp />: null}
                </Route>

                <Route path="/inch" exact>
                  {!isLoggedIn ? "로그인해주세요." : "로그인 되어 있네요."}
                </Route>

                <Route>
                  <NotFound />
                  {/* <Redirect to="/" />  리다이렉트 시키는 것임 */}
                </Route>

              </Switch>
            </Router>
    </ThemeProvider>
  );
}

export default App;
