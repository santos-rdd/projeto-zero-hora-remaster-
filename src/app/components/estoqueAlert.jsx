import "./estoqueAlert.css";
import Caixa from "../../assets/images/caixa.png";
import Notificacao from "../../assets/images/notificacao.png";

export default function EstoqueAlert({ item1, cor }) {
    return (
        <div className="card">
            <div className="cardHeader">
                <img src={Caixa} alt="Ícone" className="cardIcon" />
                <span className="card-menu">...</span>
            </div>

            <div className="ok" 
                style={{ background: cor ? "green" : "red" }}
            />

            <div className="cardContent">
                <p>{item1} {cor ? "com sobra de estoque" : "com baixo estoque"}</p>
            </div>

            <div className="cardFooter">
                <span>Hoje</span>
                <img src={Notificacao} alt="Ícone Footer" className="footerIcon" />
            </div>
        </div>
    );
}
