
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, BarChart3, TrendingUp, TrendingDown, DollarSign, Package, Receipt } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Reports = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  const salesData = [
    { name: 'Seg', vendas: 450, comandas: 320, livre: 130 },
    { name: 'Ter', vendas: 380, comandas: 250, livre: 130 },
    { name: 'Qua', vendas: 520, comandas: 380, livre: 140 },
    { name: 'Qui', vendas: 480, comandas: 340, livre: 140 },
    { name: 'Sex', vendas: 720, comandas: 520, livre: 200 },
    { name: 'Sáb', vendas: 890, comandas: 650, livre: 240 },
    { name: 'Dom', vendas: 560, comandas: 400, livre: 160 }
  ];

  const topProducts = [
    { name: 'Cerveja Skol 350ml', quantity: 245, revenue: 1102.50 },
    { name: 'Refrigerante Coca 600ml', quantity: 180, revenue: 1080.00 },
    { name: 'Sanduíche Natural', quantity: 85, revenue: 1020.00 },
    { name: 'Água Mineral 500ml', quantity: 320, revenue: 800.00 },
    { name: 'Salgadinho Doritos', quantity: 95, revenue: 760.00 }
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 12450 },
    { month: 'Fev', revenue: 13200 },
    { month: 'Mar', revenue: 15800 },
    { month: 'Abr', revenue: 14600 },
    { month: 'Mai', revenue: 16900 },
    { month: 'Jun', revenue: 18200 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/bar')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-semibold">Relatórios do Bar</h1>
              </div>
            </div>

            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Últimos 7 dias</SelectItem>
                <SelectItem value="30">Últimos 30 dias</SelectItem>
                <SelectItem value="90">Últimos 90 dias</SelectItem>
                <SelectItem value="365">Último ano</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Faturamento Total</p>
                  <p className="text-2xl font-bold">R$ 18.450</p>
                  <p className="text-xs text-primary flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +12% vs mês anterior
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Receipt className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Vendas</p>
                  <p className="text-2xl font-bold">284</p>
                  <p className="text-xs text-primary flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +8% vs mês anterior
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ticket Médio</p>
                  <p className="text-2xl font-bold">R$ 64,96</p>
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <TrendingDown className="h-3 w-3" />
                    -2% vs mês anterior
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Margem de Lucro</p>
                  <p className="text-2xl font-bold">68%</p>
                  <p className="text-xs text-primary flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +3% vs mês anterior
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Vendas por Dia */}
          <Card>
            <CardHeader>
              <CardTitle>Vendas por Dia da Semana</CardTitle>
              <CardDescription>
                Comparativo entre comandas e vendas livres
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      `R$ ${value}`, 
                      name === 'comandas' ? 'Comandas' : name === 'livre' ? 'Vendas Livres' : 'Total'
                    ]}
                  />
                  <Bar dataKey="comandas" fill="#22c55e" name="comandas" />
                  <Bar dataKey="livre" fill="#16a34a" name="livre" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Faturamento Mensal */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução do Faturamento</CardTitle>
              <CardDescription>
                Faturamento dos últimos 6 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${value}`, 'Faturamento']} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#22c55e" 
                    strokeWidth={3}
                    dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Produtos */}
          <Card>
            <CardHeader>
              <CardTitle>Produtos Mais Vendidos</CardTitle>
              <CardDescription>
                Top 5 produtos por faturamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.quantity} unidades</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">R$ {product.revenue.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resumo por Categoria */}
          <Card>
            <CardHeader>
              <CardTitle>Vendas por Categoria</CardTitle>
              <CardDescription>
                Distribuição do faturamento por categoria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium">Bebidas</div>
                    <div className="text-sm text-muted-foreground">425 itens vendidos</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">R$ 3.982,50</div>
                    <div className="text-sm text-muted-foreground">68% do total</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium">Lanches</div>
                    <div className="text-sm text-muted-foreground">180 itens vendidos</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">R$ 1.780,00</div>
                    <div className="text-sm text-muted-foreground">32% do total</div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>R$ 5.762,50</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Reports;
