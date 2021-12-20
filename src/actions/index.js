import { auth, provider, signInWithPopup } from "../firebase";
import { SET_USER } from "./actionType";

export function signinApi() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: SET_USER,
          payload: result.user,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch({
          type: SET_USER,
          payload: user,
        });
      }
    });
  };
}

export function signOutApi() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch({
          type: SET_USER,
          payload: null,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
