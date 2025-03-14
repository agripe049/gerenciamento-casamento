import styles from './Dash.module.css'
import { useEffect, useState } from 'react';

function Dash() {

    const [orcamentoTotal, setOrcamentoTotal] = useState("");
    const [totalGasto, setTotalGasto] = useState(0);
    const [item, setItem] = useState("");
    const [gasto, setGasto] = useState("");
    const [itens, setItens] = useState([])

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
            const novoGasto = parseFloat(gasto);

            // Verifica se o item já existe
            const itemExists = itens.some(existingItem => existingItem.nome === item);

            if (itemExists) {
                alert("Este item já foi adicionado.");
                return; // Não adiciona o item se já existir
            }

            setTotalGasto(prevTotal => prevTotal + novoGasto);
            setItem("");
            setGasto(0);

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
                    // Adicione o novo item à lista de itens com o ID retornado
                    setItens(prevItens => [...prevItens, { ...itemData, id: data.id }]); // Supondo que o servidor retorne o ID
                })
                .catch(error => {
                    console.error('Erro ao adicionar item:', error);
                });
        }
    };

    const remove = (index) => {
        const itemToRemove = itens[index]

        {/*Remover o item do estado local*/ }
        setItens(prevItens => prevItens.filter((_, i) => i !== index));

        {/*Subtrair o valor do item removido do totalGasto*/ }
        setTotalGasto(prevTotal => prevTotal - itemToRemove.gasto);

        fetch(`http://localhost:5000/itens/${itemToRemove.id}`, {
            method: "DELETE",
        })
            .then(response => {
                console.log('Resposta do servidor:', response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Item removido com sucesso:', data);
            })
            .catch(error => {
                console.error('Erro ao remover item:', error);
            });
    }

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
            <div className={styles.form}>
                <h1>Gerenciador de Orçamento para Casamentos</h1>
                {/*Entrada do orçamento Total*/}
                <div>
                    <h3>Orçamento Total (R$):</h3>
                    <input
                        type="number"
                        id="orcamentoTotal"
                        placeholder="Digite o orçamento total"
                        value={orcamentoTotal || ""}
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
                        value={gasto || ""}
                        onChange={(e) => setGasto(e.target.value)}
                    />
                </div>
                <button onClick={handleAddItem}>Adicionar Item</button>
                {/*Termômetro visual*/}
                <div className={styles.itemList}>
                    <h2>Itens Adicionados</h2>
                    <ul>
                        {itens.map((item, index) => (
                            <li key={index}>
                                <span>{item.nome}</span>
                                <span className={styles.price}>{formatCurrency(item.gasto)}</span>
                                <button onClick={() => remove(index)}>Remover</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.footer}>
                    <p>Total Gasto: {formatCurrency(totalGasto)}</p>
                    <p>Saldo Restante: {formatCurrency(saldoRestante)}</p>
                </div>
            </div>

        </div>
    )
}

export default Dash;