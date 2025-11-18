import "./bottomNav.css";
import Estoque from "../../assets/images/icons/package.png";
import Girar from "../../assets/images/icons/arrows.png";
import Pedido from "../../assets/images/icons/testing.png";
import Relatorio from "../../assets/images/icons/document.png";
import Home from "../../assets/images/icons/home.png";
import { NavLink } from "react-router-dom";

export default function BottomNav() {
    return (
        <div className="flex bottomDiv">

            <div className="flex icons">
                <NavLink
                    to="/estoque"
                    className={({ isActive }) => `navlink invert1 ${isActive ? "selecionado" : ""}`}
                >
                    <img src={Estoque} alt="Estoque" />
                    <p>Estoque</p>
                </NavLink>
            </div>

            <div className="flex icons">
                <NavLink
                    to="/movimentacoes"
                    className={({ isActive }) => `navlink invert1 ${isActive ? "selecionado" : ""}`}
                >
                    <img src={Girar} alt="Movimentações" />
                    <p>Movimentações</p>
                </NavLink>
            </div>

            <div className="flex icons">
                <NavLink
                    to="/home"
                    className={({ isActive }) => `navlink1 invert1 ${isActive ? "selecionado" : ""}`}
                >
                    <img className="home" src={Home} alt="Página principal" />
                </NavLink>
            </div>

            <div className="flex icons">
                <NavLink
                    to="/pedidos"
                    className={({ isActive }) => `navlink invert1 ${isActive ? "selecionado" : ""}`}
                >
                    <img src={Pedido} alt="Pedidos" />
                    <p>Pedidos</p>
                </NavLink>
            </div>

            <div className="flex icons">
                <NavLink
                    to="/relatorios"
                    className={({ isActive }) => `navlink invert1 ${isActive ? "selecionado" : ""}`}
                >
                    <img src={Relatorio} alt="Relatórios" />
                    <p>Relatórios</p>
                </NavLink>
            </div>

        </div>
    );
}
