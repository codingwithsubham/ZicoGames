import axios from "axios";
import { setAlert } from "./alert";
const { API_CONFIG } = require("../common/constants");

//requestPaymentGateway
export const requestPaymentGateway = (amnt, type) => async (dispatch) => {
  try {
    const res = await axios.post("/api/pg/create-order", { amnt, type }, API_CONFIG);
    return res.data;
  } catch (err) {
    dispatch(setAlert("Could not initiate Payment", "fail"));
  }
};
