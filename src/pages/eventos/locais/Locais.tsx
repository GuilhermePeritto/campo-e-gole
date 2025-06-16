
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, MapPin, Edit, Eye } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseList, { BaseListColumn, BaseListAction } from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';

interface Venue {
  id: number;
  name: string;
  type: string;
  capacity: number;
  location: string;
  reservations: number;
  status: 'active' | 'inactive';
}

const Locais = () => {
  const navigate = useNavigate();

  const mockVenues: Venue[] = [
    { id: 1, name: 'Quadra A - Futebol Society', type: 'Quadra', capacity: 20, location: 'Interna', reservations: 15, status: 'active' },
    { id: 2, name: 'Campo 1 - Futebol 11', type: 'Campo', capacity: 100, location: 'Externa', reservations: 8, status: 'active' },
    { id: 3, name: 'Quadra B - Basquete', type: 'Quadra', capacity: 12, location: 'Interna', reservations: 5, status: 'inactive' },
    { id: 4, name: 'Salão de Festas', type: 'Salão', capacity: 150, location: 'Interna', reservations: 2, status: 'active' }
  ];

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'default' : 'secondary';
  };

  const columns: BaseListColumn<Venue>[] = [
    {
      key: 'name',
      label: 'Local',
      render: (venue) => (
        <div>
          <div className="font-medium">{venue.name}</div>
          <div className="text-sm text-muted-foreground">{venue.type} - {venue.location}</div>
        </div>
      )
    },
    {
      key: 'capacity',
      label: 'Capacidade',
      render: (venue) => venue.capacity
    },
    {
      key: 'reservations',
      label: 'Reservas',
      render: (venue) => venue.reservations
    },
    {
      key: 'status',
      label: 'Status',
      render: (venue) => (
        <Badge variant={getStatusColor(venue.status)}>
          {venue.status === 'active' ? 'Ativo' : 'Inativo'}
        </Badge>
      )
    }
  ];

  const actions: BaseListAction<Venue>[] = [
    {
      label: 'Ver detalhes',
      icon: <Eye className="h-4 w-4" />,
      onClick: (venue) => navigate(`/eventos/locais/${venue.id}/detalhes`)
    },
    {
      label: 'Editar',
      icon: <Edit className="h-4 w-4" />,
      onClick: (venue) => navigate(`/eventos/locais/${venue.id}/editar`)
    }
  ];

  const renderVenueCard = (venue: Venue, actions: BaseListAction<Venue>[]) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{venue.name}</CardTitle>
            <CardDescription>{venue.type} - {venue.location}</CardDescription>
          </div>
          <Badge variant={getStatusColor(venue.status)}>
            {venue.status === 'active' ? 'Ativo' : 'Inativo'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-muted-foreground">Capacidade:</span>
            <span className="text-sm ml-1">{venue.capacity}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{venue.reservations}</div>
              <div className="text-xs text-muted-foreground">Reservas</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold">{venue.status === 'active' ? 'Disponível' : 'Indisponível'}</div>
              <div className="text-xs text-muted-foreground">Status</div>
            </div>
          </div>

          <div className="flex gap-2 pt-3">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="flex-1 gap-1"
                onClick={() => action.onClick(venue)}
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

  return (
    <div className="h-screen flex flex-col bg-background">
      <ModuleHeader
        title="Locais"
        icon={<MapPin className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos"
        backLabel="Eventos"
      />

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 min-h-0">
        <div className="flex-1 min-h-0">
          <BaseList
            data={mockVenues}
            columns={columns}
            actions={actions}
            title="Lista de Locais"
            description="Gerencie todos os locais esportivos"
            searchPlaceholder="Buscar local por nome ou tipo..."
            searchFields={['name', 'type']}
            getItemId={(venue) => venue.id}
            pageSize={8}
            renderCard={renderVenueCard}
            createButton={{
              label: 'Novo Local',
              icon: <Plus className="h-4 w-4" />,
              onClick: () => navigate('/eventos/locais/novo')
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Locais;
