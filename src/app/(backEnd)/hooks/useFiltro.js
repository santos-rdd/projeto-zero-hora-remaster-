import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseAdm"; 

export function useFiltro(limiteBaixo = 5, limiteAlto = 20) {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    const ref = collection(db, "itensRecebidos2"); 

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const dados = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const n = dados
        .filter(item => item.totalFisico <= limiteBaixo || item.totalFisico >= limiteAlto)
        .map(item => ({ id: item.id, nome: item.item, totalFisico: item.totalFisico }));

      setItens(n);
    });

    return () => unsubscribe();
  }, [limiteBaixo, limiteAlto]);

  return itens; 
}
