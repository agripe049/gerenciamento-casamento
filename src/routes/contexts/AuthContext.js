import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../../Services/firebaseConfig'; // Importe seu Firebase auth
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user); // Define como true se o usuário estiver autenticado
            setLoading(false); // Define loading como false após verificar o estado
        });

        return () => unsubscribe(); // Limpa o listener ao desmontar
    }, []);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};