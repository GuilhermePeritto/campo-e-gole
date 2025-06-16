import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { MapPin, Palette, Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BaseFormPage from '@/components/BaseFormPage';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';
import { Button } from '@/components/ui/button';

const EditVenue = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    name: 'Quadra A - Futebol Society',
    type: 'Futebol Society',
    capacity: '14',
    hourlyRate: '80.00',
    description: 'Quadra de grama sintética com iluminação LED',
    color: '#10B981',
    active: true,
    hasPeakHours: true,
    peakHourRate: '120.00',
    peakHourStart: '18:00',
    peakHourEnd: '22:00'
  });
  
  const [equipment, setEquipment] = useState<string[]>(['Traves', 'Redes', 'Bolas']);
  const [newEquipment, setNewEquipment] = useState('');
  const [characteristics, setCharacteristics] = useState({
    covered: true,
    lighting: true,
    locker_room: false,
    parking: true,
    restroom: true,
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
      content: 'Altere o nome do local conforme necessário para melhor identificação.'
    },
    {
      target: '#type',
      title: 'Tipo de Esporte',
      content: 'Atualize o tipo de esporte se houve mudança na utilização do local.'
    },
    {
      target: '#capacity',
      title: 'Capacidade',
      content: 'Ajuste a capacidade máxima conforme reformas ou mudanças estruturais.'
    },
    {
      target: '#hourlyRate',
      title: 'Valor por Hora',
      content: 'Atualize o preço conforme a política de preços atual.'
    },
    {
      target: '#color',
      title: 'Cor de Identificação',
      content: 'Mude a cor se necessário para melhor organização visual.'
    },
    {
      target: '.characteristics-section',
      title: 'Características',
      content: 'Atualize as características conforme melhorias ou mudanças no local.'
    },
    {
      target: '.peak-hours-section',
      title: 'Horário Nobre',
      content: 'Ajuste os preços e horários nobres conforme demanda atual.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.type || !formData.capacity || !formData.hourlyRate) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, tipo, capacidade e valor por hora.",
        variant: "destructive"
      });
      return;
    }

    if (isNaN(Number(formData.capacity)) || Number(formData.capacity) <= 0) {
      toast({
        title: "Capacidade inválida",
        description: "A capacidade deve ser um número maior que zero.",
        variant: "destructive"
      });
      return;
    }

    if (isNaN(Number(formData.hourlyRate)) || Number(formData.hourlyRate) <= 0) {
      toast({
        title: "Valor inválido",
        description: "O valor por hora deve ser um número maior que zero.",
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

  const handleInputChange = (field: string, value: string | boolean) => {
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
      title="Editar Dados do Local"
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
              placeholder="Ex: Quadra A - Futebol Society"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium">Tipo de Esporte *</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
              <SelectTrigger id="type" className="h-11">
                <SelectValue placeholder="Selecionar tipo" />
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
              placeholder="Ex: 14"
              value={formData.capacity}
              onChange={(e) => handleInputChange('capacity', e.target.value)}
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hourlyRate" className="text-sm font-medium">Valor por Hora (R$) *</Label>
            <Input
              id="hourlyRate"
              type="number"
              step="0.01"
              placeholder="Ex: 80.00"
              value={formData.hourlyRate}
              onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
              onBlur={calculatePeakRate}
              className="h-11"
              required
            />
          </div>
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
                onChange={(e) => handleInputChange('color', e.target.value)}
                className="w-16 h-10 p-1 rounded-lg border cursor-pointer"
              />
              <Input
                type="text"
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
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
      <div className="space-y-6 characteristics-section">
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
          onChange={(e) => handleInputChange('description', e.target.value)}
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
      <div className="space-y-4 peak-hours-section">
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
            onCheckedChange={(checked) => handleInputChange('hasPeakHours', checked)}
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
                onChange={(e) => handleInputChange('peakHourStart', e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="peakHourEnd" className="text-sm font-medium">Fim do Horário Nobre</Label>
              <Input
                id="peakHourEnd"
                type="time"
                value={formData.peakHourEnd}
                onChange={(e) => handleInputChange('peakHourEnd', e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="peakHourRate" className="text-sm font-medium">Valor Horário Nobre (R$) *</Label>
              <Input
                id="peakHourRate"
                type="number"
                step="0.01"
                value={formData.peakHourRate}
                onChange={(e) => handleInputChange('peakHourRate', e.target.value)}
                placeholder="Ex: 120.00"
                className="h-11"
                required={formData.hasPeakHours}
              />
              {formData.hourlyRate && formData.peakHourRate && (
                <p className="text-xs text-green-600 font-medium">
                  {(((parseFloat(formData.peakHourRate) / parseFloat(formData.hourlyRate)) - 1) * 100).toFixed(0)}% mais caro
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/20">
        <Switch
          checked={formData.active}
          onCheckedChange={(checked) => handleInputChange('active', checked)}
        />
        <Label className="font-medium">Local ativo</Label>
        <span className="text-sm text-muted-foreground">
          {formData.active ? 'O local estará disponível para reservas' : 'O local não aparecerá na lista de disponíveis'}
        </span>
      </div>
    </BaseFormPage>
  );
};

export default EditVenue;
