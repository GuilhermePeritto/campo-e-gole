
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, BarChart3, Download, Calendar, DollarSign, Users, TrendingUp } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Reports = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('month');

  const revenueData = [
    { name: 'Jan', revenue: 15400, reservations: 124 },
    { name: 'Fev', revenue: 18200, reservations: 145 },
    { name: 'Mar', revenue: 22100, reservations: 178 },
    { name: 'Abr', revenue: 19800, reservations: 156 },
    { name: 'Mai', revenue: 24500, reservations: 189 },
    { name: 'Jun', revenue: 26800, reservations: 198 }
  ];

  const venueOccupancyData = [
    { name: 'Quadra A', value: 85, color: '#475569' },
    { name: 'Campo 1', value: 72, color: '#6b7280' },
    { name: 'Quadra B', value: 58, color: '#94a3b8' },
    { name: 'Campo 2', value: 63, color: '#cbd5e1' }
  ];

  const dailyReservations = [
    { day: 'Seg', reservations: 12 },
    { day: 'Ter', reservations: 15 },
    { day: 'Qua', reservations: 8 },
    { day: 'Qui', reservations: 18 },
    { day: 'Sex', reservations: 22 },
    { day: 'Sáb', reservations: 28 },
    { day: 'Dom', reservations: 16 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/events')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-semibold">Relatórios de Eventos</h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Esta Semana</SelectItem>
                  <SelectItem value="month">Este Mês</SelectItem>
                  <SelectItem value="quarter">Último Trimestre</SelectItem>
                  <SelectItem value="year">Este Ano</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPIs principais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Receita Total</p>
                  <p className="text-2xl font-bold">R$ 26.800</p>
                  <p className="text-xs text-green-600">+12% vs mês anterior</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Reservas</p>
                  <p className="text-2xl font-bold">198</p>
                  <p className="text-xs text-green-600">+8% vs mês anterior</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ticket Médio</p>
                  <p className="text-2xl font-bold">R$ 135</p>
                  <p className="text-xs text-green-600">+3% vs mês anterior</p>
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
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Taxa Ocupação</p>
                  <p className="text-2xl font-bold">69%</p>
                  <p className="text-xs text-green-600">+5% vs mês anterior</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Receita Mensal */}
          <Card>
            <CardHeader>
              <CardTitle>Receita Mensal</CardTitle>
              <CardDescription>
                Evolução da receita e número de reservas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'revenue' ? `R$ ${value.toLocaleString()}` : value,
                    name === 'revenue' ? 'Receita' : 'Reservas'
                  ]} />
                  <Bar dataKey="revenue" fill="#475569" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Ocupação por Local */}
          <Card>
            <CardHeader>
              <CardTitle>Ocupação por Local</CardTitle>
              <CardDescription>
                Taxa de ocupação dos locais esportivos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={venueOccupancyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({name, value}) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {venueOccupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Reservas por Dia da Semana */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Reservas por Dia da Semana</CardTitle>
            <CardDescription>
              Distribuição das reservas ao longo da semana
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyReservations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="reservations" stroke="#475569" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Análises Detalhadas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Clientes</CardTitle>
              <CardDescription>
                Clientes que mais geraram receita
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Time Unidos FC', revenue: 3240, reservations: 24 },
                  { name: 'João Silva', revenue: 1850, reservations: 15 },
                  { name: 'Grupo Amigos', revenue: 1420, reservations: 12 },
                  { name: 'Maria Santos', revenue: 980, reservations: 8 }
                ].map((client, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{client.reservations} reservas</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">R$ {client.revenue.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horários Mais Procurados</CardTitle>
              <CardDescription>
                Distribuição das reservas por horário
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: '19:00 - 20:00', bookings: 45, percentage: 85 },
                  { time: '20:00 - 21:00', bookings: 42, percentage: 80 },
                  { time: '18:00 - 19:00', bookings: 38, percentage: 72 },
                  { time: '15:00 - 16:00', bookings: 32, percentage: 61 }
                ].map((slot, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{slot.time}</span>
                      <span>{slot.bookings} reservas</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{width: `${slot.percentage}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Reports;
