import BottomNav from "../../components/bottomNav";
import "./pedidosPage.css";
import CarouselQtd from "../../components/carouselQtd";
import BarCode from "../../../assets/images/icons/barCode.png";
import { toast, Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import EstoqueAlt from "../../components/estoqueAlt";
import Relatorio from "../../components/relatorio";
import Back from "../../../assets/images/icons/back.png";
import ItemExpedidos from "../../components/itemExpedidos";
import ItemRowPedidos from "../../components/itemRowPedidos";

export default function Pedidos (props){

    const [ pag1, setPage1 ] = useState(true);
    const [ state, setState ] = useState(false);
    
    useEffect(() => {
    window.scrollTo(0, 0);
    }, [pag1, state]);

    return (
        <>
        <Toaster />
        { pag1 ? (
        <div className="divCustom">
            <div className="searchArea">
                <h1 className="h1Pedido">Novo Pedido</h1>

            <div className="contInp">
                <h2>Usuário</h2>
                  <input 
                    type="text" 
                    placeholder="Nome" 
                    // value={inp3} 
                    // onChange={e => setInp3(e.target.value)}
                    className={`allInp inp1P`} 
                />

                  <input 
                    type="text" 
                    placeholder="CPF" 
                    // value={inp3} 
                    // onChange={e => setInp3(e.target.value)}
                    className={`allInp inp2P`} 
                />

                <button className="btnPedido"
                onClick={()=> setPage1(false)}>
                    Iniciar Pedido
                </button>
            </div>
            
            <ItemExpedidos 
            info1={`Num.\n do Pedido`}
            info2="Fornecedor"
            info3="Data"
            info4="Valor">

                <ItemRowPedidos />
            </ ItemExpedidos>
              
            </div>
        </div> 
        ) : state ? (

           <div className="divCustom">
            <div className="searchArea">
                <h1>Pedidos N°00001</h1>
                <p className="pS">R$ 328,07</p>

                 <img className="adapt1 tranform" 
                    src={Back} alt="Voltar" 
                    onClick={()=> setState(false)}/>

                <Relatorio 
                setState="setState"/>

                <div className="contInp">
                    <h2>Cliente</h2>
                    <div className="divContT">
                        <textarea
                            placeholder={`Nome: João da Silva\nE-mail: joãosilva@gmail.com\nTelefone: (35) 99999-9999`}
                            className={`allInp clientInfo`}
                            rows="5"
                        />

                    <h2>Itens do Pedido</h2>
                        <textarea
                            placeholder={`-3000 und.folhas A5 150g\n-2 und.Banner Lona 90g 120 cm`}
                            className={`allInp clientInfo`}
                            rows="5"
                        />
                    </div>

                    <p>Detalhes</p>
                    <button className="btnExtrato"
                    >
                        Ver Extrato Completo 
                    </button>

                    <button className="btnExtrato"
                    >
                        Ver Nota Fiscal 
                    </button>
                </div>  
            </div>
        </div> 

        ) : (
            <div className="divCustom">
                <div className="searchArea">
                    <h1>Pedidos</h1>

                    <img className="adapt1 tranform" 
                    src={Back} alt="Voltar" 
                    onClick={()=> setPage1(true)}/>

                <div className="contInp">
                    <h2>Solicitação</h2>
                    <textarea
                        placeholder={`Nome: João da Silva\nE-mail: joãosilva@gmail.com\nTelefone: (35) 99999-9999`}
                        className={`allInp clientInfo`}
                        rows="5"
                    />
                        {/* // value={inp3} 
                        // onChange={e => setInp3(e.target.value)} */}

                    <input 
                        type="text" 
                        placeholder="CPF" 
                        // value={inp3} 
                        // onChange={e => setInp3(e.target.value)}
                        className={`allInp inp2P`} 
                    />

                    <EstoqueAlt className="corrections"/>
                </div>
                
                <CarouselQtd
                setState={setState}
                />
                
                </div>
        </div> 
        )}
            <BottomNav />
        </>
    )
}
