import Alerta from "../../assets/images/alerta.png"; 
import Relogio from "../../assets/images/relogio.png"; 
import "./overview.css";

export default function OverView (props){
    
    const title = props.title || "Visão Geral";
    const description1 = props.description1 || "Faturamento Ultimos 30 dias";
    const description2 = props.description2 || "Intes com baixo estoque";
    const description3 = props.description3 || "Pedidos Pendentes";
    const value = props.value || 12350;
    const quantidade = props.quantidade || 10;
    const request = props.request || 5;
    
    return (


         <div className="infos">
                <h1> { title } </h1>
                <div className="group info1">
                    <div className="contp">{description1}</div>

                    <div className="contItems">
                        <p className="bord">R$</p>
                        <p className="drob">{ value.toFixed(2) }</p>
                        <div className={`${value > 10000 ? "arrowUp" : "arrowDown"}`} />
                    </div>
                </div>

                <div className="group info2">
                    <div className="contp">{description2}</div>
                    <div className="contItems2">
                        <p className="qtd">
                            <img src={ Alerta } alt="Aviso" 
                            className={
                                `${quantidade < 10 ? "alert" : "noExist"}`}/>
                            { quantidade }
                            </p>
                        <p className="qtdItens">itens</p>
                    </div>
                </div>

                <div className="group info3">
                    <div className="contp">{description3}</div>

                    <div className="contItems3">
                        <p className="reqAll req"> 
                            <img src={ Relogio } alt="Relogio"
                            className={`${ request >= 5 ? "relogio" : "semRelogio"}`} />
                                <span> { request } </span>
                        </p>

                        <p className="reqAll reqP">Pedidos</p>
                    </div>
                </div>
            </div>
    )
}