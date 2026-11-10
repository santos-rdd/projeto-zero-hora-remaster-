import { Routes, Route, Link, Navigate } from "react-router-dom";

import Login from './app/(frontEnd)/login/loginPage'; 
import Home from './app/(frontEnd)/home/homePage'; 
import Movimentacoes from './app/(frontEnd)/movimentacoes/movimentacoesPage'; 
import Estoque from './app/(frontEnd)/estoque/estoquePage'; 
import Relatorios from './app/(frontEnd)/relatorios/reportPage'; 
import Pedidos from './app/(frontEnd)/pedidos/pedidosPage'; 
import Approve from "./app/(frontEnd)/approve/approve";

import ProtectedRoute from "./app/(frontEnd)/protectedRoute/protectedRoute";

import { toast, Toaster } from "react-hot-toast";

import "./styles/global.css";
import "./styles/utils.css";
import "./styles/effects.css";
import "./styles/animations.css";

export default function App(){
    return (
        <>
            <Toaster position="top-right" 
                toastOptions={{
                    duration: 2000, 
                    style: {
                        zIndex: 999999,
                    },
                }}
            
            />

            <Routes>
                <Route path="/" element={<Navigate to="/login" replace/>}/>
                <Route path="/login" element={<Login />}/>

                <Route 
                    path="/home" 
                    element={
                            <Home />
                    } 
                />

                <Route 
                    path="/movimentacoes" 
                    element={
                            <Movimentacoes />
                    } 
                />

                <Route 
                    path="/estoque" 
                    element={
                            <Estoque />
                    } 
                />

                <Route 
                    path="/relatorios" 
                    element={
                            <Relatorios />
                    } 
                />

                <Route 
                    path="/pedidos" 
                    element={
                            <Pedidos />
                    } 
                />

                <Route 
                    path="/approve" 
                    element={
                            <Approve />
                    } 
                />
            </Routes>
        </>
    )
}
