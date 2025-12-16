/* CSS */ 
import "./movimentacoesPage.css";

/* Imagens */
import Back from "../../../assets/images/icons/back.png";

/* Componentes */ 
import BottomNav from "../../components/bottomNav";
import ItemExpedidos from "../../components/itemExpedidos";
import ItemRow from "../../components/itemRow";

/* Imports */
import Modal from "react-modal";
import { useDatabase } from "../../(backEnd)/hooks/useDatabase";
import { useState } from "react";
import { useEffect } from "react";
import { useSalvarMovimentacao } from "../../(backEnd)/hooks/useSalvarMovimentacao";
import { toast } from "react-hot-toast";
import { useDeletePedido } from "../../(backEnd)/hooks/useDeletePedido";

export default function Movimentacoes() {

    const itens = useDatabase("itensRecebidos");
    const { salvarMovimentacao } = useSalvarMovimentacao(); 
    const { deletePedido } = useDeletePedido();


    const [ativado1, setAtivado1] = useState(true);
    const [ativado2, setAtivado2] = useState(false);

    const [movimentador, setMov] = useState("Fornecedor");
    const [retirada, setRet] = useState("Recebimento");

    const [page2, setPage2] = useState(1);
    const [pag, setPage] = useState(true);

    const [inpFornecedor, setInpFornecedor] = useState("");
    const [inpStatus, setInpStatus] = useState("");
    const [inpCod, setInpCod] = useState("");
    const [inpProduto, setInpProduto] = useState("");

    const [f4Cod, setF4Cod] = useState("");
    const [f4Item, setF4Item] = useState("");
    const [f4Status, setF4Status] = useState(""); 

    
    const [treme1, setTreme1] = useState("");
    const [treme2, setTreme2] = useState("");
    const [treme3, setTreme3] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    
    // Estados da página 3
    const [inpFornecedor3, setInpFornecedor3] = useState("");
    const [inpCodigo3, setInpCodigo3] = useState("");
    const [inpItem3, setInpItem3] = useState("");
    const [inpQtd3, setInpQtd3] = useState("");
    const [ prodConf, setProd ] = useState("Não conferido");
    
    useEffect(() => {
        if (page2 === 4) {
            toast("Clique em um item para expedi-lo!", {
                id: "expedicao-info",
                style: {
                    background: "orange",
                    color: "black"
                },
                duration: 3000
            });
        } else {
            toast.dismiss("expedicao-info");
        }
    }, [page2]);

    function btnFunction() {
        if (ativado1) {
            if (!inpFornecedor || !inpCod || !inpProduto) {
                toast.error("Preencha todos os campos!");
                if (!inpFornecedor) { setTreme1("treme"); setTimeout(() => setTreme1(""), 500); }
                if (!inpCod) { setTreme2("treme"); setTimeout(() => setTreme2(""), 500); }
                if (!inpProduto) { setTreme3("treme"); setTimeout(() => setTreme3(""), 500); }
            }
        }
    }

    // Filtro
    const itensFiltrados = itens.filter(i => {
        const fornecedorMatch = (i.fornecedor || "").toLowerCase().includes(inpFornecedor.toLowerCase());
        const codMatch = (i.cod || "").toLowerCase().includes(inpCod.toLowerCase());
        const nomeMatch = (i.item || "").toLowerCase().includes(inpProduto.toLowerCase());

        if (pag) {
            const statusMatch = inpStatus
                ? i.status.toLowerCase().includes(inpStatus.toLowerCase())
                : true;

            return fornecedorMatch && codMatch && nomeMatch && statusMatch && i.status.toLowerCase() !== "conferido";
        } else {
            return fornecedorMatch && codMatch && nomeMatch && i.status.toLowerCase() === "conferido";
        }
    });

    // filtro pagina 4
    const itensFiltradosPag4 = itens.filter(i => {
        const codMatch = i.cod.toLowerCase().includes(f4Cod.toLowerCase());
        const itemMatch = i.item.toLowerCase().includes(f4Item.toLowerCase());

        const statusMatch = f4Status 
            ? i.status.toLowerCase() === f4Status.toLowerCase() 
            : true;

        return codMatch && itemMatch && statusMatch;
    });

    async function salvarPedidoNovo() {

        if (!inpFornecedor3 || !inpCodigo3 || !inpItem3 || !inpQtd3) {
            toast.error("Preencha todos os campos!");
            return;
        }

        if (isNaN(inpQtd3)) {
            toast.error("Quantidade deve ser um número!");
            return;
        }

        const codigoFormatado = inpCodigo3.padStart(5, "0");

        const resultado = await salvarMovimentacao({
            fornecedor: inpFornecedor3,
            cod: codigoFormatado,
            item: inpItem3,
            qtd: Number(inpQtd3),
            status: prodConf,
        });

        if (!resultado.ok) {
            toast.error(resultado.error || "Erro ao salvar no banco!");
            return;
        }

        toast.success("Pedido registrado com sucesso!");

        setInpFornecedor3("");
        setInpCodigo3("");
        setInpItem3("");
        setInpQtd3("");
    }

    async function handleDelete() {
        if (!itemToDelete) return;

        const result = await deletePedido(itemToDelete.id);

        if (result.ok) {
            toast.success("Item expedido com sucesso!");
            itens.splice(itens.findIndex(i => i.id === itemToDelete.id), 1);
        } else {
            toast.error("Erro ao expedir o item.");
        }

        setModalOpen(false);
        setItemToDelete(null);
    }



    return (
        <>
            {page2 === 1 && (
                <div className="divw">
                    <div className="flex movimentacoesContainer">
                        <h1>Movimentações</h1>

                        <div className="buttons">
                            <button
                                className={`${ativado1 ? "active" : "entrada"}`}
                                onClick={() => {
                                    setAtivado1(true);
                                    setAtivado2(false);
                                    setMov("Fornecedor");
                                    setRet("Recebimento");
                                    setPage2(1);
                                }}>
                                Entradas (Recebimentos)
                            </button>

                            <button
                                className={`${ativado2 ? "active" : "saida"}`}
                                onClick={() => {
                                    setAtivado2(true);
                                    setAtivado1(false);
                                    setMov("Funcionario");
                                    setRet("Retirada");
                                    setPage2(2);
                                }}>
                                Saídas (Expedição)
                            </button>
                        </div>

                        <div className="movimentacoesForm">
                            <h2 htmlFor="fornecedor">{movimentador}</h2>
                            <div className="formGroup">
                                <input
                                    type="text"
                                    id="fornecedor"
                                    placeholder="Fornecedor"
                                    value={inpFornecedor}
                                    onChange={e => setInpFornecedor(e.target.value)}
                                    className={`mid1 ${treme1}`}
                                />
                            </div>

                            <div className="formGroup">
                                <h2>Produto</h2>

                                <div className="produtoCont">
                                    <input
                                        type="text"
                                        placeholder="Cód"
                                        value={inpCod}
                                        onChange={e => setInpCod(e.target.value)}
                                        className={`mid ${treme3}`}
                                    />
                                </div>

                                <input
                                    type="text"
                                    id="produto"
                                    placeholder="Nome do Produto"
                                    value={inpProduto}
                                    onChange={e => setInpProduto(e.target.value)}
                                    className={`mid1 ${treme2}`}
                                />
                            </div>
                        </div>

                        <ItemExpedidos font="Recebidos" info5="Status">
                            {itensFiltrados.map(i => (
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

                        <div className="btnPedidoAdd flex">
                            <button className="btnEstoquePage transform"
                                onClick={ function(){ 
                                    setPage2(3);
                                    setInpFornecedor("");
                                    setInpCod("");
                                    setInpProduto("");
                                    setInpStatus("");
                                }}>
                                Criar Novo Pedido!
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {page2 === 2 && (
                <div className="divw">
                    <div className="flex movimentacoesContainer">
                        <h1>Movimentações</h1>

                        <div className="buttons">
                            <button
                                className={`${ativado1 ? "active" : "entrada"}`}
                                onClick={() => {
                                    setAtivado1(true);
                                    setAtivado2(false);
                                    setMov("Fornecedor");
                                    setRet("Recebimento");
                                    setPage2(1);
                                }}>
                                Entradas (Recebimentos)
                            </button>

                            <button
                                className={`${ativado2 ? "active" : "saida"}`}
                                onClick={() => {
                                    setAtivado2(true);
                                    setAtivado1(false);
                                    setMov("Funcionario");
                                    setRet("Retirada");
                                    setPage2(2);
                                }}>
                                Saídas (Expedição)
                            </button>
                        </div>

                        <div className="movimentacoesForm">
                            <div className="formGroup">
                                <h2 htmlFor="fornecedor"
                                    style={{ marginBottom: "5px" }}>
                                    Fornecedor
                                </h2>
                                <input
                                    type="text"
                                    placeholder="Fornecedor"
                                    value={inpFornecedor}
                                    onChange={e => setInpFornecedor(e.target.value)}
                                    className={`mid1 ${treme1}`}
                                />

                                <h2 style={{ marginTop: "5px" }}>
                                    Produto
                                </h2>

                                <div className="produtoCont">
                                    <input
                                        type="text"
                                        placeholder="Cód"
                                        value={inpCod}
                                        onChange={e => setInpCod(e.target.value)}
                                        className={`mid ${treme3}`}
                                    />
                                </div>

                                <input
                                    type="text"
                                    placeholder="Nome do Produto"
                                    value={inpProduto}
                                    onChange={e => setInpProduto(e.target.value)}
                                    className={`mid1 ${treme2}`}
                                />
                            </div>
                        </div>

                        <ItemExpedidos font="Expedidos" info5="Status">
                            {itensFiltrados.map(i => (
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

                        <div className="btnPedidoAdd flex">
                            <button className="btnEstoquePage transform"
                                onClick={() => setPage2(4)}
                                style={{
                                    background: "black",
                                    color: "white"
                                }}>
                                Registrar Saida!
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {page2 === 3 && (
                <div className="divw">
                    <div className="flex movimentacoesContainer">
                        <h1>Movimentações</h1>

                        <img
                            className="adapt transform"
                            src={Back}
                            alt="Voltar"
                            onClick={() => {
                                setPage2(1);
                            }}
                        />

                        <div className="buttons">
                            <button className={`${ativado1 ? "active" : "entrada"}`}>
                                Criar Novo (Recebimento)
                            </button>
                        </div>

                        <div className="movimentacoesForm">
                            <div className="formGroup">
                                <h2 htmlFor="fornecedor">Fornecedor</h2>
                                <input
                                    type="text"
                                    placeholder="Fornecedor"
                                    value={inpFornecedor3}
                                    onChange={e => setInpFornecedor3(e.target.value)}
                                    className={`mid1 ${treme1}`}
                                />

                                <h2>Produto</h2>

                                <div className="produtoCont">
                                    <input
                                        type="text"
                                        placeholder="Cód"
                                        value={inpCodigo3}
                                        onChange={e => setInpCodigo3(e.target.value)}
                                        className={`mid ${treme3}`}
                                    />
                                </div>

                                <input
                                    type="text"
                                    placeholder="Item"
                                    value={inpItem3}
                                    onChange={e => setInpItem3(e.target.value)}
                                    className={`mid1 ${treme2}`}
                                />

                                <input
                                    type="text"
                                    placeholder="Quantidade"
                                    value={inpQtd3}
                                    onChange={e => setInpQtd3(e.target.value)}
                                    className={`mid1 ${treme2}`}
                                />

                                <div className="contBtnMov">
                                    <button className={`allBtnMov btnMov1 ${prodConf === "Conferido" ? "active" : ""}`}
                                    onClick={()=> setProd("Conferido")}>Conferido</button>
                                    <button className={`allBtnMov btnMov2 ${prodConf === "Não conferido" ? "active" : ""}`}
                                    onClick={()=> setProd("Não conferido")}>
                                    Não Conferido</button>
                                </div>
                            </div>

                            <div className="btnPedidoAdd flex">
                                <button className="btnEstoquePage transform"
                                    onClick={salvarPedidoNovo}
                                    style={{
                                        background: "black",
                                        color: "white",
                                        marginBottom: "20px",
                                    }}>
                                    Registrar!
                                </button>
                            </div>

                            <ItemExpedidos font="Expedidos" info5="Status">
                                {itensFiltrados.map(i => (
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
                        </div>
                    </div>
                </div>
            )}

            {page2 === 4 && (
                <div className="divw">
                    <div className="flex movimentacoesContainer">
                        <h1>Movimentações</h1>

                        <img
                            className="adapt transform"
                            src={Back}
                            alt="Voltar"
                            onClick={() => {
                                setPage2(1);
                            }}
                        />

                        <div className="buttons">
                            <button className={`${ativado1 ? "active" : "entrada"}`}>
                                Despachar (Expedição)
                            </button>
                        </div>

                        <div className="movimentacoesForm">
                                <h2>Produto</h2>

                                <div className="produtoCont">
                                    <input
                                        type="text"
                                        placeholder="Cód"
                                        value={f4Cod}
                                        onChange={e => setF4Cod(e.target.value)}
                                        className={`mid ${treme3}`}
                                    />
                                </div>

                                <input
                                    type="text"
                                    placeholder="Item"
                                    value={f4Item}
                                    onChange={e => setF4Item(e.target.value)}
                                    className={`mid1 ${treme2}`}
                                />

                                <div className="contBtnMov">
                                    
                                    <button className={`allBtnMov btnMov1 ${f4Status  === "Conferido" ? "active" : ""}`}
                                    onClick={() => setF4Status("Conferido")}>
                                        Conferido
                                    </button>

                                    <button className={`allBtnMov btnMov2 ${f4Status  === "Não conferido" ? "active" : ""}`}
                                    onClick={() => setF4Status("Não conferido")}>
                                        Não Conferido
                                    </button>
                                </div>
                            </div>


                            <ItemExpedidos font="Expedidos" info5="Status">
                                {itensFiltradosPag4.map(i => (
                                    <div 
                                        className="itemLista"
                                        key={i.id}
                                        onClick={() => {
                                            setItemToDelete(i);
                                            setModalOpen(true);
                                        }}>
                                            <ItemRow
                                                i1={i.cod}
                                                i2={i.item}
                                                i3={i.fornecedor}
                                                i4={i.qtd}
                                                i5={i.status}
                                            />
                                    </div>
                                ))}
                            </ItemExpedidos>

                        </div>
                    </div>
            )}

            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                className="modalDelete"
                overlayClassName="overlayDelete"
                >
                <h2>Expedir Item</h2>
                <h3>( Tenha certeza ao expedir item, pois ele sera excluido do banco de dados )</h3>

                <p>Deseja expedir o item:</p>
                <strong>{itemToDelete?.cod} - {itemToDelete?.item}</strong>

                <div className="botoesDelete">
                    <button className="confirmDelete" onClick={handleDelete}>Expedir</button>
                    <button className="cancelDelete" onClick={() => setModalOpen(false)}>Cancelar</button>
                </div>
            </Modal>
            <BottomNav />
        </>
    );
}
