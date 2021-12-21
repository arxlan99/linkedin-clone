import db, { auth, provider, storage } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { SET_USER } from "./actionType";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

export function signinApi() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: SET_USER,
          payload: result.user,
          loading: false,
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
          loading: false,
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
          loading: false,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
}

export function postArticleAPI(payload) {
  return (dispatch) => {
    if (payload.image !== "") {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${payload.image.name}`);

      const uploadTask = uploadBytesResumable(storageRef, payload.image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("....");
          }
        },
        (error) => {
          console.log("Error");
        },
        async () => {
          let url = "";
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            url = downloadURL;
          });

          const docRef = await addDoc(collection(db, "temp"), {
            actor: {
              description: payload.user.email,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            comments: 0,
            sharedImg: url,
            video: payload.video,
            description: payload.description,
          });
        }
      );
    }
  };
}
