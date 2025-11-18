import "./itemExpedidos.css";
import ItemRow from "./itemRow";
import { useState } from "react";

export default function ItemExpedidos(props){

    const info1 = props.info1 || "Cód";
    const info2 = props.info2 || "Item";
    const info3 = props.info3 || "Fornecedor";
    const info4 = props.info4 || "Qtd";
    const info5 = props.info5 || "";

    const font = props.font || "Fornecedor";

    return (
         <div class="itensExpedidos">
                        <div className="itensRecebidos">Itens { font }</div>
                        <div className="opcoes">
                            <p> { info1 } </p>
                            <p>{ info2 }</p>
                            <p>{ info3 }</p>
                            <p>{ info4 }</p>
                            {info5 && <p>{info5}</p>}
                        </div>
                        <div className="carouselVertical">
                            {  props.children }
                        </div>
                    </div>
    )
}
