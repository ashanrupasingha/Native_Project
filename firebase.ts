
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDnzmzDu1puACf2G_HdvaNNU_BXZc-BxK8",
  authDomain: "floralink-78da5.firebaseapp.com",
  projectId: "floralink-78da5",
  storageBucket: "floralink-78da5.firebasestorage.app",
  messagingSenderId: "413420276628",
  appId: "1:413420276628:web:34b2d5a35eccd7a8e25d81",
  measurementId: "G-BHYDD7Y430",
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)


