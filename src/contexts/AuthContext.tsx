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

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone?: string;
  manager?: string;
  status: 'ativa' | 'inativa';
}

interface Company {
  id: string;
  name: string;
  document?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  website?: string;
  description?: string;
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
  branches: Branch[];
  currentBranch: Branch | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
  hasModuleAccess: (module: 'events' | 'bar' | 'school' | 'financial') => boolean;
  updateCompanySettings: (settings: Partial<Company['settings']>) => void;
  updateCompanyData: (data: Partial<Company>) => void;
  getUserEffectivePermissions: (userId: string) => string[];
  addBranch: (branch: Omit<Branch, 'id'>) => void;
  updateBranch: (id: string, branch: Partial<Branch>) => void;
  deleteBranch: (id: string) => void;
  setCurrentBranch: (branch: Branch | null) => void;
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
  const [branches, setBranches] = useState<Branch[]>([]);
  const [currentBranch, setCurrentBranch] = useState<Branch | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simular verificação de token salvo
    const savedUser = localStorage.getItem('user');
    const savedCompany = localStorage.getItem('company');
    const savedUserGroups = localStorage.getItem('userGroups');
    const savedBranches = localStorage.getItem('branches');
    const savedCurrentBranch = localStorage.getItem('currentBranch');

    if (savedUser && savedCompany) {
      setUser(JSON.parse(savedUser));
      setCompany(JSON.parse(savedCompany));
      setUserGroups(savedUserGroups ? JSON.parse(savedUserGroups) : getDefaultUserGroups());
      const branchesData = savedBranches ? JSON.parse(savedBranches) : getDefaultBranches();
      setBranches(branchesData);
      setCurrentBranch(savedCurrentBranch ? JSON.parse(savedCurrentBranch) : branchesData[0]);
      setIsAuthenticated(true);
    } else {
      // Inicializar grupos e filiais padrão
      setUserGroups(getDefaultUserGroups());
      const defaultBranches = getDefaultBranches();
      setBranches(defaultBranches);
      setCurrentBranch(defaultBranches[0]);
    }
  }, []);

  const getDefaultBranches = (): Branch[] => [
    {
      id: '1',
      name: 'Matriz',
      address: 'Rua Principal, 123',
      city: 'São Paulo',
      state: 'SP',
      phone: '(11) 99999-9999',
      manager: 'João Silva',
      status: 'ativa'
    }
  ];

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
        document: '12.345.678/0001-90',
        email: 'contato@arenasports.com',
        phone: '(11) 3333-4444',
        address: 'Av. Esportiva, 1000',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        website: 'https://www.arenasports.com',
        description: 'Centro esportivo completo com quadras, bar e escolinha de esportes',
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

      const defaultBranches = getDefaultBranches();

      setUser(mockUser);
      setCompany(mockCompany);
      setBranches(defaultBranches);
      setCurrentBranch(defaultBranches[0]);
      setIsAuthenticated(true);

      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('company', JSON.stringify(mockCompany));
      localStorage.setItem('userGroups', JSON.stringify(userGroups));
      localStorage.setItem('branches', JSON.stringify(defaultBranches));
      localStorage.setItem('currentBranch', JSON.stringify(defaultBranches[0]));

      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setCompany(null);
    setBranches([]);
    setCurrentBranch(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('company');
    localStorage.removeItem('userGroups');
    localStorage.removeItem('branches');
    localStorage.removeItem('currentBranch');
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

  const updateCompanyData = (newData: Partial<Company>) => {
    if (!company) return;
    
    const updatedCompany = {
      ...company,
      ...newData
    };
    
    setCompany(updatedCompany);
    localStorage.setItem('company', JSON.stringify(updatedCompany));
  };

  const addBranch = (branchData: Omit<Branch, 'id'>) => {
    const newBranch: Branch = {
      ...branchData,
      id: Date.now().toString()
    };
    
    const updatedBranches = [...branches, newBranch];
    setBranches(updatedBranches);
    localStorage.setItem('branches', JSON.stringify(updatedBranches));
  };

  const updateBranch = (id: string, branchData: Partial<Branch>) => {
    const updatedBranches = branches.map(branch => 
      branch.id === id ? { ...branch, ...branchData } : branch
    );
    
    setBranches(updatedBranches);
    localStorage.setItem('branches', JSON.stringify(updatedBranches));
    
    // Atualizar filial atual se necessário
    if (currentBranch?.id === id) {
      const updatedCurrentBranch = { ...currentBranch, ...branchData };
      setCurrentBranch(updatedCurrentBranch);
      localStorage.setItem('currentBranch', JSON.stringify(updatedCurrentBranch));
    }
  };

  const deleteBranch = (id: string) => {
    const updatedBranches = branches.filter(branch => branch.id !== id);
    setBranches(updatedBranches);
    localStorage.setItem('branches', JSON.stringify(updatedBranches));
    
    // Se a filial atual foi removida, definir uma nova
    if (currentBranch?.id === id) {
      const newCurrentBranch = updatedBranches[0] || null;
      setCurrentBranch(newCurrentBranch);
      localStorage.setItem('currentBranch', JSON.stringify(newCurrentBranch));
    }
  };

  const handleSetCurrentBranch = (branch: Branch | null) => {
    setCurrentBranch(branch);
    localStorage.setItem('currentBranch', JSON.stringify(branch));
  };

  return (
    <AuthContext.Provider value={{
      user,
      company,
      userGroups,
      branches,
      currentBranch,
      login,
      logout,
      isAuthenticated,
      hasPermission,
      hasModuleAccess,
      updateCompanySettings,
      updateCompanyData,
      getUserEffectivePermissions,
      addBranch,
      updateBranch,
      deleteBranch,
      setCurrentBranch: handleSetCurrentBranch
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
