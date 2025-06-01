
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users, Plus, Search, Edit, Phone, Mail, Calendar } from 'lucide-react';

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
    }
  ];

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/events')}
                className="gap-2 text-black hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-green-600" />
                <h1 className="text-2xl font-medium text-black">Gerenciar Clientes</h1>
              </div>
            </div>

            <Button 
              onClick={() => navigate('/events/clients/new')}
              className="gap-2 bg-black text-white hover:bg-gray-800"
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
              className="pl-10 border-gray-300"
            />
          </div>
        </div>

        {/* Lista de Clientes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id} className="hover:shadow-lg transition-shadow border-gray-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-black">{client.name}</CardTitle>
                    <CardDescription className="text-gray-600">Cliente desde 2023</CardDescription>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    client.status === 'vip' 
                      ? 'bg-purple-100 text-purple-800'
                      : client.status === 'active'
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {client.status === 'vip' ? 'VIP' : client.status === 'active' ? 'Ativo' : 'Inativo'}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="truncate text-gray-700">{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{client.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">Última reserva: {new Date(client.lastReservation).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{client.totalReservations}</div>
                      <div className="text-xs text-gray-500">Reservas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">R$ {client.totalSpent.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Total Gasto</div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 gap-1 border-gray-300 text-black hover:bg-gray-50"
                      onClick={() => navigate(`/events/clients/${client.id}/edit`)}
                    >
                      <Edit className="h-4 w-4" />
                      Editar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-gray-300 text-black hover:bg-gray-50"
                      onClick={() => navigate(`/events/clients/${client.id}/history`)}
                    >
                      Histórico
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Clientes</p>
                  <p className="text-2xl font-bold text-black">{mockClients.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Clientes Ativos</p>
                  <p className="text-2xl font-bold text-black">{mockClients.filter(c => c.status === 'active' || c.status === 'vip').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Clientes VIP</p>
                  <p className="text-2xl font-bold text-black">{mockClients.filter(c => c.status === 'vip').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Reservas Totais</p>
                  <p className="text-2xl font-bold text-black">{mockClients.reduce((acc, c) => acc + c.totalReservations, 0)}</p>
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
