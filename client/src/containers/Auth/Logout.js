import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "redux/modules/auth";

function Logout({ history }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
    history.push("/");
  }, []);

  return <></>;
}

export default Logout;
