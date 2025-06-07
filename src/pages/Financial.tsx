
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BarChart3, Calendar, CreditCard, DollarSign, FileText, Plus, TrendingDown, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Financeiro = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Nova Receita',
      description: 'Registrar nova receita',
      icon: Plus,
      color: 'bg-green-500',
      action: () => navigate('/financeiro/receitas/novo')
    },
    {
      title: 'Nova Despesa',
      description: 'Registrar nova despesa',
      icon: TrendingDown,
      color: 'bg-red-500',
      action: () => navigate('/financeiro/despesas/novo')
    },
    {
      title: 'Contas a Receber',
      description: 'Gerenciar contas pendentes',
      icon: Calendar,
      color: 'bg-orange-500',
      action: () => navigate('/financeiro/contas-a-receber')
    },
    {
      title: 'Contas a Pagar',
      description: 'Gerenciar pagamentos',
      icon: CreditCard,
      color: 'bg-purple-500',
      action: () => navigate('/financeiro/contas-a-pagar')
    },
    {
      title: 'Fluxo de Caixa',
      description: 'Visualizar movimentação',
      icon: BarChart3,
      color: 'bg-blue-500',
      action: () => navigate('/financeiro/fluxo-de-caixa')
    },
    {
      title: 'Relatórios',
      description: 'Análises financeiras',
      icon: FileText,
      color: 'bg-indigo-500',
      action: () => navigate('/financeiro/relatorios')
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
              Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold">Controle Financeiro</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Ações Rápidas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Card 
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={action.action}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Resumo Financeiro */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Receitas Totais</p>
                  <p className="text-2xl font-bold text-green-600">R$ 25.420</p>
                  <p className="text-xs text-muted-foreground">+12% este mês</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Despesas Totais</p>
                  <p className="text-2xl font-bold text-red-600">R$ 8.750</p>
                  <p className="text-xs text-muted-foreground">-5% este mês</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Lucro Líquido</p>
                  <p className="text-2xl font-bold text-blue-600">R$ 16.670</p>
                  <p className="text-xs text-muted-foreground">+18% este mês</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">A Receber</p>
                  <p className="text-2xl font-bold text-orange-600">R$ 3.240</p>
                  <p className="text-xs text-muted-foreground">15 pendências</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cards Detalhados */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Receitas do Mês</CardTitle>
              <CardDescription>
                Últimas receitas registradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-background border rounded-lg">
                  <div>
                    <div className="font-medium">Venda Bar</div>
                    <div className="text-sm text-muted-foreground">Hoje - 14:30</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">R$ 245,50</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-background border rounded-lg">
                  <div>
                    <div className="font-medium">Reserva Quadra</div>
                    <div className="text-sm text-muted-foreground">Ontem - 18:00</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">R$ 150,00</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-background border rounded-lg">
                  <div>
                    <div className="font-medium">Mensalidade Escolinha</div>
                    <div className="text-sm text-muted-foreground">05/06 - 09:00</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">R$ 120,00</div>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate('/financeiro/receitas')}
              >
                Ver Todas as Receitas
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Despesas Recentes</CardTitle>
              <CardDescription>
                Últimas despesas registradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-background border rounded-lg">
                  <div>
                    <div className="font-medium">Fornecedor Bebidas</div>
                    <div className="text-sm text-muted-foreground">Hoje - 10:00</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-red-600">R$ 850,00</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-background border rounded-lg">
                  <div>
                    <div className="font-medium">Energia Elétrica</div>
                    <div className="text-sm text-muted-foreground">04/06 - 15:30</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-red-600">R$ 320,00</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-background border rounded-lg">
                  <div>
                    <div className="font-medium">Material Limpeza</div>
                    <div className="text-sm text-muted-foreground">03/06 - 11:15</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-red-600">R$ 145,00</div>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate('/financeiro/despesas')}
              >
                Ver Todas as Despesas
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contas Pendentes</CardTitle>
              <CardDescription>
                Recebimentos e pagamentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">A Receber</span>
                    <span className="text-sm font-bold text-orange-600">R$ 3.240</span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">15 pendências</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">A Pagar</span>
                    <span className="text-sm font-bold text-purple-600">R$ 1.850</span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">8 pendências</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '35%'}}></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/financeiro/contas-a-receber')}
                >
                  A Receber
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/financeiro/contas-a-pagar')}
                >
                  A Pagar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Transações Hoje</p>
                  <p className="text-2xl font-bold">47</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Crescimento</p>
                  <p className="text-2xl font-bold text-green-600">+15%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vencimentos Hoje</p>
                  <p className="text-2xl font-bold text-orange-600">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Saldo Atual</p>
                  <p className="text-2xl font-bold text-purple-600">R$ 16.670</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Financeiro;
