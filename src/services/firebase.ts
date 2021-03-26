import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  authDomain: 'https://keeme-44e57.firebaseapp.com',
  projectId: 'keeme-44e57',
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
else firebase.app();

export const db = firebase.firestore();
