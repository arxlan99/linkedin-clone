import { SET_USER } from "../actions/actionType";

const INITAIL_STATE = {
  user: null,
  loading: true,
};

export const userReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
