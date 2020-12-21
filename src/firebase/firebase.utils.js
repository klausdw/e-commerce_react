import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDpcorC-Q2BC75HBRwkPVWomSwdFoRUZfU",
    authDomain: "e-commerce-db-e9143.firebaseapp.com",
    projectId: "e-commerce-db-e9143",
    storageBucket: "e-commerce-db-e9143.appspot.com",
    messagingSenderId: "451290803576",
    appId: "1:451290803576:web:339933c31c762d4d2e6c8d",
    measurementId: "G-GXYV5HTY0Q"
  };

  firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const singInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;