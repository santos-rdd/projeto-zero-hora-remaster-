import { useState } from "react";

export default function Teste({ itens }) {
  const [termo, setTermo] = useState("");

  // Função de filtragem
  const itensFiltrados = itens.filter((item) =>
    item.item.toLowerCase().includes(termo.toLowerCase()) ||
    item.cod.toLowerCase().includes(termo.toLowerCase())
  );

  return (
    <div className="busca-container">
      <input
        type="text"
        placeholder="Buscar por nome ou código..."
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
        className="campo-busca"
      />

      <div className="lista-itens">
        {itensFiltrados.length > 0 ? (
          itensFiltrados.map((e) => (
            <div key={e.id} className="item">
              <strong>{e.item}</strong> <br />
              Código: {e.cod} <br />
              Total disponível: {e.totalDisponivel}
            </div>
          ))
        ) : (
          <p>Nenhum item encontrado.</p>
        )}
      </div>
    </div>
  );
}
