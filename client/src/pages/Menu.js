import React from "react";
import { Route, Switch } from "react-router";
import { PublicPage, PrivatePage } from "containers/Menu";
import { PrivateRoute } from "hoc";

function Menu() {
  return (
    <Switch>
      <Route path="/menu/public" component={PublicPage} />
      <PrivateRoute path="/menu/private" component={PrivatePage} />
    </Switch>
  );
}

export default Menu;
