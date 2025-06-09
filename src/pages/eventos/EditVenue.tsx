
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, MapPin, Palette, Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

  const colorOptions = [
    { name: 'Verde', value: '#10B981' },
    { name: 'Azul', value: '#3B82F6' },
    { name: 'Vermelho', value: '#EF4444' },
    { name: 'Amarelo', value: '#F59E0B' },
    { name: 'Roxo', value: '#8B5CF6' },
    { name: 'Rosa', value: '#EC4899' },
    { name: 'Laranja', value: '#F97316' },
    { name: 'Cinza', value: '#6B7280' }
  ];

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
    <div className="min-h-screen bg-background">
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/eventos/locais')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-semibold">Editar Local</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Editar Dados do Local</CardTitle>
            <CardDescription>
              Atualize as informações do local
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Informações Básicas */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Informações Básicas</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Local *</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Quadra A - Futebol Society"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Esporte *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger>
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
                    <Label htmlFor="capacity">Capacidade (pessoas) *</Label>
                    <Input
                      id="capacity"
                      type="number"
                      placeholder="Ex: 14"
                      value={formData.capacity}
                      onChange={(e) => handleInputChange('capacity', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Valor por Hora (R$) *</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      step="0.01"
                      placeholder="Ex: 80.00"
                      value={formData.hourlyRate}
                      onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                      onBlur={calculatePeakRate}
                      required
                    />
                  </div>
                </div>

                {/* Cor do Local */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    <Label>Cor de Identificação</Label>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => handleInputChange('color', color.value)}
                        className={`w-12 h-12 rounded-lg border-2 transition-all ${
                          formData.color === color.value ? 'border-gray-900 scale-110' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      >
                        {formData.color === color.value && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    A cor será usada para identificar visualmente o local na agenda
                  </p>
                </div>
              </div>

              {/* Características */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Características do Local</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Object.entries(characteristicLabels).map(([key, label]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={characteristics[key as keyof typeof characteristics]}
                        onCheckedChange={(checked) => handleCharacteristicChange(key, checked as boolean)}
                      />
                      <Label
                        htmlFor={key}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Descrição adicional do local (ex: Quadra de grama sintética com iluminação LED)"
                  rows={3}
                />
              </div>

              {/* Equipamentos */}
              <div className="space-y-4">
                <Label>Equipamentos Disponíveis</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ex: Traves, Redes, Bolas..."
                    value={newEquipment}
                    onChange={(e) => setNewEquipment(e.target.value)}
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addEquipment())}
                  />
                  <Button type="button" onClick={addEquipment} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {equipment.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {equipment.map((item, index) => (
                      <div key={index} className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full text-sm">
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => removeEquipment(item)}
                          className="text-muted-foreground hover:text-red-500"
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
                <h3 className="text-lg font-medium">Configuração de Preços</h3>

                <div className="flex items-center justify-between p-4 border rounded-lg">
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="peakHourStart">Início do Horário Nobre</Label>
                      <Input
                        id="peakHourStart"
                        type="time"
                        value={formData.peakHourStart}
                        onChange={(e) => handleInputChange('peakHourStart', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="peakHourEnd">Fim do Horário Nobre</Label>
                      <Input
                        id="peakHourEnd"
                        type="time"
                        value={formData.peakHourEnd}
                        onChange={(e) => handleInputChange('peakHourEnd', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="peakHourRate">Valor Horário Nobre (R$) *</Label>
                      <Input
                        id="peakHourRate"
                        type="number"
                        step="0.01"
                        value={formData.peakHourRate}
                        onChange={(e) => handleInputChange('peakHourRate', e.target.value)}
                        placeholder="Ex: 120.00"
                        required={formData.hasPeakHours}
                      />
                      {formData.hourlyRate && formData.peakHourRate && (
                        <p className="text-xs text-muted-foreground">
                          {(((parseFloat(formData.peakHourRate) / parseFloat(formData.hourlyRate)) - 1) * 100).toFixed(0)}% mais caro
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.active}
                  onCheckedChange={(checked) => handleInputChange('active', checked)}
                />
                <Label>Local ativo</Label>
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="submit" className="flex-1">
                  Salvar Alterações
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/eventos/locais')}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditVenue;
