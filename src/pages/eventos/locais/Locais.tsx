
import BaseList from '@/components/BaseList';
import { Card, CardContent } from '@/components/ui/card';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { mockLocais } from '@/data/mockLocais';
import { MapPin, Plus, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Locais = () => {
  const navigate = useNavigate();
  
  // Usar dados centralizados
  const mockData = mockLocais.map(local => ({
    id: local.id,
    name: local.name,
    type: local.type,
    hourlyRate: local.hourlyRate,
    status: local.status,
    interval: local.interval,
    amenities: local.amenities,
    description: local.description
  }));

  const tableColumns = [
    { key: 'name', label: 'Nome' },
    { key: 'type', label: 'Tipo' },
    { 
      key: 'hourlyRate', 
      label: 'Valor/Hora',
      render: (item: any) => `R$ ${item.hourlyRate.toFixed(2)}`
    },
    { 
      key: 'interval', 
      label: 'Intervalo',
      render: (item: any) => `${item.interval} min`
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (item: any) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          item.status === 'active' ? 'bg-green-100 text-green-800' :
          item.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {item.status === 'active' ? 'Ativo' : 
           item.status === 'maintenance' ? 'Manutenção' : 'Inativo'}
        </span>
      )
    }
  ];

  const actions = [
    {
      label: 'Editar',
      icon: <Edit2 className="h-4 w-4" />,
      onClick: (item: any) => navigate(`/eventos/locais/${item.id}`),
      variant: 'outline' as const
    }
  ];

  const cardRender = (item: any, itemActions: any[]) => (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs ${
            item.status === 'active' ? 'bg-green-100 text-green-800' :
            item.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {item.status === 'active' ? 'Ativo' : 
             item.status === 'maintenance' ? 'Manutenção' : 'Inativo'}
          </span>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <p><span className="font-medium">Tipo:</span> {item.type}</p>
          <p><span className="font-medium">Valor/Hora:</span> R$ {item.hourlyRate.toFixed(2)}</p>
          <p><span className="font-medium">Intervalo:</span> {item.interval} minutos</p>
          {item.description && (
            <p><span className="font-medium">Descrição:</span> {item.description}</p>
          )}
          {item.amenities && item.amenities.length > 0 && (
            <div>
              <span className="font-medium">Comodidades:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {item.amenities.map((amenity: string, index: number) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <BaseList
      title="Locais"
      data={mockData}
      columns={tableColumns}
      actions={actions}
      getItemId={(item) => item.id}
      searchFields={['name', 'type']}
      createButton={{
        label: 'Novo Local',
        icon: <Plus className="h-4 w-4" />,
        onClick: () => navigate('/eventos/locais/novo')
      }}
      renderCard={cardRender}
      showExport={true}
      exportFilename="locais"
    />
  );
};

export default Locais;
