import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isAuth } from "redux/modules/auth";
import { authRequest } from "api/authAPI";

function PrivateRoute({ component: Component, ...rest }) {
  const [render, setRender] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();

  async function dispatchAuth() {
    const data = await authRequest();
    await dispatch(isAuth(data._id || null));

    setRender(true);
    if (!data.isAuth) history.push("/login");
  }
  useEffect(() => {
    dispatchAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!render) return null;
  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

export default PrivateRoute;
