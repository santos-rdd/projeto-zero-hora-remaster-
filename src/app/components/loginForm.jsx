import { useState, useEffect } from "react";
import ZeroHora from "../../assets/images/zeroHoraPrint.png";
import "./loginForm.css";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [showLogin, setShowLogin] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [logoUp, setLogoUp] = useState(false);
  const [extend, setExtend] = useState(false);
  const [showLoginCard, setShowLoginCard] = useState(false);

   const handleClick = () => {
    setShowLoginCard(true); 
  };

  const Extender = () => {
    setExtend(!extend);
  }

   useEffect(() => {
     const timer = setTimeout(() => {
       setFadeOut(true); 
       setLogoUp(true);
       setTimeout(() => setShowLogin(true), 800); 
     }, 2000); 
     return () => clearTimeout(timer);
   }, []);

  return (
    <>
      {!showLogin ? (
        <div className={`container ${fadeOut ? "fadeOut" : "fadeIn"}`}>

          <div className="content">

            <div className="topLeft"></div>
            <div className="bottomRight"></div>

                <div className={`flex contentLogo ${logoUp ? "moveUp" : ""}`}>
                    <img className="LogoImg" src={ZeroHora} alt="Logo" />
                    <h1>ZeroHora</h1>
                    <p>COMUNICAÇÃO VISUAL</p>
                </div>
          </div>
        </div>
      ) : (
        <div className="loginForm slideUp flow">
            <div className="flex contentLogo">
                <img className="LogoImg" src={ZeroHora} alt="Logo" />
                <h1>ZeroHora</h1>
                <p>COMUNICAÇÃO VISUAL</p>
            </div>

            <div className={`loginCard ${showLoginCard ? "show" : ""}`}>
                <h2>Bem-Vindo</h2>
                <p>
                Olá! Faça login para gerenciar suas tarefas e acessar as
                informações de logística. Estamos aqui para ajudar
                </p>
                    
                <div className="buttons">
                  <button onClick={handleClick} className="btnBlack">Entrar</button>
                  <button onClick={handleClick} className="btnWhite">Registrar</button>
                </div>
          </div>

          <div class={`loginContainer ${showLoginCard ? "up" : ""}`}>
              <div class="loginArea">
                <input type="text" placeholder="Usuário" class="loginInput" />
                <input type="password" placeholder="Senha" class="loginInput" />
                <Link to="#" class="forgotPassword">Esqueceu a Senha?</Link>
                <Link to="/home" class="btnLog">Entrar</Link>
                <Link to="/home" class="btnSingUp">Registrar</Link>
              </div>
            </div>  
        </div>
      )}
    </>
  );
}
