
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Building2, Calendar, LogOut, Settings, Users2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, company, logout, hasModuleAccess } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const modules = [
    {
      id: 'events',
      title: 'Gestão de Eventos',
      description: 'Gerencie reservas esportivas, locais, agendas e análises financeiras',
      icon: Calendar,
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-500',
      textColor: 'text-white',
      features: [
        'Agenda com visualização diária, semanal e mensal',
        'Cadastro de locais esportivos',
        'Reservas recorrentes automáticas',
        'Relatórios financeiros detalhados',
        'Gestão de clientes e histórico'
      ],
      path: '/eventos'
    },
    {
      id: 'bar',
      title: 'Gestão de Bar',
      description: 'Controle completo do bar, estoque, comandas e caixa',
      icon: BarChart3,
      color: 'bg-black',
      hoverColor: 'hover:bg-gray-800',
      textColor: 'text-white',
      features: [
        'Cadastro de produtos e controle de estoque',
        'Sistema de comandas digitais',
        'Caixa integrado para pagamentos',
        'Relatórios de vendas em tempo real',
        'Gestão de funcionários e turnos'
      ],
      path: '/bar'
    },
    {
      id: 'school',
      title: 'Escolinha de Futebol',
      description: 'Gestão completa de alunos, mensalidades e turmas',
      icon: Users2,
      color: 'bg-black',
      hoverColor: 'hover:bg-gray-800',
      textColor: 'text-white',
      features: [
        'Cadastro e gestão de alunos',
        'Controle de mensalidades e pagamentos',
        'Histórico financeiro dos alunos',
        'Gestão de turmas e horários',
        'Relatórios de inadimplência'
      ],
      path: '/escolinha'
    },
    {
      id: 'financial',
      title: 'Financeiro',
      description: 'Controle financeiro completo da empresa',
      icon: BarChart3,
      color: 'bg-black',
      hoverColor: 'hover:bg-gray-800',
      textColor: 'text-white',
      features: [
        'Gestão de contas a pagar e receber',
        'Relatórios financeiros detalhados',
        'Controle de fluxo de caixa',
        'Integração bancária',
        'Análise de receitas e despesas'
      ],
      path: '/financeiro'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="shadow-sm border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <img
                  src="/logo.png"
                  alt="Ludus Gestão Logo"
                  className="h-8 w-8 rounded-full"
                />
              </div>
              <h1 className="text-xl font-bold text-black">Ludus Gestão</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-black">
                <Building2 className="h-4 w-4" />
                <span>{company?.name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/settings')}
                className="gap-2 border-black text-black hover:bg-black hover:text-white"
              >
                <Settings className="h-4 w-4" />
                Configurações
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2 border-black text-black hover:bg-black hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-black">
            Bem-vindo, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Escolha um módulo para começar a trabalhar
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {modules.map((module) => {
            const hasAccess = hasModuleAccess(module.id as 'events' | 'bar');
            const IconComponent = module.icon;

            return (
              <Card
                key={module.id}
                className={`relative overflow-hidden transition-all duration-300 border-black ${hasAccess
                  ? 'cursor-pointer hover:shadow-xl hover:scale-105'
                  : 'opacity-60 cursor-not-allowed'
                  }`}
                onClick={() => hasAccess && navigate(module.path)}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${module.color} rounded-full opacity-10 transform translate-x-8 -translate-y-8`} />

                <CardHeader className="relative h-40 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-3 ${module.color} rounded-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-black">{module.title}</CardTitle>
                      {!hasAccess && (
                        <Badge className="mt-1 bg-red-500 text-white">
                          Sem Acesso
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription className="text-base text-gray-600 pt-1">
                    {module.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative h-48 p-4">
                  <ul className="space-y-2 mb-6">
                    {module.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="relative bottom-0 left-0 w-full">
                  {(hasAccess) && (
                    <Button
                      className={`w-full ${module.color} ${module.hoverColor} ${module.textColor} transition-colors`}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(module.path);
                      }}
                    >
                      Acessar Módulo
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-black">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Reservas Hoje</p>
                  <p className="text-2xl font-bold text-black">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-black">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-black rounded-lg">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Vendas do Bar</p>
                  <p className="text-2xl font-bold text-black">R$ 2.450</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-black">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-black rounded-lg">
                  <Users2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Alunos Matriculados</p>
                  <p className="text-2xl font-bold text-black">150</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-black">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-black rounded-lg">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Receita Hoje</p>
                  <p className="text-2xl font-bold text-black">R$ 15.000</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
