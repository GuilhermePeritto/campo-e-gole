
import ModuleHeader from '@/components/ModuleHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { BarChart3, Calendar, CreditCard, MapPin, Plus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Nova Reserva',
      description: 'Criar uma nova reserva',
      icon: Plus,
      color: 'bg-module-events',
      action: () => navigate('/eventos/reserva')
    },
    {
      title: 'Locais',
      description: 'Gerenciar locais esportivos',
      icon: MapPin,
      color: 'bg-module-events',
      action: () => navigate('/eventos/locais')
    },
    {
      title: 'Clientes',
      description: 'Gerenciar clientes',
      icon: Users,
      color: 'bg-module-events',
      action: () => navigate('/eventos/clientes')
    },
    {
      title: 'Agenda',
      description: 'Visualizar agenda',
      icon: Calendar,
      color: 'bg-module-events',
      action: () => navigate('/eventos/agenda')
    },
    {
      title: 'Recebíveis',
      description: 'Contas a receber',
      icon: CreditCard,
      color: 'bg-module-events',
      action: () => navigate('/eventos/recebiveis')
    },
    {
      title: 'Relatórios',
      description: 'Análises e estatísticas',
      icon: BarChart3,
      color: 'bg-module-events',
      action: () => navigate('/eventos/relatorios')
    }
  ];

  const recentReservations = [
    { id: 1, client: 'João Silva', venue: 'Quadra 1', date: '05/05/2024', time: '14:00-16:00', status: 'confirmed' },
    { id: 2, client: 'Maria Santos', venue: 'Campo de Futebol', date: '06/05/2024', time: '09:00-11:00', status: 'pending' },
    { id: 3, client: 'Pedro Costa', venue: 'Quadra 2', date: '07/05/2024', time: '18:00-20:00', status: 'confirmed' },
    { id: 4, client: 'Ana Oliveira', venue: 'Quadra 1', date: '08/05/2024', time: '16:00-18:00', status: 'cancelled' }
  ];

  const stats = {
    totalReservations: 156,
    todayRevenue: 2850.00,
    occupancyRate: 75,
    activeClients: 42
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmada';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Eventos"
        icon={<Calendar className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}
      />

      <main className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
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
              <CardTitle className="text-card-foreground">Reservas Recentes</CardTitle>
              <CardDescription>
                Últimas reservas do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReservations.map((reservation) => (
                  <div key={reservation.id} className="flex items-center justify-between p-3 bg-muted/50 border rounded-lg">
                    <div>
                      <div className="font-medium text-card-foreground">{reservation.client}</div>
                      <div className="text-sm text-muted-foreground">{reservation.venue} - {reservation.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">{reservation.date}</div>
                      <div className={`text-xs font-medium ${getStatusColor(reservation.status)}`}>
                        {getStatusText(reservation.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate('/eventos/agenda')}
              >
                Ver Todas as Reservas
              </Button>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Estatísticas do Mês</CardTitle>
              <CardDescription>
                Visão geral do desempenho
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total de Reservas</span>
                  <span className="font-semibold text-green-600">{stats.totalReservations}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Receita Hoje</span>
                  <span className="font-semibold text-blue-600">R$ {stats.todayRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Taxa de Ocupação</span>
                  <span className="font-semibold text-purple-600">{stats.occupancyRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Clientes Ativos</span>
                  <span className="font-semibold text-orange-600">{stats.activeClients}</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate('/eventos/relatorios')}
              >
                Gerar Relatório Detalhado
              </Button>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Próximas Reservas</CardTitle>
              <CardDescription>
                Agenda dos próximos dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">8</div>
                <div className="text-sm text-muted-foreground mb-4">Reservas confirmadas hoje</div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-card-foreground">12</div>
                    <div className="text-muted-foreground">Amanhã</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-card-foreground">15</div>
                    <div className="text-muted-foreground">Esta Semana</div>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate('/eventos/agenda')}
              >
                Ver Agenda Completa
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Events;
