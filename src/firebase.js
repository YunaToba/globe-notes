import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA9V37l63lz0gGZBht00dtwA7d9Au06HIo",
  authDomain: "globe-notes-ea3e1.firebaseapp.com",
  projectId: "globe-notes-ea3e1",
  storageBucket: "globe-notes-ea3e1.firebasestorage.app",
  messagingSenderId: "1002189704474",
  appId: "1:1002189704474:web:20bd851c560db6e4a270a3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
