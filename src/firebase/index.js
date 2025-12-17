import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBkoB3-xOrBGPJ4X098gCK-rcg2PtnMX6o",
  authDomain: "library-web-app-47f85.firebaseapp.com",
  projectId: "library-web-app-47f85",
  storageBucket: "library-web-app-47f85.firebasestorage.app",
  messagingSenderId: "433423907572",
  appId: "1:433423907572:web:364458d50fd1e6da23fca1",
  measurementId: "G-4R0BK7CBXK"
};

const app = initializeApp(firebaseConfig);

let db = getFirestore(app);
let auth = getAuth(app);

export { db, auth }