
import BottomNav from "../../components/bottomNav";
import "./movimentacoesPage.css";
import ItemExpedidos from "../../components/itemExpedidos";

export default function Movimentacoes (){
    return (
        <div className="divw">
                        
                <div class="flex movimentacoesContainer">
                <h1>Movimentações</h1>

                <div class="buttons">
                    <button class="entrada">Entradas (Recebimentos)</button>
                    <button class="saida">Saídas (Expedição)</button>
                </div>

                <form class="movimentacoesForm">
                        <h2 for="fornecedor">Fornecedor</h2>
                        <div class="formGroup">
                            <input type="text" id="Nome" placeholder="Nome" />
                        </div>

                    <div class="formGroup">
                        <h2 for="fornecedor">Nota Fiscal</h2>
                        <input type="text" id="cliente" placeholder="Nota Fiscal" />
                        <input type="text" placeholder="Data" />
                    </div>
                </form>

                    <ItemExpedidos />
                   
                    <div className="buttonBottom">
                        <button className="buttonOrange">Confirmar Recebimento</button>
                        <button className="buttonBlack">Cancelar</button>
                    </div>

                </div>


            <BottomNav />
        </div>
    )
}