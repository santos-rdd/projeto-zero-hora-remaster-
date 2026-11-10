import "./carouselQtd.css";
import NewItemRow from "./newItemRow";
import { useState } from "react";
import { useDatabase } from "../(backEnd)/hooks/useDatabase";
import { useFaturamento } from "../(backEnd)/hooks/useFaturamento";
import { toast } from "react-hot-toast";

export default function CarouselQtd({ filtros, confirmarPedido }) {
  const itensAd = useDatabase("itensAdicionados");
  const { adicionarValor, adicionarProdutos } = useFaturamento();
  const [total, setTotal] = useState({});
  const [reset, setReset] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const itensFiltrados = itensAd.filter(p => {
    const busca = filtros?.busca?.toLowerCase() || "";
    const valorMax = filtros?.valorMax;
    const nomeOuCod = p.item.toLowerCase().includes(busca) || p.cod.toLowerCase().includes(busca);
    const valorOk = !valorMax || p.valor <= Number(valorMax);
    return (!busca && !valorMax) || (nomeOuCod && valorOk);
  });

  const atualizarItem = (id, quantidade, totalItem) => {
    setTotal(prev => ({ ...prev, [id]: { quantidade, totalItem } }));
  };

  const totalPedido = Object.values(total).reduce((a, i) => a + i.totalItem, 0);
  const totalProdutos = Object.values(total).reduce((a, i) => a + i.quantidade, 0);

  const confirmar = async () => {
    if (carregando) return;
    setCarregando(true);

    try {
      await adicionarValor(totalPedido);
      await adicionarProdutos(totalProdutos);
      setTotal({});
      setReset(prev => !prev);
    } catch {
      toast.error("Erro ao confirmar pedido!");
    } finally {
      setCarregando(false);
    }
  };

  const itensFormatados = Object.entries(total).map(([id, dados]) => {
    const itemOriginal = itensAd.find(i => i.id === id);
    return {
      id,
      nome: itemOriginal?.item || "Item desconhecido",
      quantidade: dados.quantidade,
      totalItem: dados.totalItem
    };
  });

  return (
    <div className="containerItems">
      <div className="containerCarousel">

        <div className="descrip"><p>Itens</p></div>

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
          {itensFiltrados.map(i => (
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
          <div className="All flex"><p>Total</p></div>
          <div className="sum">
            <p className="sumAll">R${totalPedido.toFixed(2)}</p>
            <p className="total">{totalProdutos} Produtos</p>
          </div>
        </div>

        <div className="containerButtons flex">
          <button
            className="btnAll btn1"
            onClick={() => {
              if (totalPedido <= 0) {
                toast.error("Adicione pedidos antes de confirmar!");
              } else {
                confirmar();
                confirmarPedido(totalPedido, itensFormatados);
              }
            }}
          >
            Confirmar
          </button>
          <button className="btnAll btn2">Cancelar</button>
        </div>

      </div>
    </div>
  );
}
