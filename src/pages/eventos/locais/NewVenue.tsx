
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Palette, Plus, X } from 'lucide-react';
import BaseFormPage from '@/components/BaseFormPage';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import CampoValor from '@/core/componentes/CampoValor';

const NewVenue = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    capacity: '',
    hourlyRate: '',
    description: '',
    color: '#10B981',
    active: true,
    hasPeakHours: false,
    peakHourRate: '',
    peakHourStart: '18:00',
    peakHourEnd: '22:00'
  });

  const [equipment, setEquipment] = useState<string[]>([]);
  const [newEquipment, setNewEquipment] = useState('');
  const [characteristics, setCharacteristics] = useState({
    covered: false,
    lighting: false,
    locker_room: false,
    parking: false,
    restroom: false,
    snack_bar: false,
    sound_system: false,
    air_conditioning: false
  });

  const venueTypes = ['Futebol Society', 'Basquete', 'Futebol', 'Futebol 7', 'Vôlei', 'Tênis', 'Beach Tennis', 'Futvolei', 'Outros'];

  const characteristicLabels = {
    covered: 'Quadra coberta',
    lighting: 'Iluminação artificial',
    locker_room: 'Vestiário',
    parking: 'Estacionamento',
    restroom: 'Banheiros',
    snack_bar: 'Lanchonete',
    sound_system: 'Som ambiente',
    air_conditioning: 'Ar condicionado'
  };

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
    },
    {
      target: '#color',
      title: 'Cor de Identificação',
      content: 'Escolha uma cor para identificar visualmente o local na agenda.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Novo local:', formData, { equipment, characteristics });
    navigate('/eventos/locais');
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCharacteristicChange = (characteristic: string, checked: boolean) => {
    setCharacteristics(prev => ({ ...prev, [characteristic]: checked }));
  };

  const addEquipment = () => {
    if (newEquipment.trim() && !equipment.includes(newEquipment.trim())) {
      setEquipment([...equipment, newEquipment.trim()]);
      setNewEquipment('');
    }
  };

  const removeEquipment = (item: string) => {
    setEquipment(equipment.filter(eq => eq !== item));
  };

  const calculatePeakRate = () => {
    if (formData.hourlyRate && !formData.peakHourRate) {
      const baseRate = parseFloat(formData.hourlyRate);
      const peakRate = baseRate * 1.5; // 50% a mais
      setFormData(prev => ({ ...prev, peakHourRate: peakRate.toFixed(2) }));
    }
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
      {/* Informações Básicas */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b">
          <h3 className="text-lg font-semibold text-foreground">Informações Básicas</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Nome do Local *</Label>
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
            <Label htmlFor="type" className="text-sm font-medium">Tipo de Esporte *</Label>
            <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
              <SelectTrigger id="type" className="h-11">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {venueTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity" className="text-sm font-medium">Capacidade (pessoas) *</Label>
            <Input
              id="capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) => handleChange('capacity', e.target.value)}
              placeholder="Ex: 14"
              className="h-11"
              required
            />
          </div>

          <CampoValor
            id="hourlyRate"
            label="Valor por Hora"
            value={formData.hourlyRate}
            onChange={(value) => handleChange('hourlyRate', value)}
            onBlur={calculatePeakRate}
            required
          />
        </div>

        {/* Seletor de Cor RGB */}
        <div className="space-y-3 p-4 bg-muted/30 rounded-lg border">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-primary" />
            <Label htmlFor="color" className="text-sm font-medium">Cor de Identificação</Label>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Input
                id="color"
                type="color"
                value={formData.color}
                onChange={(e) => handleChange('color', e.target.value)}
                className="w-16 h-10 p-1 rounded-lg border cursor-pointer"
              />
              <Input
                type="text"
                value={formData.color}
                onChange={(e) => handleChange('color', e.target.value)}
                placeholder="#10B981"
                className="font-mono text-sm w-32"
              />
            </div>
            <div 
              className="w-12 h-10 rounded-lg border-2 border-gray-300 shadow-sm"
              style={{ backgroundColor: formData.color }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            A cor será usada para identificar visualmente o local na agenda
          </p>
        </div>
      </div>

      {/* Características */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b">
          <h3 className="text-lg font-semibold text-foreground">Características do Local</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(characteristicLabels).map(([key, label]) => (
            <div key={key} className="flex items-center space-x-2 p-2 hover:bg-muted/30 rounded-md transition-colors">
              <Checkbox
                id={key}
                checked={characteristics[key as keyof typeof characteristics]}
                onCheckedChange={(checked) => handleCharacteristicChange(key, checked as boolean)}
              />
              <Label
                htmlFor={key}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Descrição */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Descrição adicional do local (ex: Quadra de grama sintética com iluminação LED)"
          rows={3}
          className="resize-none"
        />
      </div>

      {/* Equipamentos */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Equipamentos Disponíveis</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Ex: Traves, Redes, Bolas..."
            value={newEquipment}
            onChange={(e) => setNewEquipment(e.target.value)}
            className="flex-1 h-11"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addEquipment())}
          />
          <Button type="button" onClick={addEquipment} variant="outline" className="h-11 px-4">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {equipment.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {equipment.map((item, index) => (
              <div key={index} className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm border">
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => removeEquipment(item)}
                  className="text-primary/70 hover:text-red-500 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preços */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b">
          <h3 className="text-lg font-semibold text-foreground">Configuração de Preços</h3>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
          <div className="space-y-1">
            <div className="font-medium">Horário Nobre</div>
            <div className="text-sm text-muted-foreground">
              Ativar preços diferenciados para horários de maior demanda
            </div>
          </div>
          <Switch
            checked={formData.hasPeakHours}
            onCheckedChange={(checked) => handleChange('hasPeakHours', checked)}
          />
        </div>

        {formData.hasPeakHours && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg border">
            <div className="space-y-2">
              <Label htmlFor="peakHourStart" className="text-sm font-medium">Início do Horário Nobre</Label>
              <Input
                id="peakHourStart"
                type="time"
                value={formData.peakHourStart}
                onChange={(e) => handleChange('peakHourStart', e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="peakHourEnd" className="text-sm font-medium">Fim do Horário Nobre</Label>
              <Input
                id="peakHourEnd"
                type="time"
                value={formData.peakHourEnd}
                onChange={(e) => handleChange('peakHourEnd', e.target.value)}
                className="h-11"
              />
            </div>
            <CampoValor
              id="peakHourRate"
              label="Valor Horário Nobre"
              value={formData.peakHourRate}
              onChange={(value) => handleChange('peakHourRate', value)}
              required={formData.hasPeakHours}
            />
            {formData.hourlyRate && formData.peakHourRate && (
              <p className="text-xs text-green-600 font-medium md:col-span-3">
                {(((parseFloat(formData.peakHourRate) / parseFloat(formData.hourlyRate)) - 1) * 100).toFixed(0)}% mais caro que o horário normal
              </p>
            )}
          </div>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/20">
        <Switch
          checked={formData.active}
          onCheckedChange={(checked) => handleChange('active', checked)}
        />
        <Label className="font-medium">Local ativo</Label>
        <span className="text-sm text-muted-foreground">
          {formData.active ? 'O local estará disponível para reservas' : 'O local não aparecerá na lista de disponíveis'}
        </span>
      </div>
    </BaseFormPage>
  );
};

export default NewVenue;
