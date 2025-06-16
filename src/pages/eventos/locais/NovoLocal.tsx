import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseFormPage from '@/components/BaseFormPage';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';

const NovoLocal = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    description: ''
  });

  const tourSteps: TourStep[] = [
    {
      target: '#name',
      title: 'Nome do Local',
      content: 'Digite o nome do local, como Quadra A ou Campo de Futebol.'
    },
    {
      target: '#capacity',
      title: 'Capacidade',
      content: 'Informe o número máximo de pessoas que o local suporta.'
    },
    {
      target: '#description',
      title: 'Descrição',
      content: 'Adicione detalhes sobre o local, como tipo de piso ou equipamentos disponíveis.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Novo local:', formData);
    navigate('/eventos/locais');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <BaseFormPage
      title="Cadastrar Novo Local"
      description="Registre um novo local esportivo para reservas"
      icon={<MapPin className="h-5 w-5" />}
      moduleColor={MODULE_COLORS.events}
      backTo="/eventos/locais"
      backLabel="Locais"
      onSubmit={handleSubmit}
      submitLabel="Salvar Local"
      tourSteps={tourSteps}
      tourTitle="Cadastro de Novo Local"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b">
          <h3 className="text-lg font-semibold text-foreground">Informações do Local</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Nome do Local *</Label>
            <Input
              id="name"
              placeholder="Ex: Quadra A"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity" className="text-sm font-medium">Capacidade</Label>
            <Input
              id="capacity"
              type="number"
              placeholder="Número máximo de pessoas"
              value={formData.capacity}
              onChange={(e) => handleInputChange('capacity', e.target.value)}
              className="h-11"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">Descrição</Label>
        <Textarea
          id="description"
          placeholder="Informações adicionais sobre o local..."
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={3}
          className="resize-none"
        />
      </div>
    </BaseFormPage>
  );
};

export default NovoLocal;
