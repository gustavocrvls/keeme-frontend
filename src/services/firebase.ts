import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  projectId: process.env.REACT_APP_FIREBASE__PROJECT_ID,
  authDomain: process.env.REACT_APP_FIREBASE__AUTH_DOMAIN,
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
else firebase.app();

export const db = firebase.firestore();
