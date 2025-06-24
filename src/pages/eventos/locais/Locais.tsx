
import BaseList from '@/components/BaseList';
import { Card, CardContent } from '@/components/ui/card';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { mockLocais } from '@/data/mockLocais';
import { MapPin } from 'lucide-react';

const Locais = () => {
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
    { key: 'name', header: 'Nome' },
    { key: 'type', header: 'Tipo' },
    { 
      key: 'hourlyRate', 
      header: 'Valor/Hora',
      render: (value: number) => `R$ ${value.toFixed(2)}`
    },
    { 
      key: 'interval', 
      header: 'Intervalo',
      render: (value: number) => `${value} min`
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'active' ? 'bg-green-100 text-green-800' :
          value === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value === 'active' ? 'Ativo' : 
           value === 'maintenance' ? 'Manutenção' : 'Inativo'}
        </span>
      )
    }
  ];

  const cardRender = (item: any) => (
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
      icon={<MapPin className="h-6 w-6" />}
      moduleColor={MODULE_COLORS.events}
      data={mockData}
      tableColumns={tableColumns}
      cardRender={cardRender}
      searchFields={['name', 'type']}
      newItemPath="/eventos/locais/novo"
      editPath="/eventos/locais"
      emptyStateTitle="Nenhum local cadastrado"
      emptyStateDescription="Comece adicionando o primeiro local esportivo"
    />
  );
};

export default Locais;
