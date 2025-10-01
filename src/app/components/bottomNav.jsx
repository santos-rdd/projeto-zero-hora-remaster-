import "./bottomNav.css";
import Estoque from "../../assets/images/estoque.png";
import Girar from "../../assets/images/girar.png";
import Pedido from "../../assets/images/pedido.png";
import Relatorio from "../../assets/images/relatorio.png";
import Home from "../../assets/images/home.png";
import { Link } from "react-router-dom";

export default function BottomNav (){
    return (
        <div className="flex bottomDiv">

            <div className="flex icons">
                <Link className="Link"
                to="#">
                    <img src={Estoque} alt="Estoque" />
                    <p>Estoque</p>
                </Link>
            </div>

            <div className="flex icons">
                <Link className="Link"
                to="/movimentacoes">
                    <img src={Girar} alt="Movimentações" />
                    <p>Movimentações</p>
                </Link>
            </div>

            <div className="flex icons">
                <Link className="home"
                to="/home">
                        <img src={Home} alt="Pagina pricipal" />
                </Link>
            </div>

            <div className="flex icons">
                <Link className="Link" 
                to="#">
                    <img src={Pedido} alt="Pedidos" />
                    <p>Pedidos</p>
                </Link>
            </div>

            <div className="flex icons">
                <Link className="Link" 
                to="#">
                    <img src={Relatorio} alt="Relatórios" />
                    <p>Relatórios</p>
                </Link>
            </div>
        </div>
    )
}