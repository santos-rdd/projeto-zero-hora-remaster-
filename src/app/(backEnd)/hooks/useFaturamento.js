import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseAdm";

export function useFaturamento() {
  const [fatura, setFaturamento] = useState(0);
  const [mesAtual, setMes] = useState("");

  useEffect(() => {
    const hoje = new Date();
    const mes = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}`;
    setMes(mes);

    const init = async () => {
      const docRef = doc(db, "faturamentoMensal", mes);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFaturamento(docSnap.data().faturamento || 0);
      } else {
        await setDoc(docRef, { mes, faturamento: 0 });
        setFaturamento(0);
      }
    };

    init();
  }, []);

  const adicionarValor = async (valor) => {
    if (!mesAtual) return; 

    const docRef = doc(db, "faturamentoMensal", mesAtual);
    const docSnap = await getDoc(docRef);

    let faturamentoAtual = 0;
    if (docSnap.exists()) {
      faturamentoAtual = docSnap.data().faturamento || 0;
    } else {
      await setDoc(docRef, { mes: mesAtual, faturamento: 0 });
    }

    const novoFaturamento = Number((faturamentoAtual + valor).toFixed(2));
    await updateDoc(docRef, { faturamento: novoFaturamento });
    setFaturamento(novoFaturamento);
  };


  const adicionarProdutos = async (quantidade) => {
    if (!mesAtual) return;

    const docRef = doc(db, "faturamentoMensal", mesAtual);
    const docSnap = await getDoc(docRef);

    let produtosAtuais = 0;
    if (docSnap.exists()) {
      produtosAtuais = docSnap.data().produtos || 0;
    } else {
      await setDoc(docRef, { mes: mesAtual, faturamento: 0, produtos: 0 });
    }

    const novosProdutos = produtosAtuais + quantidade;
    await updateDoc(docRef, { produtos: novosProdutos });
  };

  
  return { fatura, adicionarValor, adicionarProdutos };
}
