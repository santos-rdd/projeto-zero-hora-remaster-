import { useState, useEffect } from "react";
import { useDatabase } from "../(backEnd)/hooks/useDatabase";
import toast from "react-hot-toast";
import "./estoqueAlt.css";
import BarCode from "../../assets/images/icons/barCode.png";

export default function EstoqueAlt({ setFiltro }) {
  const [inp1V, setInp1V] = useState("");
  const [inp2V, setInp2V] = useState("");
  const [tremedinha, setTreme] = useState(false);

  const produtos = useDatabase("itensAdicionados");

  useEffect(() => {
    if (setFiltro) setFiltro({ busca: inp1V, valorMax: inp2V });
  }, [inp1V, inp2V]);

  function inpV() {
    if (!inp1V && !inp2V) {
      toast.error("Preencha um campo para fazer uma busca!");
      setTreme(true);
      setTimeout(() => setTreme(false), 500);
    }
  }

  

  return (
    <div className="searchProducts">
      <p>Buscar Produtos</p>

      <div className="inpCont">
        <input
          type="text"
          className={`prodInp ${tremedinha ? "treme" : ""}`}
          placeholder="Busque por nome."
          value={inp1V}
          onChange={e => setInp1V(e.target.value)}
        />
        <img src={BarCode} alt="código de barra" className="icon" />
      </div>
    </div>
  );
}
