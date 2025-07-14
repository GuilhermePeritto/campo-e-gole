
import ModuleHeader from '@/components/ModuleHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Building, DollarSign, FileText, Globe, MapPin, Settings as SettingsIcon, Shield, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  const configSections = [
    // MÓDULO SISTEMA - Configurações Gerais
    {
      id: 'empresa',
      title: 'Dados da Empresa',
      description: 'Informações básicas da empresa atual',
      icon: <Building className="h-6 w-6" />,
      color: 'bg-blue-600',
      path: '/configuracoes/empresa'
    },
    {
      id: 'filiais',
      title: 'Filiais',
      description: 'Gerenciar filiais e localizações',
      icon: <MapPin className="h-6 w-6" />,
      color: 'bg-indigo-500',
      path: '/configuracoes/filiais'
    },
    
    // MÓDULO USUÁRIOS - Gestão de Usuários e Permissões
    {
      id: 'usuarios',
      title: 'Usuários',
      description: 'Controlar usuários do sistema',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-green-500',
      path: '/configuracoes/usuarios'
    },
    {
      id: 'grupos',
      title: 'Grupos de Permissão',
      description: 'Definir perfis de acesso reutilizáveis',
      icon: <Shield className="h-6 w-6" />,
      color: 'bg-purple-500',
      path: '/configuracoes/grupos'
    },
    {
      id: 'permissoes',
      title: 'Permissões',
      description: 'Visualizar permissões do sistema',
      icon: <Shield className="h-6 w-6" />,
      color: 'bg-purple-600',
      path: '/configuracoes/permissoes'
    },
    
    // MÓDULO PARÂMETROS - Configurações Específicas
    {
      id: 'parametros',
      title: 'Parâmetros Globais',
      description: 'Configurações gerais do sistema',
      icon: <SettingsIcon className="h-6 w-6" />,
      color: 'bg-orange-500',
      path: '/configuracoes/parametros'
    },
    {
      id: 'parametros-filial',
      title: 'Parâmetros por Filial',
      description: 'Configurações específicas por filial',
      icon: <SettingsIcon className="h-6 w-6" />,
      color: 'bg-orange-600',
      path: '/configuracoes/parametros-por-filial'
    },
    
    // MÓDULO FINANCEIRO - Configurações Financeiras
    {
      id: 'financeiro-global',
      title: 'Financeiro Global',
      description: 'Configurações fiscais e contábeis',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'bg-emerald-500',
      path: '/configuracoes/financeiro-global'
    },
    
    // MÓDULO INTEGRAÇÕES - Serviços Externos
    {
      id: 'integracoes',
      title: 'Integrações',
      description: 'Conectar com serviços externos',
      icon: <Globe className="h-6 w-6" />,
      color: 'bg-cyan-500',
      path: '/configuracoes/integracoes'
    },
    
    // MÓDULO AUDITORIA - Monitoramento
    {
      id: 'auditoria',
      title: 'Auditoria e Logs',
      description: 'Histórico de alterações e atividades',
      icon: <FileText className="h-6 w-6" />,
      color: 'bg-gray-500',
      path: '/configuracoes/auditoria'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Configurações"
        icon={<SettingsIcon className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.settings}
        mustReturn={true}
        backTo="/inicio"
        backLabel="Início"
      />

      <main className="container mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Painel de Configurações</h2>
          <p className="text-muted-foreground">
            Gerencie todos os aspectos do seu sistema de forma centralizada
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {configSections.map((section) => (
            <Card 
              key={section.id}
              className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
              onClick={() => navigate(section.path)}
            >
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-lg ${section.color} flex items-center justify-center text-white mb-3`}>
                  {section.icon}
                </div>
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {section.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Settings;
