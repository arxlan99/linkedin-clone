import db, { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { GET_ARTICLES, SET_LOADING_STATUS, SET_USER } from "./actionType";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

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

export function postArticleAPI(payload) {
  return (dispatch) => {
    if (payload.image !== "") {
      // set loading status true
      dispatch({
        type: SET_LOADING_STATUS,
        payload: true,
      });

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

          const docRef = await addDoc(collection(db, "articles"), {
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

      // set loading status false
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
    } else if (payload.video !== "") {
      const docRef = addDoc(collection(db, "articles"), {
        actor: {
          description: payload.user.email,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        comments: 0,
        sharedImg: "",
        video: payload.video,
        description: payload.description,
      });

      // set loading status false
      dispatch({
        type: SET_LOADING_STATUS,
        payload: false,
      });
    }
  };
}

export function getArticlesApi() {
  return async (dispatch) => {
    const collectionRef = collection(db, "articles");
    const queryRef = query(collectionRef, orderBy("actor.date", "desc"));
    const querySnapshot = await getDocs(queryRef);

    const articles = [];
    querySnapshot.forEach((doc) => {
      articles.push(doc.data());
    });
    dispatch({
      type: GET_ARTICLES,
      payload: articles,
    });
  };
}
