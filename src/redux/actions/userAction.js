import { ActionType } from "../contents/ActionType";

export const setCurrentUser = (data) => {
  return {
    type: ActionType.setCurrentUser,
    payload: [data],
  };
};

export const setJsonplaceholderData = (data) => {
  return {
    type: ActionType.setJsonplaceholderData,
    payload: data,
  };
};
