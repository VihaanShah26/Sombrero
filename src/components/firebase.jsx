// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { useEffect, useState } from 'react';
import { get, getDatabase, onValue, ref, update } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { useCallback } from 'react';
import { getAuth, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEudWJ9ZZkt0aZcdupvbr6dyKYMZqz66k",
  authDomain: "hci-sombrero.firebaseapp.com",
  projectId: "hci-sombrero",
  storageBucket: "hci-sombrero.firebasestorage.app",
  messagingSenderId: "579515244888",
  appId: "1:579515244888:web:9d05c7686bef83695f852d",
  measurementId: "G-CNR5ZV6QH7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const database = getDatabase(app);
export const db = getFirestore(app);

const firebaseSignOut = () => signOut(getAuth(app));

export const signInWithGoogle = async () => {
    const result = await signInWithPopup(getAuth(app), new GoogleAuthProvider());
    const user = result.user;
    console.log(user.email);
    // if (!user.email.endsWith("northwestern.edu")) {
    //     alert("Only Northwestern University email ids are allowed.");
    //     firebaseSignOut();
    //     return;
    //   }
};

export { firebaseSignOut as signOut };

export const useAuthState = () => {
    const [user, setUser] = useState();

    useEffect(() => (
        onAuthStateChanged(getAuth(app), setUser)
    ), []);

    return [user];
};

export const auth = getAuth(app);