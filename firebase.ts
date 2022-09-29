import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const app = initializeApp({
  apiKey: "AIzaSyCbAntsZ8rlQVioXvwbknNdqGNWPZcOcOI",
  authDomain: "ics-journalism.firebaseapp.com",
  projectId: "ics-journalism",
  storageBucket: "ics-journalism.appspot.com",
  messagingSenderId: "222510070220",
  appId: "1:222510070220:web:a07ffd41f82dad08438569",
})

export const auth = getAuth(app)
export const db = getFirestore(app)
