import { auth } from '../../Services/firebaseConfig';
import styles from './Login.module.css';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../routes/contexts/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (user) {
        login(); // Chame a função de login do contexto
        navigate('/dash');
        return null;
    }

    function handleSignIn(e) {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <header className={styles.header}>
                    <h3>Digite suas credenciais para acessar o sistema</h3>
                </header>

                <form onSubmit={handleSignIn}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            id="email" 
                            placeholder="Digite seu email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="password">Senha</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Digite sua senha" 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className={styles.button} type="submit">
                        Entrar
                    </button>
                </form>
                {error && <p>{error.message}</p>} {/* Exibe mensagem de erro, se houver */}
            </div>
        </div>
    );
}

export default Login;