import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from './app/(frontEnd)/login/loginPage'; 
import Home from './app/(frontEnd)/home/homePage'; 
import Movimentacoes from './app/(frontEnd)/movimentacoes/movimentacoesPage'; 
import Estoque from './app/(frontEnd)/estoque/estoquePage'; 

// Importações de estilos
import "./styles/global.css";
import "./styles/utils.css";
import "./styles/effects.css";
import "./styles/animations.css";

export default function App(){
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/movimentacoes" element={<Movimentacoes />}/>
            <Route path="/estoque" element={<Estoque />}/>
        </Routes>
    )
}