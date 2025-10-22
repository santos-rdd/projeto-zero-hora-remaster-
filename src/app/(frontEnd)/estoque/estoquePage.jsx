import BottomNav from "../../components/bottomNav";
import { Link } from "react-router-dom";
import "./estoquePage.css";
import DualSearch from "../../components/DualSearch";
import CategoriaToggle from "../../components/categoriaToggle";
import ItemExpedidos from "../../components/itemExpedidos";
import ItemRow from "../../components/itemRow";

export default function Estoque(){
    return (
        <div className="along">
            <h1 className="title">Estoque</h1>
            <CategoriaToggle />
            <DualSearch />
            <ItemExpedidos 
            info3={<>Total.<br />disponível</>}
            info4={<>Total.<br />alocado</>}
            info5={<>Total.<br />físico</>} >
            
                <ItemRow 
                cod="71040"
                item="tinta cyan litro"
                fornecedor="28"
                qtd="27"
                status="55"/>
                
                <ItemRow 
                cod="71040"
                item="tinta cyan litro"
                fornecedor="28"
                qtd="27"
                status="55"/>

                <ItemRow 
                cod="71040"
                item="tinta cyan litro"
                fornecedor="28"
                qtd="27"
                status="55"/>

                <ItemRow 
                cod="71040"
                item="tinta cyan litro"
                fornecedor="28"
                qtd="27"
                status="55"/>

                <ItemRow 
                cod="71040"
                item="tinta cyan litro"
                fornecedor="28"
                qtd="27"
                status="55"/>

                <ItemRow 
                cod="71040"
                item="tinta cyan litro"
                fornecedor="28"
                qtd="27"
                status="55"/>

                <ItemRow 
                cod="71040"
                item="tinta cyan litro"
                fornecedor="28"
                qtd="27"
                status="55"/>

            </ItemExpedidos>

            <div className="dualButtons">
                <button className="all history">Histórivo de <br/>Movimentações</button> 

                <button className="all stock">Ajustar Estoque</button>
            </div>
            

            <BottomNav />
        </div>
    )
}
