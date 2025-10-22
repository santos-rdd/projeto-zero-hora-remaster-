import "./reportPage.css";
import BottomNav from "../../components/bottomNav";
import OverView from "../../components/overview";
import EstoqueAlert from "../../components/estoqueAlert";

export default function Relatorios (props){


    return (
        <div className="divA">

        <OverView />

                <p className="report">Relatórios Detalhados</p>
                <div className="contCarou">
                    <div className="carouselSection">
                        <EstoqueAlert title="Curva ABC de estoque"/>
                        <EstoqueAlert title="Inventario atual" cor="green"/>
                        <EstoqueAlert />
                        <EstoqueAlert cor="green"/>
                        <EstoqueAlert />
                    </div>
                </div>

        <BottomNav />
        </div>
    )
}