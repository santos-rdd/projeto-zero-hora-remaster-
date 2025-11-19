/* Estilização */
import "./estoquePage.css";

/* Componentes */
import BottomNav from "../../components/bottomNav";
import DualSearch from "../../components/DualSearch";
import CategoriaToggle from "../../components/categoriaToggle";
import ItemExpedidos from "../../components/itemExpedidos";
import ItemRow from "../../components/itemRow";
import EstoqueAlt from "../../components/estoqueAlt";
import CarouselEstoque from "../../components/carouselEstoque";

/* importações-hooks-bibliotecas */
import { useState } from "react";
import { useDatabase } from "../../(backEnd)/hooks/useDatabase";
import { toast } from "react-hot-toast";

/* Imagens */
import Back from "../../../assets/images/icons/back.png";

export default function Estoque() {
  const [mov, setMov] = useState(true);
  const estoque = useDatabase("itensRecebidos2");

  // Estado para guardar os itens filtrados
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [filtro, setFiltro] = useState(""); // filtro para o CarouselEstoque

  const receba = (tog) => {
    setMov(tog);
  };

  return (
    <>
      {mov ? (
        // -------- PÁGINA 1 --------
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
              setFiltro(name || ""); // envia filtro para CarouselEstoque
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
            {(produtosFiltrados.length ? produtosFiltrados : estoque).map((e) => (
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
            <button className="all history"
              onClick={() => setMov(false)}>
              Histórico de <br /> Movimentações
            </button>
          </div>
        </div>

      ) : (
        // -------- PÁGINA 2 --------
        <div className="along1">
          <h1 className="title">Estoque</h1>

          <img className="adapt tranform" 
            src={Back} alt="Voltar" 
            onClick={() => setMov(true)} />

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
