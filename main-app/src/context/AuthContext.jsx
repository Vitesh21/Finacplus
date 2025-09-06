import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('musicLibraryUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Verify the user exists in our users object
        if ((parsedUser.username === 'admin' || parsedUser.username === 'user') && 
            parsedUser.role) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem('musicLibraryUser');
        }
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('musicLibraryUser');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (username, password) => {
    // Simple authentication logic (in a real app, this would be an API call)
    const users = {
      admin: { username: 'admin', role: 'admin' },
      user: { username: 'user', role: 'user' }
    };

    // Check credentials (insecure, for demo only)
    if ((username === 'admin' && password === 'admin123') || 
        (username === 'user' && password === 'user123')) {
      const userData = users[username];
      setUser(userData);
      localStorage.setItem('musicLibraryUser', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('musicLibraryUser');
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Check if user has admin role
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        isAdmin, 
        login, 
        logout, 
        loading 
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
