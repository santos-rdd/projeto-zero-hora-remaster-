import "./estoqueAlert.css";
import Caixa from "../../assets/images/caixa.png";
import Notificacao from "../../assets/images/notificacao.png";
import Cinematografia from "../../assets/images/cinematografia.png";

export default function EstoqueAlert(props){

    const cor = props.cor || "red";
    const title = props.title || "Adicione um titulo";
    const subTitle = props.subTitle || "Adicione um titulo";

    return(
            <div class="card">
                <div class="cardHeader">
                    <img src={Caixa} alt="Ícone" class="cardIcon" />
                    <span class="card-menu">...</span>
                </div>

                <div className="ok" 
                style={{
                    background: cor,
                }}/>

                <div class="cardContent">
                    <p> { title } </p>
                </div>

                <div class="cardFooter">
                    <span>Hoje</span>
                    <img src={Notificacao} alt="Ícone Footer" class="footerIcon" />
                </div>

            </div>
    )
}