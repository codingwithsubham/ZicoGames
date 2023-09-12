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

//submit top-up-request
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
