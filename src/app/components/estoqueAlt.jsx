import { useState } from "react";
import "./estoqueAlt.css";
import BarCode from "../../assets/images/icons/barCode.png";
import toast from "react-hot-toast";

export default function estoqueAlt(){

    const [inp1V, setInp1V] = useState("");
    const [inp2V, setInp2V] = useState("");
    const [tremedinha, setTreme] = useState(false);

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
                    placeholder="Busque por nome ou cód."
                    value={inp1V}
                    onChange={i => setInp1V(i.target.value)}
                />

                <img src={BarCode} alt="codigo de barra" className="icon" />
            </div>

            <input 
                type="text"
                className={`qtdInp ${tremedinha ? "treme" : ""}`}
                placeholder="Quantidade"
                value={inp2V}
                onChange={n => setInp2V(n.target.value)}
            />

            <button 
                className="blackButton"
                onClick={inpV}
            >
                Buscar
            </button>
        </div>
    )
}
