import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { db } from "../firebaseAdm";

export function useDatabase(dbValues){
    const [data, setData] = useState([]);

    useEffect(()=>{
        const getData = async() => {
            const recebeRef = collection(db, dbValues);
            const ref = await getDocs(recebeRef);
            setData(ref.docs.map( doc =>({id: doc.id, ...doc.data() })));
        };
    getData();
    },[dbValues]);
    
    return data; 
}