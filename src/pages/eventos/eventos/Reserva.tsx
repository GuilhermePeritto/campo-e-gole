import EventTimeline from '@/components/EventTimeline';
import ModuleHeader from '@/components/ModuleHeader';
import { TourStep } from '@/components/PageTour';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { MODULE_COLORS } from '@/constants/moduleColors';
import CampoBusca from '@/core/componentes/CampoBusca';
import SeletorData from '@/core/componentes/SeletorData';
import SeletorHora from '@/core/componentes/SeletorHora';
import { Calendar, CreditCard, Edit, Plus, X, Repeat } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useClientes } from '@/hooks/useClientes';
import { useLocais } from '@/hooks/useLocais';
import { useReservas } from '@/hooks/useReservas';

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
  totalMinutes: number;
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
    totalHours: 0,
    totalMinutes: 0
  });

  // Hooks de dados
  const { getClientesForSearch, getClienteByClientId } = useClientes();
  const { locais, getLocalByVenueId } = useLocais();
  const { getReservaById, createReserva, updateReserva, getReservasByDate, deleteReserva } = useReservas();

  // Dados usando hooks
  const clientesExemplo = getClientesForSearch();
  const locaisExemplo = locais.map(local => ({
    id: local.id,
    label: local.label,
    subtitle: local.subtitle
  }));

  // Detectar se é edição baseado no ID na URL
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      setEditingEventId(parseInt(id));
      
      // Carregar dados reais da reserva
      const reserva = getReservaById(parseInt(id));
      if (reserva) {
        // Buscar cliente e local pelos IDs corretos
        const cliente = getClienteByClientId(reserva.clientId);
        const local = getLocalByVenueId(reserva.venueId);
        
        const mockData = {
          client: cliente?.id || reserva.clientId, // Usar ID do cliente para funcionar com seleção
          venue: local?.id || reserva.venueId, // Usar ID do local para funcionar com seleção
          date: new Date(reserva.date),
          startTime: reserva.startTime,
          endTime: reserva.endTime,
          notes: reserva.notes || '',
          observations: reserva.notes || '',
          amount: reserva.amount.toString(),
          recurring: false,
          recurringType: '',
          customRecurringDays: '',
          hourlyRate: local?.hourlyRate || 80,
          totalHours: 0,
          totalMinutes: 0
        };
        setFormData(mockData);
      }
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
  }, [id, searchParams, getReservaById, getClienteByClientId, getLocalByVenueId]);

  // Calcular total de horas e minutos
  useEffect(() => {
    if (formData.startTime && formData.endTime) {
      const [startHour, startMinute] = formData.startTime.split(':').map(Number);
      const [endHour, endMinute] = formData.endTime.split(':').map(Number);
      
      const startTotalMinutes = startHour * 60 + startMinute;
      const endTotalMinutes = endHour * 60 + endMinute;
      
      if (endTotalMinutes > startTotalMinutes) {
        const totalMinutes = endTotalMinutes - startTotalMinutes;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const decimalHours = totalMinutes / 60;
        
        setFormData(prev => ({ 
          ...prev, 
          totalHours: decimalHours,
          totalMinutes: totalMinutes
        }));
      }
    }
  }, [formData.startTime, formData.endTime]);

  // Atualizar taxa horária baseado no local selecionado
  useEffect(() => {
    const selectedVenue = locais.find(v => v.id === formData.venue);
    if (selectedVenue) {
      setFormData(prev => ({ ...prev, hourlyRate: selectedVenue.hourlyRate }));
    }
  }, [formData.venue, locais]);

  const totalValue = formData.totalHours * formData.hourlyRate;

  // Formatar duração em horas e minutos
  const formatDuration = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    if (hours === 0) {
      return `${minutes} minutos`;
    } else if (minutes === 0) {
      return `${hours} hora${hours > 1 ? 's' : ''}`;
    } else {
      return `${hours}h ${minutes}min`;
    }
  };

  const recurringOptions = [
    { value: 'daily', label: 'Diário' },
    { value: 'weekly', label: 'Semanal' },
    { value: 'biweekly', label: 'Quinzenal' },
    { value: 'monthly', label: 'Mensal' },
    { value: 'custom', label: 'Personalizado' }
  ];

  // Obter horários ocupados para o local e data selecionados
  const getOccupiedTimes = () => {
    if (!formData.venue || !formData.date) return [];
    
    const selectedDateStr = formData.date.toISOString().split('T')[0];
    const reservationsForDate = getReservasByDate(selectedDateStr);
    
    // Buscar local pelos dados de locais
    const selectedVenue = locais.find(l => l.id === formData.venue);
    
    if (!selectedVenue) return [];
    
    const venueReservations = reservationsForDate.filter(r => r.venueId === selectedVenue.id);
    
    // Se estamos editando, excluir a reserva atual dos ocupados
    const filteredReservations = isEdit 
      ? venueReservations.filter(r => r.id !== parseInt(id || '0'))
      : venueReservations;
    
    const occupiedTimes = [];
    
    for (const reservation of filteredReservations) {
      const startMinutes = timeToMinutes(reservation.startTime);
      const endMinutes = timeToMinutes(reservation.endTime);
      
      for (let minutes = startMinutes; minutes < endMinutes; minutes += selectedVenue.interval) {
        const hour = Math.floor(minutes / 60);
        const minute = minutes % 60;
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        occupiedTimes.push(timeString);
      }
    }
    
    return occupiedTimes;
  };

  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Obter configurações do local selecionado
  const getSelectedVenueConfig = () => {
    const selectedVenue = locais.find(l => l.id === formData.venue);
    return selectedVenue ? {
      interval: selectedVenue.interval,
      minTime: selectedVenue.openTime || "07:00",
      maxTime: selectedVenue.closeTime || "21:00"
    } : {
      interval: 30,
      minTime: "07:00",
      maxTime: "21:00"
    };
  };

  const venueConfig = getSelectedVenueConfig();
  const occupiedTimes = getOccupiedTimes();

  // Eventos mockados usando hook - mapeando corretamente para o timeline
  const selectedDateStr = formData.date ? formData.date.toISOString().split('T')[0] : '';
  const mockEvents = getReservasByDate(selectedDateStr).map(reservation => ({
    id: reservation.id,
    client: reservation.client,
    venue: reservation.venue,
    startTime: reservation.startTime,
    endTime: reservation.endTime,
    status: reservation.status,
    color: reservation.color,
    sport: reservation.sport || '',
    notes: reservation.notes || ''
  }));

  // Obter o nome do local selecionado para passar para a timeline
  const getSelectedVenueName = () => {
    const selectedVenue = locais.find(l => l.id === formData.venue);
    return selectedVenue?.label || '';
  };

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
    
    if (isEdit && id) {
      // Atualizar reserva existente
      const updateData = {
        clientId: formData.client,
        venueId: formData.venue,
        date: formData.date?.toISOString().split('T')[0] || '',
        startTime: formData.startTime,
        endTime: formData.endTime,
        notes: formData.observations,
        amount: parseFloat(formData.amount) || totalValue
      };
      updateReserva(parseInt(id), updateData);
      console.log('Editando reserva:', updateData);
    } else {
      // Criar nova reserva
      const cliente = getClienteByClientId(formData.client);
      const local = getLocalByVenueId(formData.venue);
      
      const newReservaData = {
        client: cliente?.name || formData.client,
        clientId: formData.client,
        venue: local?.label || formData.venue,
        venueId: formData.venue,
        date: formData.date?.toISOString().split('T')[0] || '',
        startTime: formData.startTime,
        endTime: formData.endTime,
        status: 'confirmed' as const,
        color: local?.color || '#10b981',
        sport: '',
        notes: formData.observations,
        amount: parseFloat(formData.amount) || totalValue
      };
      createReserva(newReservaData);
      console.log('Nova reserva:', newReservaData);
    }
    
    navigate('/eventos/agenda');
  };

  const handleReserveNow = () => {
    console.log('Reservando e pagando agora:', formData);
    navigate('/eventos/recebiveis/novo?payNow=true');
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    setEditingEventId(null);

    if (!id) {
      // Se não há ID na URL, limpar formulário mas manter data se veio dos parâmetros
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
        totalHours: 0,
        totalMinutes: 0
      });
    } else {
      // Se há ID na URL, navegar de volta para nova reserva
      navigate(`/eventos/reserva`);
    }
  };

  const handleCancel = () => {
    navigate('/eventos/agenda');
  };
  
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-180px)]">
          {/* Formulário */}
          <div className="space-y-4 flex flex-col">
            <Card className={`${isEdit ? 'border-module-events/90 border border-2 rounded-lg' : ''} flex-1 flex flex-col`}>
              <CardHeader className="flex-shrink-0">
                {isEdit && (
                  <div className="bg-module-events/10 border border-module-events/30 rounded-lg p-2">
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
                        className="h-8 px-3 text-xs text-module-events/70 hover:bg-module-events/20 bg-transparent border-module-events/30"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4 flex-1 overflow-y-auto">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <CampoBusca
                      id="client"
                      label="Cliente"
                      value={formData.client}
                      onChange={(value, item) => {
                        setFormData(prev => ({ ...prev, client: item?.id || value }));
                      }}
                      items={clientesExemplo}
                      displayField="label"
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
                  onChange={(value, item) => {
                    setFormData(prev => ({ 
                      ...prev, 
                      venue: item?.id || value,
                      startTime: '', // Reset horários quando trocar local
                      endTime: ''
                    }));
                  }}
                  items={locaisExemplo}
                  displayField="label"
                  placeholder="Selecione o local..."
                  required
                />

                <SeletorData
                  id="date"
                  label="Data"
                  value={formData.date}
                  onChange={(date) => setFormData(prev => ({ 
                    ...prev, 
                    date,
                    startTime: '', // Reset horários quando trocar data
                    endTime: ''
                  }))}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <SeletorHora
                    id="startTime"
                    label="Início"
                    value={formData.startTime}
                    onChange={(time) => setFormData(prev => ({ ...prev, startTime: time }))}
                    interval={venueConfig.interval}
                    minTime={venueConfig.minTime}
                    maxTime={venueConfig.maxTime}
                    occupiedTimes={occupiedTimes}
                    venueSelected={!!formData.venue}
                    dateSelected={!!formData.date}
                    required
                  />

                  <SeletorHora
                    id="endTime"
                    label="Término"
                    value={formData.endTime}
                    onChange={(time) => setFormData(prev => ({ ...prev, endTime: time }))}
                    interval={venueConfig.interval}
                    minTime={venueConfig.minTime}
                    maxTime={venueConfig.maxTime}
                    occupiedTimes={occupiedTimes}
                    venueSelected={!!formData.venue}
                    dateSelected={!!formData.date}
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

                {/* Seção de evento recorrente melhorada */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                        <Repeat className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <Label htmlFor="recurring" className="text-sm font-semibold text-blue-900 dark:text-blue-100 cursor-pointer">
                          Evento Recorrente
                        </Label>
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                          Criar várias reservas baseadas em um padrão
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="recurring"
                      checked={formData.recurring}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, recurring: checked }))}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>
                  
                  {formData.recurring && (
                    <div className="space-y-4 p-4 border rounded-lg bg-blue-50/30 dark:bg-blue-950/10">
                      <div className="space-y-2">
                        <Label htmlFor="recurringType" className="text-sm font-medium">
                          Frequência de repetição
                        </Label>
                        <Select 
                          value={formData.recurringType} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, recurringType: value }))}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a frequência..." />
                          </SelectTrigger>
                          <SelectContent>
                            {recurringOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {formData.recurringType === 'custom' && (
                        <div className="space-y-2">
                          <Label htmlFor="customRecurringDays" className="text-sm font-medium">
                            Dias personalizados
                          </Label>
                          <Input
                            id="customRecurringDays"
                            value={formData.customRecurringDays}
                            onChange={(e) => setFormData(prev => ({ ...prev, customRecurringDays: e.target.value }))}
                            placeholder="Ex: Segunda, Quarta, Sexta"
                            className="w-full"
                          />
                          <p className="text-xs text-muted-foreground">
                            Especifique os dias da semana separados por vírgula
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {formData.totalMinutes > 0 && (
                  <div className="p-4 bg-muted/30 rounded-lg border">
                    <h3 className="font-semibold mb-3">Resumo da Reserva</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Duração:</span>
                        <span>{formatDuration(formData.totalMinutes)}</span>
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

          {/* Timeline com altura flexível que acompanha o formulário */}
          <div className="flex flex-col">
            <Card className="flex-1 flex flex-col">
              <CardContent className="h-full p-0 flex flex-col">
                <EventTimeline
                  selectedDate={selectedDateStr}
                  events={mockEvents}
                  selectedVenue={getSelectedVenueName()}
                  onTimeSlotClick={(time) => {
                    if (!isEdit) {
                      setFormData(prev => ({ ...prev, startTime: time }));
                    }
                  }}
                  onEventEdit={(event) => {
                    const selectedClient = getClienteByClientId(event.client);
                    
                    setFormData(prev => ({
                      ...prev,
                      client: selectedClient?.id || event.client,
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
                    const selectedClient = getClienteByClientId(event.client);
                    
                    setFormData(prev => ({
                      ...prev,
                      client: selectedClient?.id || event.client,
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
                  onDeleteEvent={deleteReserva}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reserva;
