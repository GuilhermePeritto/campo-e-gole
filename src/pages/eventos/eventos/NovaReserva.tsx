import BaseFormPage from '@/components/BaseFormPage';
import EventTimeline from '@/components/EventTimeline';
import { TourStep } from '@/components/PageTour';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MODULE_COLORS } from '@/constants/moduleColors';
import CampoBusca from '@/core/componentes/CampoBusca';
import CampoValor from '@/core/componentes/CampoValor';
import SeletorData from '@/core/componentes/SeletorData';
import SeletorHora from '@/core/componentes/SeletorHora';
import { Calendar, Edit, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface ReservationFormData {
  client: string;
  venue: string;
  date: Date | undefined;
  startTime: string;
  endTime: string;
  notes: string;
  amount: string;
  recurring: boolean;
  recurringType: string;
  customRecurringDays: string;
}

const NovaReserva = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Estados para edição
  const [isEditing, setIsEditing] = useState(false);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);

  const [formData, setFormData] = useState<ReservationFormData>({
    client: '',
    venue: '',
    date: new Date(),
    startTime: '',
    endTime: '',
    notes: '',
    amount: '',
    recurring: false,
    recurringType: '',
    customRecurringDays: ''
  });

  // Inicializar com parâmetros da URL
  useEffect(() => {
    const dateParam = searchParams.get('date');
    if (dateParam) {
      setFormData(prev => ({
        ...prev,
        date: new Date(dateParam)
      }));
    }
  }, [searchParams]);

  // Dados de exemplo
  const clientesExemplo = [
    { id: '1', label: 'João Silva', subtitle: 'CPF: 123.456.789-00' },
    { id: '2', label: 'Maria Santos', subtitle: 'CPF: 987.654.321-00' },
    { id: '3', label: 'Pedro Costa', subtitle: 'CNPJ: 12.345.678/0001-90' },
  ];

  const locaisExemplo = [
    { id: '1', label: 'Quadra A', subtitle: 'Futebol Society' },
    { id: '2', label: 'Quadra B', subtitle: 'Basquete' },
    { id: '3', label: 'Campo Principal', subtitle: 'Futebol' },
  ];

  const recurringOptions = [
    { value: 'daily', label: 'Diário' },
    { value: 'weekly', label: 'Semanal' },
    { value: 'biweekly', label: 'Quinzenal' },
    { value: 'monthly', label: 'Mensal' },
    { value: 'custom', label: 'Personalizado' }
  ];

  // Eventos mockados para a timeline
  const mockEvents = [
    {
      id: 1,
      client: 'João Silva',
      venue: 'Quadra A',
      startTime: '09:00',
      endTime: '11:00',
      status: 'confirmed' as const,
      color: '#10b981',
      sport: 'Futebol',
      notes: 'Treino da equipe'
    },
    {
      id: 2,
      client: 'Maria Santos',
      venue: 'Quadra B',
      startTime: '14:00',
      endTime: '16:00',
      status: 'pending' as const,
      color: '#f59e0b',
      sport: 'Basquete',
      notes: 'Aula particular'
    },
    {
      id: 3,
      client: 'Pedro Costa',
      venue: 'Campo Principal',
      startTime: '19:00',
      endTime: '21:00',
      status: 'confirmed' as const,
      color: '#10b981',
      sport: 'Futebol',
      notes: 'Pelada dos amigos'
    }
  ];

  const tourSteps: TourStep[] = [
    {
      target: '#client',
      title: 'Cliente',
      content: 'Selecione o cliente que está fazendo a reserva.'
    },
    {
      target: '#venue',
      title: 'Local',
      content: 'Escolha o local que será reservado.'
    },
    {
      target: '#date',
      title: 'Data',
      content: 'Selecione a data da reserva.'
    },
    {
      target: '#startTime',
      title: 'Horário de Início',
      content: 'Defina o horário de início da reserva.'
    },
    {
      target: '#endTime',
      title: 'Horário de Fim',
      content: 'Defina o horário de término da reserva.'
    },
    {
      target: '#amount',
      title: 'Valor',
      content: 'Informe o valor total da reserva.'
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
    
    navigate('/eventos/eventos');
  };

  const handleClientChange = (value: string, item?: any) => {
    setFormData(prev => ({ ...prev, client: value }));
  };

  const handleVenueChange = (value: string, item?: any) => {
    setFormData(prev => ({ ...prev, venue: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, date }));
  };

  const handleStartTimeChange = (time: string) => {
    setFormData(prev => ({ ...prev, startTime: time }));
  };

  const handleEndTimeChange = (time: string) => {
    setFormData(prev => ({ ...prev, endTime: time }));
  };

  const handleAmountChange = (value: string) => {
    setFormData(prev => ({ ...prev, amount: value }));
  };

  const handleNotesChange = (value: string) => {
    setFormData(prev => ({ ...prev, notes: value }));
  };

  const handleRecurringChange = (checked: boolean) => {
    setFormData(prev => ({ 
      ...prev, 
      recurring: checked,
      recurringType: checked ? prev.recurringType : '',
      customRecurringDays: checked ? prev.customRecurringDays : ''
    }));
  };

  const handleRecurringTypeChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      recurringType: value,
      customRecurringDays: value === 'custom' ? prev.customRecurringDays : ''
    }));
  };

  const handleCustomDaysChange = (value: string) => {
    setFormData(prev => ({ ...prev, customRecurringDays: value }));
  };

  const handleNewClient = () => {
    navigate('/eventos/clientes/novo');
  };

  // Funções para interagir com a timeline
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
    setFormData(prev => ({
      ...prev,
      client: event.client,
      venue: event.venue,
      startTime: event.startTime,
      endTime: event.endTime,
      notes: event.notes || '',
      amount: '160' // Mock amount
    }));
    
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
      date: dateParam ? new Date(dateParam) : new Date(),
      startTime: '',
      endTime: '',
      notes: '',
      amount: '',
      recurring: false,
      recurringType: '',
      customRecurringDays: ''
    });
  };

  const handleCancel = () => {
    if (isEditing) {
      handleCancelEdit();
    } else {
      navigate('/eventos/eventos');
    }
  };

  // Filter events by selected date
  const selectedDateStr = formData.date ? formData.date.toISOString().split('T')[0] : '';
  const eventsForSelectedDate = mockEvents.filter(event => {
    // Mock filtering - in real app, you'd filter by actual date
    return true; // Show all events for demo
  });

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title={isEditing ? "Editar Reserva" : "Nova Reserva"}
        icon={isEditing ? <Edit className="h-5 w-5" /> : <Calendar className="h-5 w-5" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos/eventos"
        backLabel="Agenda"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageTour steps={tourSteps} title="Criação de Nova Reserva" />
        
        {/* Banner de edição */}
        {isEditing && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit className="h-5 w-5 text-blue-700" />
                <span className="text-sm font-medium text-blue-700">
                  Modo de edição ativo para evento selecionado na timeline
                </span>
              </div>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                onClick={handleCancelEdit}
                className="text-blue-700 hover:text-blue-900"
              >
                <X className="h-4 w-4 mr-1" />
                Cancelar Edição
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card do Formulário */}
          <Card className="h-fit">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                {isEditing ? "Editar Reserva" : "Nova Reserva"}
              </CardTitle>
              <CardDescription>
                {isEditing ? "Atualize os dados da reserva selecionada" : "Preencha os dados para criar uma nova reserva"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <CampoBusca
                      id="client"
                      label="Cliente"
                      value={formData.client}
                      onChange={handleClientChange}
                      items={clientesExemplo}
                      placeholder="Digite o nome do cliente..."
                      required
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleNewClient}
                      className="h-11"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CampoBusca
                  id="venue"
                  label="Local"
                  value={formData.venue}
                  onChange={handleVenueChange}
                  items={locaisExemplo}
                  placeholder="Selecione o local..."
                  required
                />

                <SeletorData
                  id="date"
                  label="Data da Reserva"
                  value={formData.date}
                  onChange={handleDateChange}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <SeletorHora
                    id="startTime"
                    label="Horário de Início"
                    value={formData.startTime}
                    onChange={handleStartTimeChange}
                    placeholder="Selecione o horário de início"
                    required
                  />

                  <SeletorHora
                    id="endTime"
                    label="Horário de Fim"
                    value={formData.endTime}
                    onChange={handleEndTimeChange}
                    placeholder="Selecione o horário de fim"
                    required
                  />
                </div>

                <CampoValor
                  id="amount"
                  label="Valor Total"
                  value={formData.amount}
                  onChange={handleAmountChange}
                  required
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="recurring" className="text-sm font-medium">
                      Evento recorrente
                    </Label>
                    <Switch
                      id="recurring"
                      checked={formData.recurring}
                      onCheckedChange={handleRecurringChange}
                    />
                  </div>

                  {formData.recurring && (
                    <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                      <div className="space-y-2">
                        <Label htmlFor="recurringType">Tipo de Recorrência</Label>
                        <Select value={formData.recurringType} onValueChange={handleRecurringTypeChange}>
                          <SelectTrigger id="recurringType" className="h-11">
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            {recurringOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.recurringType === 'custom' && (
                        <div className="space-y-2">
                          <Label htmlFor="customDays">Repetir a cada quantos dias?</Label>
                          <Input
                            id="customDays"
                            type="number"
                            min="1"
                            value={formData.customRecurringDays}
                            onChange={(e) => handleCustomDaysChange(e.target.value)}
                            placeholder="Ex: 3"
                            className="h-11"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium">Observações</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleNotesChange(e.target.value)}
                    placeholder="Observações sobre a reserva..."
                    rows={3}
                    className="resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-6 border-t">
                  <Button type="submit" className="flex-1 h-11 font-medium">
                    {isEditing ? "Salvar Alterações" : "Salvar Reserva"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1 h-11 font-medium"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Timeline Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Agenda do Dia
              </CardTitle>
              <CardDescription>
                Clique em um horário vazio para preenchê-lo ou em um evento para editá-lo
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDateStr ? (
                <EventTimeline
                  selectedDate={selectedDateStr}
                  events={eventsForSelectedDate}
                  onTimeSlotClick={handleTimeSlotClick}
                  onEventEdit={handleEventEdit}
                  editingEventId={editingEventId}
                />
              ) : (
                <div className="h-[400px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Selecione uma data para ver a agenda</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default NovaReserva;
