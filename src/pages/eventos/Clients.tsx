
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Edit, Eye, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseList, { BaseListColumn, BaseListAction } from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  reservations: number;
  totalSpent: number;
  lastReservation: string;
  status: 'active' | 'inactive';
}

const Clients = () => {
  const navigate = useNavigate();

  const mockClients: Client[] = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-9999', reservations: 5, totalSpent: 1200.00, lastReservation: '05/05/2024', status: 'active' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', phone: '(11) 88888-8888', reservations: 3, totalSpent: 800.00, lastReservation: '02/05/2024', status: 'active' },
    { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', phone: '(11) 77777-7777', reservations: 8, totalSpent: 2100.00, lastReservation: '01/05/2024', status: 'active' },
    { id: 4, name: 'Ana Oliveira', email: 'ana@email.com', phone: '(11) 66666-6666', reservations: 2, totalSpent: 450.00, lastReservation: '28/04/2024', status: 'inactive' }
  ];

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'default' : 'secondary';
  };

  const columns: BaseListColumn<Client>[] = [
    {
      key: 'name',
      label: 'Cliente',
      render: (client) => (
        <div>
          <div className="font-medium">{client.name}</div>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Mail className="h-3 w-3" />
            {client.email}
          </div>
        </div>
      )
    },
    {
      key: 'phone',
      label: 'Telefone',
      render: (client) => (
        <div className="flex items-center gap-1">
          <Phone className="h-3 w-3" />
          {client.phone}
        </div>
      )
    },
    {
      key: 'reservations',
      label: 'Reservas',
      render: (client) => client.reservations
    },
    {
      key: 'totalSpent',
      label: 'Total Gasto',
      render: (client) => `R$ ${client.totalSpent.toFixed(2)}`
    },
    {
      key: 'lastReservation',
      label: 'Última Reserva',
      render: (client) => client.lastReservation
    },
    {
      key: 'status',
      label: 'Status',
      render: (client) => (
        <Badge variant={getStatusColor(client.status)}>
          {client.status === 'active' ? 'Ativo' : 'Inativo'}
        </Badge>
      )
    }
  ];

  const actions: BaseListAction<Client>[] = [
    {
      label: 'Ver histórico',
      icon: <Eye className="h-4 w-4" />,
      onClick: (client) => navigate(`/eventos/clientes/${client.id}/historico`)
    },
    {
      label: 'Editar',
      icon: <Edit className="h-4 w-4" />,
      onClick: (client) => navigate(`/eventos/clientes/${client.id}/editar`)
    }
  ];

  const renderClientCard = (client: Client, actions: BaseListAction<Client>[]) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{client.name}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {client.email}
            </CardDescription>
          </div>
          <Badge variant={getStatusColor(client.status)}>
            {client.status === 'active' ? 'Ativo' : 'Inativo'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-1 text-sm">
            <Phone className="h-3 w-3" />
            {client.phone}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-3 border-t">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{client.reservations}</div>
              <div className="text-xs text-muted-foreground">Reservas</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">R$ {client.totalSpent.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">Total Gasto</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold">{client.lastReservation}</div>
              <div className="text-xs text-muted-foreground">Última</div>
            </div>
          </div>

          <div className="flex gap-2 pt-3">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="flex-1 gap-1"
                onClick={() => action.onClick(client)}
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const totalClients = mockClients.length;
  const activeClients = mockClients.filter(c => c.status === 'active').length;
  const totalRevenue = mockClients.reduce((sum, client) => sum + client.totalSpent, 0);

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Clientes"
        icon={<Users className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos"
        backLabel="Eventos"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Clientes</p>
                  <p className="text-2xl font-bold">{totalClients}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Clientes Ativos</p>
                  <p className="text-2xl font-bold text-green-600">{activeClients}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Receita Total</p>
                  <p className="text-2xl font-bold text-purple-600">R$ {totalRevenue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end mb-6">
          <Button onClick={() => navigate('/eventos/clientes/novo')} className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Cliente
          </Button>
        </div>

        <BaseList
          data={mockClients}
          columns={columns}
          actions={actions}
          title="Lista de Clientes"
          description="Gerencie todos os clientes do sistema"
          searchPlaceholder="Buscar clientes por nome ou email..."
          searchFields={['name', 'email']}
          getItemId={(client) => client.id}
          pageSize={8}
          renderCard={renderClientCard}
          createButton={{
            label: 'Novo Cliente',
            icon: <Plus className="h-4 w-4" />,
            onClick: () => navigate('/eventos/clientes/novo')
          }}
        />
      </main>
    </div>
  );
};

export default Clients;
