import BottomNav from "../../components/bottomNav";
import "./movimentacoesPage.css";
import ItemExpedidos from "../../components/itemExpedidos";
import ItemRow from "../../components/itemRow";
import { useDatabase } from "../../(backEnd)/hooks/useDatabase";
import { useState, useEffect } from "react";
import {toast, Toaster} from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";

export default function Movimentacoes (){

    const itens = useDatabase("itensRecebidos");

    const [ativado1, setAtivado1] = useState(true);
    const [ativado2, setAtivado2] = useState(false);
    const [movimentador, setMov] = useState("Fornecedor");
    const [retirada, setRet] = useState("Recebimento");

    const [ pag, setPage ] = useState(true);

    const [inp1, setInp1] = useState("");
    const [inp2, setInp2] = useState("");
    const [inp3, setInp3] = useState("");

    const [treme1, setTreme1] = useState("");
    const [treme2, setTreme2] = useState("");
    const [treme3, setTreme3] = useState("");

    function btnFunction(){
        if(ativado1){
            if(!inp1 || !inp2 || !inp3){
                toast.error("Preencha todos os campos!");
                if(!inp1) { setTreme1("treme"); setTimeout(()=> setTreme1(""), 500); }
                if(!inp2) { setTreme2("treme"); setTimeout(()=> setTreme2(""), 500); }
                if(!inp3) { setTreme3("treme"); setTimeout(()=> setTreme3(""), 500); }
            }
        }
    }

    return (
        <>
        { pag ? (

        <div className="divw">
            <Toaster />
            <div className="flex movimentacoesContainer">
                <h1>Movimentações</h1>

                <div className="buttons">
                    <button 
                        className={`${ativado1 ? "active" : "entrada"}`}
                        onClick={() => { 
                            setAtivado1(true); 
                            setAtivado2(false);
                            setMov("Fornecedor"); 
                            setRet("Recebimento");
                        }}>
                        Entradas (Recebimentos)
                    </button>

                    <button 
                        className={`${ativado2 ? "active" : "saida"}`}
                        onClick={() => { 
                            setAtivado2(true); 
                            setAtivado1(false);
                            setMov("Funcionario"); 
                            setRet("Retirada");
                            setPage(false);
                        }}>
                        Saídas (Expedição)
                    </button>
                </div>

                <div className="movimentacoesForm">
                    <h2 htmlFor="fornecedor">{movimentador}</h2>
                    <div className="formGroup">
                        <input 
                            type="text" 
                            id="Nome" 
                            placeholder="Nome"
                            value={inp1} 
                            onChange={e => setInp1(e.target.value)}
                            className={`mid1 ${treme2}`}
                        />
                    </div>

                    <div className="formGroup">
                        <h2 htmlFor="fornecedor">Usuário</h2>
                        <input 
                            type="text" 
                            id="cliente" 
                            placeholder="Usuário" 
                            value={inp2} 
                            onChange={e => setInp2(e.target.value)}
                            className={`mid1 ${treme2}`}
                        />

                        <h2>Produto</h2>

                        <div className="produtoCont">
                            <input 
                                type="text" 
                                placeholder="Cód" 
                                value={inp3} 
                                onChange={e => setInp3(e.target.value)}
                                className={`mid ${treme3}`}
                            />
                            <input 
                                type="text" 
                                placeholder="Data" 
                                value={inp3} 
                                onChange={e => setInp3(e.target.value)}
                                className={`mid ${treme3}`}
                            />
                        </div>

                        <input 
                            type="text" 
                            id="cliente" 
                            placeholder="Nome do Produto" 
                            value={inp2} 
                            onChange={e => setInp2(e.target.value)}
                            className={`mid1 ${treme2}`}
                        />
                    </div>
                </div>

                <ItemExpedidos font="Recebidos"
                info5="Status">
                    {itens.map((i) => (
                        <ItemRow
                            key={i.id}
                            i1={i.cod}
                            i2={i.item}
                            i3={i.fornecedor}
                            i4={i.qtd}
                            i5={i.status}
                        />
                    ))}
                </ItemExpedidos>
                
            </div>

        </div>
        
                ) : (


                        <div className="divw">
            <Toaster />
            <div className="flex movimentacoesContainer">
                <h1>Movimentações</h1>

                <div className="buttons">
                    <button 
                        className={`${ativado1 ? "active" : "entrada"}`}
                        onClick={() => { 
                            setAtivado1(true); 
                            setAtivado2(false);
                            setMov("Fornecedor"); 
                            setRet("Recebimento");
                            setPage(true);
                        }}>
                        Entradas (Recebimentos)
                    </button>

                    <button 
                        className={`${ativado2 ? "active" : "saida"}`}
                        onClick={() => { 
                            setAtivado2(true); 
                            setAtivado1(false);
                            setMov("Funcionario"); 
                            setRet("Retirada");
                            setPage(false);
                        }}>
                        Saídas (Expedição)
                    </button>
                </div>

                <div className="movimentacoesForm">

                    <div className="formGroup">
                        <h2 htmlFor="fornecedor">Usuário</h2>
                        <input 
                            type="text" 
                            id="cliente" 
                            placeholder="Usuário" 
                            value={inp2} 
                            onChange={e => setInp2(e.target.value)}
                            className={`mid1 ${treme2}`}
                        />

                        <h2>Produto</h2>

                        <div className="produtoCont">
                            <input 
                                type="text" 
                                placeholder="Cód" 
                                value={inp3} 
                                onChange={e => setInp3(e.target.value)}
                                className={`mid ${treme3}`}
                            />
                            <input 
                                type="text" 
                                placeholder="Data" 
                                value={inp3} 
                                onChange={e => setInp3(e.target.value)}
                                className={`mid ${treme3}`}
                            />
                        </div>

                        <input 
                            type="text" 
                            id="cliente" 
                            placeholder="Nome do Produto" 
                            value={inp2} 
                            onChange={e => setInp2(e.target.value)}
                            className={`mid1 ${treme2}`}
                        />
                    </div>
                </div>

                <ItemExpedidos font="Expedidos">
                    {itens.map((i) => (
                        <ItemRow
                            key={i.id}
                            i1={i.cod}
                            i2={i.item}
                            i3={i.fornecedor}
                            i4={i.qtd}
                            i5={i.status}
                        />
                    ))}
                </ItemExpedidos>
                
            </div>

        </div>



                ) }
                <BottomNav />
   
    </>
 );
}