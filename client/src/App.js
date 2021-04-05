import React from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "containers/base/Header";
import { Login, Logout, Register } from "containers/Auth";
import { Home, Menu } from "pages";
import { NotAuthRoute } from "hoc";
import { appUrl } from "url.js";

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Switch>
        <Route exact path={appUrl.home} component={Home} />

        {/* Auth */}
        <NotAuthRoute exact path={appUrl.login} component={Login} />
        <NotAuthRoute exact path={appUrl.register} component={Register} />
        <Route exact path={appUrl.logout} component={Logout} />

        {/* Menu */}
        <Route path={appUrl.menu} component={Menu} />

        {/* Error */}
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
}

export default App;
