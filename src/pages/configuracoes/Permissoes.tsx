import ModuleHeader from '@/components/ModuleHeader';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { usePermissoes } from '@/hooks/usePermissoes';
import { Permissao } from '@/types/permissao';
import {
  AlertCircle,
  BarChart3,
  Building,
  Calendar,
  Coffee,
  CreditCard,
  DollarSign,
  FileText,
  Lock,
  MapPin,
  School,
  Settings,
  Shield,
  Users
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mapeamento de módulos para ícones e cores
const MODULE_CONFIG = {
  'Sistema': { icon: Settings, color: 'bg-gray-500', bgColor: 'bg-gray-50' },
  'Usuarios': { icon: Users, color: 'bg-blue-500', bgColor: 'bg-blue-50' },
  'Filiais': { icon: Building, color: 'bg-green-500', bgColor: 'bg-green-50' },
  'Eventos': { icon: Calendar, color: 'bg-purple-500', bgColor: 'bg-purple-50' },
  'Financeiro': { icon: DollarSign, color: 'bg-orange-500', bgColor: 'bg-orange-50' },
  'Relatórios': { icon: BarChart3, color: 'bg-indigo-500', bgColor: 'bg-indigo-50' },
  'Escolinha': { icon: School, color: 'bg-pink-500', bgColor: 'bg-pink-50' },
  'Bar': { icon: Coffee, color: 'bg-amber-500', bgColor: 'bg-amber-50' },
  'Configurações': { icon: Settings, color: 'bg-slate-500', bgColor: 'bg-slate-50' },
  'Pagamentos': { icon: CreditCard, color: 'bg-emerald-500', bgColor: 'bg-emerald-50' },
  'Localização': { icon: MapPin, color: 'bg-red-500', bgColor: 'bg-red-50' },
  'Documentos': { icon: FileText, color: 'bg-cyan-500', bgColor: 'bg-cyan-50' },
};

const Permissoes = () => {
  const navigate = useNavigate();
  const permissoesHook = usePermissoes();
  const [permissoesAgrupadas, setPermissoesAgrupadas] = useState<Record<string, Permissao[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarPermissoes = async () => {
      try {
        await permissoesHook.fetchData({ limit: 1000 });
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar permissões:', error);
        setLoading(false);
      }
    };

    carregarPermissoes();
  }, []);

  useEffect(() => {
    const permissoesData = getPermissoesData();
    if (permissoesData.length > 0) {
      const agrupadas = permissoesData.reduce((acc, permissao) => {
        const modulo = permissao.moduloPai || 'Outros';
        if (!acc[modulo]) {
          acc[modulo] = [];
        }
        acc[modulo].push(permissao);
        return acc;
      }, {} as Record<string, Permissao[]>);

      setPermissoesAgrupadas(agrupadas);
    } else {
      setPermissoesAgrupadas({});
    }
  }, [permissoesHook.data]);

  const getModuloConfig = (modulo: string) => {
    return MODULE_CONFIG[modulo as keyof typeof MODULE_CONFIG] || {
      icon: Lock,
      color: 'bg-gray-500',
      bgColor: 'bg-gray-50'
    };
  };

  const getSubmoduloBadge = (permissao: Permissao) => {
    if (!permissao.submodulo) return null;
    
    const tipos = {
      'Criar': { label: 'Criar', variant: 'outline' as const, color: 'text-green-600' },
      'Editar': { label: 'Editar', variant: 'outline' as const, color: 'text-blue-600' },
      'Excluir': { label: 'Excluir', variant: 'outline' as const, color: 'text-red-600' },
      'Visualizar': { label: 'Visualizar', variant: 'outline' as const, color: 'text-purple-600' },
    };

    const tipo = tipos[permissao.submodulo as keyof typeof tipos] || { 
      label: permissao.submodulo, 
      variant: 'outline' as const, 
      color: 'text-gray-600' 
    };
    
    return (
      <Badge variant={tipo.variant} className={`text-xs ${tipo.color}`}>
        {tipo.label}
      </Badge>
    );
  };

  // Função para obter dados seguros
  const getPermissoesData = () => {
    return Array.isArray(permissoesHook.data) ? permissoesHook.data : [];
  };

  const permissoesData = getPermissoesData();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <ModuleHeader
          title="Permissões"
          icon={<Shield className="h-6 w-6" />}
          moduleColor={MODULE_COLORS.settings}
          mustReturn={true}
        />
        <main className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="h-3 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Permissões"
        icon={<Shield className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.settings}
        mustReturn={true}
      />
      
      <main className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Gerenciar Permissões</h2>
            <p className="text-muted-foreground">
              Visualize as permissões disponíveis no sistema
            </p>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total de Permissões</p>
                  <p className="text-2xl font-bold">{permissoesData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Settings className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Módulos</p>
                  <p className="text-2xl font-bold">{Object.keys(permissoesAgrupadas).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Lock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Submódulos</p>
                  <p className="text-2xl font-bold">
                    {new Set(permissoesData.map(p => p.submodulo).filter(Boolean)).size}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Permissões por Módulo */}
        {Object.keys(permissoesAgrupadas).length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma permissão encontrada</h3>
              <p className="text-muted-foreground mb-4">
                Não há permissões cadastradas no sistema.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(permissoesAgrupadas).map(([modulo, permissoes]) => {
              const config = getModuloConfig(modulo);
              const IconComponent = config.icon;

              return (
                <Card key={modulo} className={`${config.bgColor} border-l-4`} style={{ borderLeftColor: config.color }}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: config.color + '20' }}>
                        <IconComponent className="h-5 w-5" style={{ color: config.color }} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{modulo}</CardTitle>
                        <CardDescription>
                          {permissoes.length} permissão{permissoes.length !== 1 ? 'ões' : ''}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {permissoes.map((permissao) => (
                        <div
                          key={permissao.id}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-sm transition-shadow"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm">{permissao.nome}</h4>
                              {getSubmoduloBadge(permissao)}
                            </div>
                            {permissao.descricao && (
                              <p className="text-xs text-muted-foreground">{permissao.descricao}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Permissoes; 