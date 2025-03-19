import styles from './Dash.module.css';
import { useEffect, useState } from 'react';
import { db } from '../../services/FirebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

function Dash() {
    const [orcamentoTotal, setOrcamentoTotal] = useState(0);
    const [totalGasto, setTotalGasto] = useState(0);
    const [item, setItem] = useState("");
    const [gasto, setGasto] = useState("");
    const [itens, setItens] = useState([]);

    // Carregar orçamento total e itens do Firestore
    useEffect(() => {
        const fetchDados = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "orcamento"));
                if (!querySnapshot.empty) {
                    const data = querySnapshot.docs[0].data();
                    setOrcamentoTotal(data.valor);
                }
                const itensSnapshot = await getDocs(collection(db, "itens"));
                const itensLista = itensSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setItens(itensLista);

                // Calcular o total gasto
                const total = itensLista.reduce((sum, item) => sum + item.gasto, 0);
                setTotalGasto(total);
            } catch (error) {
                console.error("Erro ao buscar dados: ", error);
            }
        };
        fetchDados();
    }, []);

    // Adicionar item ao Firestore
    const handleAddItem = async () => {
        if (item && gasto) {
            const novoGasto = parseFloat(gasto);

            // Verifica se o item já existe
            const itemExists = itens.some(existingItem => existingItem.nome === item);
            if (itemExists) {
                alert("Este item já foi adicionado.");
                return;
            }

            try {
                const docRef = await addDoc(collection(db, "itens"), {
                    nome: item,
                    gasto: novoGasto
                });

                const novoItem = { id: docRef.id, nome: item, gasto: novoGasto };
                setItens([...itens, novoItem]);
                setTotalGasto(prevTotal => prevTotal + novoGasto);
                setItem("");
                setGasto("");
            } catch (error) {
                console.error("Erro ao adicionar item: ", error);
            }
        }
    };

    // Remover item do Firestore
    const remove = async (id, index) => {
        try {
            await deleteDoc(doc(db, "itens", id));
            const itemToRemove = itens[index];
            setItens(prevItens => prevItens.filter((_, i) => i !== index));
            setTotalGasto(prevTotal => prevTotal - itemToRemove.gasto);
        } catch (error) {
            console.error("Erro ao remover item: ", error);
        }
    };

    const saldoRestante = orcamentoTotal - totalGasto;

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
                <div className={styles.itemList}>
                    <h2>Itens Adicionados</h2>
                    <ul>
                        {itens.map((item, index) => (
                            <li key={item.id}>
                                <span>{item.nome}</span>
                                <span className={styles.price}>{formatCurrency(item.gasto)}</span>
                                <button onClick={() => remove(item.id, index)}>Remover</button>
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
    );
}

export default Dash;
