
import BaseList from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { MapPin, Plus } from 'lucide-react';

const Venues = () => {
  // Mock data
  const venues = [
    {
      id: 1,
      name: 'Quadra Principal',
      type: 'Futebol Society',
      capacity: 22,
      hourlyRate: 80,
      status: 'ativo',
      characteristics: ['Grama sintética', 'Iluminação', 'Vestiário']
    },
    {
      id: 2,
      name: 'Quadra Coberta',
      type: 'Futsal',
      capacity: 12,
      hourlyRate: 60,
      status: 'ativo',
      characteristics: ['Piso de madeira', 'Arquibancada', 'Som ambiente']
    },
    {
      id: 3,
      name: 'Campo Externo',
      type: 'Futebol',
      capacity: 22,
      hourlyRate: 100,
      status: 'manutencao',
      characteristics: ['Grama natural', 'Vestiário duplo']
    }
  ];

  const columns = [
    {
      key: 'name',
      label: 'Nome',
      sortable: true
    },
    {
      key: 'type',
      label: 'Tipo'
    },
    {
      key: 'capacity',
      label: 'Capacidade',
      render: (value: number) => `${value} pessoas`
    },
    {
      key: 'hourlyRate',
      label: 'Valor/Hora',
      render: (value: number) => `R$ ${value.toFixed(2)}`
    },
    {
      key: 'status',
      label: 'Situação',
      render: (value: string) => (
        <Badge variant={value === 'ativo' ? 'default' : 'destructive'}>
          {value === 'ativo' ? 'Ativo' : 'Manutenção'}
        </Badge>
      )
    }
  ];

  const actions = [
    {
      label: 'Novo Local',
      icon: <Plus className="h-4 w-4" />,
      href: '/eventos/locais/novo',
      variant: 'default' as const
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Locais"
        icon={<MapPin className="h-5 w-5" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos"
        backLabel="Módulo Eventos"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BaseList
          title="Gerenciar Locais"
          description="Cadastre e gerencie os locais disponíveis para reserva"
          data={venues}
          columns={columns}
          actions={actions}
          searchPlaceholder="Buscar locais..."
          searchFields={['name', 'type']}
          itemsPerPage={10}
          editPath="/eventos/locais/:id/editar"
        />
      </main>
    </div>
  );
};

export default Venues;
