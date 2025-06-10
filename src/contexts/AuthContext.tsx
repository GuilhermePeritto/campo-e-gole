import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'operator';
  companyId: string;
  permissions: string[];
  userGroupId?: string;
  useGroupPermissions: boolean;
  avatar?: string;
}

interface UserGroup {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  color: string;
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
    // Configurações dos módulos
    eventsModule: boolean;
    barModule: boolean;
    schoolModule: boolean;
    financialModule: boolean;
    // Configurações específicas
    allowNegativeStock: boolean;
    stockAlerts: boolean;
    lowStockThreshold: number;
    enableComandas: boolean;
    autoConfirmReservations: boolean;
    allowRecurringReservations: boolean;
    enablePeakHours: boolean;
    peakHourStart: string;
    peakHourEnd: string;
    peakHourMultiplier: number;
  };
}

interface AuthContextType {
  user: User | null;
  company: Company | null;
  userGroups: UserGroup[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
  hasModuleAccess: (module: 'events' | 'bar' | 'school' | 'financial') => boolean;
  updateCompanySettings: (settings: Partial<Company['settings']>) => void;
  getUserEffectivePermissions: (userId: string) => string[];
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
  const [userGroups, setUserGroups] = useState<UserGroup[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simular verificação de token salvo
    const savedUser = localStorage.getItem('user');
    const savedCompany = localStorage.getItem('company');
    const savedUserGroups = localStorage.getItem('userGroups');

    if (savedUser && savedCompany) {
      setUser(JSON.parse(savedUser));
      setCompany(JSON.parse(savedCompany));
      setUserGroups(savedUserGroups ? JSON.parse(savedUserGroups) : getDefaultUserGroups());
      setIsAuthenticated(true);
    } else {
      // Inicializar grupos padrão
      setUserGroups(getDefaultUserGroups());
    }
  }, []);

  const getDefaultUserGroups = (): UserGroup[] => [
    {
      id: '1',
      name: 'Administradores',
      description: 'Acesso completo ao sistema',
      color: 'bg-red-500',
      permissions: [
        'events.view', 'events.create', 'events.edit', 'events.delete', 'events.manage_venues', 'events.manage_clients', 'events.receive_payments',
        'school.view', 'school.manage_students', 'school.manage_teachers', 'school.manage_classes', 'school.receive_payments',
        'bar.view', 'bar.manage_products', 'bar.manage_stock', 'bar.manage_comandas', 'bar.cashier',
        'financial.view', 'financial.manage_receivables', 'financial.manage_payables', 'financial.view_reports',
        'general.view_dashboard', 'general.manage_settings', 'general.manage_users'
      ]
    },
    {
      id: '2',
      name: 'Gerentes',
      description: 'Acesso avançado com restrições administrativas',
      color: 'bg-blue-500',
      permissions: [
        'events.view', 'events.create', 'events.edit', 'events.manage_clients', 'events.receive_payments',
        'school.view', 'school.manage_students', 'school.manage_classes', 'school.receive_payments',
        'bar.view', 'bar.manage_products', 'bar.manage_stock', 'bar.manage_comandas', 'bar.cashier',
        'financial.view', 'financial.manage_receivables', 'financial.view_reports',
        'general.view_dashboard'
      ]
    },
    {
      id: '3',
      name: 'Operadores',
      description: 'Acesso básico às operações do dia a dia',
      color: 'bg-green-500',
      permissions: [
        'events.view', 'events.create', 'events.receive_payments',
        'school.view', 'school.receive_payments',
        'bar.view', 'bar.manage_comandas', 'bar.cashier',
        'general.view_dashboard'
      ]
    },
    {
      id: '4',
      name: 'Caixa',
      description: 'Focado em operações de caixa e vendas',
      color: 'bg-yellow-500',
      permissions: [
        'bar.view', 'bar.cashier', 'bar.manage_comandas',
        'events.receive_payments',
        'school.receive_payments',
        'general.view_dashboard'
      ]
    }
  ];

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulação de login - em produção seria uma chamada à API
    if (email === 'admin@exemplo.com' && password === '123456') {
      const mockUser: User = {
        id: '1',
        name: 'Administrador',
        email: 'admin@exemplo.com',
        role: 'admin',
        companyId: '1',
        permissions: [],
        userGroupId: '1',
        useGroupPermissions: true,
        avatar: 'https://via.placeholder.com/150'
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
          },
          eventsModule: true,
          barModule: true,
          schoolModule: true,
          financialModule: true,
          allowNegativeStock: false,
          stockAlerts: true,
          lowStockThreshold: 10,
          enableComandas: true,
          autoConfirmReservations: true,
          allowRecurringReservations: true,
          enablePeakHours: false,
          peakHourStart: '18:00',
          peakHourEnd: '22:00',
          peakHourMultiplier: 1.5
        }
      };

      setUser(mockUser);
      setCompany(mockCompany);
      setIsAuthenticated(true);

      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('company', JSON.stringify(mockCompany));
      localStorage.setItem('userGroups', JSON.stringify(userGroups));

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
    localStorage.removeItem('userGroups');
  };

  const getUserEffectivePermissions = (userId: string): string[] => {
    if (!user) return [];
    
    if (user.useGroupPermissions && user.userGroupId) {
      const userGroup = userGroups.find(group => group.id === user.userGroupId);
      return userGroup?.permissions || [];
    }
    
    return user.permissions || [];
  };

  const hasPermission = (permission: string): boolean => {
    if (!user || !company) return false;
    
    // Admin sempre tem todas as permissões
    if (user.role === 'admin') return true;
    
    const effectivePermissions = getUserEffectivePermissions(user.id);
    return effectivePermissions.includes(permission);
  };

  const hasModuleAccess = (module: 'events' | 'bar' | 'school' | 'financial'): boolean => {
    if (!company) return false;
    
    // Verificar se o módulo está ativo nas configurações
    const moduleKey = `${module}Module` as keyof Company['settings'];
    const isModuleEnabled = company.settings[moduleKey];
    
    return isModuleEnabled && company.modules.includes(module);
  };

  const updateCompanySettings = (newSettings: Partial<Company['settings']>) => {
    if (!company) return;
    
    const updatedCompany = {
      ...company,
      settings: {
        ...company.settings,
        ...newSettings
      }
    };
    
    setCompany(updatedCompany);
    localStorage.setItem('company', JSON.stringify(updatedCompany));
  };

  return (
    <AuthContext.Provider value={{
      user,
      company,
      userGroups,
      login,
      logout,
      isAuthenticated,
      hasPermission,
      hasModuleAccess,
      updateCompanySettings,
      getUserEffectivePermissions
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
