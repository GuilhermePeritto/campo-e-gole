
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { MapPin, Plus, Edit, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseList, { BaseListColumn, BaseListAction } from '@/components/BaseList';
import SummaryCardSkeleton from '@/components/SummaryCardSkeleton';
import ValueSkeleton from '@/components/ValueSkeleton';

interface Venue {
  id: number;
  name: string;
  type: string;
  capacity: string;
  hourlyRate: number;
  status: string;
}

const Locais = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const mockVenues: Venue[] = [
    {
      id: 1,
      name: 'Quadra Principal',
      type: 'Quadra de Futebol',
      capacity: '22 jogadores',
      hourlyRate: 120.00,
      status: 'Disponível'
    },
    {
      id: 2,
      name: 'Campo Society',
      type: 'Campo Society',
      capacity: '14 jogadores',
      hourlyRate: 100.00,
      status: 'Disponível'
    },
    {
      id: 3,
      name: 'Salão de Festas',
      type: 'Salão de Eventos',
      capacity: '150 pessoas',
      hourlyRate: 200.00,
      status: 'Ocupado'
    },
    {
      id: 4,
      name: 'Quadra de Tênis',
      type: 'Quadra de Tênis',
      capacity: '4 jogadores',
      hourlyRate: 80.00,
      status: 'Manutenção'
    },
    {
      id: 5,
      name: 'Piscina',
      type: 'Área Aquática',
      capacity: '50 pessoas',
      hourlyRate: 150.00,
      status: 'Disponível'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponível': return 'default';
      case 'Ocupado': return 'destructive';
      case 'Manutenção': return 'secondary';
      default: return 'outline';
    }
  };

  const columns: BaseListColumn<Venue>[] = [
    {
      key: 'name',
      label: 'Nome',
      render: (venue) => (
        <div>
          <div className="font-medium">{venue.name}</div>
          <div className="text-sm text-muted-foreground">{venue.type}</div>
        </div>
      )
    },
    {
      key: 'capacity',
      label: 'Capacidade',
      render: (venue) => venue.capacity
    },
    {
      key: 'hourlyRate',
      label: 'Valor/Hora',
      render: (venue) => (
        <span className="font-bold text-green-600">
          {isLoading ? <ValueSkeleton /> : `R$ ${venue.hourlyRate.toFixed(2).replace('.', ',')}`}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (venue) => (
        <Badge variant={getStatusColor(venue.status)}>
          {venue.status}
        </Badge>
      )
    }
  ];

  const actions: BaseListAction<Venue>[] = [
    {
      label: 'Ver detalhes',
      icon: <Eye className="h-4 w-4" />,
      onClick: (venue) => console.log('Ver detalhes', venue)
    },
    {
      label: 'Editar',
      icon: <Edit className="h-4 w-4" />,
      onClick: (venue) => navigate(`/eventos/locais/editar/${venue.id}`)
    }
  ];

  const renderVenueCard = (venue: Venue, actions: BaseListAction<Venue>[]) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{venue.name}</CardTitle>
            <CardDescription>{venue.type}</CardDescription>
          </div>
          <Badge variant={getStatusColor(venue.status)}>
            {venue.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              <span>{venue.capacity}</span>
            </div>
          </div>

          <div className="pt-3 border-t">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                {isLoading ? <ValueSkeleton /> : `R$ ${venue.hourlyRate.toFixed(2)}`}
              </div>
              <div className="text-xs text-muted-foreground">Valor/Hora</div>
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

  const totalRevenue = mockVenues.reduce((sum, venue) => sum + venue.hourlyRate, 0);

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Locais"
        icon={<MapPin className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos"
        backLabel="Eventos"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-end mb-6">
          <Button onClick={() => navigate('/eventos/locais/novo')} className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Local
          </Button>
        </div>

        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {isLoading ? (
            <>
              <SummaryCardSkeleton />
              <SummaryCardSkeleton />
              <SummaryCardSkeleton />
              <SummaryCardSkeleton />
            </>
          ) : (
            <>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total de Locais</p>
                      <p className="text-2xl font-bold text-blue-600">{mockVenues.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Disponíveis</p>
                      <p className="text-2xl font-bold text-green-600">
                        {mockVenues.filter(v => v.status === 'Disponível').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Ocupados</p>
                      <p className="text-2xl font-bold text-red-600">
                        {mockVenues.filter(v => v.status === 'Ocupado').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Receita/Hora</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {isLoading ? <ValueSkeleton /> : `R$ ${totalRevenue.toFixed(2).replace('.', ',')}`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <BaseList
          data={mockVenues}
          columns={columns}
          actions={actions}
          title="Lista de Locais"
          description="Gerenciar todos os locais disponíveis para reserva"
          searchPlaceholder="Buscar locais por nome ou tipo..."
          searchFields={['name', 'type']}
          getItemId={(venue) => venue.id}
          pageSize={10}
          renderCard={renderVenueCard}
        />
      </main>
    </div>
  );
};

export default Locais;
