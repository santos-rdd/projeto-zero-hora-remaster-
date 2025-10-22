import "./bottomNav.css";
import Estoque from "../../assets/images/icons/package.png";
import Girar from "../../assets/images/icons/arrows.png";
import Pedido from "../../assets/images/icons/testing.png";
import Relatorio from "../../assets/images/icons/document.png";
import Home from "../../assets/images/icons/home.png";
import { Link } from "react-router-dom";

export default function BottomNav (){
    return (
        <div className="flex bottomDiv">

            <div className="flex icons">
                <Link className="Link invert"
                to="/estoque">
                    <img src={Estoque} alt="Estoque" />
                    <p>Estoque</p>
                </Link>
            </div>

            <div className="flex icons">
                <Link className="Link invert"
                to="/movimentacoes">
                    <img src={Girar} alt="Movimentações" />
                    <p>Movimentações</p>
                </Link>
            </div>

            <div className="flex icons">
                <Link className="home invert"
                to="/home">
                        <img src={Home} alt="Pagina pricipal" />
                </Link>
            </div>

            <div className="flex icons">
                <Link className="Link invert" 
                to="/pedidos">
                    <img src={Pedido} alt="Pedidos" />
                    <p>Pedidos</p>
                </Link>
            </div>

            <div className="flex icons">
                <Link className="Link invert" 
                to="/relatorios">
                    <img src={Relatorio} alt="Relatórios" />
                    <p>Relatórios</p>
                </Link>
            </div>
        </div>
    )
}