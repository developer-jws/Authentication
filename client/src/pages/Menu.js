import React from "react";
import { Route, Switch } from "react-router";
import { PublicPage, PrivatePage } from "containers/Menu";
import { PrivateRoute } from "hoc";
import { menuUrl } from "url.js";

function Menu() {
  return (
    <Switch>
      <Route path={menuUrl.public} component={PublicPage} />
      <PrivateRoute path={menuUrl.private} component={PrivatePage} />
    </Switch>
  );
}

export default Menu;
