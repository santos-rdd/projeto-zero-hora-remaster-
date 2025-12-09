import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseAdm";

export function useCreatePedido() {

  async function createPedido({ cod, item, totalAlocado, totalDisponivel, totalFisico }) {
    try {
      const ref = collection(db, "itensRecebidos2");

      const q = query(ref, where("cod", "==", cod));
      const snap = await getDocs(q);

      if (!snap.empty) {
        return { ok: false, error: "Já existe um item com esse código." };
      }

      await addDoc(ref, {
        cod,
        item,
        totalAlocado: Number(totalAlocado),
        totalDisponivel: Number(totalDisponivel),
        totalFisico: Number(totalFisico),
        createdAt: new Date(),
      });

      return { ok: true };

    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      return { ok: false, error };
    }
  }

  return { createPedido };
}
