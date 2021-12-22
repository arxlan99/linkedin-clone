import { GET_ARTICLES, SET_LOADING_STATUS } from "../actions/actionType";

export const initialState = {
  loading: false,
  articles: [],
};

export const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    case SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
