import { useState, useEffect } from "react";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseAdm";

export function useFaturamento(){
    const [fatura, setFaturamento] = useState(0);
    const [mesAtual, setMes] = useState("");

    useEffect(() => {
    const hoje = new Date();
    const mes = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}`;
    setMes(mes);

    const copiaFat = doc(db, "faturamentoMensal", mes);

    const init = async () => {
      const docSnap = await getDoc(copiaFat);

      if (docSnap.exists()) {
        setFaturamento(docSnap.data().faturamento);
        await updateDoc(docRef, {
        total: docSnap.data().total + valor
    });

      } else {
        await setDoc(copiaFat, { mes, faturamento: 0 });
        setFaturamento(0);
      }
    };

    },[]);

    const adicionarValor = async (valor) => {

    const docRef = doc(db, "faturamentoMensal", mesAtual);

    const novoFaturamento = Number((fatura + valor).toFixed(2));

    await updateDoc(docRef, { faturamento: novoFaturamento });
    setFaturamento(novoFaturamento);
    };

    return { fatura, adicionarValor };
}