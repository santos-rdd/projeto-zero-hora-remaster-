
import BottomNav from "../../components/bottomNav";
import "./movimentacoesPage.css";
import ItemExpedidos from "../../components/itemExpedidos";
import ItemRow from "../../components/itemRow";
import { useDatabase } from "../../(backEnd)/hooks/useDatabase";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";


export default function Movimentacoes (){

    // Importe banco de dados 
    const itens = useDatabase("itensRecebidos");


    // Mudança de estilo 
    const [ativado1, setAtivado1] = useState(true);
    const [ativado2, setAtivado2] = useState(false);
    const [movimentador, setMov] = useState("Fornecedor");
    const [retirada, setRet] = useState("Recebimento");
    const [tremedinha, setTreme] = useState("");

    const [inp1, setInp1] = useState("");
    const [inp2, setInp2] = useState("");
    const [inp3, setInp3] = useState("");

    function btnFunction (){
        if(ativado1 == true){
            if(!inp1 || !inp2 || !inp3 ){
                toast.error("Preencha todos os campos!");
                setTreme("treme");
                setTimeout(()=>{
                    setTreme("");
                }, 500);
            }
        }
    }

    return (
        <div className="divw">
                        
                <div className="flex movimentacoesContainer">
                <h1>Movimentações</h1>

                <div className="buttons">

                    <button 
                    className={`${ativado1 ? "active" : "entrada"}`}
                    onClick={() => 
                      {setAtivado1(true); setAtivado2(false);
                        setMov("Fornecedor"); setRet("Recebimento")
                      }}>
                        Entradas (Recebimentos)
                    </button>

                    <button 
                    className={`${ativado2 ? "active" : "saida"}`}
                    onClick={()=> 
                      {setAtivado2(true); setAtivado1(false);
                        setMov("Funcionario"); setRet("Retirada")}}>
                        Saídas (Expedição)
                    </button>

                </div>

                <form className="movimentacoesForm">
                    
                        <h2 for="fornecedor">{movimentador}</h2>
                        <div className="formGroup">
                            <input type="text" id="Nome" placeholder="Nome" 
                            value={inp1} onChange={e => setInp1(e.target.value)}
                            className={`${tremedinha}`}/>
                        </div>

                    <div className="formGroup">
                        <h2 for="fornecedor">Nota Fiscal</h2>
                            <input type="text" id="cliente" placeholder="Nota Fiscal" 
                            value={inp2} onChange={e => setInp2(e.target.value)}
                            className={`${tremedinha}`}/>

                            <input type="text" placeholder="Data" 
                            value={inp3} onChange={e => setInp3(e.target.value)}
                            className={`${tremedinha}`}/>
                    </div>
                </form>

                    <ItemExpedidos>
                        {itens.map((i)=>(
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
                   
                    <div className="buttonBottom">

                        <button 
                        className="buttonOrange"
                        onClick={()=>btnFunction()}>
                            Confirmar {retirada}
                        </button>

                        <button className="buttonBlack"
                        onClick={()=>btnFunction()}>
                            Cancelar
                        </button>

                    </div>

                </div>


            <BottomNav />
        </div>
    )
}