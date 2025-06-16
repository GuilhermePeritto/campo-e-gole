
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import BaseFormPage from '@/components/BaseFormPage';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import CampoValor from '@/core/componentes/CampoValor';

const NewVenue = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    capacity: '',
    hourlyRate: 0,
    description: '',
    equipment: '',
    rules: ''
  });

  const tourSteps: TourStep[] = [
    {
      target: '#name',
      title: 'Nome do Local',
      content: 'Digite um nome identificativo para o local (ex: Quadra A, Campo Principal).'
    },
    {
      target: '#type',
      title: 'Tipo de Local',
      content: 'Selecione o tipo de esporte ou atividade que será praticada neste local.'
    },
    {
      target: '#capacity',
      title: 'Capacidade',
      content: 'Informe a capacidade máxima de pessoas ou jogadores para este local.'
    },
    {
      target: '#hourlyRate',
      title: 'Valor por Hora',
      content: 'Defina o valor padrão cobrado por hora de uso deste local.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Novo local:', formData);
    navigate('/eventos/locais');
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <BaseFormPage
      title="Cadastrar Novo Local"
      description="Registre um novo local disponível para reservas"
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
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ex: Quadra A, Campo Principal"
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Local *</Label>
            <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
              <SelectTrigger id="type" className="h-11">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quadra-futebol">Quadra de Futebol</SelectItem>
                <SelectItem value="campo-society">Campo Society</SelectItem>
                <SelectItem value="quadra-basquete">Quadra de Basquete</SelectItem>
                <SelectItem value="quadra-volei">Quadra de Vôlei</SelectItem>
                <SelectItem value="quadra-tenis">Quadra de Tênis</SelectItem>
                <SelectItem value="salao-eventos">Salão de Eventos</SelectItem>
                <SelectItem value="piscina">Piscina</SelectItem>
                <SelectItem value="campo-futebol">Campo de Futebol</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">Capacidade</Label>
            <Input
              id="capacity"
              value={formData.capacity}
              onChange={(e) => handleChange('capacity', e.target.value)}
              placeholder="Ex: 22 jogadores, 50 pessoas"
              className="h-11"
            />
          </div>

          <CampoValor
            id="hourlyRate"
            label="Valor por Hora"
            value={formData.hourlyRate}
            onChange={(value) => handleChange('hourlyRate', value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição do Local</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Descrição detalhada do local..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="equipment">Equipamentos Disponíveis</Label>
        <Textarea
          id="equipment"
          value={formData.equipment}
          onChange={(e) => handleChange('equipment', e.target.value)}
          placeholder="Liste os equipamentos disponíveis no local..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rules">Regras e Observações</Label>
        <Textarea
          id="rules"
          value={formData.rules}
          onChange={(e) => handleChange('rules', e.target.value)}
          placeholder="Regras de uso, horários especiais, etc..."
          rows={3}
        />
      </div>
    </BaseFormPage>
  );
};

export default NewVenue;
