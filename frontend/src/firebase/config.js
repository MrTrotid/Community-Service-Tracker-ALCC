import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDslm36Rv1qpDntxNrMtaFGtdQRC3xJZ-s",
  authDomain: "community-server-tracker.firebaseapp.com",
  projectId: "community-server-tracker",
  storageBucket: "community-server-tracker.firebasestorage.app",
  messagingSenderId: "451514257592",
  appId: "1:451514257592:web:40459bca9799b63d49644d",
  measurementId: "G-25E4ETJ2D2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export const db = getFirestore(app);
