import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBuT82tMpY4yrlLBn5XD4EMjobGbjiFp34",
    authDomain: "dhuruvan-exports.firebaseapp.com",
    projectId: "dhuruvan-exports",
    storageBucket: "dhuruvan-exports.firebasestorage.app",
    messagingSenderId: "118904789493",
    appId: "1:118904789493:web:577461a8362bdbaa1de8bc",
    measurementId: "G-40YFNMCGHZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
