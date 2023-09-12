const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../common/constant/constants");
module.exports = async function (user) {
    const payload = {
        user: {
          id: user._id,
          userData: user,
        },
      };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1m" });
      return token;
}