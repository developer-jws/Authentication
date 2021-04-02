const router = require("express").Router();
const {
  exists,
  register,
  login,
  logout,
  jwtVerifyMiddleware,
  auth,
} = require("./auth.controller");

router.get("/exists/:key(email)/:value", exists); /* /api/auth/exists */

router.post("/register", register); /* /api/auth/register */
router.post("/login", login); /* /api/auth/login */
router.post("/logout", jwtVerifyMiddleware, logout); /* /api/auth/logout */
router.post("/auth", jwtVerifyMiddleware, auth); /* /api/auth/auth */

module.exports = router;
