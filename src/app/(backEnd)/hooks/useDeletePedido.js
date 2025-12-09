import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseAdm";

export function useDeletePedido() {

  async function deletePedido(id) {
    try {
      await deleteDoc(doc(db, "itensRecebidos", id));
      return { ok: true };
    } catch (error) {
      console.error("Erro ao deletar:", error);
      return { ok: false, error };
    }
  }

  return { deletePedido };
}
