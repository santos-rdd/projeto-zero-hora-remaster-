import "./categoriaToggle.css";
import { useState } from "react";

export default function CategoriaToggle (props){

    const [ativo, setAtivo] = useState("ativo");

    return (

    <div className="categoriaToggle">
        <button className={`basic rawMaterial
        ${ativo === "ativo" ? "ativo" : ""}`}
        onClick={() => setAtivo("ativo")}>
            Matérias-Primas
        </button>

        <button className={`basic finishedProducts
        ${ativo === "inativo" ? "ativo" : ""}`}
        onClick={() => setAtivo("inativo")}>
            Produtos Acabados
        </button>

    </div>
    )
}