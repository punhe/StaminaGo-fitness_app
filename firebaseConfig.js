import { initializeApp, getApps } from "firebase/app";
import { getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
import { initializeAuth, getAuth } from 'firebase/auth';
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID } from '@env';

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

let app;
let auth;
let db;

function initializeFirebase() {
    if (getApps().length === 0) {
        app = initializeApp(firebaseConfig);
        auth = initializeAuth(app, {
            persistence: getReactNativePersistence(AsyncStorage)
        });
        db = getFirestore(app);
    } else {
        app = getApps()[0];
        auth = getAuth(app);
        db = getFirestore(app);
    }
}

initializeFirebase();

const usersRef = collection(db, 'users');
const chatsRef = collection(db, 'chats');

export { auth, db, usersRef, chatsRef };