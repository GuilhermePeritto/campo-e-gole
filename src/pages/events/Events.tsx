
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users, DollarSign, TrendingUp, Clock, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const navigate = useNavigate();

  const stats = [
    { title: 'Reservas Hoje', value: '8', icon: Calendar, color: 'text-blue-600' },
    { title: 'Ocupação Semanal', value: '75%', icon: TrendingUp, color: 'text-green-600' },
    { title: 'Receita do Mês', value: 'R$ 12.500', icon: DollarSign, color: 'text-green-600' },
    { title: 'Contas a Receber', value: 'R$ 3.200', icon: CreditCard, color: 'text-orange-600' }
  ];

  const quickActions = [
    { title: 'Calendário', description: 'Visualizar agenda de reservas', path: '/events/calendar', icon: Calendar },
    { title: 'Clientes', description: 'Gerenciar cadastro de clientes', path: '/events/clients', icon: Users },
    { title: 'Locais', description: 'Configurar quadras e espaços', path: '/events/venues', icon: MapPin },
    { title: 'Nova Reserva', description: 'Criar nova reserva', path: '/events/reservations/new', icon: Clock },
    { title: 'Contas a Receber', description: 'Gerenciar valores a receber', path: '/events/receivables', icon: CreditCard },
    { title: 'Relatórios', description: 'Visualizar relatórios', path: '/events/reports', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="shadow-sm border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-black">Gestão de Eventos</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-black">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-black">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="border-black">
          <CardHeader>
            <CardTitle className="text-black">Ações Rápidas</CardTitle>
            <CardDescription>
              Acesse rapidamente as principais funcionalidades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-center gap-3 border-black text-black hover:bg-black hover:text-white"
                  onClick={() => navigate(action.path)}
                >
                  <action.icon className="h-8 w-8" />
                  <div className="text-center">
                    <div className="font-semibold">{action.title}</div>
                    <div className="text-sm opacity-70">{action.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Events;
