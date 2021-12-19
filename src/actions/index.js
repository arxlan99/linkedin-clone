import { auth, provider, signInWithPopup } from "../firebase";

export function signinApi() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        alert(err);
      });
  };
}
