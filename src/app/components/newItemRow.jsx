import "./newItemRow.css";
import { useState } from "react";

export default function NewItemRow (props) {

    const mudarValor = props.mudarValor;
    const [valor, setValor] = useState(props.valor || 0);

    function increment (){
        const novo = valor + 1;
        setValor(novo);
        mudarValor(novo);
    }

    function decrement (){
        const novo = valor > 0 ? valor - 1 : 0;
        setValor(novo);
        mudarValor(novo);
    }

    const cod = props.cod || "99999";
    const item = props.item || "papel sufite A4";
    const value = props.value || 10.10;
    
    return (
        <div className="containerRow">
            <div className="allrow row1">

                <div className="rowItem item1"> { cod } </div>

                <div className="rowItem item2"> { item } </div>
            </div>

            <div className="allrow row2">

                <div className="rowItem item3">
                    R${props.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>

                <div className="rowItem item4">
                    <div className="containerButtonCont">

                        <button className="btnCont rg"
                        onClick={()=> increment()}>+</button>

                            { valor }

                        <button className="btnCont lf"
                        onClick={()=> decrement()}>-</button>

                    </div>
                </div>
            </div>
        </div>
    )
}