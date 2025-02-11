import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBk1NRudnTJvcs7LWn5YwV-D6MdgqeRGgA",
    authDomain: "coursreact-ec922.firebaseapp.com",
    projectId: "coursreact-ec922",
    storageBucket: "coursreact-ec922.firebasestorage.app",
    messagingSenderId: "760313576474",
    appId: "1:760313576474:web:3d134c089daa7422e565a3",
    measurementId: "G-11LW3B08VX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialisation Firestore (Base de données)
export const db = getFirestore(app);

// Initialisation Storage (Stockage d'images)
export const storage = getStorage(app);
