import { useState, useEffect } from "react";
import ZeroHora from "../../assets/images/zeroHoraPrint.png";
import { useDatabase } from "../(backEnd)/hooks/useDatabase";
import "./loginForm.css";
import "../../styles/effects.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NewUser from "./newUser.jsx";
import bcrypt from "bcryptjs";

export default function LoginForm() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [logoUp, setLogoUp] = useState(false);
  const [showLoginCard, setShowLoginCard] = useState(false);
  const [showPop, setShowPop] = useState(true);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const users = useDatabase("users");

  const [width, setWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const esperaLogin = async () => {
    setTimeout(() => {
      navigate("/home");
    }, 500);
  };

  const handleClick = () => {
    toast.success('A area de login esta em correção, basta clicar no botão entrar para ser redirecionado a tela inicial!', {
      duration: 8000
    });
    setShowLoginCard(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setLogoUp(true);
      setTimeout(() => setShowLogin(true), 800);
    }, 2000);

    const timePop = setTimeout(() => {
      setShowPop(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {width <= 1024 ? (
        <>
          {!showLogin ? (
            <div className={`container ${fadeOut ? "fadeOut" : ""}`}>
              <div className="content">
                <div className="topLeft"></div>
                <div className="bottomRight"></div>

                <div
                  className={`contentLogo ${showPop ? "popAnim" : ""} ${
                    logoUp ? "moveUp" : ""
                  }`}
                >
                  <img className="LogoImg" src={ZeroHora} alt="Logo" />
                  <h1>ZeroHora</h1>
                  <p>COMUNICAÇÃO VISUAL</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="loginForm slideUp flow">
              <div className="contentLogo">
                <img className="LogoImg" src={ZeroHora} alt="Logo" />
                <h1>ZeroHora</h1>
                <p>COMUNICAÇÃO VISUAL</p>
              </div>

              <div className={`loginCard ${showLoginCard ? "show" : ""}`}>
                <h2>Bem-Vindo</h2>
                <p>
                  Olá! Faça login para gerenciar suas tarefas e acessar as
                  informações de logística.
                </p>

                <div className="buttons">
                  <button onClick={handleClick} className="btnBlack">
                    Entrar
                  </button>
                  <button onClick={handleClick} className="btnWhite">
                    Registrar
                  </button>
                </div>
              </div>

              <div className={`loginContainer ${showLoginCard ? "up" : ""}`}>
                <NewUser
                  email={email}
                  senha={senha}
                  mostrarSenha={mostrarSenha}
                  esperaLogin={esperaLogin}
                  
                  erro={erro}
                  setEmail={setEmail}
                  setSenha={setSenha}
                  setMostrarSenha={setMostrarSenha}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="divz">
            <div className="loginForm1 slideUp1 flow1">
              <div className="contentLogo1">
                <img className="LogoImg1" src={ZeroHora} alt="Logo" />
                <h1>ZeroHora</h1>
                <p>COMUNICAÇÃO VISUAL</p>
              </div>
            </div>

              <div className={`loginCard1 slideUp1${showLoginCard ? "show" : ""}`}>
                <div className="camp">
                  <h2>Estamos trabalhando nisso!</h2>
                  <p>
                    Desculpe, mas no momento o site não possui suporte para computadores.
                    Ele foi desenvolvido apenas para dispositivos móveis.
                    Se quiser continuar usando o aplicativo, por favor faça login pelo seu celular.
                    Agradecemos a compreensão!
                  </p>
                </div>
              </div>
        </div>
      )}
  </>
  );
}
