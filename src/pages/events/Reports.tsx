
import ExportButton from '@/components/ExportButton';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, BarChart3, Calendar as CalendarIcon, MapPin, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Reports = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date()
  });
  const [selectedVenue, setSelectedVenue] = useState('all');

  // Mock data para relatórios
  const monthlyRevenue = [
    { month: 'Jan', revenue: 12500, reservations: 85 },
    { month: 'Fev', revenue: 13200, reservations: 92 },
    { month: 'Mar', revenue: 14800, reservations: 98 },
    { month: 'Abr', revenue: 13900, reservations: 88 },
    { month: 'Mai', revenue: 15600, reservations: 105 },
    { month: 'Jun', revenue: 16200, reservations: 112 }
  ];

  const venueUsage = [
    { name: 'Quadra A', value: 35, color: '#10b981' },
    { name: 'Campo 1', value: 28, color: '#3b82f6' },
    { name: 'Quadra B', value: 22, color: '#8b5cf6' },
    { name: 'Campo 2', value: 15, color: '#f59e0b' }
  ];

  const peakHours = [
    { hour: '06:00', reservations: 2 },
    { hour: '08:00', reservations: 8 },
    { hour: '10:00', reservations: 12 },
    { hour: '12:00', reservations: 6 },
    { hour: '14:00', reservations: 15 },
    { hour: '16:00', reservations: 18 },
    { hour: '18:00', reservations: 22 },
    { hour: '20:00', reservations: 25 },
    { hour: '22:00', reservations: 16 }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="shadow-sm border-b border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/events')}
                className="gap-2 text-gray-900 dark:text-gray-300"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div className="flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-green-600" />
                <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-300">Relatórios de Eventos</h1>
              </div>
            </div>

            <ExportButton
              data={monthlyRevenue}
              filename="relatorio-eventos"
              title="Relatório de Eventos"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filtros */}
        <Card className="mb-8 border">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-300">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-300">Período</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="border text-gray-900 dark:text-gray-300">
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
                <label className="text-sm font-medium text-gray-900 dark:text-gray-300">Local</label>
                <Select value={selectedVenue} onValueChange={setSelectedVenue}>
                  <SelectTrigger className="w-48 border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Locais</SelectItem>
                    <SelectItem value="quadra-a">Quadra A</SelectItem>
                    <SelectItem value="campo-1">Campo 1</SelectItem>
                    <SelectItem value="quadra-b">Quadra B</SelectItem>
                    <SelectItem value="campo-2">Campo 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant='outline'>
                Aplicar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Receita Total</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-300">R$ 86.200</p>
                  <p className="text-xs text-green-600">+12% vs mês anterior</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <CalendarIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Reservas</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-300">580</p>
                  <p className="text-xs text-blue-600">+8% vs mês anterior</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Clientes Ativos</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-300">127</p>
                  <p className="text-xs text-purple-600">+15% vs mês anterior</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Taxa de Ocupação</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-300">78%</p>
                  <p className="text-xs text-orange-600">+5% vs mês anterior</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="border">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-300">Receita Mensal</CardTitle>
              <CardDescription className="text-gray-600">
                Evolução da receita nos últimos 6 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${value}`, 'Receita']} />
                  <Bar dataKey="revenue" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-300">Uso por Local</CardTitle>
              <CardDescription className="text-gray-600">
                Distribuição de reservas por local
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={venueUsage}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {venueUsage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <Card className="border">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-300">Horários de Pico</CardTitle>
              <CardDescription className="text-gray-600">
                Distribuição de reservas por horário
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={peakHours}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="reservations" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Reports;
