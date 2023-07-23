// Create Token and saving in cookie
const { serialize } = require("cookie");
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
  res.setHeader(
    "Set-Cookie",
    serialize("token", set ? token : "", {
      path: "/",
      httpOnly: true,
      maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
    })
  );
};
export const cookieSeter = (res, user, set) => {
  const token = user.getJWTToken();
  res.setHeader(
    "Set-Cookie",
    serialize("token", set ? token : "", {
      path: "/",
      httpOnly: true,
      maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
    })
  );
};
export const checkAuth = async (req) => {
  const cookie = req.headers.cookie;
  if (!cookie) return null;
  const token = cookie.split("=")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return await User.findById(decoded._id);
};
module.exports = sendToken;
