import "./generalInformation.css";
import Share from "../../assets/images/icons/share.png";
import { db } from "../(backEnd)/firebaseAdm";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import jsPDF from "jspdf";

export default function GeneralInformation() {
  const hoje = new Date();
  const idMesAtual = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}`;

  const [pedidos, setPedidos] = useState(0);
  const [pedConcluidos, setPedidosConc] = useState(0);
  const [pedidosProgreso, setPedidosProg] = useState(0);

  const [msgPedidos, setMsgPedidos] = useState(false);
  const [msgConcluidos, setMsgConcluidos] = useState(false);
  const [msgEmProgresso, setMsgEmProgresso] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      try {
        const ref = doc(db, "faturamentoMensal", idMesAtual);
        const snap = await getDoc(ref);
        if (snap.exists()) setPedidos(snap.data().produtos || 0);

        const pedidosRef = collection(db, "itensRecebidos");
        const [naoConf, conf] = await Promise.all([
          getDocs(query(pedidosRef, where("status", "==", "Não conferido"))),
          getDocs(query(pedidosRef, where("status", "==", "Conferido")))
        ]);

        setPedidosConc(naoConf.size);
        setPedidosProg(conf.size);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    }
    carregarDados();
  }, []);

  function gerarPDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Resumo de Pedidos", 10, 10);

    let y = 25;
    if (msgPedidos) { doc.text(`Total de pedidos: ${pedidos}`, 10, y); y += 10; }
    if (msgConcluidos) { doc.text(`Pedidos concluídos: ${pedConcluidos}`, 10, y); y += 10; }
    if (msgEmProgresso) { doc.text(`Pedidos em progresso: ${pedidosProgreso}`, 10, y); }

    const blob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(blob);
    window.open(pdfUrl); 
    return pdfUrl;
  }

  function enviarWhatsApp(pdfUrl) {
    const msg = encodeURIComponent("Segue o relatório dos pedidos do sistema.");
    window.open(`https://wa.me/?text=${msg}%0A${pdfUrl}`, "_blank");
  }

  function gerarOuEnviar() {
    if (!msgPedidos && !msgConcluidos && !msgEmProgresso) {
      toast.error("Selecione algum campo antes de gerar o PDF!");
      return;
    }

    const querEnviar = window.confirm("Deseja enviar o PDF pelo WhatsApp?");
    const pdfUrl = gerarPDF();

    if (querEnviar) {
      setTimeout(() => enviarWhatsApp(pdfUrl), 1000);
    } else {
      toast.success("PDF gerado com sucesso!");
    }
  }

  return (
    <div className="generalInformation">
      <div className="cotent1">
        <p>Informações Gerais</p>
        <img src={Share} alt="Compartilhar" className="share invert" onClick={gerarOuEnviar} />
      </div>

      <div className="cotent2">
        <div className="cot1"><h2>43</h2><p>Entradas</p></div>
        <div className="cot2"><h2>2</h2><p>Saídas</p></div>
      </div>

      <div className="cotent3">
        {[
          { label: "pedidos", valor: pedidos, checked: msgPedidos, setChecked: setMsgPedidos },
          { label: "concluídos", valor: pedConcluidos, checked: msgConcluidos, setChecked: setMsgConcluidos },
          { label: "em progresso", valor: pedidosProgreso, checked: msgEmProgresso, setChecked: setMsgEmProgresso }
        ].map((item, i) => (
          <div key={i} className="tent1">
            <label className="customRadio">
              <input type="checkbox" checked={item.checked} onChange={() => item.setChecked(!item.checked)} />
              <span className="radioMark"></span>
            </label>
            <p>{item.valor}</p>
            <p className="sobre">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
