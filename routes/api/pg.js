const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const PG = require("../../models/pg");
const User = require("../../models/User");
const {
  SERVER_ERROR,
  STATUS_CODE_500,
  STATUS_CODE_200,
  STATUS_CODE_400,
  BAD_REQUEST,
} = require("../../common/constant/constants");
const { default: axios } = require("axios");
const getToken = require("../../middleware/getToken");
//const { createHash } =  require('node:crypto')

// @route POST api/pg/create-order`
// @desc init payment gateway
// @access Private
router.post("/create-order", auth, async (req, res) => {
  try {
    const user = req.user.userData;
    var value = user.mobile;
    var user_mob_num = value.replace(/\D/g, '').slice(-10);
    const { amnt, type } = req.body;
    const pg = new PG({
      user: req.user.id,
      amnt: amnt,
      type: type,
    });
    await pg.save();
    //payload
    const postData = {
      key: "4d80724c-0b93-431d-915b-6e01915234f7",
      client_txn_id: pg._id,
      amount: `${amnt}`,
      p_info: "purchase",
      customer_name: user.name,
      customer_email: `${user.name.split(" ")[0]}@zico.com`,
      customer_mobile: user_mob_num,
      redirect_url: "https://zicogames.onrender.com/wallet",
      udf1: "Zico",
    };
    const response = await axios.post(
      "https://merchant.upigateway.com/api/create_order",
      postData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(STATUS_CODE_500).json({ errors: [{ msg: SERVER_ERROR }] });
  }
});

// @route POST api/pg/order-success
// @desc Callback payment gateway
// @access Public
router.post("/order-success", async (req, res) => {
  try {
    const { client_txn_id, status, udf1 } = req.body;
    if (udf1 === "Zico") {
      if (status !== "failure") {
        const pg = await PG.findById(client_txn_id);
        if (pg) {
          await disburshWalletCredit(pg?.amnt, pg?.user)
          if (response.data) {
            return res.status(STATUS_CODE_200).json({ success: true });
          }
        } else {
          console.log("PG NOT FOUND from PG");
          return res.status(STATUS_CODE_400);
        }
      } else {
        console.log("status failure from PG");
        return res.status(STATUS_CODE_400);
      }
    }

  } catch (error) {
    console.log(error);
    res.status(STATUS_CODE_500).json({ errors: [{ msg: SERVER_ERROR }] });
  }
});


const disburshWalletCredit = async (blnc, id) => {
  const perct = [8,0.5,0.5,0.5,0.5]
  let user = await User.findOne({ _id: id }).populate("upline");
  await creditToWallet(parseInt(blnc), "Top-Up Added", user?._id);
  if (!user.status) {
    user.status = true;
    await user.save();
  }
  for (element of perct) {
    const amnt = (parseInt(blnc) * element) / 100;
    if(user?.upline){
      await creditToWallet(parseInt(amnt), "Top-Up Added", user?.upline);
      user = await User.findOne({ _id: user?.upline }).populate("upline");
    } else {
      user = null;
    }
  }
}

module.exports = router;
