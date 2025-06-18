
import ModuleHeader from '@/components/ModuleHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MODULE_COLORS } from '@/constants/moduleColors';
import SeletorData from '@/core/componentes/SeletorData';
import { BarChart3, Calendar, DollarSign, Download, FileText, MapPin, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Relatorios = () => {
  const [dateRange, setDateRange] = useState({
    inicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    fim: new Date()
  });
  const [reportType, setReportType] = useState('reservas');

  // Dados de exemplo para os gráficos
  const reservasPorMes = [
    { mes: 'Jan', reservas: 45, receita: 4500 },
    { mes: 'Fev', reservas: 52, receita: 5200 },
    { mes: 'Mar', reservas: 48, receita: 4800 },
    { mes: 'Abr', reservas: 61, receita: 6100 },
    { mes: 'Mai', reservas: 55, receita: 5500 },
    { mes: 'Jun', reservas: 67, receita: 6700 }
  ];

  const reservasPorLocal = [
    { local: 'Quadra A', reservas: 45, valor: 4500 },
    { local: 'Quadra B', reservas: 32, valor: 3200 },
    { local: 'Campo 1', reservas: 28, valor: 2800 },
    { local: 'Quadra C', reservas: 25, valor: 2500 },
    { local: 'Campo 2', reservas: 18, valor: 1800 }
  ];

  const horariosPico = [
    { horario: '08:00', reservas: 12 },
    { horario: '10:00', reservas: 18 },
    { horario: '14:00', reservas: 22 },
    { horario: '16:00', reservas: 35 },
    { horario: '18:00', reservas: 45 },
    { horario: '20:00', reservas: 38 },
    { horario: '22:00', reservas: 15 }
  ];

  const statusReservas = [
    { name: 'Confirmadas', value: 156, color: '#10B981' },
    { name: 'Pendentes', value: 23, color: '#F59E0B' },
    { name: 'Canceladas', value: 12, color: '#EF4444' }
  ];

  const colors = ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  const kpis = [
    {
      title: 'Total de Reservas',
      value: '191',
      change: '+12.5%',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      title: 'Receita Total',
      value: 'R$ 18.950',
      change: '+8.3%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Clientes Ativos',
      value: '87',
      change: '+5.2%',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Taxa de Ocupação',
      value: '73%',
      change: '+3.1%',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const relatoriosDisponiveis = [
    {
      title: 'Relatório de Reservas',
      description: 'Listagem completa das reservas por período',
      icon: Calendar,
      action: () => console.log('Gerar relatório de reservas')
    },
    {
      title: 'Relatório Financeiro',
      description: 'Receitas e recebimentos por período',
      icon: DollarSign,
      action: () => console.log('Gerar relatório financeiro')
    },
    {
      title: 'Relatório de Clientes',
      description: 'Histórico e estatísticas dos clientes',
      icon: Users,
      action: () => console.log('Gerar relatório de clientes')
    },
    {
      title: 'Relatório de Locais',
      description: 'Performance e ocupação dos locais',
      icon: MapPin,
      action: () => console.log('Gerar relatório de locais')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Relatórios e Análises"
        icon={<BarChart3 className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos"
        backLabel="Eventos"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Filtros de Relatório
            </CardTitle>
            <CardDescription>
              Configure o período e tipo de dados para análise
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Tipo de Relatório</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reservas">Reservas</SelectItem>
                    <SelectItem value="financeiro">Financeiro</SelectItem>
                    <SelectItem value="clientes">Clientes</SelectItem>
                    <SelectItem value="locais">Locais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <SeletorData
                label="Data Início"
                value={dateRange.inicio}
                onChange={(date) => setDateRange(prev => ({ ...prev, inicio: date || new Date() }))}
              />
              
              <SeletorData
                label="Data Fim"
                value={dateRange.fim}
                onChange={(date) => setDateRange(prev => ({ ...prev, fim: date || new Date() }))}
              />
              
              <div className="flex items-end">
                <Button className="w-full h-11">
                  Atualizar Dados
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => {
            const IconComponent = kpi.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                      <p className="text-2xl font-bold">{kpi.value}</p>
                      <p className="text-sm text-green-600 font-medium">{kpi.change}</p>
                    </div>
                    <IconComponent className={`h-8 w-8 ${kpi.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Reservas por Mês</CardTitle>
              <CardDescription>Evolução das reservas ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reservasPorMes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [value, name === 'reservas' ? 'Reservas' : 'Receita']} />
                  <Bar dataKey="reservas" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status das Reservas</CardTitle>
              <CardDescription>Distribuição atual das reservas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusReservas}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusReservas.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reservas por Local</CardTitle>
              <CardDescription>Performance dos locais no período</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reservasPorLocal} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="local" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="reservas" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horários de Pico</CardTitle>
              <CardDescription>Distribuição de reservas por horário</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={horariosPico}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="horario" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="reservas" stroke="#06B6D4" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Relatórios Disponíveis */}
        <Card>
          <CardHeader>
            <CardTitle>Relatórios Disponíveis</CardTitle>
            <CardDescription>
              Gere relatórios detalhados em PDF ou Excel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatoriosDisponiveis.map((relatorio, index) => {
                const IconComponent = relatorio.icon;
                return (
                  <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <IconComponent className="h-8 w-8 text-primary mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{relatorio.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{relatorio.description}</p>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full"
                          onClick={relatorio.action}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Gerar
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Relatorios;
