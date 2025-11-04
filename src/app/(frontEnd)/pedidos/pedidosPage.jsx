import BottomNav from "../../components/bottomNav";
import "./pedidosPage.css";
import CarouselQtd from "../../components/carouselQtd";
import BarCode from "../../../assets/images/icons/barCode.png";
import { toast, Toaster } from "react-hot-toast";
import { useState } from "react";

export default function Pedidos (props){

    const [ inp1V, setInp1V ] = useState("");
    const [ inp2V, setInp2V ] = useState("");
    const [ textA, setText ] = useState("");
    const [ tremedinha, setTreme ] = useState(false);
    
    function inpV (){
        if( !inp1V && !inp2V){
            toast.error("Preencha um campo para fazer uma busca!");
            setTreme(true);
                setTimeout(()=>{
                    setTreme(false);
                },500);
        }
    }

    return (
        <div className="divCustom">
            <Toaster />
            <div className="searchArea">
                    <h1>Pedidos</h1>

                <div className="client">
                    <p>Cliente</p>
                    <textarea 
                    value={textA}
                    onChange={t => setText(t.target.value)}
                    className={`inp clientInfo ${tremedinha ? "treme" : ""}`}
                    placeholder={
                        "Nome: João Silva \n E-mail: joaosilva@hotmail.com \n Telefone: (99) 9 9999-9999"
                    }/>
                </div>

                <div className="searchProducts">

                    <p>Buscar Produtos</p>

                    <div className="inpCont">

                        <input type="text" 
                        className={`inp pro ${tremedinha ? "treme" : ""}`} 
                        placeholder="Busque por nome ou cód."
                        value={inp1V}
                        onChange={i => setInp1V(i.target.value)}/>

                        <img src={ BarCode } alt="codigo de barra" className="icon" />
                    </div>

                    <input type="text" 
                    className={`inp qtdInp ${tremedinha ? "treme" : ""}`}
                    placeholder="Quantidade" 
                    value={inp2V}
                    onChange={n => setInp2V(n.target.value)}/>

                    <button className="blackButton"
                    onClick={()=> inpV()}>Buscar</button>
                </div>


            </div>
                <CarouselQtd />

            <BottomNav />
        </div>
    )
}