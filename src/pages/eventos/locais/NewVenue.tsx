
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import BaseFormPage from '@/components/BaseFormPage';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import CampoValor from '@/core/componentes/CampoValor';

const NewVenue = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    hourlyRate: '',
    description: '',
    equipment: [] as string[],
    amenities: [] as string[]
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const tourSteps: TourStep[] = [
    {
      target: '#name',
      title: 'Nome do Local',
      content: 'Digite o nome do local esportivo que será cadastrado.'
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
      target: '#equipment',
      title: 'Equipamentos',
      content: 'Selecione os equipamentos disponíveis no local.'
    },
    {
      target: '#amenities',
      title: 'Comodidades',
      content: 'Marque as comodidades oferecidas pelo local.'
    }
  ];

  const equipmentOptions = [
    'Bolas de Futebol',
    'Bolas de Basquete',
    'Redes',
    'Traves',
    'Coletes',
    'Cones',
    'Apitos',
    'Cronômetro',
    'Placar',
    'Som/Música',
    'Iluminação',
    'Câmeras'
  ];

  const amenitiesOptions = [
    'Vestiário Masculino',
    'Vestiário Feminino',
    'Chuveiros',
    'Estacionamento',
    'Lanchonete',
    'Bebedouro',
    'Banheiros',
    'Arquibancada',
    'Cobertura',
    'Ar Condicionado',
    'Wi-Fi',
    'Segurança'
  ];

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.capacity.trim()) {
      newErrors.capacity = 'Capacidade é obrigatória';
    } else if (isNaN(Number(formData.capacity)) || Number(formData.capacity) <= 0) {
      newErrors.capacity = 'Capacidade deve ser um número válido';
    }
    
    if (!formData.hourlyRate.trim()) {
      newErrors.hourlyRate = 'Valor por hora é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    console.log('Novo local:', formData);
    navigate('/eventos/locais');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCheckboxChange = (field: 'equipment' | 'amenities', value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  return (
    <BaseFormPage
      title="Cadastrar Novo Local"
      description="Registre um novo local esportivo no sistema"
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
              placeholder="Ex: Quadra de Futebol Society"
              className="h-11"
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">Capacidade (pessoas) *</Label>
            <Input
              id="capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) => handleInputChange('capacity', e.target.value)}
              placeholder="Ex: 22"
              className="h-11"
            />
            {errors.capacity && <p className="text-sm text-red-600">{errors.capacity}</p>}
          </div>

          <div className="md:col-span-2">
            <CampoValor
              id="hourlyRate"
              label="Valor por Hora"
              value={formData.hourlyRate}
              onChange={(value) => handleInputChange('hourlyRate', value)}
              required
            />
            {errors.hourlyRate && <p className="text-sm text-red-600">{errors.hourlyRate}</p>}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Descrição detalhada do local..."
          rows={3}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b">
          <h3 className="text-lg font-semibold text-foreground">Características</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label>Equipamentos Disponíveis</Label>
            <ScrollArea className="h-48 border rounded-lg p-3">
              <div className="space-y-2">
                {equipmentOptions.map((equipment) => (
                  <div key={equipment} className="flex items-center space-x-2">
                    <Checkbox
                      id={`equipment-${equipment}`}
                      checked={formData.equipment.includes(equipment)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('equipment', equipment, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`equipment-${equipment}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {equipment}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="space-y-3">
            <Label>Comodidades</Label>
            <ScrollArea className="h-48 border rounded-lg p-3">
              <div className="space-y-2">
                {amenitiesOptions.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity}`}
                      checked={formData.amenities.includes(amenity)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('amenities', amenity, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`amenity-${amenity}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </BaseFormPage>
  );
};

export default NewVenue;
