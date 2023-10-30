// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {
  collection,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1yy6oEkmdqmqKBga6rinW9MHiQbJb5cg",
  authDomain: "expense-tracker-ddda0.firebaseapp.com",
  projectId: "expense-tracker-ddda0",
  storageBucket: "expense-tracker-ddda0.appspot.com",
  messagingSenderId: "363841704620",
  appId: "1:363841704620:web:dbc058d80791da2914c509",
  measurementId: "G-037D03P58F"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});
export const auth = getAuth(app);

// collections
const feedbackConverter = {
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.name,
      text: data.text,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
  toFirestore(data) {
    return {
      name: data.name,
      text: data.text,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
};
export const feedbacksCollection = collection(
  firestore,
  "feedbacks"
).withConverter(feedbackConverter);

export default app;
