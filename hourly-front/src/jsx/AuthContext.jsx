import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        return token ? JSON.parse(atob(token.split('.')[1])) : null; // Декодируем токен для получения информации о пользователе
    });

    const login = (token) => {
        localStorage.setItem('token', token);
        setUser(JSON.parse(atob(token.split('.')[1]))); // Обновляем состояние пользователя
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const isAuthenticated = () => {
        return user !== null;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};