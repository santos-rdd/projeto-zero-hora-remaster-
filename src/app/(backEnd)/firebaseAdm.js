import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseApp = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseApp);
export const db = getFirestore(app);
