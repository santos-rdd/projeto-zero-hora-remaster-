import "./DualSearch.css";
import toast from "react-hot-toast";
import { useState } from "react";

export default function DualSearch(props){

  const [tremedinha, setTreme] = useState("");
  const [name, setName] = useState("");
  const [cod, setCod] = useState("");

  function buscar() {
    if (!name && !cod) {
      toast.error("Preencha os itens para fazer uma busca!");
      setTreme("treme");
      setTimeout(()=>setTreme(""),500);
      return;
    }

    if (props.onBuscar) props.onBuscar(name, cod);
  }

  function limpar() {
    setName("");
    setCod("");
    if (props.onLimpar) props.onLimpar();
  }

  return (
    <>
      <p className="pBuscar">{ props.title }</p>

      <div className="campoBusca flex">
        <input 
          className={`nomeProduto ${tremedinha}`}
          type="text"
          placeholder="Item"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <p>ou</p>
        <input 
          className={`buscaCodigo ${tremedinha}`}
          type="text"
          placeholder="Código"
          value={cod}
          onChange={e => setCod(e.target.value)}
        />
      </div>

      <div className="botoesBusca">
        <button className="buscarCodigo" onClick={buscar}>
          Buscar
        </button>
        <button className="limparFiltro" onClick={limpar}>
          Limpar Filtro
        </button>
      </div>
    </>
  );
}
