
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, Clock, MapPin, Users, ArrowLeft, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import PageTour, { TourStep } from '@/components/PageTour';

const NewEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    venue: '',
    date: '',
    startTime: '',
    endTime: '',
    capacity: '',
    price: '',
    type: '',
    status: 'planejado'
  });

  const tourSteps: TourStep[] = [
    {
      target: '#title',
      title: 'Nome do Evento',
      content: 'Digite o nome do evento que será realizado.'
    },
    {
      target: '#description',
      title: 'Descrição',
      content: 'Adicione uma descrição detalhada do evento.'
    },
    {
      target: '#venue',
      title: 'Local',
      content: 'Selecione onde o evento será realizado.'
    },
    {
      target: '#date',
      title: 'Data do Evento',
      content: 'Escolha a data em que o evento acontecerá.'
    },
    {
      target: '#startTime',
      title: 'Horário de Início',
      content: 'Defina o horário de início do evento.'
    },
    {
      target: '#capacity',
      title: 'Capacidade',
      content: 'Informe quantas pessoas podem participar do evento.'
    },
    {
      target: '#price',
      title: 'Valor',
      content: 'Defina o preço do evento ou deixe zero para eventos gratuitos.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.venue || !formData.date) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Evento criado!",
      description: `O evento "${formData.title}" foi criado com sucesso.`,
    });
    navigate('/eventos');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/eventos')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-semibold">Novo Evento</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="relative">
          <PageTour steps={tourSteps} title="Criação de Novo Evento" />
          
          <CardHeader>
            <CardTitle>Criar Novo Evento</CardTitle>
            <CardDescription>
              Preencha as informações para criar um novo evento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Nome do Evento *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Ex: Workshop de React"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Evento</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="palestra">Palestra</SelectItem>
                      <SelectItem value="curso">Curso</SelectItem>
                      <SelectItem value="evento_corporativo">Evento Corporativo</SelectItem>
                      <SelectItem value="festa">Festa</SelectItem>
                      <SelectItem value="reuniao">Reunião</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Descreva o evento..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue">Local *</Label>
                  <Select value={formData.venue} onValueChange={(value) => handleInputChange('venue', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar local" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auditorio_principal">Auditório Principal</SelectItem>
                      <SelectItem value="sala_conferencias">Sala de Conferências</SelectItem>
                      <SelectItem value="quadra_esportiva">Quadra Esportiva</SelectItem>
                      <SelectItem value="salao_eventos">Salão de Eventos</SelectItem>
                      <SelectItem value="area_externa">Área Externa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Data *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startTime">Horário de Início</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">Horário de Término</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacidade</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                    placeholder="Ex: 50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Valor (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="submit" className="flex-1">
                  Criar Evento
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/eventos')}
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

export default NewEvent;
