import axios from "axios";
import { API_CONFIG } from "../common/constants";
import { setAlert } from "./alert";
import { GET_WITHDRWL_REQS } from "./types";

//submit withdrawl-request
export const withdrawlRequest = (body) => async (dispatch) => {
    try {
        await axios.post("/api/withdrawl-request/submit", body, API_CONFIG);
        dispatch(getWithdrawlRequestsByUser());
        dispatch(setAlert("Withdrawl Requested Soon will be credited to Your Bank.", "success"));
    } catch (error) {
        dispatch(setAlert(error?.response?.data?.error, "danger"));
    }
};

//submit withdrawl-request
export const getWithdrawlRequestsByUser = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/withdrawl-request", API_CONFIG);
        dispatch({
            type: GET_WITHDRWL_REQS,
            payload: res.data,
          });
    } catch (error) {
        dispatch(setAlert(error?.response?.data?.error, "danger"));
    }
};