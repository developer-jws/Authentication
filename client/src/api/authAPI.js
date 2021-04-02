import axios from "axios";

export const checkEmailExistsRequest = async (email) => {
  const res = await axios.get("/api/auth/exists/email/" + email, {
    withCredentials: true,
  });
  return res.data;
};

export const registerRequest = async (user) => {
  const res = await axios.post("/api/auth/register", user, {
    withCredentials: true,
  });
  return res.data;
};

export const loginRequest = async (user) => {
  const res = await axios.post("/api/auth/login", user, {
    withCredentials: true,
  });
  return res.data;
};

export const logoutRequest = async () => {
  const res = await axios.post("/api/auth/logout", {
    withCredentials: true,
  });
  return res.data;
};
