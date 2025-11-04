import "./generalInformation.css";
import Share from "../../assets/images/icons/share.png";
import tresPontos from "../../assets/images/tresPontos.png";
import { db } from "../(backEnd)/firebaseAdm";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function GeneralInformation() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const idMesAtual = `${ano}-${mes}`;

  const [pedidos, setPedidos] = useState(0);

  async function verItem() {
    const ref = doc(db, "faturamentoMensal", idMesAtual);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      const dados = docSnap.data();
      setPedidos(dados.produtos || 0);
    }
  }

  useEffect(() => {
    verItem();
  }, []);

  return (
    <div className="generalInformation">
      <div className="cotent1">
        <p>Informações Gerais</p>
        <img src={Share} alt="Compartilhar" className="share invert" />
        <img src={tresPontos} alt="Ver Mais" className="tres" />
      </div>

      <div className="cotent2">
        <div className="cot1">
          <h2>43</h2>
          <p>Entradas</p>
        </div>

        <div className="cot2">
          <h2>2</h2>
          <p>Saídas</p>
        </div>
      </div>

      <div className="cotent3">
        <div className="tent1">
          <label className="customRadio">
            <input type="radio" />
            <span className="radioMark"></span>
          </label>
          <p>{pedidos}</p>
          <p className="sobre">pedidos</p>
        </div>

        <div className="tent1">
          <label className="customRadio">
            <input type="radio" />
            <span className="radioMark"></span>
          </label>
          <p>13</p>
          <p className="sobre">concluídos</p>
        </div>

        <div className="tent1">
          <label className="customRadio">
            <input type="radio" />
            <span className="radioMark"></span>
          </label>
          <p>15</p>
          <p className="sobre">em progresso</p>
        </div>
      </div>
    </div>
  );
}
