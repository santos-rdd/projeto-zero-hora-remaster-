import BottomNav from "../../components/bottomNav";
import "./movimentacoesPage.css";
import ItemExpedidos from "../../components/itemExpedidos";
import ItemRow from "../../components/itemRow";
import { useDatabase } from "../../(backEnd)/hooks/useDatabase";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Movimentacoes() {
    const itens = useDatabase("itensRecebidos");

    const [ativado1, setAtivado1] = useState(true);
    const [ativado2, setAtivado2] = useState(false);
    const [movimentador, setMov] = useState("Fornecedor");
    const [retirada, setRet] = useState("Recebimento");

    const [pag, setPage] = useState(true);

    const [inpFornecedor, setInpFornecedor] = useState("");
    const [inpStatus, setInpStatus] = useState("");
    const [inpCod, setInpCod] = useState("");
    const [inpProduto, setInpProduto] = useState("");

    const [treme1, setTreme1] = useState("");
    const [treme2, setTreme2] = useState("");
    const [treme3, setTreme3] = useState("");

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

    // Filtro de itens
   const itensFiltrados = itens.filter(i => {
    const fornecedorMatch = i.fornecedor.toLowerCase().includes(inpFornecedor.toLowerCase());
    const codMatch = i.cod.toLowerCase().includes(inpCod.toLowerCase());
    const nomeMatch = i.item.toLowerCase().includes(inpProduto.toLowerCase());

    if (pag) { // Recebimentos
        const statusMatch = inpStatus
            ? i.status.toLowerCase().includes(inpStatus.toLowerCase())
            : true;
        return fornecedorMatch && codMatch && nomeMatch && statusMatch && i.status.toLowerCase() !== "conferido";
    } else { // Expedição
        return fornecedorMatch && codMatch && nomeMatch && i.status.toLowerCase() === "conferido";
    }
});


    return (
        <>
            {pag ? (
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
                                    setPage(true);
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
                                    setPage(false);
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
                    </div>
                </div>
            ) : (
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
                                    setPage(true);
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
                                    setPage(false);
                                }}>
                                Saídas (Expedição)
                            </button>
                        </div>

                        <div className="movimentacoesForm">
                            <div className="formGroup">
                                <h2 htmlFor="fornecedor">Fornecedor</h2>
                                <input
                                    type="text"
                                    placeholder="Fornecedor"
                                    value={inpFornecedor}
                                    onChange={e => setInpFornecedor(e.target.value)}
                                    className={`mid1 ${treme1}`}
                                />

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
                    </div>
                </div>
            )}

            <BottomNav />
        </>
    );
}
