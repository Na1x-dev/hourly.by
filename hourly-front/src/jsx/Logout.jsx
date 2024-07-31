import React from 'react';
import { useAuth } from './AuthContext';

const Logout = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        // window.location.href = '/'; 
    };

    return <button onClick={handleLogout}>Выйти</button>;
};

export default Logout;