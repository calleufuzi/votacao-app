import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var config = {
  apiKey: "AIzaSyBNBL_KRaCbz50FRQi1usU-XZZuSdoo6tU",
  authDomain: "votacao-15553.firebaseapp.com",
  databaseURL: "https://votacao-15553.firebaseio.com",
  projectId: "votacao-15553",
  storageBucket: "votacao-15553.appspot.com",
  messagingSenderId: "705807209924"
};
firebase.initializeApp(config);

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};