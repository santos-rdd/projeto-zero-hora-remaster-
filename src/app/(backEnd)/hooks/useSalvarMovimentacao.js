import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseAdm";

export function useSalvarMovimentacao() {

  async function salvarMovimentacao({ fornecedor, cod, item, qtd, status }) {
    try {

      const ref = collection(db, "itensRecebidos");

      const q = query(ref, where("cod", "==", cod));
      const snap = await getDocs(q);

      if (!snap.empty) {
        return { ok: false, error: "Código já existe no banco." };
      }

      await addDoc(ref, {
        fornecedor,
        cod,
        item,
        qtd: Number(qtd),
        status,
        createdAt: new Date()
      });

      return { ok: true };

    } catch (error) {
      console.error("Erro ao salvar movimentação:", error);
      return { ok: false, error };
    }
  }

  return { salvarMovimentacao };
}
