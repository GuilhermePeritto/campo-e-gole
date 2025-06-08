
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BarChart3, Package, Plus, Receipt, ShoppingCart, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Bar = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Nova Venda',
      description: 'Registrar venda livre no caixa',
      icon: Plus,
      color: 'bg-green-500',
      action: () => navigate('/bar/nova-venda')
    },
    {
      title: 'Comandas',
      description: 'Gerenciar comandas abertas',
      icon: Receipt,
      color: 'bg-orange-500',
      action: () => navigate('/bar/comandas')
    },
    {
      title: 'Estoque',
      description: 'Controlar produtos e estoque',
      icon: Package,
      color: 'bg-purple-600',
      action: () => navigate('/bar/estoque')
    },
    {
      title: 'Produtos',
      description: 'Cadastrar e gerenciar produtos',
      icon: ShoppingCart,
      color: 'bg-blue-600',
      action: () => navigate('/bar/produtos')
    },
    {
      title: 'Relatórios',
      description: 'Vendas e análises financeiras',
      icon: BarChart3,
      color: 'bg-green-800',
      action: () => navigate('/bar/relatorios')
    }
  ];

  const openComandas = [
    { id: 1, number: '001', client: 'Mesa 5', items: 3, total: 45.50, time: '14:30' },
    { id: 2, number: '002', client: 'João Silva', items: 2, total: 28.00, time: '15:15' },
    { id: 3, number: '003', client: 'Mesa 8', items: 5, total: 67.90, time: '16:00' },
    { id: 4, number: '004', client: 'Maria Santos', items: 1, total: 12.50, time: '16:45' }
  ];

  const lowStockProducts = [
    { name: 'Cerveja Skol 350ml', stock: 8, min: 20 },
    { name: 'Refrigerante Coca 600ml', stock: 12, min: 25 },
    { name: 'Água Mineral 500ml', stock: 5, min: 30 }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
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
              <BarChart3 className="h-5 w-5 text-secondary" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-300">Gestão de Bar</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-300 mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
                      <IconComponent className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-300 mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{action.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Comandas Abertas</CardTitle>
              <CardDescription>
                {openComandas.length} comandas em andamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {openComandas.map((comanda) => (
                  <div key={comanda.id} className="flex items-center justify-between p-3 rounded-lg transition-colors bg-background border">
                    <div>
                      <div className="font-medium">#{comanda.number} - {comanda.client}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{comanda.items} itens • {comanda.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">R$ {comanda.total.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate('/bar/comandas')}
              >
                Gerenciar Comandas
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alertas de Estoque</CardTitle>
              <CardDescription>
                {lowStockProducts.length} produtos com estoque baixo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockProducts.map((product, index) => (
                  <div key={index} className="border-l-4 border-orange-400 pl-3">
                    <div className="font-medium text-sm">{product.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      Estoque: {product.stock} • Mínimo: {product.min}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-orange-400 h-1.5 rounded-full" 
                        style={{width: `${(product.stock / product.min) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate('/bar/estoque')}
              >
                Gerenciar Estoque
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vendas do Dia</CardTitle>
              <CardDescription>
                Faturamento do bar hoje
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-gray-300 mb-2">R$ 1.248</div>
                <div className="text-sm text-green-600 mb-4">+8% vs ontem</div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 dark:text-gray-300">42</div>
                    <div className="text-gray-600 dark:text-gray-300">Vendas</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 dark:text-gray-300">R$ 29,71</div>
                    <div className="text-gray-600 dark:text-gray-300">Ticket Médio</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Comandas:</span>
                    <span className="font-semibold">R$ 890</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Vendas Livres:</span>
                    <span className="font-semibold">R$ 358</span>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate('/bar/relatorios')}
              >
                Relatório Detalhado
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Produtos Ativos</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-300">124</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Package className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Itens em Estoque</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-300">2.847</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Receipt className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Comandas Hoje</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-300">28</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Funcionários</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-300">6</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Bar;
