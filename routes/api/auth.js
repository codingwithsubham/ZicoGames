const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const {
  SERVER_ERROR,
  JWT_SECRET,
  EXPIRES_IN,
  STATUS_CODE_500,
  PASSWORD,
  PASSWORD_INVALID,
  INVALID_CREDENTIALS,
  STATUS_CODE_400,
  MOBILE,
  MOBILE_REQUIRED,
  USER_EXSISTS,
  STATUS_CODE_404,
} = require("../../common/constant/constants");

// @route POST api/auth
// @desc Register A User
// @access Public
router.post("/register", async (req, res) => {
  const { name, mobile, age, password, role, refferedId } = req.body;
  const date = new Date();
  try {
    const checkUser = await User.findOne({ mobile: mobile });
    if (checkUser) {
      return res.status(STATUS_CODE_400).send({ errors: [{ msg: USER_EXSISTS }] });
    }
    const newUser = {
      mobile: mobile,
      password: password,
      name: name,
      age: age,
      role: role,
      timestamp: date,
    };
    let user = new User(newUser);
    //generating refferal chain
    if (refferedId) {
      user.upline = refferedId;
      const parentUser = await User.findById(refferedId);
      parentUser.refferalIds.push(user._id);
      await parentUser.save();
    }
    //saving user
    await user.save();
    const payload = {
      user: {
        id: user.id,
        userData: user,
      },
    };
    jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN }, (err, token) => {
      if (err) {
        throw err;
      }
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/login",
  [
    check(MOBILE, MOBILE_REQUIRED).exists(),
    check(PASSWORD, PASSWORD_INVALID).exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(STATUS_CODE_400).json({ errors: errors.array() });
    }
    const { mobile, password } = req.body;
    try {
      let user = await User.findOne({
        $or: [
          {
            mobile: { $regex: new RegExp("^" + mobile.toLowerCase(), "i") },
          },
        ],
      });
      if (!user) {
        return res.status(STATUS_CODE_400).json({
          errors: [{ msg: INVALID_CREDENTIALS }],
        });
      }
      if (password !== user.password) {
        return res
          .status(STATUS_CODE_400)
          .json({ errors: [{ msg: INVALID_CREDENTIALS }] });
      }
      const payload = {
        user: {
          id: user._id,
          userData: user,
        },
      };
      jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN }, (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(STATUS_CODE_500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

// @route GET api/auth
// @desc Get User By Id
// @access Private
router.get("/load-user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route GET api/auth
// @desc Validate User
// @access Private
router.get("/load-users", auth, async (req, res) => {
  try {
    const users = await User.find({}).populate("upline");
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route GET api/auth
// @desc Validate User
// @access Private
router.get("/get-users", auth, async (req, res) => {
  try {
    const users = await User.find({}).populate("upline").select("-password");
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route GET api/auth  
// @desc Self Registration
// @access Private
router.post("/self-register", auth, async (req, res) => {
  const date = new Date();
  try {
    let user = await User.findById(req.user.id);
    user.legacyid= req.user.id,
    user.regsOnSystem = date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    user.status= false
    await user.save();
    return res.json(user);
  } catch (err) {
    console.log(err);
    res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route PUT api/auth
// @desc Update User
// @access Private
router.post("/update-user/:type", auth, async (req, res) => {
  try {
    const { user } = req.body;
    const userData = await User.findById(req.user.id).select("-password");
    if (!userData) {
      res.status(STATUS_CODE_400).json({ errors: [{ msg: BAD_REQUEST }] });
    }
    if (req.params.type === "bank") {
      userData.bankDetails = user.bankDetails;
    }
    await userData.save();
    return res.json(userData);
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

// @route GET api/auth
// @desc Validate User
// @access Private
router.get("/validate/:mobile", auth, async (req, res) => {
  try {
    const user = await User.findOne({ mobile: req.params.mobile }).select("-password");
    if (!user) {
      return res.status(STATUS_CODE_404).send(NOT_FOUND);
    }
    return res.json(user)
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODE_500).send(SERVER_ERROR);
  }
});

module.exports = router;