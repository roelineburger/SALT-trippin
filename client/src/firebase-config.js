import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'practice-auth-980f2.firebaseapp.com',
  projectId: 'practice-auth-980f2',
  storageBucket: 'practice-auth-980f2.appspot.com',
  messagingSenderId: '829929218183',
  appId: '1:829929218183:web:ec40510ff6b274c34d1822',
  measurementId: 'G-7S685VYJRQ',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
