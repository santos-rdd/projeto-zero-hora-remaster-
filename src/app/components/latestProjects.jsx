import "./latestProjects.css";
import Grafo from "../../assets/images/grafo2.png";

export default function LatestProjects(props){

    const cor = props.cor || "red";

    return(
            <div class="cardTwo">
               

                <div class="cardFooterTwo">
                     <div className="radio" />

                    <span>Indicadores </span>
                    <img src={Grafo} alt="Ícone Footer" class="footerIconTwo" />
                    <p>S T Q Q S</p>
                    <h3 className="pedidos">Pedidos finalizados por dia</h3>

                </div>

            </div>
    )
}