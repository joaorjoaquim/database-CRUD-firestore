// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB47_Xu67HDG1MBjQ-nKUUgDVQVi9pnxxA",
  authDomain: "banco-de-teste-1060a.firebaseapp.com",
  projectId: "banco-de-teste-1060a",
  storageBucket: "banco-de-teste-1060a.appspot.com",
  messagingSenderId: "225216503333",
  appId: "1:225216503333:web:a4c0ab3995353f1bbda9cc"
};
let app;
if(firebase.apps.length ===0){
  // Initialize Firebase
  app = firebase.initializeApp(firebaseConfig)
}else{
  app = firebase.app()
}
// Initialize Firestore
const db = app.firestore();
const auth = firebase.auth();

export default {db, auth};
