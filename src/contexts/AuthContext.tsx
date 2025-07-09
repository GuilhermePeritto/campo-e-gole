import { api, ApiResponse } from '@/lib/api';
import type { LoginResponse, User } from '@/types/reservas';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

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
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
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
    // Verificar se há tokens salvos
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const savedUser = localStorage.getItem('user');
    const savedCompany = localStorage.getItem('company');
    const savedUserGroups = localStorage.getItem('userGroups');
    const savedBranches = localStorage.getItem('branches');
    const savedCurrentBranch = localStorage.getItem('currentBranch');

    if (accessToken && refreshToken && savedUser) {
      // Configurar tokens na API
      api.setTokens(accessToken, refreshToken);
      
      // Restaurar dados do usuário
      setUser(JSON.parse(savedUser));
      setCompany(savedCompany ? JSON.parse(savedCompany) : null);
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
        'general.view_inicio', 'general.manage_settings', 'general.manage_users'
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
        'general.view_inicio'
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
        'general.view_inicio'
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
        'general.view_inicio'
      ]
    }
  ];

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post<ApiResponse<LoginResponse>>('/autenticacao/entrar', { 
        email, 
        senha: password 
      });

      if (response.success && response.data) {
        const { accessToken, refreshToken, user } = response.data;
        
        // Configurar tokens na API
        api.setTokens(accessToken, refreshToken);
        
        // Salvar dados no localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Atualizar estado
        setUser(user);
        setIsAuthenticated(true);
        
        // Carregar dados da empresa se necessário
        if (!company) {
          // Aqui você pode fazer uma chamada para buscar dados da empresa
          // Por enquanto, vamos usar dados mockados
          const mockCompany: Company = {
            id: '1',
            name: 'Empresa Exemplo',
            document: '12.345.678/0001-90',
            email: 'contato@empresa.com',
            phone: '(11) 99999-9999',
            address: 'Rua Principal, 123',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01234-567',
            modules: ['events', 'bar', 'school', 'financial'],
            settings: {
              currency: 'BRL',
              timezone: 'America/Sao_Paulo',
              businessHours: {
                start: '08:00',
                end: '22:00'
              },
              eventsModule: true,
              barModule: true,
              schoolModule: true,
              financialModule: true,
              allowNegativeStock: false,
              stockAlerts: true,
              lowStockThreshold: 5,
              enableComandas: true,
              autoConfirmReservations: false,
              allowRecurringReservations: true,
              enablePeakHours: true,
              peakHourStart: '18:00',
              peakHourEnd: '21:00',
              peakHourMultiplier: 1.5
            }
          };
          
          setCompany(mockCompany);
          localStorage.setItem('company', JSON.stringify(mockCompany));
        }
        
        toast.success('Login realizado com sucesso!');
        return true;
      } else {
        toast.error(response.message || 'Erro no login');
        return false;
      }
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  const logout = () => {
    // Limpar tokens da API
    api.clearTokens();
    
    // Limpar estado
    setUser(null);
    setCompany(null);
    setIsAuthenticated(false);
    
    // Limpar localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('company');
    localStorage.removeItem('userGroups');
    localStorage.removeItem('branches');
    localStorage.removeItem('currentBranch');
    
    toast.success('Logout realizado com sucesso!');
  };

  const getUserEffectivePermissions = (userId: string): string[] => {
    if (!user) return [];
    
    const userGroup = userGroups.find(g => g.id === user.grupoId);
    if (!userGroup) return [];
    
    // Se o usuário usa permissões customizadas, retornar elas
    if (!user.permissoesCustomizadas || user.permissoesCustomizadas.length === 0) {
      return userGroup.permissions;
    }
    
    // Caso contrário, retornar permissões do grupo
    return userGroup.permissions;
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    const effectivePermissions = getUserEffectivePermissions(user.id);
    return effectivePermissions.includes(permission);
  };

  const hasModuleAccess = (module: 'events' | 'bar' | 'school' | 'financial'): boolean => {
    if (!company) return false;
    
    return company.modules.includes(module);
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
      id: (branches.length + 1).toString()
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
    
    // Se a filial atual foi atualizada, atualizar também
    if (currentBranch?.id === id) {
      const updatedCurrentBranch = updatedBranches.find(b => b.id === id);
      if (updatedCurrentBranch) {
        setCurrentBranch(updatedCurrentBranch);
        localStorage.setItem('currentBranch', JSON.stringify(updatedCurrentBranch));
      }
    }
  };

  const deleteBranch = (id: string) => {
    const updatedBranches = branches.filter(branch => branch.id !== id);
    setBranches(updatedBranches);
    localStorage.setItem('branches', JSON.stringify(updatedBranches));
    
    // Se a filial atual foi deletada, definir a primeira como atual
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

  const value: AuthContextType = {
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
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
