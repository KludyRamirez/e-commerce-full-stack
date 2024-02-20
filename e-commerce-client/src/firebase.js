import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxrapIOmeE8DBRM4xOw-AFOkzRKk26jjU",
  authDomain: "bananauyu.firebaseapp.com",
  projectId: "bananauyu",
  storageBucket: "bananauyu.appspot.com",
  messagingSenderId: "122939620277",
  appId: "1:122939620277:web:3f2a0a20ca96b4127d37fc",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
