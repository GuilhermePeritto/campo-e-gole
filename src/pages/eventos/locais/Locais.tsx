
import BaseList from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import { Badge } from '@/components/ui/badge';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { MapPin, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockLocais } from '@/data/mockLocais';

const Locais = () => {
  const navigate = useNavigate();

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
      key: 'interval',
      label: 'Intervalo',
      render: (item: any) => `${item.interval} min`
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
        <Badge variant={item.status === 'active' ? 'default' : 'destructive'}>
          {item.status === 'active' ? 'Ativo' : 
           item.status === 'maintenance' ? 'Manutenção' : 'Inativo'}
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
          data={mockLocais}
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

export default Locais;
