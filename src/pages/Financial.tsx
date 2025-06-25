import ModuleHeader from '@/components/ModuleHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { BarChart3, DollarSign, FileText, Plus, TrendingDown, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Financial = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Nova Receita',
      description: 'Registrar entrada de dinheiro',
      icon: Plus,
      color: 'bg-module-financial',
      action: () => navigate('/financeiro/receitas/novo')
    },
    {
      title: 'Nova Despesa',
      description: 'Registrar saída de dinheiro',
      icon: Plus,
      color: 'bg-module-financial',
      action: () => navigate('/financeiro/despesas/novo')
    },
    {
      title: 'Contas a Receber',
      description: 'Gerenciar recebimentos',
      icon: TrendingUp,
      color: 'bg-module-financial',
      action: () => navigate('/financeiro/contas-a-receber')
    },
    {
      title: 'Contas a Pagar',
      description: 'Gerenciar pagamentos',
      icon: TrendingDown,
      color: 'bg-module-financial',
      action: () => navigate('/financeiro/contas-a-pagar')
    },
    {
      title: 'Fluxo de Caixa',
      description: 'Acompanhar movimentações',
      icon: BarChart3,
      color: 'bg-module-financial',
      action: () => navigate('/financeiro/fluxo-caixa')
    },
    {
      title: 'Relatórios',
      description: 'Análises financeiras',
      icon: FileText,
      color: 'bg-module-financial',
      action: () => navigate('/financeiro/relatorios')
    }
  ];

  const recentTransactions = [
    { id: 1, description: 'Aluguel de Quadra - João Silva', type: 'receita', amount: 150.00, date: '05/05/2024', status: 'Pago' },
    { id: 2, description: 'Conta de Luz', type: 'despesa', amount: 450.00, date: '04/05/2024', status: 'Pago' },
    { id: 3, description: 'Mensalidade - Ana Costa', type: 'receita', amount: 120.00, date: '03/05/2024', status: 'Pendente' },
    { id: 4, description: 'Material Esportivo', type: 'despesa', amount: 800.00, date: '02/05/2024', status: 'Pago' }
  ];

  const financialStats = {
    totalRevenue: 15480.00,
    totalExpenses: 8920.00,
    netProfit: 6560.00,
    pendingReceivables: 2340.00
  };

  const getTypeColor = (type: string) => {
    return type === 'receita' ? 'text-green-600' : 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    return status === 'Pago' ? 'text-green-600' : 'text-yellow-600';
  };

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Financeiro"
        icon={<DollarSign className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.financial}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border"
                  onClick={action.action}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-1">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Inicio Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Movimentações Recentes</CardTitle>
              <CardDescription>
                Últimas transações financeiras
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/50 border rounded-lg">
                    <div>
                      <div className="font-medium text-card-foreground">{transaction.description}</div>
                      <div className="text-sm text-muted-foreground">{transaction.date}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${getTypeColor(transaction.type)}`}>
                        {transaction.type === 'receita' ? '+' : '-'} R$ {transaction.amount.toFixed(2)}
                      </div>
                      <div className={`text-xs ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate('/financeiro/fluxo-caixa')}
              >
                Ver Todas as Movimentações
              </Button>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Resumo Financeiro</CardTitle>
              <CardDescription>
                Visão geral do mês atual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total de Receitas</span>
                  <span className="font-semibold text-green-600">R$ {financialStats.totalRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total de Despesas</span>
                  <span className="font-semibold text-red-600">R$ {financialStats.totalExpenses.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Lucro Líquido</span>
                  <span className="font-semibold text-blue-600">R$ {financialStats.netProfit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">A Receber</span>
                  <span className="font-semibold text-yellow-600">R$ {financialStats.pendingReceivables.toFixed(2)}</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate('/financeiro/relatorios')}
              >
                Gerar Relatório Detalhado
              </Button>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Performance do Mês</CardTitle>
              <CardDescription>
                Indicadores de performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">42%</div>
                <div className="text-sm text-muted-foreground mb-4">Margem de lucro</div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-green-600">+15%</div>
                    <div className="text-muted-foreground">vs. mês anterior</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">85%</div>
                    <div className="text-muted-foreground">Taxa de recebimento</div>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate('/financeiro/contas-a-receber')}
              >
                Gerenciar Recebimentos
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Financial;
