import Alerta from "../../assets/images/alerta.png"; 
import Relogio from "../../assets/images/relogio.png"; 
import "./overview.css";
import { useState, useEffect } from "react";
import { useDatabase } from "../(backEnd)/hooks/useDatabase";

export default function OverView (props){
    
    const title = props.title || "Visão Geral";
    const description1 = props.description1 || "Faturamento Ultimos 30 dias";
    const description2 = props.description2 || "Itens com baixo estoque";
    const description3 = props.description3 || "Pedidos Pendentes";
    const value = props.value || 12350;
    const quantidade = props.quantidade || 10;
    const request = props.request || 5;

    const [faturamento, setFaturamento] = useState(0);
    const fatura = useDatabase("faturamentoMensal");

    const [total, setTotal] = useState(0);
    const alerta = useDatabase("itensRecebidos2");

    useEffect(() => {
        if (fatura.length === 0) return;

        const docNovembro = fatura.find(doc => doc.id === "2025-11");
        if (docNovembro) {
            setFaturamento(docNovembro.faturamento);
        }
    }, [fatura]);
    
    return (


         <div className="infos">
                <h1> { title } </h1>
                <div className="group info1">
                    <div className="contp">{description1}</div>

                    <div className="contItems">
                        <p className="bord">R$</p>
                        <p className="drob">
                            {faturamento.toFixed(2)}
                        </p>
                        <div className={`${value > 1000 ? "arrowUp" : "arrowDown"}`} />
                    </div>
                </div>

                <div className="group info2">
                    <div className="contp">{description2}</div>
                    <div className="contItems2">
                        <p className="qtd">
                            <img src={ Alerta } alt="Aviso" 
                            className={
                                `${total > 5 ? "alert" : "noExist"}`}/>
                            { total }
                            </p>
                        <p className="qtdItens">
                            {total === 0 
                              ? "itens com baixa"
                              : total === 1
                                ? "item com baixa"
                                : "Itens com baixa"}
                        </p>
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