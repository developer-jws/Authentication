import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "redux/modules/auth";

function Logout({ history }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
    history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}

export default Logout;
