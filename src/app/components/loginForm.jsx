import { useState, useEffect } from "react";
import ZeroHora from "../../assets/images/zeroHoraPrint.png";
import { useDatabase } from "../(backEnd)/hooks/useDatabase";
import "./loginForm.css";
import "../../styles/effects.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate  } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [logoUp, setLogoUp] = useState(false);
  const [extend, setExtend] = useState(false);
  const [showLoginCard, setShowLoginCard] = useState(false);
  const [showPop, setShowPop] = useState(true);

  // Campos de Nome, Senha e Mensagem
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Validação de dados
    const users = useDatabase("users" );

    // Para não dar erro no login 
    const esperaLogin = () =>{
      if(!users || users.length === 0){
        return;
      };
      const userEncontrado = users.find(
        user => user.name === nome && user.password === senha
      );

      // Validação 
      if(userEncontrado){
        console.log("Login bem sucedido: ", userEncontrado);
        setErro(false);
        navigate("/home");
      } else {
        setErro(true);
        setTimeout(()=> setErro(false), 1000);
      }
      return;
    }
    
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
      const timePop =  setTimeout(() => {
        setShowPop(false);
     }, 2500);
     return () => clearTimeout(timer);
   }, []);

  return (
    <>
      {!showLogin ? (
        <div className={`container ${fadeOut ? "fadeOut" : ""}`}>

          <div className="content">

            <div className="topLeft"></div>
            <div className="bottomRight"></div>

                <div className={`flex contentLogo ${showPop ? "popAnim" : ""} ${logoUp ? "moveUp" : ""}`}>
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

          <div className={`loginContainer ${showLoginCard ? "up" : ""}`}>
              <div className="loginArea">
                <input type="text" placeholder="Usuário" 
                className={`loginInput ${erro ? "treme" : ""}`}
                value={nome} 
                onChange={e => setNome(e.target.value)}/>

                <input 
                type={mostrarSenha ? "text" : "password"} 
                placeholder="Senha" 
                className={`loginInput ${erro ? "treme" : ""}`}
                value={senha}
                onChange={e=> setSenha(e.target.value)}/>

                <span className="mostrarSenha" onClick={() => setMostrarSenha(!mostrarSenha)}>
                  {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                </span>

                <button className="forgotPassword">
                  Esqueceu a Senha?
                </button>


                <button className="btnLog"
                  onClick={esperaLogin}
                  >
                  Entrar
                </button>

                <button className="btnSingUp"
                  onClick={esperaLogin}
                >                  
                  Registrar
                </button>


              </div>
            </div>  
        </div>
      )}
    </>
  );
}
