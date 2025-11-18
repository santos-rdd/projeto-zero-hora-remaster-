/* Componentes */
import BottomNav from "../../components/bottomNav";
import CarouselQtd from "../../components/carouselQtd";
import EstoqueAlt from "../../components/estoqueAlt";
import Relatorio from "../../components/relatorio";
import ItemExpedidos from "../../components/itemExpedidos";
import ItemRowPedidos from "../../components/itemRowPedidos";

/* Hooks personalizados */
import { useLogicaPedidos } from "../../(backEnd)/hooks/useLogicaPedidos";

/* Icones */
import Back from "../../../assets/images/icons/back.png";

/* Estilos */
import "./pedidosPage.css";

/* Bibliotecas */
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

export default function Pedidos() {
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
    confirmarPedido
  } = useLogicaPedidos();

  return (
    <>
      {pag1 ? (
        // -------- TELA 1 --------
        <div className="divCustom">
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
              info1="Num.\n do Pedido"
              info2="Fornecedor"
              info3="Data"
              info4="Valor"
            >
              <ItemRowPedidos />
            </ItemExpedidos>
          </div>
        </div>

      ) : !state ? (
        // -------- TELA 2 --------
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

              <EstoqueAlt />
            </div>

            <CarouselQtd setState={setState} confirmarPedido={confirmarPedido} />
          </div>
        </div>

      ) : (
        // -------- TELA 3 --------
        <div className="divCustom">
          <div className="searchArea">
            <h1>Pedidos N°00001</h1>
            <p className="pS">R$ 0,00</p>
            <img
              className="adapt1 tranform"
              src={Back}
              alt="Voltar"
              onClick={() => setState(false)}
            />
            <Relatorio />
            <div className="contInp">
              <h2>Cliente</h2>
              <textarea
                placeholder={`Nome: ${nomeCliente}\nEmail: ${emailCliente}\nTelefone: ${telefoneCliente}`}
                className="allInp clientInfo"
                rows="5"
              />
              <h2>Itens do Pedido</h2>
              <textarea
                placeholder="-Itens adicionados aparecerão aqui-"
                className="allInp clientInfo"
                rows="5"
              />
              <button className="btnExtrato" onClick={() => toast("Ainda não implementado")}>
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
