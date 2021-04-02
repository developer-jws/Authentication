import { Login, Register } from "containers/Auth";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

function Auth() {
  return (
    <Switch>
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/register" component={Register} />
      <Redirect from="*" to="/auth/login" />
    </Switch>
  );
}

export default Auth;
