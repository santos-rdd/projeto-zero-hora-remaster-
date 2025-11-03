import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseAdm";

export function useDatabase(dbValues) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const recebeRef = collection(db, dbValues);

    const unsubscribe = onSnapshot(recebeRef, (snapshot) => {
      const documentos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(documentos);
    });

    return () => unsubscribe();
  }, [dbValues]);

  return data;
}
