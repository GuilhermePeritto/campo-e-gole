import ModuleHeader from '@/components/ModuleHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { BarChart3, Package, ShoppingCart, Utensils, Receipt } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Bar = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Nova Venda',
      description: 'Registrar uma nova venda',
      icon: ShoppingCart,
      color: 'bg-module-bar',
      action: () => navigate('/bar/vendas/unificada')
    },
    {
      title: 'Comandas',
      description: 'Controlar mesas e pedidos',
      icon: Receipt,
      color: 'bg-module-bar',
      action: () => navigate('/bar/comandas/novo')
    },
    {
      title: 'Produtos',
      description: 'Gerenciar produtos do cardápio',
      icon: Package,
      color: 'bg-module-bar',
      action: () => navigate('/bar/produtos')
    },
    {
      title: 'Estoque',
      description: 'Gerenciar níveis de estoque',
      icon: Package,
      color: 'bg-module-bar',
      action: () => navigate('/bar/estoque')
    },
    {
      title: 'Relatórios',
      description: 'Análises e estatísticas',
      icon: BarChart3,
      color: 'bg-module-bar',
      action: () => navigate('/bar/relatorios')
    }
  ];

  const recentSales = [
    { id: 1, product: 'Cerveja Artesanal', quantity: 2, price: 15.00, date: '05/05/2024' },
    { id: 2, product: 'Porção de Fritas', quantity: 1, price: 25.00, date: '05/05/2024' },
    { id: 3, product: 'Água Tônica', quantity: 3, price: 7.00, date: '05/05/2024' },
    { id: 4, product: 'Hambúrguer Gourmet', quantity: 1, price: 35.00, date: '04/05/2024' }
  ];

  const salesStats = {
    totalSales: 5280.00,
    averageOrder: 85.00,
    bestSeller: 'Cerveja Pilsen',
    customerSatisfaction: '95%'
  };

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Bar"
        icon={<Utensils className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.bar}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Vendas Recentes</CardTitle>
              <CardDescription>
                Últimas vendas registradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between p-3 bg-muted/50 border rounded-lg">
                    <div>
                      <div className="font-medium text-card-foreground">{sale.product}</div>
                      <div className="text-sm text-muted-foreground">{sale.quantity} x R$ {sale.price.toFixed(2)}</div>
                    </div>
                    <span className="text-xs text-muted-foreground">{sale.date}</span>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate('/bar/relatorios')}
              >
                Ver Todas as Vendas
              </Button>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Estatísticas de Vendas</CardTitle>
              <CardDescription>
                Visão geral do desempenho
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total de Vendas</span>
                  <span className="font-semibold text-green-600">R$ {salesStats.totalSales.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Ticket Médio</span>
                  <span className="font-semibold text-blue-600">R$ {salesStats.averageOrder.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Produto Mais Vendido</span>
                  <span className="font-semibold text-purple-600">{salesStats.bestSeller}</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate('/bar/relatorios')}
              >
                Gerar Relatório Detalhado
              </Button>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Satisfação do Cliente</CardTitle>
              <CardDescription>
                Feedback e avaliações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{salesStats.customerSatisfaction}</div>
                <div className="text-sm text-muted-foreground mb-4">Nível de satisfação geral</div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-card-foreground">98%</div>
                    <div className="text-muted-foreground">Qualidade dos Produtos</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-card-foreground">92%</div>
                    <div className="text-muted-foreground">Atendimento ao Cliente</div>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate('/bar/relatorios')}
              >
                Analisar Feedback
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Bar;
