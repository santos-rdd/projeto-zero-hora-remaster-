import "./carouselQtd.css";
import NewItemRow from "./newItemRow";
import { useState } from "react";

export default function CarouselQtd (props){

    const [valores, setValores] = useState([0,0,0,0,0]);
    const [precos, setPrecos] = useState([10.10, 5.50, 8.00,9.12,7.15]);

    const somaQuantidade = valores.reduce((a,b) => a + b, 0);
    const somaValor = valores.reduce((acc, qtd, i) => acc + qtd * (precos[i] || 0), 0);

    function mudaValor(indice, novoValor){
        const copiaValores = [...valores];
        copiaValores[indice] = novoValor;
        setValores(copiaValores);
    }

   

    return (
                        <div className="containerItems">
                            <div className="containerCarousel">
        
                                <div className="descrip">
                                    <p>Itens Adicionados</p>
                                </div>
        
                                <div className="moreDescrip">
                                    <div className="cont1">
                                        <p>Cód.</p>
                                        <p>Item</p>
                                    </div>
                                    
                                    <div className="cont2">
                                        <p>Valor</p>
                                        <p className="qtdd">Qtd.</p>
                                    </div>
        
                                </div>
        
                                <div className="carousel">
                                    {valores.map((valor, indice) =>{
                                        return (
                                            <NewItemRow 
                                                key={indice}
                                                valor={valor}
                                                value={precos[indice]}
                                                mudarValor={(novo) => mudaValor(indice,novo)}
                                            />
                                        )})}
                                </div>
        
                              <div className="containerOverView flex">
                                <div className="All flex">
                                    <p>Total</p>
                                </div>
        
                                <div className="sum">
                                    <p className="sumAll"> 
                                        R${somaValor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} 
                                    </p>
                                    <p className="total"> {somaQuantidade} Produtos</p>
                                </div>


                              </div>
                                <div className="containerButtons flex">
                                        <button className="btnAll btn1">
                                            Confirmar Pedido
                                        </button>

                                        <button className="btnAll btn2">
                                            Cancelar
                                        </button>
                                </div>
                            </div>
                        </div>
        
    )
}