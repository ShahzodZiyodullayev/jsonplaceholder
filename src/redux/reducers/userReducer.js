import { ActionType } from "../contents/ActionType";

const initialState = {
  user: [],
};

export const currentUserReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionType.setCurrentUser:
      return [...state, ...payload];
    default:
      return state;
  }
};

export const jsonplaceholderData = (state = [], { type, payload }) => {
  switch (type) {
    case ActionType.setJsonplaceholderData:
      return [...state, ...payload];
    default:
      return state;
  }
};
