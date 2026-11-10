import "./estoquePage.css";

import BottomNav from "../../components/bottomNav";
import DualSearch from "../../components/DualSearch";
import CategoriaToggle from "../../components/categoriaToggle";
import ItemExpedidos from "../../components/itemExpedidos";
import ItemRow from "../../components/itemRow";
import EstoqueAlt from "../../components/estoqueAlt";
import CarouselEstoque from "../../components/carouselEstoque";

import { useState } from "react";
import { useDatabase } from "../../(backEnd)/hooks/useDatabase";
import { toast } from "react-hot-toast";
import { useCreatePedido } from "../../(backEnd)/hooks/useCreatePedido";

import Back from "../../../assets/images/icons/back.png";

export default function Estoque() {
  const [page, setPage] = useState(1);
  const estoque = useDatabase("itensRecebidos2");

  const [inp1Estoque, setInp1E] = useState("");
  const [inp2Estoque, setInp2E] = useState("");
  const [inp3Estoque, setInp3E] = useState("");
  const [inp4Estoque, setInp4E] = useState("");
  const [inp5Estoque, setInp5E] = useState("");
  const [tremedinha, setTreme] = useState("");

  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [filtro, setFiltro] = useState("");

  const { createPedido } = useCreatePedido();


  const receba = (tog) => {
    setMov(tog);
  };

   async function buscar() {

  const n3 = Number(inp3Estoque);
  const n4 = Number(inp4Estoque);
  const n5 = Number(inp5Estoque);

  if (!inp1Estoque || !inp2Estoque || !inp3Estoque || !inp4Estoque || !inp5Estoque) {
    toast.error("Por favor, preencha todos os campos antes de continuar!");
    setTreme("treme");
    setTimeout(() => setTreme(""), 500);
    return;
  }

  if (!/^\d+$/.test(inp1Estoque)) {
    toast.error("O código deve conter apenas números!");
    setTreme("treme");
    setTimeout(() => setTreme(""), 500);
    return;
  }

  if (inp1Estoque.length > 5 || inp1Estoque.length <= 0) {
    toast.error("O código pode ter no máximo 5 números!");
    setTreme("treme");
    setTimeout(() => setTreme(""), 500);
    return;
  }

  if (inp2Estoque.length < 3) {
    toast.error("O nome do item deve ter pelo menos 3 caracteres!");
    setTreme("treme");
    setTimeout(() => setTreme(""), 500);
    return;
  }

  if (inp2Estoque.length > 20) {
    toast.error("O nome do item pode ter no máximo 20 caracteres!");
    setTreme("treme");
    setTimeout(() => setTreme(""), 500);
    return;
  }

  if (!/^\d+$/.test(inp3Estoque) || !/^\d+$/.test(inp4Estoque) || !/^\d+$/.test(inp5Estoque)) {
    toast.error("Os campos de estoque devem conter apenas números!");
    setTreme("treme");
    setTimeout(() => setTreme(""), 500);
    return;
  }

  if (n3 < 0 || n4 < 0 || n5 < 0) {
    toast.error("Nenhum campo de estoque pode ter valor menor que 0!");
    setTreme("treme");
    setTimeout(() => setTreme(""), 500);
    return;
  }

  if (n3 > 999 || n4 > 999 || n5 > 999) {
    toast.error("Nenhum campo de estoque pode ter valor maior que 999!");
    setTreme("treme");
    setTimeout(() => setTreme(""), 500);
    return;
  }

  const codigoFormatado = inp1Estoque.padStart(5, "0");

  const result = await createPedido({
    cod: codigoFormatado,
    item: inp2Estoque,
    totalFisico: inp3Estoque,
    totalAlocado: inp4Estoque,
    totalDisponivel: inp5Estoque,
  });

  if (result.ok) {
    toast.success("Pedido criado com sucesso!");

    setInp1E("");
    setInp2E("");
    setInp3E("");
    setInp4E("");
    setInp5E("");

  } else {
    toast.error("Erro ao criar pedido!");
  }
}


  return (
    <>
      { page === 1 && (
        <div className="along">
          <h1 className="title">Estoque</h1>

          <CategoriaToggle toggle={receba} />

          <DualSearch
            title="Buscar por:"
            btnAtt={true}
            onBuscar={(name, cod) => {
              const filtrados = estoque.filter(e =>
                (!name || e.item.toLowerCase().includes(name.toLowerCase())) &&
                (!cod || e.cod.toLowerCase().includes(cod.toLowerCase()))
              );
              setProdutosFiltrados(filtrados);
              setFiltro(name || "");
            }}
            onLimpar={() => {
              setProdutosFiltrados(estoque);
              setFiltro("");
            }}
          />

          <ItemExpedidos
            info3={<>Total <br />disponível</>}
            info4={<>Total <br />alocado</>}
            info5={<>Total <br />físico</>}
          >
            {(produtosFiltrados.length ? produtosFiltrados : estoque).map(e => (
              <ItemRow
                key={e.id}
                i1={e.cod}
                i2={e.item}
                i3={e.totalAlocado}
                i4={e.totalDisponivel}
                i5={e.totalFisico}
              />
            ))}
          </ItemExpedidos>

          <div className="oneButtons">
            <button
              className="all history"
              onClick={() => setPage(3)}
            >
              Histórico de <br /> Movimentações
            </button>
          </div>

          <div className="oneButtons2">
            <button
              className="all2 history2 transform"
              onClick={() => {
               setPage(2);
              }}
            >
              Criar pedido de estoque
            </button>
          </div>
        </div>

      )} 
      
      
      
      
      { page === 2 && (
        <div className="along1">
          <h1 className="title">Criar Novo Pedido</h1>

          <img
            className="adapt transform"
            src={Back}
            alt="Voltar"
            onClick={() => {
              setPage(1);
            }}
          />

          <div className="type1">

            <input value={inp2Estoque}
            className={`allTypes inputAdd1 ${tremedinha}`} type="text" placeholder="Item"
            onChange={ (e) => setInp2E(e.target.value) }/>

            <input value={inp1Estoque}
            className={`allTypes inputAdd1 ${tremedinha}`} type="text" placeholder="Código do Item"
            onChange={ (e) => setInp1E(e.target.value) }/>

          </div>

          <div className="type2">
            <input value={inp3Estoque}
            className={`allTypes inputAdd2 ${tremedinha}`} type="text" placeholder="Total Físico"
            onChange={ (e) => setInp3E(e.target.value) }/>

            <input value={inp4Estoque}
            className={`allTypes inputAdd2 ${tremedinha}`} type="text" placeholder="Total Alocado"
            onChange={ (e) => setInp4E(e.target.value) }/>

            <input value={inp5Estoque}
            className={`allTypes inputAdd2 ${tremedinha}`} type="text" placeholder="Total Disponível"
            onChange={ (e) => setInp5E(e.target.value) }/>

          </div>

          <div className="btnPedidoAdd flex">
            <button className="btnEstoquePage transform"
            onClick={buscar}>
              Criar Novo Pedido!
            </button>
          </div>

          <ItemExpedidos
            info3={<>Total <br />disponível</>}
            info4={<>Total <br />alocado</>}
            info5={<>Total <br />físico</>}
          >
            {(produtosFiltrados.length ? produtosFiltrados : estoque).map(e => (
              <ItemRow
                key={e.id}
                i1={e.cod}
                i2={e.item}
                i3={e.totalAlocado}
                i4={e.totalDisponivel}
                i5={e.totalFisico}
              />
            ))}
          </ItemExpedidos>
        </div>
        )} 





        { page === 3 && (
        <div className="along1">
          <h1 className="title">Estoque</h1>

          <img
            className="adapt transform"
            src={Back}
            alt="Voltar"
            onClick={() => {
              setPage(1);
            }}
          />

          <DualSearch
            title="Alternar por:"
            btnAtt={false}
            onBuscar={(name, cod) => {
              const filtroAtual = (name || cod || "").toLowerCase();
              setFiltro(filtroAtual);
            }}
            onLimpar={() => setFiltro("")}
          />

          <CarouselEstoque filtro={filtro} />
        </div>
      )}

      <BottomNav />
    </>
  );
}
