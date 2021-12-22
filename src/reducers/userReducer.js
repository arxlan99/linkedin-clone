import { SET_USER } from "../actions/actionType";

const INITAIL_STATE = {
  user: null,
};

export const userReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
