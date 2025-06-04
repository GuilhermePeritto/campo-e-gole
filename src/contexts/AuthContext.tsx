
import React, { createContext, useContext, useState, useEffect } from 'react';

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
  modules: ('events' | 'bar' | 'school')[];
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
  hasModuleAccess: (module: 'events' | 'bar' | 'school') => boolean;
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
    console.log('AuthProvider - verificando token salvo');
    // Simular verificação de token salvo
    const savedUser = localStorage.getItem('user');
    const savedCompany = localStorage.getItem('company');
    
    if (savedUser && savedCompany) {
      console.log('AuthProvider - token encontrado, fazendo login automático');
      setUser(JSON.parse(savedUser));
      setCompany(JSON.parse(savedCompany));
      setIsAuthenticated(true);
    } else {
      console.log('AuthProvider - nenhum token encontrado');
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('AuthProvider - tentativa de login para:', email);
    // Simulação de login - em produção seria uma chamada à API
    if (email === 'admin@exemplo.com' && password === '123456') {
      const mockUser: User = {
        id: '1',
        name: 'Administrador',
        email: 'admin@exemplo.com',
        role: 'admin',
        companyId: '1',
        permissions: ['events.view', 'events.create', 'events.edit', 'bar.view', 'bar.create', 'bar.edit', 'school.view', 'school.create', 'school.edit', 'settings.view']
      };

      const mockCompany: Company = {
        id: '1',
        name: 'Arena Sports Club',
        modules: ['events', 'bar', 'school'],
        settings: {
          currency: 'BRL',
          timezone: 'America/Sao_Paulo',
          businessHours: {
            start: '06:00',
            end: '23:00'
          }
        }
      };

      console.log('AuthProvider - login bem-sucedido');
      setUser(mockUser);
      setCompany(mockCompany);
      setIsAuthenticated(true);
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('company', JSON.stringify(mockCompany));
      
      return true;
    }
    console.log('AuthProvider - login falhou');
    return false;
  };

  const logout = () => {
    console.log('AuthProvider - fazendo logout');
    setUser(null);
    setCompany(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('company');
  };

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false;
  };

  const hasModuleAccess = (module: 'events' | 'bar' | 'school'): boolean => {
    return company?.modules.includes(module) || false;
  };

  console.log('AuthProvider - estado atual:', { user: !!user, company: !!company, isAuthenticated });

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
