import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const storedUser = localStorage.getItem('user'); // Lấy thông tin người dùng từ localStorage 
    const [user, setUser] = useState(storedUser);

    const login = (username) => {
        setUser(username);
        localStorage.setItem('user', username); // Lưu thông tin người dùng vào localStorage 
        console.log(username);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); 

    };

    const authContextValue = {
        user,
        login,
        logout,
    };

  return <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>;
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuthContext };
