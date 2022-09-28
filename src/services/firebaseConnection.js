import firebase from "firebase";
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvrjSOU9xsY_Nk9hDwrWc3rx7hfUiZIOc",
  authDomain: "heygroups-d215e.firebaseapp.com",
  projectId: "heygroups-d215e",
  storageBucket: "heygroups-d215e.appspot.com",
  messagingSenderId: "440031724843",
  appId: "1:440031724843:web:efda34f9dd9de362f2b16e",
  measurementId: "G-3BZZ919GRW",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
