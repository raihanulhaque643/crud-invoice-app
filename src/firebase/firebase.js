import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCaM4EIcaF8Vx_Cf8HqkuxERYr1bek8UvM",
    authDomain: "car-garage-bd.firebaseapp.com",
    databaseURL: "https://car-garage-bd.firebaseio.com",
    projectId: "car-garage-bd",
    storageBucket: "car-garage-bd.appspot.com",
    messagingSenderId: "222226486677",
    appId: "1:222226486677:web:6fcd2acdd52b5f7b7ed29c"
  };
  

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    localStorage.setItem("currentUser", user.email);  
  } else {
    localStorage.setItem("currentUser", '');
  }
});

export default firebase;