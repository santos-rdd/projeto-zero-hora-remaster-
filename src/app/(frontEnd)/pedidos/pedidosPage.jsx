import BottomNav from "../../components/bottomNav";
import CarouselQtd from "../../components/carouselQtd";
import EstoqueAlt from "../../components/estoqueAlt";
import Relatorio from "../../components/relatorio";
import ItemExpedidos from "../../components/itemExpedidos";
import ItemRowPedidos from "../../components/itemRowPedidos";

import { useLogicaPedidos } from "../../(backEnd)/hooks/useLogicaPedidos";

import Back from "../../../assets/images/icons/back.png";

import "./pedidosPage.css";

import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateDoc, arrayUnion } from "firebase/firestore";
import validator from "validator";


export default function Pedidos() {

    const [filtros, setFiltros] = useState({ busca: "", valorMax: "" });

    const cod = "3000 und. folhas A5 150g";
    const ban = "2 und. Banner Lona 90g 120 cm";
    const {
    tremeNome,
    tremeCpf,
    pag1,
    state,
    setPage1,
    setState,
    nomeFuncionario,
    cpfFuncionario,
    setNomeFuncionario,
    setCpfFuncionario,
    nomeCliente,
    emailCliente,
    telefoneCliente,
    setNomeCliente,
    setEmailCliente,
    setTelefoneCliente,
    iniciarPedido,
    confirmarPedido,
    numeroPedido,
    valorFinal,
    itensFinal,
    listaPedidos,
    setItensFinal,
    setValorFinal 
  } = useLogicaPedidos();

  return (
    <>
      {pag1 ? (
        <div className="divCustom1">
          <div className="searchArea">
            <h1>Novo Pedido</h1>
            <div className="contInp">
              <h2>Usuário</h2>
              <input
                type="text"
                placeholder="Nome"
                value={nomeFuncionario}
                onChange={e => setNomeFuncionario(e.target.value)}
                className={`allInp inp1P ${tremeNome}`}
              />
              <input
                type="text"
                placeholder="CPF"
                value={cpfFuncionario}
                onChange={e => setCpfFuncionario(e.target.value)}
                className={`allInp inp2P ${tremeCpf}`}
              />
              <button className="btnPedido" onClick={iniciarPedido}>
                Iniciar Pedido
              </button>
            </div>

            <ItemExpedidos
                info1="Nº Pedido"
                info2="Cliente"
                info3="Data"
                info4="Valor"
                >

                {listaPedidos && listaPedidos.length > 0 ? (
                    listaPedidos.map(p => (
                        <ItemRowPedidos
                            key={p.numeroPedido}
                            numero={p.numeroPedido}
                            cliente={p.cliente?.nome || "Cliente desconhecido"}
                            data={p.criadoEm?.seconds ? new Date(p.criadoEm.seconds * 1000).toLocaleDateString("pt-BR") : "Data não disponível"}
                            valor={p.valorTotal || 0}
                        />

                    ))
                ) : (
                    <p style={{ padding: "10px" }}>Procurando pedidos...</p>
                )}
            </ItemExpedidos>

          </div>
        </div>

      ) : !state ? (
        <div className="divCustom">
        <div className="searchArea">
          <h1>Pedidos</h1>
          <img
            className="adapt1 tranform"
            src={Back}
            alt="Voltar"
            onClick={() => setPage1(true)}
          />

          <div className="contInp">
            <h2>Solicitação</h2>
            <div className="inputGroup">
              <input
                type="text"
                placeholder="Nome: Fernando Augusto"
                value={nomeCliente}
                onChange={e => setNomeCliente(e.target.value)}
              />
              <input
                type="email"
                placeholder="E-mail: fernando@hotmail.com"
                value={emailCliente}
                onChange={e => setEmailCliente(e.target.value)}
              />
              <input
                type="text"
                placeholder="Telefone: (35) 9 9999-9999"
                value={telefoneCliente}
                onChange={e => setTelefoneCliente(e.target.value)}
              />
            </div>

            <EstoqueAlt setFiltro={setFiltros} />
          </div>

          <CarouselQtd
            filtros={filtros}
            confirmarPedido={confirmarPedido}
            setState={setState}
          />
        </div>
      </div>

      ) : (
        <div className="divCustom">
          <div className="searchArea">
            <h1>Pedidos N°{numeroPedido}</h1>
            <p className="pS">R$ {valorFinal.toFixed(2)}</p>
            <img
              className="adapt1 tranform"
              src={Back}
              alt="Voltar"
              onClick={() => setState(false)}
            />
            <Relatorio />
            <div className="contInp">
              <h2>Cliente</h2>
              <div className="clienteDiv">
                <p>Nome: {nomeCliente} </p>
                <p>E-mail: {emailCliente} </p>
                <p>Telefone: {telefoneCliente} </p>
              </div>

              <h2>Itens do Pedido</h2>
              <div className="clienteDiv">
                {itensFinal.map(item => (
                  <p key={item.id}>
                    {item.nome} — {item.quantidade} un — R${item.totalItem.toFixed(2)}
                  </p>
                ))}
              </div>

              <button
                className="btnExtrato"
                onClick={() => {
                  toast.success("Pedido confirmado!");
                  setPage1(true);
                  setState(false);
                  setNomeCliente("");
                  setEmailCliente("");
                  setTelefoneCliente("");
                  setItensFinal([]);
                  setValorFinal(0);
                }}
              >
                Confirmar Pedido
              </button>
            </div>
          </div>
        </div>

      )}

      <BottomNav />
    </>
  );
}
