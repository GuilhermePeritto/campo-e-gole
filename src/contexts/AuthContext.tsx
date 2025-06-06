
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'operator';
  companyId: string;
  permissions: string[];
}

interface Company {
  id: string;
  name: string;
  logo?: string;
  modules: ('events' | 'bar' | 'school' | 'financial')[];
  settings: {
    currency: string;
    timezone: string;
    businessHours: {
      start: string;
      end: string;
    };
  };
}

interface AuthContextType {
  user: User | null;
  company: Company | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
  hasModuleAccess: (module: 'events' | 'bar' | 'school' | 'financial') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simular verificação de token salvo
    const savedUser = localStorage.getItem('user');
    const savedCompany = localStorage.getItem('company');

    if (savedUser && savedCompany) {
      setUser(JSON.parse(savedUser));
      setCompany(JSON.parse(savedCompany));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulação de login - em produção seria uma chamada à API
    if (email === 'admin@exemplo.com' && password === '123456') {
      const mockUser: User = {
        id: '1',
        name: 'Administrador',
        email: 'admin@exemplo.com',
        role: 'admin',
        companyId: '1',
        permissions: ['events.view', 'events.create', 'events.edit', 'bar.view', 'bar.create', 'bar.edit', 'settings.view']
      };

      const mockCompany: Company = {
        id: '1',
        name: 'Arena Sports Club',
        modules: ['events', 'bar', 'school', 'financial'],
        settings: {
          currency: 'BRL',
          timezone: 'America/Sao_Paulo',
          businessHours: {
            start: '06:00',
            end: '23:00'
          }
        }
      };

      setUser(mockUser);
      setCompany(mockCompany);
      setIsAuthenticated(true);

      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('company', JSON.stringify(mockCompany));

      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setCompany(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('company');
  };

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false;
  };

  const hasModuleAccess = (module: 'events' | 'bar' | 'school' | 'financial'): boolean => {
    return company?.modules.includes(module) || false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      company,
      login,
      logout,
      isAuthenticated,
      hasPermission,
      hasModuleAccess
    }}>
      {children}
    </AuthContext.Provider>
  );
};
