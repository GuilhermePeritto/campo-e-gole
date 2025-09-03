import { api, ApiResponse } from '@/lib/api';
import type { LoginResponse, User } from '@/types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

// Interfaces baseadas na estrutura hierárquica do backend
interface Empresa {
  id: string;
  nome: string;
  cnpj?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  situacao: 'Ativo' | 'Inativo';
  tenantId: number;
}

interface Filial {
  id: string;
  nome: string;
  codigo: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  telefone?: string;
  email?: string;
  responsavel?: string;
  situacao: 'Ativo' | 'Inativo' | 'Manutencao';
  empresaId: string;
  empresa?: {
    id: string;
    nome: string;
  };
}

interface AuthContextType {
  user: User | null;
  empresa: Empresa | null;
  filiais: Filial[];
  filialAtual: Filial | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasModuleAccess: (module: 'events' | 'bar' | 'school' | 'financial') => boolean;
  permissions: string[];
  hasPermission: (permission: string) => boolean;
  setFilialAtual: (filial: Filial | null) => void;
  refreshUserData: () => Promise<void>;
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
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [filiais, setFiliais] = useState<Filial[]>([]);
  const [filialAtual, setFilialAtual] = useState<Filial | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [permissions, setPermissions] = useState<string[]>([]);

  // Função utilitária para parse seguro de JSON
  const safeJsonParse = <T,>(value: string | null, defaultValue: T): T => {
    if (!value) return defaultValue;
    try {
      return JSON.parse(value);
    } catch (error) {
      console.warn('Erro ao fazer parse de JSON:', error);
      return defaultValue;
    }
  };

  // Busca dados completos do usuário (empresa, filiais, permissões)
  const fetchUserCompleteData = async (userId: string) => {
    try {
      console.log('🔄 Carregando dados completos do usuário...');
      
      // Buscar dados em paralelo
      const [permsResp, filiaisResp] = await Promise.all([
        api.get<ApiResponse<string[]>>(`/api/usuarios/${userId}/permissoes`),
        api.get<ApiResponse<string[]>>(`/api/usuarios/${userId}/filiais`),
      ]);

      const perms = permsResp?.data || [];
      const filiaisIds = filiaisResp?.data || [];

      console.log('📋 Permissões carregadas:', perms);
      console.log('🏢 IDs das filiais:', filiaisIds);

      setPermissions(perms);
      localStorage.setItem('userPermissions', JSON.stringify(perms));

      // Buscar dados das filiais se houver IDs
      if (filiaisIds.length > 0) {
        const filiaisData = await Promise.all(
          filiaisIds.map(id => api.get<ApiResponse<Filial>>(`/api/filiais/${id}`))
        );
        
        const filiaisCompletas = filiaisData
          .filter(resp => resp?.data)
          .map(resp => resp.data!);
        
        setFiliais(filiaisCompletas);
        localStorage.setItem('userFiliais', JSON.stringify(filiaisCompletas));
        
        // Definir filial atual (primeira por padrão)
        if (filiaisCompletas.length > 0 && !filialAtual) {
          setFilialAtual(filiaisCompletas[0]);
          localStorage.setItem('filialAtual', JSON.stringify(filiaisCompletas[0]));
        }
      }

      // Buscar dados da empresa se o usuário tiver empresaId
      if (user?.empresaId) {
        try {
          const empresaResp = await api.get<ApiResponse<Empresa>>(`/api/empresas/${user.empresaId}`);
          if (empresaResp?.data) {
            setEmpresa(empresaResp.data);
            localStorage.setItem('userEmpresa', JSON.stringify(empresaResp.data));
          }
        } catch (error) {
          console.warn('Erro ao carregar dados da empresa:', error);
        }
      }

      console.log('✅ Dados do usuário carregados com sucesso');
    } catch (error) {
      console.error('❌ Erro ao carregar dados do usuário:', error);
      // Em caso de erro, limpar dados
      setPermissions([]);
      setFiliais([]);
      setFilialAtual(null);
      setEmpresa(null);
      localStorage.removeItem('userPermissions');
      localStorage.removeItem('userFiliais');
      localStorage.removeItem('filialAtual');
      localStorage.removeItem('userEmpresa');
    }
  };

  // Função para atualizar dados do usuário
  const refreshUserData = async () => {
    if (user?.id) {
      await fetchUserCompleteData(user.id);
    }
  };

