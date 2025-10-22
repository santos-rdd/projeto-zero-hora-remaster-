import BottomNav from "../../components/bottomNav";
import "./pedidosPage.css";
import CarouselQtd from "../../components/carouselQtd";
import BarCode from "../../../assets/images/icons/barCode.png";

export default function Pedidos (props){

    return (
        <div className="divCustom">
            <div className="searchArea">
                    <h1>Pedidos</h1>

                <div className="client">
                    <p>Cliente</p>
                    <textarea 
                    className="inp clientInfo" 
                    placeholder={
                        "Nome: João Silva \n E-mail: joaosilva@hotmail.com \n Telefone: (99) 9 9999-9999"
                    }/>
                </div>

                <div className="searchProducts">

                    <p>Buscar Produtos</p>

                    <div className="inpCont">
                        <input type="text" className="inp pro" 
                        placeholder="Busque por nome ou cód."/>
                        <img src={ BarCode } alt="codigo de barra" className="icon" />
                    </div>

                    <input type="text" 
                    className="inp qtdInp"
                    placeholder="Quantidade" />

                    <button className="blackButton">Buscar</button>
                </div>


            </div>
                <CarouselQtd />

            <BottomNav />
        </div>
    )
}