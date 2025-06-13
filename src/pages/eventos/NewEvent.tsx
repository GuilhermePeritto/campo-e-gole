
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Calendar, Clock, MapPin, Users, DollarSign } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import PageTour, { TourStep } from '@/components/PageTour';

interface EventFormData {
  title: string;
  client: string;
  venue: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: string;
  price: string;
  description: string;
  status: string;
  eventType: string;
}

const NewEvent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedDate = searchParams.get('date') || '';
  const [isLoading, setIsLoading] = useState(false);

  const tourSteps: TourStep[] = [
    {
      target: '#title',
      title: 'Título do Evento',
      content: 'Digite um nome descritivo para o evento (ex: Aniversário João Silva).'
    },
    {
      target: '#client',
      title: 'Cliente',
      content: 'Selecione ou digite o nome do cliente responsável pelo evento.'
    },
    {
      target: '[data-venue-select]',
      title: 'Local',
      content: 'Escolha o local onde o evento será realizado.'
    },
    {
      target: '#date',
      title: 'Data',
      content: 'Selecione a data do evento. Se veio do calendário, já estará preenchida.'
    },
    {
      target: '.time-inputs',
      title: 'Horários',
      content: 'Defina os horários de início e fim do evento.'
    },
    {
      target: '#price',
      title: 'Valor',
      content: 'Informe o valor total do evento.'
    }
  ];

  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    client: '',
    venue: '',
    date: selectedDate,
    startTime: '',
    endTime: '',
    participants: '',
    price: '',
    description: '',
    status: 'confirmed',
    eventType: 'party'
  });

  const venues = [
    'Salão Principal',
    'Área Externa',
    'Salão VIP',
    'Quadra A',
    'Quadra B'
  ];

  const clients = [
    'Maria Silva',
    'João Santos',
    'Ana Costa',
    'Pedro Lima',
    'Sofia Oliveira'
  ];

  const eventTypes = [
    { value: 'party', label: 'Festa' },
    { value: 'wedding', label: 'Casamento' },
    { value: 'corporate', label: 'Corporativo' },
    { value: 'sports', label: 'Esportivo' },
    { value: 'other', label: 'Outros' }
  ];

  const statusOptions = [
    { value: 'confirmed', label: 'Confirmado' },
    { value: 'pending', label: 'Pendente' },
    { value: 'cancelled', label: 'Cancelado' }
  ];

  const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.title.trim() || !formData.client || !formData.venue || !formData.date) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha título, cliente, local e data.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Evento criado com sucesso!",
        description: `Evento "${formData.title}" foi adicionado à agenda.`,
      });
      
      navigate('/eventos/calendario');
    } catch (error) {
      toast({
        title: "Erro ao criar evento",
        description: "Tente novamente em alguns minutos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
              onClick={() => navigate('/eventos/calendario')}
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
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="relative">
          <PageTour steps={tourSteps} title="Criação de Novo Evento" />
          
          <CardHeader>
            <CardTitle>Criar Novo Evento</CardTitle>
            <CardDescription>
              Preencha as informações do evento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título do Evento *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Aniversário João Silva"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventType">Tipo de Evento</Label>
                  <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client">Cliente *</Label>
                  <Select value={formData.client} onValueChange={(value) => handleInputChange('client', value)}>
                    <SelectTrigger id="client">
                      <SelectValue placeholder="Selecionar cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client} value={client}>{client}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue">Local *</Label>
                  <Select value={formData.venue} onValueChange={(value) => handleInputChange('venue', value)}>
                    <SelectTrigger data-venue-select>
                      <SelectValue placeholder="Selecionar local" />
                    </SelectTrigger>
                    <SelectContent>
                      {venues.map((venue) => (
                        <SelectItem key={venue} value={venue}>{venue}</SelectItem>
                      ))}
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
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 time-inputs">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Horário de Início</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">Horário de Término</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="participants">Participantes</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="participants"
                      type="number"
                      placeholder="Ex: 50"
                      value={formData.participants}
                      onChange={(e) => handleInputChange('participants', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Valor (R$)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="Ex: 2500.00"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Observações</Label>
                <Textarea
                  id="description"
                  placeholder="Observações adicionais sobre o evento..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? 'Criando...' : 'Criar Evento'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/eventos/calendario')}
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
