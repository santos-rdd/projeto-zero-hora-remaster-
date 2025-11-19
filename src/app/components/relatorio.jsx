import "./relatorio.css";

export default function Relatorio(props){

    return (
          <div className="faturamento">

            <div className="border" />

            <div className="conteinerInfos1">
                    <div className="allInfos info1">
                        <p>Criado: </p>
                        <p>Agora</p>
                    </div>
                    
                    <div className="allInfos info2">
                        <p>Aprovado: </p>
                        <p>Agora</p>
                    </div>

                    <div className="allInfos info3">
                        <p>Separação </p>
                        <p></p>
                    </div>

                    <div className="allInfos info4">
                        <p>Transporte</p>
                        <p></p>
                    </div>

                    <div className="allInfos info5">
                        <p>Entregue: </p>
                        <p>Pendente</p>
                    </div>
            </div>

                   

                </div>
    )
}