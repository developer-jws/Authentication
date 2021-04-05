// default
export const home = "/";

// auth
export const login = "/login";
export const register = "/register";
export const logout = "/logout";

// menu
export const menu = "/menu";
export const menuPublic = menu + "/public";
export const menuPrivate = menu + "/private";

// App.js
export const appUrl = {
  home,
  login,
  register,
  logout,
  menu,
};

// containers/base/headerContainer.js
export const headerUrl = {
  home,
  login,
  register,
  logout,
  public: menuPublic,
  private: menuPrivate,
};

// pages/Menu.js
export const menuUrl = {
  public: menuPublic,
  private: menuPrivate,
};
