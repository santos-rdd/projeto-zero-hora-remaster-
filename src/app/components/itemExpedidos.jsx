import "./itemExpedidos.css";
import ItemRow from "./itemRow";

export default function ItemExpedidos(){
    return (
         <div class="itensExpedidos">
                        <div className="itensRecebidos">Itens Recebidos</div>
                        <div className="opcoes">
                            <p>Cód</p>
                            <p>Item</p>
                            <p>Fornecedor</p>
                            <p>Qtd</p>
                            <p>Status</p>
                        </div>
                        <div className="carouselVertical">
                            <ItemRow />
                            <ItemRow cod="88888" item="chapa aluminio"/>
                            <ItemRow cod="77777" item="colorink Sa"/>
                            <ItemRow cod="77777" item="colorink Sa"/>
                            <ItemRow cod="77777" item="colorink Sa"/>
                            <ItemRow cod="77777" item="colorink Sa"/>
                            <ItemRow cod="77777" item="colorink Sa"/>
                            <ItemRow cod="77777" item="colorink Sa"/>
                            <ItemRow cod="77777" item="colorink Sa"/>
                        </div>
                    </div>
    )
}