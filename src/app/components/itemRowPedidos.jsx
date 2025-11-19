import "./itemRowPedidos.css";

export default function ItemRowPedidos({ numero, cliente, data, valor }) {
  return (
    <div className="itemRow">
      <p>{numero}</p>
      <p>{cliente}</p>
      <p>{data}</p>
      <p>R$ {valor.toFixed(2)}</p>
    </div>
  );
}
