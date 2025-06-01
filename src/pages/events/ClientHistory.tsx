
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, Mail, MapPin, Phone, Users } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const ClientHistory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - em produção viria de uma API
  const client = {
    id: 1,
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    type: 'Pessoa Física',
    totalReservations: 45,
    totalSpent: 2850,
    memberSince: '2023-01-15',
    status: 'active'
  };

  const reservations = [
    {
      id: 1,
      date: '2024-01-15',
      time: '08:00',
      venue: 'Quadra A - Futebol Society',
      duration: '2 horas',
      value: 160,
      status: 'completed',
      payment: 'Cartão'
    },
    {
      id: 2,
      date: '2024-01-10',
      time: '18:00',
      venue: 'Campo 1 - Futebol 11',
      duration: '1.5 horas',
      value: 225,
      status: 'completed',
      payment: 'PIX'
    },
    {
      id: 3,
      date: '2024-01-08',
      time: '14:00',
      venue: 'Quadra B - Basquete',
      duration: '1 hora',
      value: 60,
      status: 'cancelled',
      payment: '-'
    },
    {
      id: 4,
      date: '2024-01-05',
      time: '20:00',
      venue: 'Campo 2 - Futebol 7',
      duration: '2 horas',
      value: 200,
      status: 'completed',
      payment: 'Dinheiro'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="shadow-sm border-b ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/events/clients')}
              className="gap-2 text-gray-900 dark:text-gray-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-green-600" />
              <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-300">Histórico do Cliente</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações do Cliente */}
          <div className="lg:col-span-1">
            <Card className="">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-300">Informações do Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300">{client.name}</h3>
                  <Badge variant={client.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                    {client.status === 'active' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-900 dark:text-gray-300" />
                    <span className="text-gray-900 dark:text-gray-300">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-900 dark:text-gray-300" />
                    <span className="text-gray-900 dark:text-gray-300">{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-gray-900 dark:text-gray-300" />
                    <span className="text-gray-900 dark:text-gray-300">{client.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-900 dark:text-gray-300" />
                    <span className="text-gray-900 dark:text-gray-300">Cliente desde {new Date(client.memberSince).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t ">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{client.totalReservations}</div>
                    <div className="text-xs text-gray-900 dark:text-gray-300">Reservas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">R$ {client.totalSpent.toLocaleString()}</div>
                    <div className="text-xs text-gray-900 dark:text-gray-300">Total Gasto</div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    onClick={() => navigate(`/events/clients/${id}/edit`)}
                    className="w-full"
                    variant="outline"
                  >
                    Editar Cliente
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Histórico de Reservas */}
          <div className="lg:col-span-2">
            <Card className="">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-300">Histórico de Reservas</CardTitle>
                <CardDescription className="text-gray-900 dark:text-gray-300">
                  {reservations.length} reservas encontradas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reservations.map((reservation) => (
                    <div key={reservation.id} className="border  rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-300">
                            {new Date(reservation.date).toLocaleDateString('pt-BR')} às {reservation.time}
                          </div>
                          <Badge 
                            variant={
                              reservation.status === 'completed' ? 'default' : 
                              reservation.status === 'cancelled' ? 'destructive' : 'secondary'
                            }
                          >
                            {reservation.status === 'completed' ? 'Concluída' : 
                             reservation.status === 'cancelled' ? 'Cancelada' : 'Pendente'}
                          </Badge>
                        </div>
                        <div className="text-lg font-semibold text-green-600">
                          {reservation.status !== 'cancelled' ? `R$ ${reservation.value}` : '-'}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="flex items-center gap-1 text-gray-900 dark:text-gray-300 mb-1">
                            <MapPin className="h-4 w-4" />
                            <span>Local</span>
                          </div>
                          <div className="text-gray-900 dark:text-gray-300 font-medium">{reservation.venue}</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-gray-900 dark:text-gray-300 mb-1">
                            <Calendar className="h-4 w-4" />
                            <span>Duração</span>
                          </div>
                          <div className="text-gray-900 dark:text-gray-300 font-medium">{reservation.duration}</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-gray-900 dark:text-gray-300 mb-1">
                            <span>Pagamento</span>
                          </div>
                          <div className="text-gray-900 dark:text-gray-300 font-medium">{reservation.payment}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientHistory;
