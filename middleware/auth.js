const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../common/constant/constants");

module.exports = async function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  // Verify token
  try {
    await jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        res.status(401).json({ msg: "Token is not valid" });
      } else {
        req.user = decoded.user;
        req.token = token;
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
