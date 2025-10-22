import "./DualSearch.css";

export default function DualSearch(props){

  const exampleText1 = props.exampleText1 || "Nome";
  const exampleText2 = props.exampleText2 || "Codigo";

    return (
        <div>
          <p className="pBuscar">Buscar por: </p>

            <div className="campoBusca flex">

                <input className="nomeProduto"
                type="text" name="Nome" id="Nome"
                placeholder={exampleText1} />

                <p>ou</p>

                <input className="buscaCodigo"
                type="text" name="Codigo" id="Codigo"
                placeholder={exampleText2} />
            </div>

            <button className="buscarCodigo">
              Buscar
            </button>
        </div>
    )
}