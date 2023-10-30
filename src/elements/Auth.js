// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDD-k0SvXPzA-p71-fAZgk23ABi11ckcVA",
	authDomain: "codepilot-eb63e.firebaseapp.com",
	projectId: "codepilot-eb63e",
	storageBucket: "codepilot-eb63e.appspot.com",
	messagingSenderId: "1010505637711",
	appId: "1:1010505637711:web:2669531180df669419ef3a",
	measurementId: "G-2NTY2F89C2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

var isLoaded = false;
var isSignedIn = false;

export function signInWithGoogle() {
    if (isLoaded && isSignedIn) {
        return;
    }
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
}

export function isUserSignedIn() {
    return isSignedIn;
}

export function logOut() {
    auth.signOut();
}

//on auth state change



export const Auth = (props) => {

    useEffect(() => {
        if (!isLoaded && auth && auth.currentUser != null) {
            isLoaded = true;
        }
        props.setAuthState(auth.currentUser);
        console.log("auth state changed");
        auth.onAuthStateChanged((user) => {
            if (user) {
                isSignedIn = true;
                console.log("user signed in");
            } else {
                isSignedIn = false;
                console.log("user signed out");
            }
            isLoaded = true;
            props.setAuthState(user);
        });
    }, []);

    return null;
}

export {auth};