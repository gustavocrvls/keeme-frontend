import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  projectId: 'keeme-44e57',
  authDomain: 'https://keeme-44e57.firebaseapp.com',
  // storageBucket: 'https://keeme-44e57.appspot.com/',
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
else firebase.app();

export const db = firebase.firestore();
// export const file = firebase.storage();
