import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "../../(backEnd)/firebaseAdm";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";
import "./approve.css";
import zeroHora from "../../../assets/images/icons/zeroHora.png";

export default function Approve() {
  const [searchParams] = useSearchParams();
  const [mensagem, setMensagem] = useState("Verificando...");

  useEffect(() => {
    async function aprovarUsuario() {
      const email = searchParams.get("email");
      const token = searchParams.get("token");

      if (!email || !token) {
        setMensagem("Link inválido!");
        return;
      }

      const snapshot = await getDocs(collection(db, "pendingUsers"));
      const usuario = snapshot.docs.find(
        (docu) =>
          docu.data().email === email && docu.data().token === token
      );

      if (!usuario) {
        setMensagem("Pedido não encontrado ou já aprovado!");
        return;
      }

      try {
        const senhaOriginal = usuario.data().senha;

        const senhaCriptografada = await bcrypt.hash(senhaOriginal, 10);

        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, senhaOriginal);

       const senhaHash = usuario.data().senha; 
        await setDoc(doc(db, "users", email), {
          email,
          senha: senhaHash,
        });

        await deleteDoc(doc(db, "pendingUsers", usuario.id));

        setMensagem("Conta aprovada com sucesso!");
      } catch (err) {
        setMensagem("Erro ao aprovar: " + err.message);
      }
    }

    aprovarUsuario();
  }, []);

  return (
    <div className="divwe">
      <div className="msgCont">
        <h2 className="msgConf">{mensagem}</h2>
      </div>
      
      <div className="iconHora">
        <img src={zeroHora} alt="icone" />

        <p>Zero Hora</p>
      </div>
    </div>
  );
}
