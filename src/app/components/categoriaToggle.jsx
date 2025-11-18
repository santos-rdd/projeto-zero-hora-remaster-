import "./categoriaToggle.css";
import { useState } from "react";

export default function CategoriaToggle (props){

    const [ativo, setAtivo] = useState("ativo");

    const button = (ativo) => {
        setAtivo(ativo);
        props.toggle(ativo);
    }   

    return (

    <div className="divy">
        <div className="categoriaToggle">
            <div className={`basic rawMaterial
            ${ativo === "ativo" ? "ativo" : ""}`}
            onClick={
                () => {
                button("ativo");
                }}>
                Matérias-Primas
            </div>
    </div>    


    </div>
    )
}