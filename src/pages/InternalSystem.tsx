
import ModuleHeader from '@/components/ModuleHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, CreditCard, Settings, BarChart3, Package } from 'lucide-react';
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
        { label: 'Novo Cliente', route: '/sistema-interno/clientes/novo' },
        { label: 'Configurações', route: '/sistema-interno/clientes/configuracoes' }
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
        { label: 'Faturas', route: '/sistema-interno/contas/faturas' },
        { label: 'Relatórios', route: '/sistema-interno/contas/relatorios' }
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
        { label: 'Preços', route: '/sistema-interno/modulos/precos' },
        { label: 'Permissões', route: '/sistema-interno/modulos/permissoes' }
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
        { label: 'Logs', route: '/sistema-interno/sistema/logs' },
        { label: 'Backup', route: '/sistema-interno/sistema/backup' }
      ]
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
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Clientes</p>
                  <p className="text-2xl font-bold">25</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Receita Mensal</p>
                  <p className="text-2xl font-bold">R$ 15.420</p>
                </div>
                <CreditCard className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Módulos Ativos</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <Package className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Uptime</p>
                  <p className="text-2xl font-bold">99.9%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {modules.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <Card key={index} className="border">
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
                  <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold">{module.stats.count}</div>
                    <div className="text-sm text-muted-foreground">{module.stats.label}</div>
                  </div>
                  
                  <div className="space-y-2">
                    {module.actions.map((action, actionIndex) => (
                      <Button
                        key={actionIndex}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => navigate(action.route)}
                      >
                        {action.label}
                      </Button>
                    ))}
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
