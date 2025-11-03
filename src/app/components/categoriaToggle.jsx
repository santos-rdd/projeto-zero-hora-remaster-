import "./categoriaToggle.css";
import { useState } from "react";

export default function CategoriaToggle (props){

    const [ativo, setAtivo] = useState("ativo");

    const button = (ativo) => {
        setAtivo(ativo);
        props.toggle(ativo);
    }   

    return (

    <div className="categoriaToggle">
        <button className={`basic rawMaterial
        ${ativo === "ativo" ? "ativo" : ""}`}
        onClick={
            () => {
            button("ativo");
            }}>
            Matérias-Primas
        </button>

        <button className={`basic finishedProducts
        ${ativo === "inativo" ? "ativo" : ""}`}
        onClick={
            () => {
            button("inativo");
            }}>
            Produtos Acabados
        </button>

    </div>
    )
}