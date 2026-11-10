import "./homePage.css";
import BottomNav from "../../components/bottomNav";
import BtnInfo from "../../components/btnInfo";
import GeneralInformation from "../../components/generalInformation";
import EstoqueAlert from "../../components/estoqueAlert";
import LatestProjects from "../../components/latestProjects";
import { Link } from "react-router-dom";
import ZeroHora from "../../../assets/images/zeroHoraPrint.png";
import Notification from "../../../assets/images/icons/notification.png";

import { useDatabase } from "../../(backEnd)/hooks/useDatabase";
import { useFiltro } from "../../(backEnd)/hooks/useFiltro";
import { useState, useEffect } from 'react'

export default function Home() {
    const email = useDatabase("users");
    const nItens = useFiltro(6, 15); 
    const [width, setWidth] = useState(0);
    const [showLoginCard, setShowLoginCard] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    
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
    
    
    useEffect(() => {
    function handleResize() {
        setWidth(window.innerWidth);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <>
            { width <= 1024 ? ( 
                <div className="divw">
                    <div className="dashboard">

                        <div className="dashboardHeader">
                            {email.length >= 0 ? (
                                    <div>
                                        <h2>Olá, usuário</h2>
                                    </div>
                            ) : (
                                <h2>Carregando informações...</h2>
                            )}
                            <div className="headerButtons">
                                <button className="btnIcon">
                                    <BtnInfo />
                                </button>
                            </div>
                        </div>

                        <GeneralInformation />

                        <p className="pzin">Alertas de estoque ({nItens.length})</p>
                        <div className="carouselSection">
                            {nItens.map(a => (
                                <EstoqueAlert 
                                    key={a.id}
                                    item1={a.nome}           
                                    cor={a.totalFisico >= 15} 
                                />
                            ))}
                        </div>
                    </div>
                    <BottomNav />
                </div>
            ) : (
                <>
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
                </>
            )}
        </>
    )
}
