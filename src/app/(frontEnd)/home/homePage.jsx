import "./homePage.css";
import BottomNav from "../../components/bottomNav";
import BtnInfo from "../../components/btnInfo";
import GeneralInformation from "../../components/generalInformation";
import EstoqueAlert from "../../components/estoqueAlert";
import LatestProjects from "../../components/latestProjects";
import { Link } from "react-router-dom";

import Notification from "../../../assets/images/icons/notification.png";

import { useDatabase } from "../../(backEnd)/hooks/useDatabase";
import { useFiltro } from "../../(backEnd)/hooks/useFiltro";

export default function Home() {
    const email = useDatabase("users");
    const nItens = useFiltro(6, 15); 

    return (
        <div className="divw">
            <div className="dashboard">

                <div className="dashboardHeader">
                    {email.length >= 0 ? (
                            <div>
                                <h2>Olá, usuário</h2>
                            </div>
                    ) : (
                        <h2>Carregando informações...</h2>
                    )}
                    <div className="headerButtons">
                        <button className="btnIcon">
                            <BtnInfo />
                        </button>
                    </div>
                </div>

                <GeneralInformation />

                <p className="pzin">Alertas de estoque ({nItens.length})</p>
                <div className="carouselSection">
                    {nItens.map(a => (
                        <EstoqueAlert 
                            key={a.id}
                            item1={a.nome}           
                            cor={a.totalFisico >= 15} 
                        />
                    ))}
                </div>


            </div>
            <BottomNav />
        </div>
    );
}
