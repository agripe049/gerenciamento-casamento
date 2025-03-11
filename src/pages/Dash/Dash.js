import styles from './Dash.module.css'
import { useEffect, useState } from 'react';

function Dash(){

    const [orcamentoTotal, setOrcamentoTotal] = useState(0)

    useEffect(() => {
        fetch('http://localhost:5000/orcamentoTotal', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setOrcamentoTotal(data.orcamentoTotal.valor);
            })
            .catch((err) => console.log(err))
    },[]
)

    return(
        <div className={styles.container}>
            <h1>Gerenciador de casamentos</h1>
            {/*Entrada do orçamento Total*/}
            <div> 
                <h3>Orçamento Total (R$):</h3>
                <input 
                    type="number"  
                    id="orcamentoTotal"
                    placeholder="Digite o orçamento total"
                    value={orcamentoTotal}
                />
            </div>
            {/*Entrada dos itens e dos gastos*/}
            <div>
                <h3>Item:</h3>
                <input type="text" id="item" placeholder="Nome do item" />
            </div>
            <div>
                <h3>Gasto (R$):</h3>
                <input type="number" id="gasto" placeholder="Valor do Item" />
                <button>Adicionar Item</button>
            </div>
           {/*Termômetro visual*/}
            <div>
                <h2>Itens Adicionados</h2>
                <p>Total Gasto: R$</p>
                <p>Saldo Gasto: R$</p>
            </div>
           
        </div>
    )
}

export default Dash;