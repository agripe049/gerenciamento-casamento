import styles from './Dash.module.css'

function Dash(){
    return(
        <div className={styles.container}>
            <h1>Gerenciador de casamentos</h1>
            {/*Entrada do orçamento Total*/}
            <div> 
                <h3>Orçamento Total (R$):</h3>
                <input type="number" placeholder="Digite o orçamento total" />
            </div>
            {/*Entrada dos itens e dos gastos*/}
            <div>
                <h3>Item:</h3>
                <input type="text" placeholder="Nome do item" />
            </div>
            <div>
                <h3>Gasto (R$):</h3>
                <input type="number" placeholder="Valor do Item" />
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