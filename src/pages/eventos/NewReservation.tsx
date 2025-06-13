
import EventTimeline from '@/components/EventTimeline';
import ModuleHeader from '@/components/ModuleHeader';
import PageTour, { TourStep } from '@/components/PageTour';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Calendar, Edit, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const NewReservation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    client: '',
    venue: '',
    date: '',
    startTime: '',
    endTime: '',
    notes: '',
    amount: ''
  });

  // Tour steps
  const tourSteps: TourStep[] = [
    {
      target: '[data-tour="form-card"]',
      title: 'Formulário de Reserva',
      content: 'Preencha os dados da reserva aqui. Selecione o cliente, local, data e horários.'
    },
    {
      target: '[data-tour="client-select"]',
      title: 'Seleção de Cliente',
      content: 'Escolha o cliente para esta reserva. Você pode cadastrar novos clientes se necessário.'
    },
    {
      target: '[data-tour="venue-select"]',
      title: 'Local da Reserva',
      content: 'Selecione qual espaço esportivo será reservado para o evento.'
    },
    {
      target: '[data-tour="datetime-inputs"]',
      title: 'Data e Horário',
      content: 'Defina quando a reserva acontecerá. A timeline ao lado mostrará conflitos de horário.'
    },
    {
      target: '[data-tour="timeline"]',
      title: 'Timeline de Eventos',
      content: 'Visualize outros eventos do dia selecionado. Clique nos horários vazios para facilitar o preenchimento.'
    },
    {
      target: '[data-tour="submit-buttons"]',
      title: 'Finalizar Reserva',
      content: 'Após preencher todos os dados, clique em "Criar Reserva" para confirmar.'
    }
  ];

  // Mock events data (in a real app, this would come from a service)
  const mockEventsData = {
    1: { client: 'joao-silva', venue: 'quadra-1', startTime: '08:00', endTime: '10:00', notes: 'Cliente preferencial', amount: '160' },
    2: { client: 'maria-santos', venue: 'campo-futebol', startTime: '14:00', endTime: '15:30', notes: 'Time Unidos', amount: '225' },
    3: { client: 'pedro-costa', venue: 'quadra-2', startTime: '18:00', endTime: '19:00', notes: '', amount: '60' },
    4: { client: 'ana-oliveira', venue: 'campo-futebol', startTime: '20:00', endTime: '22:00', notes: 'Grupo que joga toda semana', amount: '200' }
  };

  // Set date and event from URL parameters when component mounts
  useEffect(() => {
    const dateParam = searchParams.get('date');
    const eventIdParam = searchParams.get('eventId');
    
    if (dateParam) {
      setFormData(prev => ({ ...prev, date: dateParam }));
    }
    
    if (eventIdParam) {
      const eventId = parseInt(eventIdParam);
      const eventData = mockEventsData[eventId as keyof typeof mockEventsData];
      
      if (eventData) {
        setFormData(prev => ({
          ...prev,
          client: eventData.client,
          venue: eventData.venue,
          startTime: eventData.startTime,
          endTime: eventData.endTime,
          notes: eventData.notes,
          amount: eventData.amount,
          date: dateParam || prev.date
        }));
        setIsEditing(true);
        setEditingEventId(eventId);
      }
    }
  }, [searchParams]);

  // Mock events for timeline demonstration
  const mockEvents = [
    { 
      id: 1, 
      client: 'João Silva', 
      venue: 'Quadra 1', 
      startTime: '08:00', 
      endTime: '10:00', 
      status: 'confirmed' as const, 
      color: '#10b981',
      sport: 'Futebol Society'
    },
    { 
      id: 2, 
      client: 'Maria Santos', 
      venue: 'Campo de Futebol', 
      startTime: '14:00', 
      endTime: '15:30', 
      status: 'pending' as const, 
      color: '#f59e0b',
      sport: 'Futebol 11'
    },
    { 
      id: 3, 
      client: 'Pedro Costa', 
      venue: 'Quadra 2', 
      startTime: '18:00', 
      endTime: '20:00', 
      status: 'confirmed' as const, 
      color: '#3b82f6',
      sport: 'Basquete'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isEditing ? 'Editando reserva:' : 'Nova reserva:', formData);
    
    // Reset editing state after save
    if (isEditing) {
      setIsEditing(false);
      setEditingEventId(null);
    }
    
    navigate('/eventos');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTimeSlotClick = (time: string) => {
    if (!isEditing) {
      setFormData(prev => ({ ...prev, startTime: time }));
    }
  };

  const handleEventEdit = (event: any) => {
    // If clicking on the same event that's already being edited, cancel editing
    if (editingEventId === event.id) {
      handleCancelEdit();
      return;
    }

    // Load event data into form
    setFormData({
      client: event.client,
      venue: event.venue,
      date: formData.date, // Keep current date
      startTime: event.startTime,
      endTime: event.endTime,
      notes: event.notes || '',
      amount: '160' // Mock amount
    });
    
    setIsEditing(true);
    setEditingEventId(event.id);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingEventId(null);
    
    // Reset form to initial state
    const dateParam = searchParams.get('date');
    setFormData({
      client: '',
      venue: '',
      date: dateParam || '',
      startTime: '',
      endTime: '',
      notes: '',
      amount: ''
    });
    
    // Update URL to remove eventId parameter
    if (dateParam) {
      navigate(`/eventos/novo?date=${dateParam}`, { replace: true });
    } else {
      navigate('/eventos/novo', { replace: true });
    }
  };

  const handleCancel = () => {
    if (isEditing) {
      handleCancelEdit();
    } else {
      navigate('/eventos');
    }
  };

  // Filter events by selected date
  const eventsForSelectedDate = formData.date 
    ? mockEvents.filter(event => {
        // In a real app, you would filter by actual date
        return true; // For demo, show all events
      })
    : [];

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title={isEditing ? "Editar Reserva" : "Nova Reserva"}
        icon={isEditing ? <Edit className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos"
        backLabel="Eventos"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <PageTour steps={tourSteps} title="Nova Reserva" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <Card className={`border h-fit ${isEditing ? 'ring-2 ring-module-events/100' : ''}`} data-tour="form-card">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Edit className="h-5 w-5" />
                    Editando Reserva
                  </>
                ) : (
                  "Criar Nova Reserva"
                )}
              </CardTitle>
              <CardDescription>
                {isEditing 
                  ? "Atualize os dados da reserva selecionada" 
                  : "Preencha os dados para criar uma nova reserva"
                }
              </CardDescription>
              {isEditing && (
                <div className="bg-module-events/20 p-3 rounded-lg border border-module-events/50 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-module-events/100">
                      Modo de edição ativo para evento selecionado
                    </span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={handleCancelEdit}
                      className="text-module-events/90 hover:bg-module-events/30"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancelar Edição
                    </Button>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2" data-tour="client-select">
                    <Label htmlFor="client">Cliente</Label>
                    <Select value={formData.client} onValueChange={(value) => handleChange('client', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="joao-silva">João Silva</SelectItem>
                        <SelectItem value="maria-santos">Maria Santos</SelectItem>
                        <SelectItem value="pedro-costa">Pedro Costa</SelectItem>
                        <SelectItem value="ana-oliveira">Ana Oliveira</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2" data-tour="venue-select">
                    <Label htmlFor="venue">Local</Label>
                    <Select value={formData.venue} onValueChange={(value) => handleChange('venue', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um local" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quadra-1">Quadra 1</SelectItem>
                        <SelectItem value="quadra-2">Quadra 2</SelectItem>
                        <SelectItem value="campo-futebol">Campo de Futebol</SelectItem>
                        <SelectItem value="quadra-coberta">Quadra Coberta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4" data-tour="datetime-inputs">
                    <div className="space-y-2">
                      <Label htmlFor="date">Data</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Valor (R$)</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        value={formData.amount}
                        onChange={(e) => handleChange('amount', e.target.value)}
                        placeholder="0,00"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startTime">Horário de Início</Label>
                        <Input
                          id="startTime"
                          type="time"
                          value={formData.startTime}
                          onChange={(e) => handleChange('startTime', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="endTime">Horário de Término</Label>
                        <Input
                          id="endTime"
                          type="time"
                          value={formData.endTime}
                          onChange={(e) => handleChange('endTime', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      placeholder="Observações adicionais sobre a reserva..."
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-4 pt-6" data-tour="submit-buttons">
                    <Button type="submit" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      {isEditing ? 'Salvar Alterações' : 'Criar Reserva'}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      {isEditing ? 'Cancelar Edição' : 'Cancelar'}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Timeline */}
          <div className="space-y-4" data-tour="timeline">
            {formData.date ? (
              <EventTimeline
                selectedDate={formData.date}
                events={eventsForSelectedDate}
                onTimeSlotClick={handleTimeSlotClick}
                onEventEdit={handleEventEdit}
                editingEventId={editingEventId}
              />
            ) : (
              <Card className="h-[500px] flex items-center justify-center">
                <CardContent className="text-center">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Selecione uma data</h3>
                  <p className="text-muted-foreground">
                    Escolha uma data no formulário para ver a timeline dos eventos
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewReservation;
