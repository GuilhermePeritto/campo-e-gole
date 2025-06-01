
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ArrowLeft, BarChart3, Calendar as CalendarIcon, TrendingUp, ShoppingCart, Package, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import ExportButton from '@/components/ExportButton';

const Reports = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date()
  });
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data para relatórios
  const dailySales = [
    { day: 'Seg', sales: 1250, items: 45 },
    { day: 'Ter', sales: 1380, items: 52 },
    { day: 'Qua', sales: 1150, items: 38 },
    { day: 'Qui', sales: 1620, items: 68 },
    { day: 'Sex', sales: 2100, items: 85 },
    { day: 'Sáb', sales: 2850, items: 125 },
    { day: 'Dom', sales: 1950, items: 78 }
  ];

  const productCategories = [
    { name: 'Bebidas', value: 45, color: '#10b981' },
    { name: 'Lanches', value: 30, color: '#3b82f6' },
    { name: 'Refeições', value: 20, color: '#8b5cf6' },
    { name: 'Sobremesas', value: 5, color: '#f59e0b' }
  ];

  const topProducts = [
    { product: 'Cerveja Skol 350ml', quantity: 320, revenue: 1440 },
    { product: 'Refrigerante Coca 600ml', quantity: 180, revenue: 1080 },
    { product: 'Sanduíche Natural', quantity: 95, revenue: 1140 },
    { product: 'Salgadinho Doritos', quantity: 75, revenue: 600 },
    { product: 'Água Mineral 500ml', quantity: 150, revenue: 375 }
  ];

  const paymentMethods = [
    { method: 'Cartão', value: 55, color: '#10b981' },
    { method: 'PIX', value: 30, color: '#3b82f6' },
    { method: 'Dinheiro', value: 15, color: '#8b5cf6' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/bar')}
                className="gap-2 text-black hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div className="flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-green-600" />
                <h1 className="text-2xl font-medium text-black">Relatórios do Bar</h1>
              </div>
            </div>

            <ExportButton 
              data={dailySales} 
              filename="relatorio-bar" 
              title="Relatório do Bar"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filtros */}
        <Card className="mb-8 border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium text-black">Período</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-50">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from && dateRange.to 
                        ? `${dateRange.from.toLocaleDateString('pt-BR')} - ${dateRange.to.toLocaleDateString('pt-BR')}`
                        : 'Selecionar período'
                      }
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="range"
                      selected={{ from: dateRange.from, to: dateRange.to }}
                      onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-black">Categoria</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Categorias</SelectItem>
                    <SelectItem value="bebidas">Bebidas</SelectItem>
                    <SelectItem value="lanches">Lanches</SelectItem>
                    <SelectItem value="refeicoes">Refeições</SelectItem>
                    <SelectItem value="sobremesas">Sobremesas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="bg-black text-white hover:bg-gray-800">
                Aplicar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Faturamento</p>
                  <p className="text-2xl font-bold text-black">R$ 12.300</p>
                  <p className="text-xs text-green-600">+18% vs semana anterior</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Vendas Realizadas</p>
                  <p className="text-2xl font-bold text-black">491</p>
                  <p className="text-xs text-blue-600">+12% vs semana anterior</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Package className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Itens Vendidos</p>
                  <p className="text-2xl font-bold text-black">820</p>
                  <p className="text-xs text-purple-600">+8% vs semana anterior</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Ticket Médio</p>
                  <p className="text-2xl font-bold text-black">R$ 25,05</p>
                  <p className="text-xs text-orange-600">+3% vs semana anterior</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Vendas por Dia</CardTitle>
              <CardDescription className="text-gray-600">
                Faturamento diário da semana
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${value}`, 'Vendas']} />
                  <Bar dataKey="sales" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Vendas por Categoria</CardTitle>
              <CardDescription className="text-gray-600">
                Distribuição de vendas por tipo de produto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={productCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {productCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Produtos Mais Vendidos</CardTitle>
              <CardDescription className="text-gray-600">
                Top 5 produtos por quantidade vendida
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-black">{product.product}</div>
                      <div className="text-sm text-gray-600">{product.quantity} unidades</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">R$ {product.revenue}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Métodos de Pagamento</CardTitle>
              <CardDescription className="text-gray-600">
                Distribuição dos tipos de pagamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentMethods}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentMethods.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Reports;
