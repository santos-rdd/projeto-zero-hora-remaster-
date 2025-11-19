import "./carouselEstoque.css";
import RowEstoque from "../components/RowEstoque";
import { useDatabase } from "../(backEnd)/hooks/useDatabase";
import { db } from "../(backEnd)/firebaseAdm";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function CarouselEstoque({ filtro }) {
  const estoque = useDatabase("itensRecebidos2"); 
  const [alteracoes, setAlteracoes] = useState({}); 

  const handleChange = (cod, qtd) => {
    setAlteracoes(prev => ({ ...prev, [cod]: qtd }));
  };

  const confirmarAlteracao = async () => {
    const itensAlterados = estoque.filter(e => alteracoes[e.cod] && alteracoes[e.cod] !== 0);

    if (itensAlterados.length === 0) {
      toast.error("Nenhuma alteração para confirmar!");
      return;
    }

    try {
      for (let item of itensAlterados) {
        const novoTotal = item.totalFisico + alteracoes[item.cod];
        const itemRef = doc(db, "itensRecebidos2", item.id);
        await updateDoc(itemRef, { totalFisico: novoTotal });

        await addDoc(collection(db, "historicoEstoque"), {
          cod: item.cod,
          item: item.item,
          alteracao: alteracoes[item.cod],
          data: new Date()
        });
      }

      toast.success("Alterações aplicadas com sucesso!");
      setAlteracoes({}); 
    } catch (err) {
      toast.error("Erro ao confirmar alterações.");
      console.error(err);
    }
  };

  const cancelarAlteracao = () => {
    setAlteracoes({});
    toast("Alterações canceladas!");
  };

  const estoqueFiltrado = filtro
  ? estoque.filter(
      e =>
        e.item.toLowerCase().includes(filtro.toLowerCase()) ||
        e.cod.toLowerCase().includes(filtro.toLowerCase())
    )
  : estoque;

  return (
    <div className="containerItems1">
      <div className="containerCarousel1">

        <div className="descrip1"><p>Itens</p></div>

        <div className="moreDescrip1">
          <div className="cont22">
            <p>Cód.</p>
            <p>Item</p>
          </div>
          <div className="cont33">
            <p className="qtdd1">{`Qtd.\nem estoque`}</p>
            <p className="qtdd1">Qtd.Alterada</p>
          </div>
        </div>

        <div className="carousel1">
          {estoqueFiltrado.map(e => (
            <RowEstoque
              key={e.id}
              cod={e.cod}
              item={e.item}
              totalFisico={e.totalFisico}
              onChange={handleChange}
              quantidadeAlterada={alteracoes[e.cod] || 0} 
            />
          ))}
        </div>

        <div className="buttonsPedido">
          <button className="btnConfirmar" onClick={confirmarAlteracao}>
            Confirmar Alteração
          </button>
          <button className="btnCancelar" onClick={cancelarAlteracao}>
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
}
