import "./carouselQtd.css";
import NewItemRow from "./newItemRow";
import { useState, useEffect } from "react";
import { useDatabase } from "../(backEnd)/hooks/useDatabase";
import { useFaturamento } from "../(backEnd)/hooks/useFaturamento";
import toast, { Toaster } from "react-hot-toast";

export default function CarouselQtd (props){

    const itensAd = useDatabase("itensAdicionados");
    const { adicionarValor, adicionarProdutos  } = useFaturamento();
    
    const [ total, setTotal ] = useState({});
    const [ reset, setReset ] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const Alteracao = props.Alteracao;
    const setState = props.setState;

    
    const atualizarItem = (id, quantidade, totalItem) => {
        setTotal(p => ({
            ...p,
            [id]: { quantidade, totalItem }
        }));
    };

    const totalPedido = Object.values(total)
        .reduce((a, i) => a + i.totalItem, 0);

    const totalProdutos = Object.values(total)
        .reduce((a, i) => a + i.quantidade, 0);

    const confirmar = async () => {

    if (carregando) return; 
    setCarregando(true);
    // toast.success("Pedido confirmado!", { id: "pedido" });

    try {
        await adicionarValor(totalPedido);
        await adicionarProdutos(totalProdutos);
        setTotal({});
        setReset(prev => !prev);
    } catch (err) {
        toast.error("Erro ao confirmar pedido!");
    } finally {
        setCarregando(false);
    }
    };

    return (
                        <div className="containerItems">
                            <Toaster />
                            <div className="containerCarousel">
        
                                <div className="descrip">
                                    <p>Itens</p>
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
                                    {itensAd.map((i) =>(
                                            <NewItemRow 
                                                key={i.id}
                                                id={i.id}
                                                cod={i.cod}
                                                item={i.item}
                                                valor={i.valor} 
                                                reset={reset}
                                                atualizarItem={atualizarItem}
                                            />
                                    ))}
                                </div>
        
                              <div className="containerOverView flex">
                                <div className="All flex">
                                    <p>Total</p>
                                </div>
        
                                <div className="sum">
                                    <p className="sumAll"> 
                                        R${totalPedido.toFixed(2)}
                                    </p>
                                    <p className="total">                    {totalProdutos} Produtos</p>
                                </div>


                              </div>
                                <div className="containerButtons flex">
                                        <button className="btnAll btn1"
                                        onClick= {() =>
                                          {
                                           if (totalPedido <= 0) {
                                            toast.error("Adicione pedidos antes de confirmar!");
                                            } else {
                                            confirmar();
                                            setState(true);
                                            }
                                          }}
                                        >
                                            Confirmar 
                                        </button>

                                        <button className="btnAll btn2">
                                            Cancelar
                                        </button>
                                </div>
                            </div>
                        </div>
        
    )
}