import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { BarChart3, Calendar, CreditCard, MapPin, Plus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Nova Reserva',
      description: 'Agendar uma nova reserva',
      icon: Plus,
      color: 'bg-blue-500',
      action: () => navigate('/eventos/novo')
    },
    {
      title: 'Calendário',
      description: 'Ver reservas do calendário',
      icon: Calendar,
      color: 'bg-green-500',
      action: () => navigate('/eventos/calendario')
    },
    {
      title: 'Locais',
      description: 'Gerenciar espaços e quadras',
      icon: MapPin,
      color: 'bg-purple-500',
      action: () => navigate('/eventos/locais')
    },
    {
      title: 'Clientes',
      description: 'Cadastro de clientes',
      icon: Users,
      color: 'bg-orange-500',
      action: () => navigate('/eventos/clientes')
    },
    {
      title: 'Contas a Receber',
      description: 'Pagamentos pendentes',
      icon: CreditCard,
      color: 'bg-red-500',
      action: () => navigate('/eventos/contas-a-receber')
    },
    {
      title: 'Relatórios',
      description: 'Análises e estatísticas',
      icon: BarChart3,
      color: 'bg-indigo-500',
      action: () => navigate('/eventos/relatorios')
    }
  ];

  const recentReservations = [
    { id: 1, client: 'João Silva', date: '15/07/2024', time: '18:00', venue: 'Quadra 1', status: 'Confirmada' },
    { id: 2, client: 'Maria Souza', date: '16/07/2024', time: '20:00', venue: 'Salão de Festas', status: 'Pendente' },
    { id: 3, client: 'Carlos Pereira', date: '17/07/2024', time: '19:00', venue: 'Quadra 2', status: 'Confirmada' },
    { id: 4, client: 'Ana Oliveira', date: '18/07/2024', time: '21:00', venue: 'Espaço Gourmet', status: 'Cancelada' }
  ];

  const revenueStats = {
    totalRevenue: 52850,
    monthlyRevenue: 12750,
    averageRevenuePerEvent: 550
  };

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Gestão de Eventos"
        icon={<Calendar className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-300 mb-6">Ações Rápidas</h2>
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
          <Card className="border">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-300">Reservas Recentes</CardTitle>
              <CardDescription>
                Últimas reservas agendadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReservations.map((reservation) => (
                  <div key={reservation.id} className="flex items-center justify-between p-3 bg-gray-50 border border rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-300">{reservation.client}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{reservation.date} - {reservation.time}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      reservation.status === 'Confirmada'
                        ? 'bg-green-200 text-green-800'
                        : reservation.status === 'Pendente'
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-red-200 text-red-800'
                    }`}>
                      {reservation.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate('/eventos/calendario')}
              >
                Ver Todas as Reservas
              </Button>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-300">Situação Financeira</CardTitle>
              <CardDescription>
                Visão geral das finanças
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Total de Receita</span>
                  <span className="font-semibold text-green-600">R$ {revenueStats.totalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Receita Mensal</span>
                  <span className="font-semibold text-green-600">R$ {revenueStats.monthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Média por Evento</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-300">R$ {revenueStats.averageRevenuePerEvent.toLocaleString()}</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate('/eventos/relatorios')}
              >
                Ver Relatórios
              </Button>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-300">Próximos Eventos</CardTitle>
              <CardDescription>
                Agendamentos futuros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Calendar className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                <div className="text-3xl font-bold text-gray-900 dark:text-gray-300 mb-2">12</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">Eventos Agendados</div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 dark:text-gray-300">5</div>
                    <div className="text-gray-600 dark:text-gray-300">Quadra 1</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 dark:text-gray-300">7</div>
                    <div className="text-gray-600 dark:text-gray-300">Salão de Festas</div>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate('/eventos/calendario')}
              >
                Gerenciar Eventos
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Events;
