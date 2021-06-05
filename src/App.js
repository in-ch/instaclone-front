import { useState } from "react";
import { BrowserRouter as Router,Switch, Route, Redirect } from "react-router-dom";
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/404';
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./apollo";

function App() {
 
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Home />: <Login />}
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
    </div>
  );
}

export default App;
