
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BarChart3, CreditCard, DollarSign, FileText, Plus, TrendingDown, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Financeiro = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Nova Receita',
      description: 'Registrar uma nova receita',
      icon: Plus,
      color: 'bg-green-100 text-green-600',
      path: '/financeiro/nova-receita'
    },
    {
      title: 'Nova Despesa',
      description: 'Registrar uma nova despesa',
      icon: Plus,
      color: 'bg-red-100 text-red-600',
      path: '/financeiro/nova-despesa'
    },
    {
      title: 'Receber Pagamento',
      description: 'Registrar recebimento de conta',
      icon: CreditCard,
      color: 'bg-blue-100 text-blue-600',
      path: '/financeiro/receber-pagamento'
    }
  ];

  const modules = [
    {
      title: 'Receitas',
      description: 'Gerencie todas as receitas do sistema',
      icon: TrendingUp,
      color: 'bg-green-500',
      path: '/financeiro/receitas',
      stats: 'R$ 25.420 este mês'
    },
    {
      title: 'Despesas',
      description: 'Controle de gastos e despesas',
      icon: TrendingDown,
      color: 'bg-red-500',
      path: '/financeiro/despesas',
      stats: 'R$ 8.750 este mês'
    },
    {
      title: 'Contas a Receber',
      description: 'Pendências e recebimentos futuros',
      icon: CreditCard,
      color: 'bg-blue-500',
      path: '/financeiro/contas-a-receber',
      stats: '12 contas pendentes'
    },
    {
      title: 'Contas a Pagar',
      description: 'Compromissos e pagamentos futuros',
      icon: FileText,
      color: 'bg-orange-500',
      path: '/financeiro/contas-a-pagar',
      stats: '5 contas pendentes'
    },
    {
      title: 'Fluxo de Caixa',
      description: 'Visão completa do movimento financeiro',
      icon: BarChart3,
      color: 'bg-purple-500',
      path: '/financeiro/fluxo-de-caixa',
      stats: 'Saldo: R$ 16.670'
    },
    {
      title: 'Relatórios',
      description: 'Relatórios e análises financeiras',
      icon: FileText,
      color: 'bg-indigo-500',
      path: '/financeiro/relatorios',
      stats: 'DRE, Balanços e mais'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/painel')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-orange-600" />
              <h1 className="text-xl font-semibold">Módulo Financeiro</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Resumo Financeiro */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Receitas</p>
                  <p className="text-2xl font-bold text-green-600">R$ 25.420</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <TrendingDown className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Despesas</p>
                  <p className="text-2xl font-bold text-red-600">R$ 8.750</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Saldo</p>
                  <p className="text-2xl font-bold text-blue-600">R$ 16.670</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Lucro</p>
                  <p className="text-2xl font-bold text-purple-600">65,6%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(action.path)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${action.color}`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Módulos Financeiros */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Módulos Financeiros</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <Card 
                key={index} 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => navigate(module.path)}
              >
                <CardContent className="p-0">
                  <div className={`${module.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <module.icon className="h-8 w-8" />
                      <div className="text-right">
                        <p className="text-sm opacity-90">{module.stats}</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                    <p className="text-sm opacity-90">{module.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Financeiro;
