import "./generalInformation.css";
import Compartilhar from "../../assets/images/compartilhar.png";
import tresPontos from "../../assets/images/tresPontos.png";

export default function GeneralInformation (){
    return (
          <div className="generalInformation">
                    <div className="cotent1">
                        <p>Informações Gerais</p>
                        <img src={Compartilhar} alt="Compartilhar" />
                        <img src={tresPontos} alt="Ver Mais" />
                    </div>

                    <div className="cotent2">
                        <div className="cot1">
                            <h2>43</h2>
                            <p>Entradas</p>
                        </div>
                        
                        <div className="cot2">
                            <h2>2</h2>
                            <p>Saidas</p>
                        </div>
                    </div>
                    <div className="cotent3">

                        <div className="tent1">
                            <label className="customRadio">
                                <input type="radio" />
                                <span className="radioMark"></span>
                            </label>
                            <p>28</p>
                            <p className="sobre">pedidos</p>
                        </div>

                        <div className="tent1">
                            <label className="customRadio">
                                <input type="radio" />
                                <span className="radioMark"></span>
                                </label>
                                <p>13</p>
                                <p className="sobre">concluidos</p>
                            </div>

                        <div className="tent1">
                            <label className="customRadio">
                                <input type="radio" />
                                <span className="radioMark"></span>
                                </label>
                                <p>15</p>
                                <p className="sobre">em progresso</p>
                            </div>

                    </div>
                </div>
    )
}