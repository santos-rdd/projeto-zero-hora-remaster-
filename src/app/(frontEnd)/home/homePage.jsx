import "./homePage.css";
import BottomNav from "../../components/bottomNav";
import GeneralInformation from "../../components/generalInformation";
import EstoqueAlert from "../../components/estoqueAlert";
import LatestProjects from "../../components/latestProjects";
import { Link } from "react-router-dom";

export default function Home(){

    return (
        <div className="divw">
             <div className="dashboard">
      
                <div className="dashboardHeader">
                    <h2>Olá, Polly</h2>
                    <div className="headerButtons">
                    <button className="btnIcon">🔍</button>
                    <button className="btnIcon">🔔</button>
                    <button className="btnIcon">👤</button>
                    </div>
                </div>

              <GeneralInformation />

                    <p className="pzin">Alertas de estoque(2)</p>
                <div className="carouselSection">
                    <EstoqueAlert />
                    <EstoqueAlert cor="green"/>
                    <EstoqueAlert />
                    <EstoqueAlert cor="green"/>
                    <EstoqueAlert />
                </div>

                    <p className="pzin2">Ultimos Projetos</p>
                <div className="carouselSection2">
                    <LatestProjects />
                    <LatestProjects />
                    <LatestProjects />
                </div>


    </div>
            <BottomNav />
        </div>
    )
}
