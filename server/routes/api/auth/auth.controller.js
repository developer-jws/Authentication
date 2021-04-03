const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../../models/user");

/*
  GET /api/auth/exists/:key(email)/:value
*/
exports.exists = async (req, res) => {
  const { key, value } = req.params;
  // console.log(key, value);
  if (!value) return res.json({ exists: false });

  const exist = await User.findByEmail(value);

  if (exist) return res.json({ exists: false });
  return res.json({ exists: true });
};

/*
  POST /api/auth/register
*/
exports.register = async (req, res) => {
  let { email, password, confirmPassword } = req.body;

  if (email === "" || email === null || password === "" || password === null)
    return res.json({ registerSuccess: false });

  if (password !== confirmPassword)
    return res.json({
      registerSuccess: false,
      message: "비밀번호가 틀렸습니다.",
    });

  const existUser = await User.findOne({ email });
  if (existUser)
    return res.json({
      registerSuccess: false,
      message: "이미 가입된 이메일입니다.",
    });

  bcrypt.genSalt(10, (error, salt) => {
    if (error) return res.json({ registerSuccess: false, error });

    bcrypt.hash(password, salt, async (error, hash) => {
      if (error) return res.json({ registerSuccess: false, error });

      password = hash;

      const user = new User({
        email,
        password,
      });

      user.save((error) => {
        if (error) return res.json({ registerSuccess: false, error });

        res
          .status(201)
          .json({ registerSuccess: true, message: "가입이 완료되었습니다." });
      });
    });
  });
};

/*
  POST api/auth/login
*/
exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (error, user) => {
    if (error) return res.json({ loginSuccess: false, error });
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "해당하는 이메일이 없습니다.",
      });

    if (user) {
      user.comparePassword(password, (error, match) => {
        if (error) return res.json({ loginSuccess: false, error });
        if (!match)
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다.",
          });
        else {
          const token = jwt.sign({ userID: user._id }, process.env.TOKEN_KEY, {
            expiresIn: "1m",
          });

          user.token = token;
          user.save((error, user) => {
            if (error) return res.json({ loginSuccess: false, error });
            return res
              .cookie("x_auth", user.token, {
                maxAge: 1000 * 60,
                httpOnly: true,
              })
              .status(200)
              .json({ loginSuccess: true, userID: user._id });
          });
        }
      });
    }
  });
};

/*
  POST api/auth/logout
*/
exports.logout = (req, res) => {
  return res.clearCookie("x_auth").json({ logoutSuccess: true });
};

/*
  Middleware JWT Verify
*/
exports.jwtVerifyMiddleware = (req, res, next) => {
  let token = req.cookies.x_auth;

  jwt.verify(token, process.env.TOKEN_KEY, (error, decoded) => {
    if (error) return res.json({ isAuth: false, error });

    User.findOne({ _id: decoded.userID }, (error, user) => {
      if (error) return res.json({ isAuth: false, error });
      if (!user) return res.json({ isAuth: false });

      if (user) {
        req.token = token;
        req.user = user;
      }
      next();
    });
  });
};

/*
  POST api/auth/auth
*/
exports.auth = (req, res) => {
  res.status(200).json({
    isAuth: true,
    _id: req.user._id,
  });
};
