import { initializeApp, getApps } from "firebase/app";
import { getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
import { initializeAuth, getAuth } from "firebase/auth";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
} from "@env";

const firebaseConfig = {
  apiKey: "AIzaSyDEWOM1EMCf0lLfPjxxjuh3i8l_LNqNWSA",
  authDomain: "staminago-d24ea.firebaseapp.com",
  projectId: "staminago-d24ea",
  storageBucket: "staminago-d24ea.firebasestorage.app",
  messagingSenderId: "1091510368834",
  appId: "1:1091510368834:web:402ed5f2f9209b357b4bdb",
  measurementId: "G-FQBJLTXG5H",
};

let app;
let auth;
let db;

function initializeFirebase() {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
    db = getFirestore(app);
  } else {
    app = getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
  }
}

initializeFirebase();

const usersRef = collection(db, "users");
const chatsRef = collection(db, "chats");

export { auth, db, usersRef, chatsRef };
