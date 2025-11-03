import "./DualSearch.css";
import toast from "react-hot-toast";
import { useState } from "react";

export default function DualSearch(props){

  const[tremedinha, setTreme] = useState("");

  function tost(){
    if(!name || !cod){
      toast.error("Preencha os itens para fazer uma busca!");
      setTreme("treme");
        setTimeout(()=>{
          setTreme("");
        },500);
    }
  }

  const [ name, setName ] = useState("");
  const [ cod, setCod ] = useState("");

    return (
        <div>
          <p className="pBuscar">Buscar por: </p>

            <div className="campoBusca flex">

                <input className={`nomeProduto ${tremedinha}`}
                type="text" name="Nome" id="Nome" value={name}
                placeholder="Nome" 
                onChange={n => setName(n.target.value)}
                />

                <p>ou</p>

                <input className={`buscaCodigo ${tremedinha}`}
                type="text" name="Codigo" id="Codigo" value={cod}
                placeholder="Codigo" 
                onChange={c => setCod(c.target.value)}/>
            </div>

            <button className="buscarCodigo"
            onClick={()=>tost()}>
              Buscar
            </button>
        </div>
    )
}