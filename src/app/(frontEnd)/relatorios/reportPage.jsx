import "./reportPage.css";
import BottomNav from "../../components/bottomNav";
import OverView from "../../components/overview";
import EstoqueAlert from "../../components/estoqueAlert";
import { useFiltro } from "../../(backEnd)/hooks/useFiltro";

export default function Relatorios (props){

    const aItens = useFiltro(6,15);

    return (
        <div className="divA">

        <OverView />

                <p className="report">Relatórios Detalhados</p>
                <div className="contCarou">
                    <div className="carouselSection">
                        {aItens.map(a =>(
                            <EstoqueAlert 
                             key={a.id}
                            item1={a.nome}           
                            cor={a.totalFisico >= 15} />
                        ))}
                    </div>
                </div>

        <BottomNav />
        </div>
    )
}