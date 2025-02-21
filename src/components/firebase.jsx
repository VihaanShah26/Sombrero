// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { useEffect, useState } from 'react';
import { get, getDatabase, onValue, ref, update } from 'firebase/database';
import { useCallback } from 'react';
import { getAuth, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAtyQ3YuFYf7iFm6SsNuyCWJ7zasOec-48",
    authDomain: "cs392-fall2024-react-tutorial.firebaseapp.com",
    databaseURL: "https://cs392-fall2024-react-tutorial-default-rtdb.firebaseio.com",
    projectId: "cs392-fall2024-react-tutorial",
    storageBucket: "cs392-fall2024-react-tutorial.appspot.com",
    messagingSenderId: "935231826085",
    appId: "1:935231826085:web:0e5443e3a7f073afca454c",
    measurementId: "G-PW2ZHPH2RW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const database = getDatabase(app);

export const signInWithGoogle = () => {
    signInWithPopup(getAuth(app), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(app));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
    const [user, setUser] = useState();

    useEffect(() => (
        onAuthStateChanged(getAuth(app), setUser)
    ), []);

    return [user];
};

export const auth = getAuth(app);