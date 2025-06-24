import EventTimeline from '@/components/EventTimeline';
import ModuleHeader from '@/components/ModuleHeader';
import PageTour, { TourStep } from '@/components/PageTour';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MODULE_COLORS } from '@/constants/moduleColors';
import CampoBusca from '@/core/componentes/CampoBusca';
import CampoValor from '@/core/componentes/CampoValor';
import SeletorData from '@/core/componentes/SeletorData';
import SeletorHora from '@/core/componentes/SeletorHora';
import { Calendar, CreditCard, Edit, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

interface ReservationFormData {
  client: string;
  venue: string;
  date: Date | undefined;
  startTime: string;
  endTime: string;
  notes: string;
  observations: string;
  amount: string;
  recurring: boolean;
  recurringType: string;
  customRecurringDays: string;
  hourlyRate: number;
  totalHours: number;
}

const Reserva = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  // Estado único para controlar edição
  const [isEdit, setIsEdit] = useState(false);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);

  const [formData, setFormData] = useState<ReservationFormData>({
    client: '',
    venue: '',
    date: new Date(),
    startTime: '',
    endTime: '',
    notes: '',
    observations: '',
    amount: '',
    recurring: false,
    recurringType: '',
    customRecurringDays: '',
    hourlyRate: 80,
    totalHours: 0
  });

  // Detectar se é edição baseado no ID na URL
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      setEditingEventId(parseInt(id));
      // Simular carregamento dos dados da reserva
      const mockData = {
        client: 'João Silva',
        venue: 'Quadra A',
        date: new Date('2024-06-15'),
        startTime: '14:00',
        endTime: '16:00',
        notes: 'Reserva para partida de futebol society',
        observations: 'Observações adicionais',
        amount: '160',
        recurring: true,
        recurringType: 'weekly',
        customRecurringDays: '',
        hourlyRate: 80,
        totalHours: 2
      };
      setFormData(mockData);
    } else {
      // Inicializar com parâmetros da URL para nova reserva
      const dateParam = searchParams.get('date');
      if (dateParam) {
        setFormData(prev => ({
          ...prev,
          date: new Date(dateParam)
        }));
      }
    }
  }, [id, searchParams]);

  // Calcular total de horas e valor total
  useEffect(() => {
    if (formData.startTime && formData.endTime) {
      const [startHour, startMinute] = formData.startTime.split(':').map(Number);
      const [endHour, endMinute] = formData.endTime.split(':').map(Number);
      
      const startTotalMinutes = startHour * 60 + startMinute;
      const endTotalMinutes = endHour * 60 + endMinute;
      
      if (endTotalMinutes > startTotalMinutes) {
        const totalMinutes = endTotalMinutes - startTotalMinutes;
        const hours = totalMinutes / 60;
        setFormData(prev => ({ ...prev, totalHours: hours }));
      }
    }
  }, [formData.startTime, formData.endTime]);

  // Atualizar taxa horária baseado no local selecionado
  useEffect(() => {
    const selectedVenue = locaisExemplo.find(v => v.label === formData.venue);
    if (selectedVenue) {
      const rate = selectedVenue.subtitle.includes('R$ 80') ? 80 : 
                   selectedVenue.subtitle.includes('R$ 60') ? 60 : 100;
      setFormData(prev => ({ ...prev, hourlyRate: rate }));
    }
  }, [formData.venue]);

  const totalValue = formData.totalHours * formData.hourlyRate;

  // Dados de exemplo
  const clientesExemplo = [
    { id: '1', label: 'João Silva', subtitle: 'CPF: 123.456.789-00' },
    { id: '2', label: 'Maria Santos', subtitle: 'CPF: 987.654.321-00' },
    { id: '3', label: 'Pedro Costa', subtitle: 'CNPJ: 12.345.678/0001-90' },
  ];

  const locaisExemplo = [
    { id: '1', label: 'Quadra Principal', subtitle: 'Futebol Society - R$ 80/h' },
    { id: '2', label: 'Quadra Coberta', subtitle: 'Basquete - R$ 60/h' },
    { id: '3', label: 'Campo Externo', subtitle: 'Futebol - R$ 100/h' },
  ];

  const recurringOptions = [
    { value: 'daily', label: 'Diário' },
    { value: 'weekly', label: 'Semanal' },
    { value: 'biweekly', label: 'Quinzenal' },
    { value: 'monthly', label: 'Mensal' },
    { value: 'custom', label: 'Personalizado' }
  ];

  // Eventos mockados com horários coerentes aos intervalos dos locais
  const mockEvents = [
    {
      id: 1,
      client: 'João Silva',
      venue: 'Quadra Principal', // 30min intervals
      startTime: '09:00',
      endTime: '10:30',
      status: 'confirmed' as const,
      color: '#10b981',
      sport: 'Futebol Society',
      notes: 'Treino da equipe'
    },
    {
      id: 2,
      client: 'Maria Santos',
      venue: 'Quadra Coberta', // 15min intervals
      startTime: '08:30',
      endTime: '09:15',
      status: 'pending' as const,
      color: '#f59e0b',
      sport: 'Basquete',
      notes: 'Aula particular'
    },
    {
      id: 3,
      client: 'Pedro Costa',
      venue: 'Campo Externo', // 60min intervals
      startTime: '10:00',
      endTime: '12:00',
      status: 'confirmed' as const,
      color: '#3b82f6',
      sport: 'Futebol',
      notes: 'Pelada dos amigos'
    },
    {
      id: 4,
      client: 'Ana Paula',
      venue: 'Quadra Principal', // 30min intervals
      startTime: '14:00',
      endTime: '16:00',
      status: 'confirmed' as const,
      color: '#10b981',
      sport: 'Vôlei',
      notes: 'Treino feminino'
    },
    {
      id: 5,
      client: 'Carlos Mendes',
      venue: 'Campo Externo', // 60min intervals
      startTime: '19:00',
      endTime: '21:00',
      status: 'confirmed' as const,
      color: '#3b82f6',
      sport: 'Futebol',
      notes: 'Jogo oficial'
    },
    {
      id: 6,
      client: 'Julia Rodrigues',
      venue: 'Quadra Coberta', // 15min intervals
      startTime: '15:30',
      endTime: '16:15',
      status: 'pending' as const,
      color: '#f59e0b',
      sport: 'Tênis',
      notes: 'Aula de tênis'
    }
  ];

  const tourSteps: TourStep[] = [
    {
      target: '#client',
      title: 'Cliente',
      content: isEdit ? 'Altere o cliente desta reserva se necessário.' : 'Selecione o cliente que está fazendo a reserva.'
    },
    {
      target: '#venue',
      title: 'Local',
      content: isEdit ? 'Modifique o local da reserva.' : 'Escolha o local que será reservado.'
    },
    {
      target: '#date',
      title: 'Data',
      content: isEdit ? 'Atualize a data da reserva.' : 'Selecione a data da reserva.'
    },
    {
      target: '#startTime',
      title: 'Horário de Início',
      content: isEdit ? 'Ajuste o horário de início.' : 'Defina o horário de início da reserva.'
    },
    {
      target: '#endTime',
      title: 'Horário de Fim',
      content: isEdit ? 'Ajuste o horário de término.' : 'Defina o horário de término da reserva.'
    },
    {
      target: '#amount',
      title: 'Valor',
      content: isEdit ? 'Atualize o valor da reserva.' : 'Informe o valor total da reserva.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isEdit ? 'Editando reserva:' : 'Nova reserva:', formData);
    navigate('/eventos/agenda');
  };

  const handleReserveNow = () => {
    console.log('Reservando e pagando agora:', formData);
    // Aqui você implementaria a lógica de pagamento
    navigate('/eventos/recebiveis/novo?payNow=true');
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
    // Armazena a URL atual para retornar após cadastro
    sessionStorage.setItem('returnUrl', window.location.pathname + window.location.search);
    navigate('/eventos/clientes/novo');
  };

  // Funções para interagir com a timeline
  const handleTimeSlotClick = (time: string) => {
    if (!isEdit) {
      setFormData(prev => ({ ...prev, startTime: time }));
    }
  };

  const handleEventSelect = (event: any) => {
    // Preencher tanto horário inicial quanto final
    setFormData(prev => ({
      ...prev,
      client: event.client,
      venue: event.venue,
      startTime: event.startTime,
      endTime: event.endTime,
      notes: (event as any).notes || event.sport || '',
      observations: (event as any).notes || event.sport || '',
      amount: '160' // Mock amount
    }));

    setIsEdit(true);
    setEditingEventId(event.id);
  };

  const handleEventEdit = (event: any) => {
    // Load event data into form
    setFormData(prev => ({
      ...prev,
      client: event.client,
      venue: event.venue,
      startTime: event.startTime,
      endTime: event.endTime,
      notes: (event as any).notes || event.sport || '',
      observations: (event as any).notes || event.sport || '',
      amount: '160' // Mock amount
    }));

    setIsEdit(true);
    setEditingEventId(event.id);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    setEditingEventId(null);

    // Reset form to initial state if not in URL edit mode
    if (!id) {
      const dateParam = searchParams.get('date');
      setFormData({
        client: '',
        venue: '',
        date: dateParam ? new Date(dateParam) : new Date(),
        startTime: '',
        endTime: '',
        notes: '',
        observations: '',
        amount: '',
        recurring: false,
        recurringType: '',
        customRecurringDays: '',
        hourlyRate: 80,
        totalHours: 0
      });
    }

    if (id) {
      navigate(`/eventos/reserva`);
    }
  };

  const handleCancel = () => {
    navigate('/eventos/agenda');
  };

  // Filter events by selected date and venue
  const selectedDateStr = formData.date ? formData.date.toISOString().split('T')[0] : '';
  
  const pageTitle = isEdit ? "Editar Reserva" : "Nova Reserva";
  const pageIcon = isEdit ? <Edit className="h-6 w-6" /> : <Calendar className="h-6 w-6" />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ModuleHeader
        title={pageTitle}
        icon={pageIcon}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos/agenda"
        backLabel="Agenda"
      />

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-160px)]">
          {/* Formulário */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {isEdit ? 'Editar Reserva' : 'Nova Reserva'}
                </CardTitle>
                {/* Card de informação de edição movido para dentro do formulário */}
                {isEdit && (
                  <div className="bg-module-events/10 border border-module-events/30 rounded-lg p-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Edit className="h-4 w-4 text-module-events/70" />
                        <span className="text-sm font-medium text-module-events/70">
                          Evento em edição - Modifique os campos necessários
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancelEdit}
                        className="h-8 px-3 text-xs"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <CampoBusca
                      id="client"
                      label="Cliente"
                      value={formData.client}
                      onChange={(value) => setFormData(prev => ({ ...prev, client: value }))}
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
                      onClick={() => {
                        sessionStorage.setItem('returnUrl', window.location.pathname + window.location.search);
                        navigate('/eventos/clientes/novo');
                      }}
                      className="h-11 px-3"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CampoBusca
                  id="venue"
                  label="Local"
                  value={formData.venue}
                  onChange={(value) => setFormData(prev => ({ ...prev, venue: value }))}
                  items={locaisExemplo}
                  placeholder="Selecione o local..."
                  required
                />

                <SeletorData
                  id="date"
                  label="Data"
                  value={formData.date}
                  onChange={(date) => setFormData(prev => ({ ...prev, date }))}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <SeletorHora
                    id="startTime"
                    label="Início"
                    value={formData.startTime}
                    onChange={(time) => setFormData(prev => ({ ...prev, startTime: time }))}
                    required
                  />

                  <SeletorHora
                    id="endTime"
                    label="Término"
                    value={formData.endTime}
                    onChange={(time) => setFormData(prev => ({ ...prev, endTime: time }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observations">Observações</Label>
                  <Textarea
                    id="observations"
                    value={formData.observations}
                    onChange={(e) => setFormData(prev => ({ ...prev, observations: e.target.value }))}
                    placeholder="Observações sobre a reserva..."
                    rows={3}
                  />
                </div>

                {/* Totalizador */}
                {formData.totalHours > 0 && (
                  <div className="p-4 bg-muted/30 rounded-lg border">
                    <h3 className="font-semibold mb-3">Resumo da Reserva</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Duração:</span>
                        <span>{formData.totalHours.toFixed(1)} horas</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxa por hora:</span>
                        <span>R$ {formData.hourlyRate.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-base border-t pt-2">
                        <span>Valor Total:</span>
                        <span>R$ {totalValue.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="flex-1"
                    disabled={!formData.client || !formData.venue || !formData.date || !formData.startTime || !formData.endTime}
                  >
                    {isEdit ? 'Atualizar' : 'Salvar'} Reserva
                  </Button>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleReserveNow}
                          className="px-3"
                          disabled={!formData.client || !formData.venue || !formData.date || !formData.startTime || !formData.endTime}
                        >
                          <CreditCard className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Pagar agora</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline com altura fixa e scroll */}
          <div className="lg:sticky lg:top-6">
            <div className="h-[calc(100vh-200px)]">
              <Card className="h-full flex flex-col">
                <CardContent className="p-0 h-full flex flex-col">
                  <EventTimeline
                    selectedDate={formData.date ? formData.date.toISOString().split('T')[0] : ''}
                    events={mockEvents}
                    selectedVenue={formData.venue}
                    onTimeSlotClick={(time) => {
                      if (!isEdit) {
                        setFormData(prev => ({ ...prev, startTime: time }));
                      }
                    }}
                    onEventEdit={(event) => {
                      setFormData(prev => ({
                        ...prev,
                        client: event.client,
                        venue: event.venue,
                        startTime: event.startTime,
                        endTime: event.endTime,
                        notes: (event as any).notes || event.sport || '',
                        observations: (event as any).notes || event.sport || '',
                        amount: '160'
                      }));
                      setIsEdit(true);
                      setEditingEventId(event.id);
                    }}
                    editingEventId={editingEventId}
                    onEventSelect={(event) => {
                      setFormData(prev => ({
                        ...prev,
                        client: event.client,
                        venue: event.venue,
                        startTime: event.startTime,
                        endTime: event.endTime,
                        notes: (event as any).notes || event.sport || '',
                        observations: (event as any).notes || event.sport || '',
                        amount: '160'
                      }));
                      setIsEdit(true);
                      setEditingEventId(event.id);
                    }}
                    onCancelEdit={handleCancelEdit}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reserva;
