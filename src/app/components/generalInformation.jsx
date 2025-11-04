import "./generalInformation.css";
import Share from "../../assets/images/icons/share.png";
import tresPontos from "../../assets/images/tresPontos.png";
import { db } from "../(backEnd)/firebaseAdm";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function GeneralInformation() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const idMesAtual = `${ano}-${mes}`;

  const [pedidos, setPedidos] = useState(0);
  const [pedConcluidos, setPedidosConc] = useState(0);
  const [pedidosProgreso, setPedidosProg] = useState(0);

  async function verItem() {
    const ref = doc(db, "faturamentoMensal", idMesAtual);
    const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const dados = docSnap.data();
        setPedidos(dados.produtos || 0);
      }
  }

  async function verPedidosNaoConcluidos() {
    try {
    const pedidosRef = collection(db, "itensRecebidos");
    const q = query(pedidosRef, where("status", "==", "Não conferido"));
    const q2 = query(pedidosRef, where("status", "==", "Conferido"));
    const snapshot = await getDocs(q);
    const snapshot2 = await getDocs(q2);
    const quantidade = snapshot.size;
    const quantidade2 = snapshot2.size;

    let soma = 0;
    snapshot.forEach((doc) => {
      const dados = doc.data();
        if (dados.valor) {
          soma += Number(dados.valor); 
        }
    });

    snapshot2.forEach((doc) => {
      const dados = doc.data();
        if (dados.valor) {
          soma += Number(dados.valor); 
        }
    });
    setPedidosConc(quantidade);
    setPedidosProg(quantidade2);
    return { quantidade, quantidade2, soma };

  } catch (err) {
    console.error("Erro ao buscar dados:", err);
  }
  }

  useEffect(() => {
    verItem();
    verPedidosNaoConcluidos();
  }, []);

  const [msgPedidos, setMsgPedidos] = useState(false);
  const [msgConcluidos, setMsgConcluidos] = useState(false);
  const [msgEmProgresso, setMsgEmProgresso] = useState(false);

  // Compartilhar WhatsApp
  function shareWpp(txt) {
    const msg = encodeURIComponent(txt);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  }

  function prEnvio(){
    if (!msgPedidos && !msgConcluidos && !msgEmProgresso) {
    toast.error("Selecione algum campo antes de enviar uma mensagem!");
    return;
    } else {
      enviarMensagens();
    }
  }

  function enviarMensagens() {
    const querEnviar = window.confirm(
      "Deseja enviar as opções selecionadas por WhatsApp ?"
    );
    if (!querEnviar) return;

    let msg = "";
    if (msgPedidos) msg += `A um total de ${pedidos} pedidos!\n`;
    if (msgConcluidos) msg += `A ${pedConcluidos} pedidos concluidos!\n`;
    if (msgEmProgresso) msg += `A ${pedidosProgreso} pedidos em processo!\n`;

    if (msg) shareWpp(msg);
  }

  return (
    <div className="generalInformation">
      <Toaster />
      <div className="cotent1">
        <p>Informações Gerais</p>

        <img
          src={Share}
          alt="Compartilhar"
          className="share invert"
          onClick={prEnvio} 
        />

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
            <input
              type="checkbox"
              checked={msgPedidos}
              onChange={() => setMsgPedidos(!msgPedidos)}
            />
            <span className="radioMark"></span>
          </label>
          <p>{pedidos}</p>
          <p className="sobre">pedidos</p>
        </div>

        <div className="tent1">
          <label className="customRadio">
            <input
              type="checkbox"
              checked={msgConcluidos}
              onChange={() => setMsgConcluidos(!msgConcluidos)}
            />
            <span className="radioMark"></span>
          </label>
          <p>{pedConcluidos}</p>
          <p className="sobre">concluídos</p>
        </div>

        <div className="tent1">
          <label className="customRadio">
            <input
              type="checkbox"
              checked={msgEmProgresso}
              onChange={() => setMsgEmProgresso(!msgEmProgresso)}
            />
            <span className="radioMark"></span>
          </label>
          <p>{pedidosProgreso}</p>
          <p className="sobre">em progresso</p>
        </div>
      </div>
    </div>
  );
}
