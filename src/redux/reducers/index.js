import { combineReducers } from "redux";
import { currentUserReducer, jsonplaceholderData } from "./userReducer";

export const reducers = combineReducers({
  currentUserReducer,
  jsonplaceholderData,
});
