import BottomNav from "../../components/bottomNav";
import { Link } from "react-router-dom";
import "./estoquePage.css";
import DualSearch from "../../components/DualSearch";
import CategoriaToggle from "../../components/categoriaToggle";
import ItemExpedidos from "../../components/itemExpedidos";
import ItemRow from "../../components/itemRow";
import { useState } from "react";
import { useDatabase } from "../../(backEnd)/hooks/useDatabase";
import {toast, Toaster} from "react-hot-toast";

export default function Estoque(){

    const [butter, setButter] = useState("");
    const estoque = useDatabase("itensRecebidos2");

    const receba = (tog) => {
        setButter(tog);
    };
    return (
        <div className="along">
            <Toaster />
            <h1 className="title">Estoque</h1>

            <CategoriaToggle toggle={receba}/>

            <DualSearch />

            <ItemExpedidos 
            info3={<>Total.<br />disponível</>}
            info4={<>Total.<br />alocado</>}
            info5={<>Total.<br />físico</>} >
            
                {estoque.map((e)=>(
                    <ItemRow 
                        key={e.id}
                        i1={e.cod}
                        i2={e.item}
                        i3={e.totalAlocado}
                        i4={e.totalDisponivel}
                        i5={e.totalFisico}
                        />
                ))}
                

            </ItemExpedidos>

            <div className="dualButtons">
                <button className="all history">
                    Histórivo de <br/>Movimentações
                </button> 

                <button className="all stock">
                    Ajustar Estoque
                </button>
            </div>
            

            <BottomNav />
        </div>
    )
}
