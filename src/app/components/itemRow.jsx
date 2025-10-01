import "./itemRow.css";

export default function ItemRow (props){

    const cod = props.cod || "99999";
    const item = props.item || "papel sulfite A4";
    const fornecedor = props.fornecedor || "papelaria SA";
    const qtd = props.qtd || "4";
    const status = props.status || "Conferido";

    return (
        <div className="row">
            <p>{ cod }</p>
            <p className="align">{ item }</p>
            <p>{ fornecedor }</p>
            <p>{ qtd }</p>
            <p>{ status }</p>
        </div>
    )
}