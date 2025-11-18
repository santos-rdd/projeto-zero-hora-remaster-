import "./btnInfo.css";
import question from "../../assets/images/icons/question.png";
import cross from "../../assets/images/icons/cross.png";
import { useState } from "react";
import Modal from "react-modal";
import rArrow from "../../assets/images/icons/rArrow.png";

Modal.setAppElement("#root");

export default function BtnInfo() {
  const [msgHelp, setHelp] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null); 

  const topics = [
    { id: "home", title: "Página Inicial", desc: "Aqui você encontra um resumo geral das movimentações, alertas e pedidos recentes." },
    { id: "mov", title: "Movimentações", desc: "A seção de movimentações mostra todas as entradas e saídas de produtos com detalhes e datas." },
    { id: "estoque", title: "Estoque", desc: "No controle de estoque, você pode verificar quantidades, adicionar novos produtos e acompanhar alertas." },
    { id: "pedidos", title: "Pedidos", desc: "Gerencie pedidos em andamento, concluídos e visualize o histórico completo." },
    { id: "relatorios", title: "Relatórios", desc: "Gere relatórios de vendas, estoque e desempenho diário com gráficos e exportações." },
  ];

  return (
    <>
      <img
        src={question}
        alt="Ajuda"
        onClick={() => setHelp(true)}
        className="btnInfo"
      />

      <Modal
        isOpen={msgHelp}
        onRequestClose={() => {
          setHelp(false);
          setSelectedTopic(null);
        }}
        overlayClassName="fundoModal"
        className="HelpModal"
        contentLabel="Central de Ajuda"
      >
        <div className="description">
          <h2>Central de Ajuda</h2>
          <button
            className="btnHelp"
            onClick={() => {
              if (selectedTopic) setSelectedTopic(null);
              else setHelp(false);
            }}
          >
            <img className="cross" src={cross} alt="Fechar" />
          </button>
        </div>

       <div className="helpContent">
            <div className={`alignHelpers ${selectedTopic ? "slide-out" : "slide-in"}`}>
                {topics.map((t) => (
                <p key={t.id} onClick={() => setSelectedTopic(t)}>
                    {t.title}
                    <img className="set" src={rArrow} alt="Ir" />
                </p>
                ))}
            </div>

            <div className={`topicDetails ${selectedTopic ? "slide-in" : "slide-out"}`}>
                {selectedTopic && (
                <>
                    <h3>{selectedTopic.title}</h3>
                    <p>{selectedTopic.desc}</p>
                    
                    <button className="backBtn" onClick={() => setSelectedTopic(null)}>
                     Voltar
                    </button>
                </>
                )}
            </div>
            </div>

      </Modal>
    </>
  );
}
