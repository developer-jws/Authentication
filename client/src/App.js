import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "containers/base/Header";
import { Login, Logout, Register } from "containers/Auth";
import { Home, Menu } from "pages";
import { NotAuthRoute } from "hoc";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />

        {/* Auth */}
        <NotAuthRoute exact path="/login" component={Login} />
        <NotAuthRoute exact path="/register" component={Register} />
        <Route exact path="/logout" component={Logout} />

        {/* Menu */}
        <Route path="/menu" component={Menu} />

        {/* Error */}
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
}

export default App;
