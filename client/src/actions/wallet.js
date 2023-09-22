import axios from "axios";
import { API_CONFIG } from "../common/constants";
import { setAlert } from "./alert";
import { GET_WALLET } from "./types";

//submit top-up-request
export const topUpRequest = (body) => async (dispatch) => {
    try {
        await axios.post("/api/top-up-request/submit", body, API_CONFIG);
        dispatch(setAlert("Transaction Completed Soon will be added to wallet", "success"));
    } catch (error) {
        dispatch(setAlert(error?.response?.data?.error, "danger"));
    }
};

//get wallet by user
export const getWallet = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/wallet", API_CONFIG);
        dispatch({
            type: GET_WALLET,
            payload: res.data,
        });
    } catch (error) {
        dispatch(setAlert(error?.response?.data?.error, "danger"));
    }
};

//get tot-wlt-dta
export const getWltTot = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/wallet/tot-wlt-blnc", API_CONFIG);
        return res.data;
    } catch (error) {
        dispatch("Can't Fetch Wlt Tot", "danger");
    }
};

//transfer
export const transferWalletBalance = (amnt, user) => async (dispatch) => {
    try {
      await axios.post("/api/wallet/transfer",{ amnt, user }, API_CONFIG);
      dispatch(getWallet());
      dispatch(setAlert(`Balance Transfered to ${user?.name}`, "success"));
    } catch (err) {
      dispatch(setAlert("Can not Debit from Wallet", "danger"));
    }
  };
