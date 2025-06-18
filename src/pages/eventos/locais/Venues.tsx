
import BaseList from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import { Badge } from '@/components/ui/badge';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { MapPin, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Venues = () => {
  const navigate = useNavigate();

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
      render: (item: any) => `${item.capacity} pessoas`
    },
    {
      key: 'hourlyRate',
      label: 'Valor/Hora',
      render: (item: any) => `R$ ${item.hourlyRate.toFixed(2)}`
    },
    {
      key: 'status',
      label: 'Situação',
      render: (item: any) => (
        <Badge variant={item.status === 'ativo' ? 'default' : 'destructive'}>
          {item.status === 'ativo' ? 'Ativo' : 'Manutenção'}
        </Badge>
      )
    }
  ];

  const actions = [
    {
      label: 'Editar',
      onClick: (item: any) => navigate(`/eventos/locais/${item.id}/editar`),
      variant: 'outline' as const
    }
  ];

  const createButton = {
    label: 'Novo Local',
    icon: <Plus className="h-4 w-4" />,
    onClick: () => navigate('/eventos/locais/novo')
  };

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Locais"
        icon={<MapPin className="h-5 w-5" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos"
        backLabel="Módulo Eventos"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-80px)]">
        <BaseList
          title="Gerenciar Locais"
          description="Cadastre e gerencie os locais disponíveis para reserva"
          data={venues}
          columns={columns}
          actions={actions}
          createButton={createButton}
          searchPlaceholder="Buscar locais..."
          searchFields={['name', 'type']}
          getItemId={(item) => item.id}
          pageSize={10}
        />
      </main>
    </div>
  );
};

export default Venues;
