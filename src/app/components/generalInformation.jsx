import "./generalInformation.css";
import Share from "../../assets/images/icons/share.png";
import { db } from "../(backEnd)/firebaseAdm";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import jsPDF from "jspdf";
import ZeroHoraBase64 from "../../assets/images/icons/zeroHora.png"; // ícone funciona como antes

export default function GeneralInformation() {
  const [pedidos, setPedidos] = useState(0);
  const [pedConcluidos, setPedidosConc] = useState(0);
  const [pedidosProgreso, setPedidosProg] = useState(0);
  const [pedidosLista, setPedidosLista] = useState([]);

  const [msgPedidos, setMsgPedidos] = useState(false);
  const [msgConcluidos, setMsgConcluidos] = useState(false);
  const [msgEmProgresso, setMsgEmProgresso] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      try {
        const pedidosRef = collection(db, "pedidosCriados");
        const snap = await getDocs(pedidosRef);
        const lista = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPedidosLista(lista);
        setPedidos(lista.length);

        const pendentes = lista.filter(p => p.status === "pendente").length;
        const concluidos = lista.filter(p => p.status === "concluido").length;

        setPedidosProg(pendentes);
        setPedidosConc(concluidos);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    }
    carregarDados();
  }, []);

  function gerarPDF() {
    if (msgConcluidos || msgEmProgresso) {
      toast.error("Trabalhando nisso!");
      return; // não gera PDF
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Relatório de Pedidos - ZeroHora", 10, 15);

    // Ícone da ZeroHora no canto superior direito
    doc.addImage(ZeroHoraBase64, "PNG", 160, 10, 30, 30);

    let y = 30;
    doc.setFontSize(12);
    doc.text("Olá! Resumo dos pedidos do sistema ZeroHora.", 10, y);
    y += 10;

    if (msgPedidos) {
      doc.setFont(undefined, "bold");
      doc.text("Entradas (Pedidos Criados):", 10, y);
      doc.setFont(undefined, "normal");
      y += 7;

      if (pedidosLista.length === 0) {
        doc.text("Nenhum pedido encontrado.", 10, y);
        y += 10;
      } else {
        pedidosLista.forEach(p => {
          const clienteNome = p.cliente?.nome || "-";
          const clienteEmail = p.cliente?.email || "-";
          const clienteTelefone = p.cliente?.telefone || "-";

          doc.setFont(undefined, "bold");
          doc.text(`Pedido Nº: ${p.numeroPedido || "-"}`, 10, y);
          y += 6;

          doc.setFont(undefined, "normal");
          doc.text(`Cliente: ${clienteNome}`, 10, y);
          doc.text(`Email: ${clienteEmail}`, 10, y + 6);
          doc.text(`Telefone: ${clienteTelefone}`, 10, y + 12);
          y += 18;

          doc.setFont(undefined, "bold");
          doc.text("Item", 10, y);
          doc.text("Qtd", 100, y);
          doc.text("Total", 140, y);
          doc.setFont(undefined, "normal");
          y += 6;

          (p.itens || []).forEach(item => {
            doc.text(item.nome || "-", 10, y);
            doc.text(String(item.quantidade || "-"), 100, y);
            doc.text(`R$ ${item.totalItem != null ? item.totalItem.toFixed(2) : "-"}`, 140, y);
            y += 6;
          });

          doc.setFont(undefined, "bold");
          doc.text(`Valor Total: R$ ${p.valorTotal != null ? p.valorTotal.toFixed(2) : "-"}`, 10, y);
          doc.setFont(undefined, "normal");
          y += 10;

          if (y > 280) {
            doc.addPage();
            y = 20;
          }
        });
      }
    }

    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    return url;
  }

  function enviarWhatsApp(pdfUrl) {
    const msg = encodeURIComponent("Segue o relatório dos pedidos do sistema ZeroHora.");
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  }

  function gerarOuEnviar() {
    if (!msgPedidos && !msgConcluidos && !msgEmProgresso) {
      toast.error("Selecione algum campo antes de gerar o PDF!");
      return;
    }

    const querEnviar = window.confirm("Deseja enviar o PDF pelo WhatsApp?");
    const pdfUrl = gerarPDF();

    if (!pdfUrl) return; // se não gerou PDF (msgConcluidos/msgEmProgresso), sai

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

      <div className="cotent3">
        {[
          { label: "Entradas", valor: pedidos, checked: msgPedidos, setChecked: setMsgPedidos },
          { label: "Saídas", valor: pedConcluidos, checked: msgConcluidos, setChecked: setMsgConcluidos },
          { label: "Alterações", valor: pedidosProgreso, checked: msgEmProgresso, setChecked: setMsgEmProgresso }
        ].map((item, i) => (
          <div key={i} className="tent1">
            <label className="customRadio">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => {
                  if (item.label === "Saídas" || item.label === "Alterações") {
                    toast.error("Trabalhando nisso!");
                    item.setChecked(false); 
                  } else {
                    item.setChecked(!item.checked); 
                  }
                }}
              />
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
