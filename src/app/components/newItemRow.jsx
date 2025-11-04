import "./newItemRow.css";
import { useState, useEffect } from "react";

export default function NewItemRow (props) {
  const [quantidade, setQuantidade] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const valorUnitario = props.valor || 0;

  useEffect(() => {
    const novoTotal = quantidade * valorUnitario;
    setTotalItem(novoTotal);
    props.atualizarItem(props.id, quantidade, novoTotal);
  }, [quantidade]);

  useEffect(() => {
    setQuantidade(0);
    setTotalItem(0);
  }, [props.reset]);

  const increment = () => {
    setQuantidade(prev => prev + 1);
  };

  const decrement = () => {
    setQuantidade(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="containerRow">
      <div className="allrow row1">
        <div className="rowItem item1">{props.cod}</div>
        <div className="rowItem item2">{props.item}</div>
      </div>

      <div className="allrow row2">
        <div className="rowItem item3">
          R${props.valor}
        </div>

        <div className="rowItem item4">
          <div className="containerButtonCont">
            <button className="btnCont rg" onClick={increment}>+</button>
              {quantidade}
            <button className="btnCont lf" onClick={decrement}>-</button>
          </div>
        </div>
      </div>
    </div>
  );
}
