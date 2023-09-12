import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import layout from "./layout";
import fiveMTrade from "./fiveMTrade";
import tpupreq from "./tpupReq";
import wallet from "./wallet";
import colorTrade from "./colorTrade"
import withdrwlReq from "./withdrwlReq"

export default combineReducers({
  alert,
  auth,
  wallet,
  tpupreq,
  fiveMTrade,
  layout,
  withdrwlReq,
  colorTrade
});
