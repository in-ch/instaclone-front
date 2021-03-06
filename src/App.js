import { useState } from "react";
import { BrowserRouter as Router,Switch, Route, Redirect } from "react-router-dom";
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import NotFound from './screens/404';
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, GlobalStyles } from "./styles";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import Gasd from "./screens/Gasd";
const App = () => {
 
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
          <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
              <GlobalStyles />
                  <Router>
                    <Switch>

                      <Route path={routes.home} exact>
                        {isLoggedIn ? (<Layout><Home /></Layout>) : <Login />}
                      </Route>

                      <Route path={routes.signUp} exact>
                        {isLoggedIn ? null : <SignUp />}
                      </Route>

                      <Route path={`/users/:userName`}>
                          <Layout><Profile /></Layout>
                      </Route>

                      <Route path={`/gasd`} exact> 
                          <Layout><Gasd /></Layout>
                      </Route>

                      <Route>
                        <NotFound />
                        {/* <Redirect to="/" />  리다이렉트 시키는 것임 */}
                      </Route>
                    </Switch>
                  </Router>
          </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
