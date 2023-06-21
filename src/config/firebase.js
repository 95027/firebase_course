// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs-2MMsFV_yES49TkjuC91gUQ_tfn6ldA",
  authDomain: "fir-course-b61d6.firebaseapp.com",
  projectId: "fir-course-b61d6",
  storageBucket: "fir-course-b61d6.appspot.com",
  messagingSenderId: "450442044393",
  appId: "1:450442044393:web:1641743412d591fda02178"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const googleProvider = new GoogleAuthProvider();

 export const db = getFirestore(app);
 export const storage = getStorage(app);