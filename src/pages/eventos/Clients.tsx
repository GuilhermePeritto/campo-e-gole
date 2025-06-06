
import PaginationControls from '@/components/PaginationControls';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { usePagination } from '@/hooks/usePagination';
import { ArrowLeft, Calendar, Edit, Mail, Phone, Plus, Search, Users } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Clients = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const mockClients = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(11) 99999-9999',
      totalReservations: 45,
      lastReservation: '2024-01-15',
      status: 'active',
      totalSpent: 2850
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@email.com',
      phone: '(11) 88888-8888',
      totalReservations: 32,
      lastReservation: '2024-01-10',
      status: 'active',
      totalSpent: 1920
    },
    {
      id: 3,
      name: 'Time Unidos FC',
      email: 'contato@timeunidos.com',
      phone: '(11) 77777-7777',
      totalReservations: 78,
      lastReservation: '2024-01-12',
      status: 'vip',
      totalSpent: 5460
    },
    {
      id: 4,
      name: 'Carlos Oliveira',
      email: 'carlos@email.com',
      phone: '(11) 66666-6666',
      totalReservations: 12,
      lastReservation: '2023-12-20',
      status: 'inactive',
      totalSpent: 720
    },
    {
      id: 5,
      name: 'Ana Costa',
      email: 'ana@email.com',
      phone: '(11) 55555-5555',
      totalReservations: 28,
      lastReservation: '2024-01-08',
      status: 'active',
      totalSpent: 1680
    },
    {
      id: 6,
      name: 'Pedro Martins',
      email: 'pedro@email.com',
      phone: '(11) 44444-4444',
      totalReservations: 55,
      lastReservation: '2024-01-14',
      status: 'vip',
      totalSpent: 3300
    },
    {
      id: 7,
      name: 'Clube Esportivo',
      email: 'clube@email.com',
      phone: '(11) 33333-3333',
      totalReservations: 89,
      lastReservation: '2024-01-16',
      status: 'vip',
      totalSpent: 5340
    },
    {
      id: 8,
      name: 'Lucas Ferreira',
      email: 'lucas@email.com',
      phone: '(11) 22222-2222',
      totalReservations: 18,
      lastReservation: '2024-01-05',
      status: 'active',
      totalSpent: 1080
    }
  ];

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pagination = usePagination(filteredClients, {
    pageSize: 6,
    totalItems: filteredClients.length
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/eventos')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-green-600" />
                <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-300">Gerenciar Clientes</h1>
              </div>
            </div>

            <Button 
              onClick={() => navigate('/eventos/clientes/novo')}
              className="gap-2 bg-black text-gray-600 dark:text-gray-300 hover:bg-gray-800"
            >
              <Plus className="h-4 w-4" />
              Novo Cliente
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Busca */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Lista de Clientes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {pagination.paginatedData.map((client) => (
            <Card key={client.id} className="hover:shadow-lg transition-shadow ">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-gray-900 dark:text-gray-300">{client.name}</CardTitle>
                    <CardDescription className="text-gray-900 dark:text-gray-300">Cliente desde 2023</CardDescription>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    client.status === 'vip' 
                      ? 'bg-purple-400 text-purple-800'
                      : client.status === 'active'
                      ? 'bg-green-400 text-green-800' 
                      : 'bg-red-400 text-gray-800'
                  }`}>
                    {client.status === 'vip' ? 'VIP' : client.status === 'active' ? 'Ativo' : 'Inativo'}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-900 dark:text-gray-300" />
                      <span className="truncate text-gray-900 dark:text-gray-300">{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-900 dark:text-gray-300" />
                      <span className="text-gray-900 dark:text-gray-300">{client.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-900 dark:text-gray-300" />
                      <span className="text-gray-900 dark:text-gray-300">Última reserva: {new Date(client.lastReservation).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t ">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{client.totalReservations}</div>
                      <div className="text-xs text-gray-900 dark:text-gray-300">Reservas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">R$ {client.totalSpent.toLocaleString()}</div>
                      <div className="text-xs text-gray-900 dark:text-gray-300">Total Gasto</div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 gap-1 text-gray-900 dark:text-gray-300"
                      onClick={() => navigate(`/eventos/clientes/${client.id}/editar`)}
                    >
                      <Edit className="h-4 w-4" />
                      Editar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-gray-900 dark:text-gray-300"
                      onClick={() => navigate(`/eventos/clientes/${client.id}/historico`)}
                    >
                      Histórico
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Paginação */}
        <PaginationControls
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          pageSize={pagination.pageSize}
          startIndex={pagination.startIndex}
          endIndex={pagination.endIndex}
          hasNextPage={pagination.hasNextPage}
          hasPreviousPage={pagination.hasPreviousPage}
          onPageChange={pagination.goToPage}
          onPageSizeChange={pagination.setPageSize}
          pageSizeOptions={[6, 12, 18, 24]}
        />

        {/* Estatísticas */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-300">Total de Clientes</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-300">{mockClients.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-300">Clientes Ativos</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-300">{mockClients.filter(c => c.status === 'active' || c.status === 'vip').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-300">Clientes VIP</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-300">{mockClients.filter(c => c.status === 'vip').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-300">Reservas Totais</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-300">{mockClients.reduce((acc, c) => acc + c.totalReservations, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Clients;
