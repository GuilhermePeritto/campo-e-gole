
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, MapPin, Plus, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const EditVenue = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Mock data - em produção viria de uma API
  const [formData, setFormData] = useState({
    name: 'Quadra A - Futebol Society',
    type: 'Futebol Society',
    capacity: '14',
    hourlyRate: '80.00',
    description: 'Quadra de grama sintética com iluminação LED',
    active: true
  });
  const [equipment, setEquipment] = useState<string[]>(['Traves', 'Redes', 'Bolas']);
  const [newEquipment, setNewEquipment] = useState('');

  const venueTypes = ['Futebol Society', 'Basquete', 'Futebol', 'Futebol 7', 'Vôlei', 'Tênis', 'Outros'];

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
    navigate('/events/venues');
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/events/venues')}
              className="gap-2 text-black hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-green-600" />
              <h1 className="text-2xl font-medium text-black">Editar Local</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Editar Dados do Local</CardTitle>
            <CardDescription className="text-gray-600">
              Atualize as informações do local
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">Nome do Local *</label>
                  <Input
                    placeholder="Ex: Quadra A - Futebol Society"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">Tipo de Esporte *</label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger className="border-gray-300">
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
                  <label className="text-sm font-medium text-black">Capacidade (pessoas) *</label>
                  <Input
                    type="number"
                    placeholder="Ex: 14"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">Valor por Hora (R$) *</label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 80.00"
                    value={formData.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-black">Descrição</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md resize-none h-24"
                  placeholder="Descrição do local (ex: Quadra de grama sintética com iluminação LED)"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-black">Equipamentos Disponíveis</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ex: Traves, Redes, Bolas..."
                    value={newEquipment}
                    onChange={(e) => setNewEquipment(e.target.value)}
                    className="flex-1 border-gray-300"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addEquipment())}
                  />
                  <Button type="button" onClick={addEquipment} variant="outline" className="border-gray-300">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {equipment.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {equipment.map((item, index) => (
                      <div key={index} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => removeEquipment(item)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.active}
                  onCheckedChange={(checked) => handleInputChange('active', checked)}
                />
                <label className="text-sm font-medium text-black">Local ativo</label>
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="submit" className="flex-1 bg-black text-white hover:bg-gray-800">
                  Salvar Alterações
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/events/venues')}
                  className="flex-1 border-gray-300 text-black hover:bg-gray-50"
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
