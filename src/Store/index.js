import { combineReducers } from "redux";
import { busreducer } from "./Reducer";
const appreducer = combineReducers({ busreducer });
export default (state, action) => {
  return appreducer(state, action);
};
