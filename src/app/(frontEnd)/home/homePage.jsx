import "./homePage.css";
import BottomNav from "../../components/bottomNav";
import GeneralInformation from "../../components/generalInformation";
import EstoqueAlert from "../../components/estoqueAlert";
import LatestProjects from "../../components/latestProjects";
import Glass from "../../../assets/images/icons/glass.png";
import Notification from "../../../assets/images/icons/notification.png";
import Essential from "../../../assets/images/icons/essential.png";
import { useDatabase } from "../../(backEnd)/hooks/useDatabase";
import { useFiltro } from "../../(backEnd)/hooks/useFiltro";

export default function Home() {
    const users = useDatabase("users");
    const nItens = useFiltro(6, 15); 

    return (
        <div className="divw">
            <div className="dashboard">

                <div className="dashboardHeader">
                    {users?.length > 0 ? (
                        users.map(user => (
                            <div key={user.id}>
                                <h2>Olá, {user.name}</h2>
                            </div>
                        ))
                    ) : (
                        <h2>Carregando informações...</h2>
                    )}
                    <div className="headerButtons">
                        <button className="btnIcon"> 
                            <img src={Glass} alt="Lupa" />
                        </button>
                        <button className="btnIcon">
                            <img src={Notification} alt="Notificações" />
                        </button>
                        <button className="btnIcon">
                            <img src={Essential} alt="Perfil" />
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

                <p className="pzin2">Últimos Projetos</p>
                <div className="carouselSection2">
                    <LatestProjects />
                    <LatestProjects />
                    <LatestProjects />
                </div>

            </div>
            <BottomNav />
        </div>
    );
}
