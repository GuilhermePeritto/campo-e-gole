
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users, Plus, ArrowLeft, BarChart3 } from 'lucide-react';

const Events = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Nova Reserva',
      description: 'Criar uma nova reserva esportiva',
      icon: Plus,
      color: 'bg-primary',
      action: () => navigate('/events/reservations/new')
    },
    {
      title: 'Visualizar Agenda',
      description: 'Ver agenda completa dos locais',
      icon: Calendar,
      color: 'bg-secondary',
      action: () => navigate('/events/calendar')
    },
    {
      title: 'Gerenciar Locais',
      description: 'Cadastrar e gerenciar locais esportivos',
      icon: MapPin,
      color: 'bg-purple-600',
      action: () => navigate('/events/venues')
    },
    {
      title: 'Clientes',
      description: 'Gerenciar clientes e histórico',
      icon: Users,
      color: 'bg-orange-600',
      action: () => navigate('/events/clients')
    },
    {
      title: 'Relatórios',
      description: 'Análises financeiras e ocupação',
      icon: BarChart3,
      color: 'bg-green-600',
      action: () => navigate('/events/reports')
    }
  ];

  const todayReservations = [
    { id: 1, time: '08:00', venue: 'Quadra A', client: 'João Silva', status: 'confirmado' },
    { id: 2, time: '14:00', venue: 'Campo 1', client: 'Time Unidos', status: 'pendente' },
    { id: 3, time: '18:00', venue: 'Quadra B', client: 'Maria Santos', status: 'confirmado' },
    { id: 4, time: '20:00', venue: 'Campo 2', client: 'Grupo Amigos', status: 'confirmado' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-semibold text-gray-900">Gestão de Eventos</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ações Rápidas</h2>
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
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
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
              <CardTitle>Reservas de Hoje</CardTitle>
              <CardDescription>
                {todayReservations.length} reservas agendadas para hoje
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayReservations.map((reservation) => (
                  <div key={reservation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{reservation.time} - {reservation.venue}</div>
                      <div className="text-sm text-gray-600">{reservation.client}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      reservation.status === 'confirmado' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {reservation.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate('/events/calendar')}
              >
                Ver Agenda Completa
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ocupação Semanal</CardTitle>
              <CardDescription>
                Taxa de ocupação dos locais esta semana
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Quadra A</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Campo 1</span>
                    <span>72%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{width: '72%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Quadra B</span>
                    <span>58%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '58%'}}></div>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate('/events/reports')}
              >
                Ver Relatório Completo
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Receita do Mês</CardTitle>
              <CardDescription>
                Faturamento com reservas esportivas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">R$ 18.450</div>
                <div className="text-sm text-green-600 mb-4">+12% vs mês anterior</div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">156</div>
                    <div className="text-gray-600">Reservas</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">R$ 118</div>
                    <div className="text-gray-600">Ticket Médio</div>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate('/events/reports')}
              >
                Análise Detalhada
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Events;
