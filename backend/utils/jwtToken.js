// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
// res
// .status(statusCode)
// // .cookie("token", token, {
// //   httpOnly: true,
// //   maxAge: 15 * 60 * 1000,
// //   sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
// //   secure: process.env.NODE_ENV === "Development" ? false : true,
// // })
// .json({
//   success: true,
//   message,
//   token,
// });
