import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { MapPin } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BaseFormPage from '@/components/BaseFormPage';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';

const EditarLocal = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    description: ''
  });

  useEffect(() => {
    // Simulação de dados vindos de uma API
    const mockData = {
      name: 'Quadra Poliesportiva A',
      capacity: '50',
      description: 'Quadra com piso emborrachado e iluminação LED.'
    };
    setFormData(mockData);
  }, [id]);

  const tourSteps: TourStep[] = [
    {
      target: '#name',
      title: 'Nome do Local',
      content: 'Atualize o nome do local esportivo.'
    },
    {
      target: '#capacity',
      title: 'Capacidade',
      content: 'Modifique a capacidade máxima de pessoas permitidas no local.'
    },
    {
      target: '#description',
      title: 'Descrição',
      content: 'Adicione ou edite detalhes sobre o local, como tipo de piso, iluminação, etc.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.capacity.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome e capacidade.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Local atualizado!",
      description: `Dados de ${formData.name} foram atualizados.`,
    });
    navigate('/eventos/locais');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <BaseFormPage
      title="Editar Local"
      description="Atualize as informações do local esportivo"
      icon={<MapPin className="h-5 w-5" />}
      moduleColor={MODULE_COLORS.events}
      backTo="/eventos/locais"
      backLabel="Locais"
      onSubmit={handleSubmit}
      submitLabel="Salvar Alterações"
      tourSteps={tourSteps}
      tourTitle="Edição de Local"
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
              placeholder="Ex: Quadra Poliesportiva A"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity" className="text-sm font-medium">Capacidade Máxima *</Label>
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
          placeholder="Detalhes sobre o local..."
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={3}
          className="resize-none"
        />
      </div>
    </BaseFormPage>
  );
};

export default EditarLocal;
