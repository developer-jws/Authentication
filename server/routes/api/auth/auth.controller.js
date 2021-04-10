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
  let { email, password, username, confirmPassword } = req.body;

  if (
    email === "" ||
    email === null ||
    password === "" ||
    password === null ||
    username === "" ||
    username === null
  )
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

  const user = new User(req.body);

  user.save((error, doc) => {
    if (error) return res.json({ registerSuccess: false, error });
    return res.status(200).json({
      registerSuccess: true,
      message: "가입이 완료되었습니다.",
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

    user.comparePassword(password, (error, isMatch) => {
      if (error) return res.json({ loginSuccess: false, error });
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      console.log();
      user.generateToken((error, user) => {
        if (error) return res.json({ loginSuccess: false });
        res.cookie("x_auth", user.token, {
          maxAge: 1000 * 60 * 60, // moment
          secure: true,
          httpOnly: true,
          signed: true,
        });
        res
          .cookie("x_authExp", user.tokenExp, {
            maxAge: 1000 * 60 * 60,
            secure: true,
            httpOnly: true,
            signed: true,
          })
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
};

/*
  POST api/auth/logout
*/
exports.logout = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ logoutSuccess: false });
      return res
        .clearCookie("x_auth")
        .clearCookie("x_authExp")
        .status(200)
        .json({
          logoutSuccess: true,
        });
    }
  );
};

/*
  Middleware JWT Verify
*/
exports.jwtVerifyMiddleware = (req, res, next) => {
  // let token = req.cookies.x_auth;
  let token = req.signedCookies.x_auth;

  User.findByToken(token, (error, user) => {
    if (error) return res.json({ isAuth: false, error });
    if (!user) return res.json({ isAuth: false, error: true });
    req.token = token;
    req.user = user;
    next();
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
