import BottomNav from "../../components/bottomNav";
import { Link } from "react-router-dom";
import "./estoquePage.css";
import DualSearch from "../../components/DualSearch";
import CategoriaToggle from "../../components/categoriaToggle";
import ItemExpedidos from "../../components/itemExpedidos";
import ItemRow from "../../components/itemRow";
import { useState } from "react";
import { useDatabase } from "../../(backEnd)/hooks/useDatabase";
import { toast } from "react-hot-toast";
import EstoqueAlt from "../../components/estoqueAlt";
import CarouselQtd from "../../components/carouselQtd";
import Back from "../../../assets/images/icons/back.png";

export default function Estoque() {

    const [mov, setMov] = useState(true);
    const estoque = useDatabase("itensRecebidos2");

    const receba = (tog) => {
        setMov(tog);
    };

    return (
        <>
            {mov ? (
                <div className="along">
                    <h1 className="title">Estoque</h1>

                    <CategoriaToggle toggle={receba} />

                    <DualSearch 
                    title="Buscar por:"
                    btnAtt={true}/>

                    <ItemExpedidos
                        info3={<>Total <br />disponível</>}
                        info4={<>Total <br />alocado</>}
                        info5={<>Total <br />físico</>}
                    >
                        {estoque.map((e) => (
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

                    <div className="oneButtons">
                        <button className="all history"
                        onClick={() => setMov(false)}>
                            Histórico de <br /> Movimentações
                        </button>
                    </div>
                </div>


            ) : (


                <div className="along1">
                    <h1 className="title">Estoque</h1>

                    <img className="adapt tranform" 
                    src={Back} alt="Voltar" 
                    onClick={()=> setMov(true)}/>

                    <DualSearch 
                    title="Alternar por:"
                    btnAtt={false}/>
                

                    <EstoqueAlt className="corrections"/>

                    <CarouselQtd/>
                </div>
            )}

            <BottomNav />
        </>
    );
}
