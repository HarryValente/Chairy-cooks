// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updatePassword
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getPerformance } from 'firebase/performance';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7lln8DFMGkvjqcjEStICg6cBptRd_W-A",
  authDomain: "chairy-cooks.firebaseapp.com",
  projectId: "chairy-cooks",
  storageBucket: "chairy-cooks.appspot.com",
  messagingSenderId: "932235974846",
  appId: "1:932235974846:web:450a03e69f378a1399e6ef",
  measurementId: "G-JQHQBCJY2S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);


// const userAuth = getAuth(app)

export const createFirebaseUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(response => {
        resolve(response.user.uid)

        return auth.signOut()
      })
      .catch(error => {
        if (error) {
          throw new Error(error)
        }

        return reject(error)
      })
  })
}
