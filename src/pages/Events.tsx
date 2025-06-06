import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BarChart3, Calendar, CreditCard, MapPin, Plus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Nova Reserva',
      description: 'Criar uma nova reserva esportiva',
      icon: Plus,
      color: 'bg-green-500',
      action: () => navigate('/eventos/reservas/novo')
    },
    {
      title: 'Visualizar Agenda',
      description: 'Ver agenda completa dos locais',
      icon: Calendar,
      color: 'bg-black',
      action: () => navigate('/eventos/agenda')
    },
    {
      title: 'Gerenciar Locais',
      description: 'Cadastrar e gerenciar locais esportivos',
      icon: MapPin,
      color: 'bg-black',
      action: () => navigate('/eventos/locais')
    },
    {
      title: 'Clientes',
      description: 'Gerenciar clientes e histórico',
      icon: Users,
      color: 'bg-black',
      action: () => navigate('/eventos/clientes')
    },
    {
      title: 'Contas a Receber',
      description: 'Gerenciar pagamentos e cobranças',
      icon: CreditCard,
      color: 'bg-black',
      action: () => navigate('/eventos/contas-a-receber')
    },
    {
      title: 'Relatórios',
      description: 'Análises financeiras e ocupação',
      icon: BarChart3,
      color: 'bg-black',
      action: () => navigate('/eventos/relatorios')
    }
  ];

  const todayReservations = [
    { id: 1, time: '08:00', venue: 'Quadra A', client: 'João Silva', status: 'confirmado' },
    { id: 2, time: '14:00', venue: 'Campo 1', client: 'Time Unidos', status: 'pendente' },
    { id: 3, time: '18:00', venue: 'Quadra B', client: 'Maria Santos', status: 'confirmado' },
    { id: 4, time: '20:00', venue: 'Campo 2', client: 'Grupo Amigos', status: 'confirmado' }
  ];

  const receivables = [
    { id: 1, client: 'João Silva', amount: 150, dueDate: '2024-06-10', status: 'pendente' },
    { id: 2, client: 'Time Unidos', amount: 300, dueDate: '2024-06-08', status: 'vencido' },
    { id: 3, client: 'Maria Santos', amount: 200, dueDate: '2024-06-15', status: 'pendente' }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
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
              <Calendar className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold text-black">Gestão de Eventos</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Card 
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-black"
                  onClick={action.action}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-black mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-black">
            <CardHeader>
              <CardTitle className="text-black">Reservas de Hoje</CardTitle>
              <CardDescription>
                4 reservas agendadas para hoje
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 border border-black rounded-lg">
                  <div>
                    <div className="font-medium text-black">08:00 - Quadra A</div>
                    <div className="text-sm text-gray-600">João Silva</div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-lg bg-green-300 text-green-800">
                    confirmado
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 border border-black rounded-lg">
                  <div>
                    <div className="font-medium text-black">14:00 - Campo 1</div>
                    <div className="text-sm text-gray-600">Time Unidos</div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-lg bg-yellow-200 text-yellow-800">
                    pendente
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 border border-black rounded-lg">
                  <div>
                    <div className="font-medium text-black">18:00 - Quadra B</div>
                    <div className="text-sm text-gray-600">Maria Santos</div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-lg bg-green-300 text-green-800">
                    confirmado
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 border border-black rounded-lg">
                  <div>
                    <div className="font-medium text-black">20:00 - Campo 2</div>
                    <div className="text-sm text-gray-600">Grupo Amigos</div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-lg bg-green-300 text-green-800">
                    confirmado
                  </span>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4 border-black text-black hover:bg-black hover:text-white"
                onClick={() => navigate('/eventos/agenda')}
              >
                Ver Agenda Completa
              </Button>
            </CardContent>
          </Card>

          <Card className="border-black">
            <CardHeader>
              <CardTitle className="text-black">Ocupação Semanal</CardTitle>
              <CardDescription>
                Taxa de ocupação dos locais esta semana
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1 text-black">
                    <span>Quadra A</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1 text-black">
                    <span>Campo 1</span>
                    <span>72%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '72%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1 text-black">
                    <span>Quadra B</span>
                    <span>58%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{width: '58%'}}></div>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4 border-black text-black hover:bg-black hover:text-white"
                onClick={() => navigate('/eventos/relatorios')}
              >
                Ver Relatório Completo
              </Button>
            </CardContent>
          </Card>

          <Card className="border-black">
            <CardHeader>
              <CardTitle className="text-black">Receita do Mês</CardTitle>
              <CardDescription>
                Faturamento com reservas esportivas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-black mb-2">R$ 18.450</div>
                <div className="text-sm text-green-600 mb-4">+12% vs mês anterior</div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-black">156</div>
                    <div className="text-gray-600">Reservas</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-black">R$ 118</div>
                    <div className="text-gray-600">Ticket Médio</div>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4 border-black text-black hover:bg-black hover:text-white"
                onClick={() => navigate('/eventos/relatorios')}
              >
                Análise Detalhada
              </Button>
            </CardContent>
          </Card>

          <Card className="border-black">
            <CardHeader>
              <CardTitle className="text-black">Contas a Receber</CardTitle>
              <CardDescription>
                Pagamentos pendentes e vencidos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 border border-black rounded-lg">
                  <div>
                    <div className="font-medium text-black">João Silva</div>
                    <div className="text-sm text-gray-600">R$ 150 - 2024-06-10</div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-lg bg-yellow-200 text-yellow-800">
                    pendente
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 border border-black rounded-lg">
                  <div>
                    <div className="font-medium text-black">Time Unidos</div>
                    <div className="text-sm text-gray-600">R$ 300 - 2024-06-08</div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-lg bg-red-200 text-red-800">
                    vencido
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 border border-black rounded-lg">
                  <div>
                    <div className="font-medium text-black">Maria Santos</div>
                    <div className="text-sm text-gray-600">R$ 200 - 2024-06-15</div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-lg bg-yellow-200 text-yellow-800">
                    pendente
                  </span>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4 border-black text-black hover:bg-black hover:text-white"
                onClick={() => navigate('/eventos/contas-a-receber')}
              >
                Ver Todas as Contas
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Events;
