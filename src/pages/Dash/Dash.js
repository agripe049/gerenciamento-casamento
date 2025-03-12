import styles from './Dash.module.css'
import { useEffect, useState } from 'react';

function Dash() {

    const [orcamentoTotal, setOrcamentoTotal] = useState(0);
    const [totalGasto, setTotalGasto] = useState(0);
    const [item, setItem] = useState("");
    const [gasto, setGasto] = useState(0);
    const [itens,setItens] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/orcamentoTotal`, {
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
    }, []);


    const handleAddItem = () => {
        if (item && gasto) {
            const novoGasto = parseFloat(gasto)
            setTotalGasto(prevTotal => prevTotal + novoGasto);
            setItem("");
            setGasto(0);

            {/*Criar um novo item*/}
            const novoItem = {
                nome: item,
                gasto: novoGasto
            };

            {/*Atualiza a lista de itens*/}
            setItens(prevItens => [...prevItens, novoItem]);

            {/*Enviar dados para o JSON db.json*/ }
            const itemData = {
                nome: item,
                gasto: novoGasto
            };


            fetch(`http://localhost:5000/itens`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Item adicionado com sucesso:', data);
                })
                .catch(error => {
                    console.error('Erro ao adicionar item:', error)
                });
        }
    };


    const saldoRestante = orcamentoTotal - totalGasto;

    // Função para formatar números como moeda
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
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
                    onChange={(e) => setOrcamentoTotal(e.target.value)}
                />
            </div>
            {/*Entrada dos itens e dos gastos*/}
            <div>
                <h3>Item:</h3>
                <input
                    type="text"
                    id="item"
                    placeholder="Nome do item"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                />
            </div>
            <div>
                <h3>Gasto (R$):</h3>
                <input
                    type="number"
                    id="gasto"
                    placeholder="Valor do Item"
                    value={gasto}
                    onChange={(e) => setGasto(e.target.value)}
                />
                <button onClick={handleAddItem}>Adicionar Item</button>
            </div>
            {/*Termômetro visual*/}
            <div>
                <h2>Itens Adicionados</h2>
                <ul>
                    {itens.map((item, index) => (
                        <li key={index}>
                            {item.nome}: {formatCurrency(item.gasto)}
                        </li>
                    ))}
                </ul>
                <p>Total Gasto: {formatCurrency(totalGasto)}</p>
                <p>Saldo Restante: {formatCurrency(saldoRestante)}</p>
            </div>

        </div>
    )
}

export default Dash;