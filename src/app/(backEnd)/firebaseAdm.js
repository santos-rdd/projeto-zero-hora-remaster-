import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseApp = {
  apiKey: "AIzaSyA0cWzUiDNi5jp-GHLEpG6S3sTcxAr9xCY",
  authDomain: "zerohora-f4016.firebaseapp.com",
  projectId: "zerohora-f4016",
};

const app = initializeApp(firebaseApp);
export const db = getFirestore(app);
