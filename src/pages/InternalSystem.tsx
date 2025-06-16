
import ModuleHeader from '@/components/ModuleHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, CreditCard, Settings, BarChart3, Package, Plus, Eye, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InternalSystem = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: 'Clientes',
      description: 'Gerenciar clientes do sistema',
      icon: Users,
      color: 'bg-blue-600',
      stats: { count: 25, label: 'clientes ativos' },
      actions: [
        { label: 'Lista de Clientes', route: '/sistema-interno/clientes' },
        { label: 'Novo Cliente', route: '/sistema-interno/clientes/novo', icon: Plus },
        { label: 'Relatórios', route: '/sistema-interno/clientes/relatorios', icon: BarChart3 }
      ]
    },
    {
      title: 'Contas',
      description: 'Controle financeiro dos clientes',
      icon: CreditCard,
      color: 'bg-green-600',
      stats: { count: 'R$ 15.420', label: 'receita mensal' },
      actions: [
        { label: 'Contas a Receber', route: '/sistema-interno/contas/receber' },
        { label: 'Faturas', route: '/sistema-interno/contas/faturas', icon: FileText },
        { label: 'Relatórios', route: '/sistema-interno/contas/relatorios', icon: BarChart3 }
      ]
    },
    {
      title: 'Módulos',
      description: 'Configurar módulos por cliente',
      icon: Package,
      color: 'bg-purple-600',
      stats: { count: 8, label: 'módulos disponíveis' },
      actions: [
        { label: 'Configurar Módulos', route: '/sistema-interno/modulos' },
        { label: 'Preços', route: '/sistema-interno/modulos/precos', icon: CreditCard },
        { label: 'Permissões', route: '/sistema-interno/modulos/permissoes', icon: Settings }
      ]
    },
    {
      title: 'Sistema',
      description: 'Configurações gerais',
      icon: Settings,
      color: 'bg-gray-600',
      stats: { count: '99.9%', label: 'uptime' },
      actions: [
        { label: 'Configurações', route: '/sistema-interno/sistema/config' },
        { label: 'Logs', route: '/sistema-interno/sistema/logs', icon: Eye },
        { label: 'Backup', route: '/sistema-interno/sistema/backup', icon: Settings }
      ]
    }
  ];

  const quickActions = [
    {
      title: 'Novo Cliente',
      description: 'Cadastrar novo cliente no sistema',
      icon: Plus,
      route: '/sistema-interno/clientes/novo',
      color: 'bg-blue-600'
    },
    {
      title: 'Relatório Geral',
      description: 'Visualizar relatório geral do sistema',
      icon: BarChart3,
      route: '/sistema-interno/relatorios',
      color: 'bg-green-600'
    },
    {
      title: 'Backup Sistema',
      description: 'Realizar backup completo',
      icon: Settings,
      route: '/sistema-interno/sistema/backup',
      color: 'bg-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Sistema Interno"
        icon={<Building2 className="h-6 w-6" />}
        moduleColor="bg-slate-600"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Clientes</p>
                  <p className="text-3xl font-bold">25</p>
                  <p className="text-blue-100 text-sm">+3 este mês</p>
                </div>
                <Users className="h-10 w-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Receita Mensal</p>
                  <p className="text-3xl font-bold">R$ 15.420</p>
                  <p className="text-green-100 text-sm">+12% vs mês anterior</p>
                </div>
                <CreditCard className="h-10 w-10 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Módulos Ativos</p>
                  <p className="text-3xl font-bold">8</p>
                  <p className="text-purple-100 text-sm">Todos funcionando</p>
                </div>
                <Package className="h-10 w-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Uptime</p>
                  <p className="text-3xl font-bold">99.9%</p>
                  <p className="text-orange-100 text-sm">Últimos 30 dias</p>
                </div>
                <BarChart3 className="h-10 w-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesso rápido às funcionalidades mais usadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-20 flex-col gap-2 hover:bg-muted/50"
                    onClick={() => navigate(action.route)}
                  >
                    <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center mb-1`}>
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {modules.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <Card key={index} className="border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{module.title}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg border">
                    <div className="text-2xl font-bold text-foreground">{module.stats.count}</div>
                    <div className="text-sm text-muted-foreground">{module.stats.label}</div>
                  </div>
                  
                  <div className="space-y-2">
                    {module.actions.map((action, actionIndex) => {
                      const ActionIcon = action.icon;
                      return (
                        <Button
                          key={actionIndex}
                          variant="outline"
                          className="w-full justify-start group hover:bg-muted/70"
                          onClick={() => navigate(action.route)}
                        >
                          {ActionIcon && <ActionIcon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />}
                          {action.label}
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default InternalSystem;
