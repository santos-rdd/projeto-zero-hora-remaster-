// Importe de Routes
import { Routes, Route, Link, Navigate } from "react-router-dom";

// Paginas da aplicação
import Login from './app/(frontEnd)/login/loginPage'; 
import Home from './app/(frontEnd)/home/homePage'; 
import Movimentacoes from './app/(frontEnd)/movimentacoes/movimentacoesPage'; 
import Estoque from './app/(frontEnd)/estoque/estoquePage'; 
import Relatorios from './app/(frontEnd)/relatorios/reportPage'; 
import Pedidos from './app/(frontEnd)/pedidos/pedidosPage'; 
import Approve from "./app/(frontEnd)/approve/approve";

// Impedir que o usuario burle a area de login 😈
import ProtectedRoute from "./app/(frontEnd)/protectedRoute/protectedRoute";

// Importe da biblioteca Toast
import { toast, Toaster } from "react-hot-toast";

// Importações de estilos
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
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } 
                />

                <Route 
                    path="/movimentacoes" 
                    element={
                        <ProtectedRoute>
                            <Movimentacoes />
                        </ProtectedRoute>
                    } 
                />

                <Route 
                    path="/estoque" 
                    element={
                        <ProtectedRoute>
                            <Estoque />
                        </ProtectedRoute>
                    } 
                />

                <Route 
                    path="/relatorios" 
                    element={
                        <ProtectedRoute>
                            <Relatorios />
                        </ProtectedRoute>
                    } 
                />

                <Route 
                    path="/pedidos" 
                    element={
                        <ProtectedRoute>
                            <Pedidos />
                        </ProtectedRoute>
                    } 
                />

                <Route 
                    path="/approve" 
                    element={
                        <ProtectedRoute>
                            <Approve />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </>
    )
}