  useEffect(() => {
    console.log('🔄 Inicializando AuthContext...');
    
    // Verificar se há tokens salvos
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const savedUser = localStorage.getItem('user');
    const savedEmpresa = localStorage.getItem('userEmpresa');
    const savedFiliais = localStorage.getItem('userFiliais');
    const savedFilialAtual = localStorage.getItem('filialAtual');
    const savedPermissions = localStorage.getItem('userPermissions');

    console.log('📦 Dados do localStorage:', {
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
      hasUser: !!savedUser,
      hasEmpresa: !!savedEmpresa,
      hasFiliais: !!savedFiliais,
      hasFilialAtual: !!savedFilialAtual,
      hasPermissions: !!savedPermissions
    });

    if (accessToken && refreshToken && savedUser) {
      try {
        console.log('✅ Tokens encontrados, restaurando sessão...');
        
        // Configurar tokens na API
        api.setTokens(accessToken, refreshToken);
        
        // Restaurar dados com validação segura
        const userData = safeJsonParse(savedUser, null);
        const empresaData = safeJsonParse<Empresa | null>(savedEmpresa, null);
        const filiaisData = safeJsonParse<Filial[]>(savedFiliais, []);
        const filialAtualData = safeJsonParse<Filial | null>(savedFilialAtual, null);
        const cachedPermissions = safeJsonParse<string[]>(savedPermissions, []);
        
        // Verificar se os dados do usuário são válidos
        if (!userData || typeof userData !== 'object') {
          throw new Error('Dados do usuário inválidos');
        }
        
        // Restaurar estado
        setUser(userData);
        setEmpresa(empresaData);
        setFiliais(filiaisData);
        setFilialAtual(filialAtualData || (filiaisData.length > 0 ? filiaisData[0] : null));
        setPermissions(cachedPermissions);
        setIsAuthenticated(true);
        
        console.log('✅ Sessão restaurada com sucesso');
        
        // Buscar dados mais recentes em background
        if (userData?.id) {
          fetchUserCompleteData(userData.id).catch(() => {});
        }
      } catch (error) {
        console.error('❌ Erro ao restaurar dados do localStorage:', error);
        // Em caso de erro, limpar dados corrompidos
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('userEmpresa');
        localStorage.removeItem('userFiliais');
        localStorage.removeItem('filialAtual');
        localStorage.removeItem('userPermissions');
        
        setIsAuthenticated(false);
        
        console.log('🔄 Dados corrompidos removidos, inicializando padrão');
      }
    } else {
      console.log('ℹ️ Nenhuma sessão encontrada, inicializando padrão');
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post<ApiResponse<LoginResponse>>('/api/autenticacao/entrar', { 
        email, 
        senha: password 
      });

      if (response.success && response.data) {
        const { accessToken, refreshToken, expiraEm, usuario } = response.data;
        
        console.log('✅ Login bem-sucedido, salvando dados...');
        
        // Configurar tokens na API
        api.setTokens(accessToken, refreshToken);
        
        // Salvar dados no localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(usuario));
        
        console.log('💾 Dados salvos no localStorage:', {
          accessToken: accessToken ? '✅' : '❌',
          refreshToken: refreshToken ? '✅' : '❌',
          user: usuario ? '✅' : '❌'
        });
        
        // Atualizar estado
        setUser(usuario);
        setIsAuthenticated(true);
        
        // Carregar dados completos do usuário
        await fetchUserCompleteData(usuario.id);
        
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
    console.log('🚪 Fazendo logout...');
    
    // Limpar tokens da API
    api.clearTokens();
    
    // Limpar estado
    setUser(null);
    setEmpresa(null);
    setFiliais([]);
    setFilialAtual(null);
    setPermissions([]);
    setIsAuthenticated(false);
    
    // Limpar localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userEmpresa');
    localStorage.removeItem('userFiliais');
    localStorage.removeItem('filialAtual');
    localStorage.removeItem('userPermissions');
    
    console.log('✅ Logout realizado com sucesso');
    toast.success('Logout realizado com sucesso!');
  };

  const normalizeModuleId = (apiModuleName: string): 'events' | 'bar' | 'school' | 'financial' | null => {
    const name = apiModuleName.toLowerCase();
    if (name.includes('evento')) return 'events';
    if (name.includes('bar')) return 'bar';
    if (name.includes('escola') || name.includes('escolinha')) return 'school';
    if (name.includes('finance')) return 'financial';
    return null;
  };

  // Verificar acesso a módulos baseado nas permissões do usuário
  const hasModuleAccess = (module: 'events' | 'bar' | 'school' | 'financial') => {
    if (!permissions || permissions.length === 0) {
      console.log(`🔓 Módulo ${module}: Acesso permitido (sem permissões definidas)`);
      return true; // fallback permissivo
    }
    
    // Mapear módulos para padrões de permissões
    const modulePermissionPatterns = {
      'events': ['reservas.', 'eventos.'],
      'bar': ['bar.', 'produtos.', 'comandas.'],
      'school': ['escolinha.', 'alunos.', 'turmas.'],
      'financial': ['financeiro.', 'recebivel.', 'pagamentos.']
    };
    
    const patterns = modulePermissionPatterns[module];
    if (!patterns) {
      console.log(`❌ Módulo ${module}: Padrões não encontrados`);
      return false;
    }
    
    // Verificar se o usuário tem pelo menos uma permissão relacionada ao módulo
    const hasAccess = permissions.some(permission => 
      patterns.some(pattern => permission.toLowerCase().includes(pattern))
    );
    
    console.log(`🔍 Verificando acesso ao módulo ${module}:`, {
      patterns,
      permissions: permissions.slice(0, 5), // Mostrar apenas as primeiras 5 permissões
      hasAccess
    });
    
    return hasAccess;
  };

  // Verificar permissão específica
  const hasPermission = (permission: string) => {
    if (!permissions || permissions.length === 0) return true; // fallback permissivo
    return permissions.includes(permission);
  };

  // Função para definir filial atual
  const handleSetFilialAtual = (filial: Filial | null) => {
    setFilialAtual(filial);
    localStorage.setItem('filialAtual', JSON.stringify(filial));
  };

  const value: AuthContextType = {
    user,
    empresa,
    filiais,
    filialAtual,
    login,
    logout,
    isAuthenticated,
    hasModuleAccess,
    permissions,
    hasPermission,
    setFilialAtual: handleSetFilialAtual,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
