import "./rowEstoque.css";
import { useState, useEffect } from "react";

export default function RowEstoque({ cod, item, totalFisico, onChange, quantidadeAlterada }) {
  const [quantidade, setQuantidade] = useState(quantidadeAlterada || 0);

  const increment = () => setQuantidade(prev => {
    const novo = prev + 1;
    onChange(cod, novo);
    return novo;
  });

  const decrement = () => setQuantidade(prev => {
    const novo = Math.max(prev - 1, 0);
    onChange(cod, novo);
    return novo;
  });

  useEffect(() => {
    setQuantidade(quantidadeAlterada || 0);
  }, [quantidadeAlterada]);

  useEffect(() => {
    onChange(cod, quantidade);
  }, []);

  return (
    <div className="containerRow">
      <div className="allrow row1">
        <div className="rowItem item1">{cod}</div>
        <div className="rowItem item2">{item}</div>
      </div>

      <div className="allrow row2">
        <div className="rowItem item33">
          {totalFisico} 
        </div>

        <div className="rowItem22 item44">
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
