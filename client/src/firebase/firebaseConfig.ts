import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCubaH1A2MW8HR0H3EBvrkWwBjoKSptOoU",
  authDomain: "fabled-emissary-445302-g8.firebaseapp.com",
  databaseURL: "https://fabled-emissary-445302-g8-default-rtdb.firebaseio.com",
  projectId: "fabled-emissary-445302-g8",
  storageBucket: "fabled-emissary-445302-g8.firebasestorage.app",
  messagingSenderId: "626659458434",
  appId: "1:626659458434:web:5277de312bc4fad7b8639b"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage();
export const auth = getAuth();
auth.languageCode = 'vn';
