const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    res.status(statusCode).send({
      success: true,
      user,
      token,
    });
  };
  
  module.exports = sendToken;
  