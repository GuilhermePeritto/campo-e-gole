
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { MapPin } from 'lucide-react';
import PaginaFormularioBase from '@/core/componentes/PaginaFormularioBase';
import CampoValor from '@/core/componentes/CampoValor';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';

const NovoLocal = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    hourlyRate: '',
    description: '',
    address: '',
    amenities: ''
  });

  const tourSteps: TourStep[] = [
    {
      target: '#name',
      title: 'Nome do Local',
      content: 'Digite o nome do local que será cadastrado.'
    },
    {
      target: '#capacity',
      title: 'Capacidade',
      content: 'Informe a capacidade máxima de pessoas que o local comporta.'
    },
    {
      target: '#hourlyRate',
      title: 'Valor por Hora',
      content: 'Defina o valor cobrado por hora de uso do local.'
    },
    {
      target: '#description',
      title: 'Descrição',
      content: 'Adicione uma descrição detalhada do local e suas características.'
    },
    {
      target: '#address',
      title: 'Endereço',
      content: 'Endereço completo onde o local está localizado.'
    },
    {
      target: '#amenities',
      title: 'Comodidades',
      content: 'Liste as comodidades e equipamentos disponíveis no local.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Preencha o nome do local.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Local cadastrado!",
      description: `O local "${formData.name}" foi cadastrado com sucesso.`,
    });
    navigate('/eventos/locais');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <PaginaFormularioBase
      title="Cadastrar Novo Local"
      description="Registre um novo local para eventos"
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
          <h3 className="text-lg font-semibold text-foreground">Informações Básicas</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Local *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Ex: Salão Principal"
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">Capacidade</Label>
            <Input
              id="capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) => handleInputChange('capacity', e.target.value)}
              placeholder="Ex: 100"
              className="h-11"
            />
          </div>

          <CampoValor
            id="hourlyRate"
            label="Valor por Hora"
            value={formData.hourlyRate}
            onChange={(value) => handleInputChange('hourlyRate', value)}
            placeholder="0,00"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Descreva o local, suas características e equipamentos..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Endereço</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          placeholder="Endereço completo do local..."
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amenities">Comodidades</Label>
        <Textarea
          id="amenities"
          value={formData.amenities}
          onChange={(e) => handleInputChange('amenities', e.target.value)}
          placeholder="Liste as comodidades disponíveis (ar condicionado, som, projetor, etc.)..."
          rows={3}
        />
      </div>
    </PaginaFormularioBase>
  );
};

export default NovoLocal;
