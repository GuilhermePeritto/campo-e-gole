import EventTimeline from '@/components/EventTimeline';
import ModuleHeader from '@/components/ModuleHeader';
import PageTour, { TourStep } from '@/components/PageTour';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MODULE_COLORS } from '@/constants/moduleColors';
import CampoBusca from '@/core/componentes/CampoBusca';
import SeletorData from '@/core/componentes/SeletorData';
import SeletorHora from '@/core/componentes/SeletorHora';
import { useClientes } from '@/hooks/useClientes';
import { useEventos } from '@/hooks/useEventos';
import { useLocais } from '@/hooks/useLocais';
import type { Evento } from '@/types/eventos';
import { Calendar, CreditCard, Edit, Plus, Repeat, X } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

interface EventoFormData {
  clienteId: string;
  localId: string;
  data: Date | undefined;
  horaInicio: string;
  horaFim: string;
  modalidade: string;
  observacoes: string;
  valor: string;
  recorrente: boolean;
  tipoRecorrencia: string;
  diasRecorrenciaPersonalizada: string;
  valorHora: number;
  totalHoras: number;
  totalMinutos: number;
}

interface TimelineState {
  selectedDate: string;
  selectedVenue: string;
  loading: boolean;
  events: Evento[];
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const Evento = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const isEdit = !!id;

  // ===== HOOKS =====
  const { eventos, loading: eventosLoading, criar, editar, deletar } = useEventos();
  const { clientes, loading: clientesLoading, getClienteByClientId, getClientesForSearch, loadClienteById } = useClientes();
  const { locais, loading: locaisLoading, buscarPorId, loadLocalById } = useLocais();

  // ===== ESTADOS =====
  const [formData, setFormData] = useState<EventoFormData>(() => ({
    clienteId: '',
    localId: '',
    data: searchParams.get('date') ? new Date(searchParams.get('date')!) : new Date(),
    horaInicio: '',
    horaFim: '',
    modalidade: '',
    observacoes: '',
    valor: '',
    recorrente: false,
    tipoRecorrencia: '',
    diasRecorrenciaPersonalizada: '',
    valorHora: 80,
    totalHoras: 0,
    totalMinutos: 0
  }));

  const [timelineState, setTimelineState] = useState<TimelineState>({
    selectedDate: new Date().toISOString().split('T')[0],
    selectedVenue: '',
    loading: false,
    events: []
  });

  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);


  // ===== DADOS PROCESSADOS =====
  const clientesExemplo = useMemo(() => getClientesForSearch(), [getClientesForSearch]);
  
  const locaisExemplo = useMemo(() => locais.map(local => ({
    id: local.id,
    label: local.nome,
    subtitle: local.tipo,
    cor: local.cor
  })), [locais]);

  // Carregar dados do evento quando há ID na URL (modo edição)
  const eventoParaEdicao = useMemo(() => {
    if (isEdit && id && !eventosLoading && eventos.length > 0) {
      return eventos.find(e => e.id === id);
    }
    return null;
  }, [isEdit, id, eventos, eventosLoading]);



  const selectedVenueConfig = useMemo(() => 
    buscarPorId(formData.localId), [formData.localId, buscarPorId]
  );

  const selectedDateStr = useMemo(() => 
    formData.data?.toISOString().split('T')[0] || '', [formData.data]
  );

  // ===== CÁLCULOS =====
  const totalValue = useMemo(() => {
    if (!formData.totalMinutos || !formData.valorHora) return 0;
    return (formData.totalMinutos / 60) * formData.valorHora;
  }, [formData.totalMinutos, formData.valorHora]);

  // ===== FUNÇÕES AUXILIARES =====
  const formatDuration = useCallback((minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h${mins > 0 ? ` ${mins}min` : ''}`;
  }, []);

  const calculateEndTime = useCallback((startTime: string, localId: string) => {
    if (!startTime) return '';
    
    const local = buscarPorId(localId);
    const defaultDuration = local?.intervalo || 60;
    
    const [hours, minutes] = startTime.split(':').map(Number);
    const endMinutes = hours * 60 + minutes + defaultDuration;
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    
    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
  }, [buscarPorId]);

  const getLocalByName = useCallback((name: string) => {
    return locais.find(l => l.nome === name);
  }, [locais]);

  // ===== TIMELINE =====
  const timelineEvents = useMemo(() => {
    if (!timelineState.selectedDate || !timelineState.selectedVenue) return [];
    
    return eventos
      .filter(evento => 
        evento.data === timelineState.selectedDate && 
        evento.local === timelineState.selectedVenue
      )
      .map(evento => ({
        id: parseInt(evento.id),
        client: evento.cliente,
        venue: evento.local,
        startTime: evento.horaInicio,
        endTime: evento.horaFim,
        status: evento.status === 'confirmado' ? 'confirmed' as const : evento.status === 'pendente' ? 'pending' as const : 'cancelled' as const,
        color: evento.cor,
        sport: evento.modalidade || ''
      }));
  }, [eventos, timelineState.selectedDate, timelineState.selectedVenue]);

  const occupiedTimes = useMemo(() => {
    return timelineEvents.map(evento => ({
      start: evento.startTime,
      end: evento.endTime,
      id: evento.id
    }));
  }, [timelineEvents]);

  const updateTimelineState = useCallback((venueName: string, dateStr: string) => {
    setTimelineState(prev => ({
      ...prev,
      selectedVenue: venueName,
      selectedDate: dateStr,
      loading: false
    }));
  }, []);

  // ===== EFEITOS =====
  // Carregar dados do evento quando há ID na URL (modo edição) - executa apenas uma vez
  useEffect(() => {
    if (eventoParaEdicao && !isEditMode) {
      setFormData(prev => ({
        ...prev,
        clienteId: eventoParaEdicao.clienteId,
        localId: eventoParaEdicao.localId,
        data: new Date(eventoParaEdicao.data),
        horaInicio: eventoParaEdicao.horaInicio,
        horaFim: eventoParaEdicao.horaFim,
        modalidade: eventoParaEdicao.modalidade || '',
        observacoes: eventoParaEdicao.observacoes || '',
        valor: eventoParaEdicao.valor.toString(),
        valorHora: 80
      }));
      setIsEditMode(true);
      setEditingEventId(eventoParaEdicao.id);
      
      // Atualizar timeline com os dados do evento
      const local = buscarPorId(eventoParaEdicao.localId);
      if (local) {
        updateTimelineState(local.nome, eventoParaEdicao.data);
      }
    }
  }, [eventoParaEdicao, isEditMode, buscarPorId, updateTimelineState]);


  // Atualizar valor por hora quando o local é selecionado
  useEffect(() => {
    if (selectedVenueConfig) {
      setFormData(prev => ({ ...prev, valorHora: selectedVenueConfig.valorHora }));
    }
  }, [selectedVenueConfig]);



  // Calcular duração quando os horários mudam
  useEffect(() => {
    if (formData.horaInicio && formData.horaFim) {
      const [startHours, startMinutes] = formData.horaInicio.split(':').map(Number);
      const [endHours, endMinutes] = formData.horaFim.split(':').map(Number);
      
      const startTotal = startHours * 60 + startMinutes;
      const endTotal = endHours * 60 + endMinutes;
      const diff = endTotal - startTotal;
      
      if (diff > 0) {
        setFormData(prev => ({
          ...prev,
          totalMinutos: diff,
          totalHoras: diff / 60
        }));
      }
    }
  }, [formData.horaInicio, formData.horaFim]);

  // ===== HANDLERS DA TIMELINE =====
  const handleTimelineTimeSlotClick = useCallback((time: string) => {
    const endTime = calculateEndTime(time, formData.localId);
    setFormData(prev => ({
      ...prev,
      horaInicio: time,
      horaFim: endTime
    }));
  }, [calculateEndTime, formData.localId]);

  const handleTimelineEventEdit = useCallback((event: { id: number; client: string; venue: string; startTime: string; endTime: string; sport?: string }) => {
    // Buscar o evento original pelo ID
    const originalEvent = eventos.find(e => e.id === event.id.toString());
    if (!originalEvent) return;
    
    const eventVenue = locais.find(l => l.nome === event.venue);
    const selectedClient = getClienteByClientId(originalEvent.clienteId);
    
    setFormData(prev => ({
      ...prev,
      clienteId: originalEvent.clienteId,
      localId: originalEvent.localId,
      horaInicio: event.startTime,
      horaFim: event.endTime,
      modalidade: event.sport || '',
      observacoes: originalEvent.observacoes || '',
      valor: originalEvent.valor.toString()
    }));
    
    setIsEditMode(true);
    setEditingEventId(originalEvent.id);
  }, [eventos, locais, getClienteByClientId]);

  const handleTimelineEventSelect = useCallback((event: { id: number; client: string; venue: string; startTime: string; endTime: string; sport?: string }) => {
    handleTimelineEventEdit(event);
  }, [handleTimelineEventEdit]);

  const handleTimelineCancelEdit = useCallback(() => {
    setIsEditMode(false);
    setEditingEventId(null);

    if (!id) {
      const dateParam = searchParams.get('date');
      setFormData(prev => ({
        ...prev,
        clienteId: '',
        localId: '',
        data: dateParam ? new Date(dateParam) : new Date(),
        horaInicio: '',
        horaFim: '',
        modalidade: '',
        observacoes: '',
        valor: '',
        recorrente: false,
        tipoRecorrencia: '',
        diasRecorrenciaPersonalizada: '',
        valorHora: 80,
        totalHoras: 0,
        totalMinutos: 0
      }));
    } else {
      navigate(`/eventos/evento`);
    }
  }, [id, searchParams, navigate]);

  const handleTimelineDeleteEvent = useCallback((eventId: number) => {
    return deletar(String(eventId));
  }, [deletar]);

  // ===== HANDLERS DE FORMULÁRIO =====
  const handleVenueChange = useCallback((value: string, item: { id: string; label: string } | undefined) => {
    const venueId = item?.id || value;
    const venueName = item?.label || '';
    
    setFormData(prev => ({ 
      ...prev, 
      localId: venueId,
      horaInicio: '',
      horaFim: ''
    }));

    updateTimelineState(venueName, selectedDateStr);
  }, [selectedDateStr, updateTimelineState]);

  const handleDateChange = useCallback((date: Date | undefined) => {
    setFormData(prev => ({ 
      ...prev, 
      data: date,
      horaInicio: '',
      horaFim: ''
    }));

    if (date) {
      const dateStr = date.toISOString().split('T')[0];
      const venueName = selectedVenueConfig?.nome || '';
      updateTimelineState(venueName, dateStr);
    }
  }, [selectedVenueConfig, updateTimelineState]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEdit && id) {
      const updateData = {
        clienteId: formData.clienteId,
        localId: formData.localId,
        data: formData.data?.toISOString().split('T')[0] || '',
        horaInicio: formData.horaInicio,
        horaFim: formData.horaFim,
        modalidade: formData.modalidade,
        observacoes: formData.observacoes,
        valor: parseFloat(formData.valor) || totalValue
      };
      editar(id, updateData);
    } else {
      const cliente = getClienteByClientId(formData.clienteId);
      const local = buscarPorId(formData.localId);
      
      const newEventoData = {
        clienteId: formData.clienteId,
        cliente: cliente?.name || formData.clienteId,
        localId: formData.localId,
        local: local?.nome || formData.localId,
        data: formData.data?.toISOString().split('T')[0] || '',
        horaInicio: formData.horaInicio,
        horaFim: formData.horaFim,
        status: 'confirmado' as const,
        cor: local?.cor || '#10b981',
        modalidade: formData.modalidade,
        observacoes: formData.observacoes,
        valor: parseFloat(formData.valor) || totalValue,
        criadoEm: new Date().toISOString().split('T')[0]
      };
      criar(newEventoData);
    }
    
    navigate('/eventos/agenda');
  }, [isEdit, id, formData, totalValue, editar, getClienteByClientId, buscarPorId, criar, navigate]);

  const handleReserveNow = useCallback(() => {
    sessionStorage.setItem('returnUrl', window.location.pathname + window.location.search);
    navigate('/eventos/recebiveis/novo?payNow=true');
  }, [navigate]);

  const handleCancel = useCallback(() => {
    navigate('/eventos/agenda');
  }, [navigate]);

  // ===== CONFIGURAÇÕES =====
  const recurringOptions = [
    { value: 'daily', label: 'Diário' },
    { value: 'weekly', label: 'Semanal' },
    { value: 'biweekly', label: 'Quinzenal' },
    { value: 'monthly', label: 'Mensal' },
    { value: 'custom', label: 'Personalizado' }
  ];

  const tourSteps: TourStep[] = [
    {
      target: '#cliente',
      title: 'Cliente',
      content: isEdit ? 'Altere o cliente deste evento se necessário.' : 'Selecione o cliente que está fazendo o evento.'
    },
    {
      target: '#local',
      title: 'Local',
      content: isEdit ? 'Modifique o local do evento.' : 'Escolha o local que será usado.'
    },
    {
      target: '#data',
      title: 'Data',
      content: isEdit ? 'Atualize a data do evento.' : 'Selecione a data do evento.'
    },
    {
      target: '#horaInicio',
      title: 'Horário de Início',
      content: isEdit ? 'Ajuste o horário de início.' : 'Defina o horário de início do evento.'
    },
    {
      target: '#horaFim',
      title: 'Horário de Fim',
      content: isEdit ? 'Ajuste o horário de término.' : 'Defina o horário de término do evento.'
    },
    {
      target: '#valor',
      title: 'Valor',
      content: isEdit ? 'Atualize o valor do evento.' : 'Informe o valor total do evento.'
    }
  ];

  const pageTitle = isEdit ? "Editar Evento" : "Novo Evento";
  const pageIcon = isEdit ? <Edit className="h-6 w-6" /> : <Calendar className="h-6 w-6" />;

  // ===== RENDER =====
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ModuleHeader
        title={pageTitle}
        icon={pageIcon}
        moduleColor={MODULE_COLORS.events}

        
      />

      <main className="max-w-none mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 h-[calc(100vh-140px)] lg:h-[calc(100vh-180px)]">
          {/* Formulário Compacto */}
          <div className="flex flex-col min-h-0">
            <Card className={`${isEdit ? 'border-module-events/90 border border-2 rounded-lg' : ''} flex-1 flex flex-col`}>
              <CardHeader className="flex-shrink-0 p-3 lg:p-4">
                {isEdit && (
                  <div className="bg-module-events/10 border border-module-events/30 rounded-lg p-2 lg:p-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Edit className="h-4 w-4 text-module-events/70 flex-shrink-0" />
                        <span className="text-sm font-medium text-module-events/70">
                          Evento em edição - Modifique os campos necessários
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleTimelineCancelEdit}
                        className="h-8 px-3 text-xs text-module-events/70 hover:bg-module-events/20 bg-transparent border-module-events/30 self-start sm:self-auto"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="space-y-2 lg:space-y-3 flex-1 overflow-y-auto p-3 lg:p-4">
                {/* Cliente */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1">
                    <CampoBusca
                      id="cliente"
                      label="Cliente"
                      selectedId={formData.clienteId}
                      onChange={(value, item) => {
                        setFormData(prev => ({ ...prev, clienteId: item?.id || value }));
                      }}
                      items={clientesExemplo}
                      displayField="label"
                      placeholder="Digite o nome do cliente..."
                      onLoadById={loadClienteById}
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
                      className="h-11 px-3 w-full sm:w-auto"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Local */}
                <CampoBusca
                  id="local"
                  label="Local"
                  selectedId={formData.localId}
                  onChange={(value, item) => {
                    handleVenueChange(value, item);
                  }}
                  items={locaisExemplo}
                  displayField="label"
                  placeholder="Selecione o local..."
                  onLoadById={loadLocalById}
                  required
                />

                {/* Data */}
                <SeletorData
                  id="data"
                  label="Data"
                  value={formData.data}
                  onChange={handleDateChange}
                  required
                />

                {/* Horários */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
                  <SeletorHora
                    id="horaInicio"
                    label="Início"
                    value={formData.horaInicio}
                    onChange={(time) => {
                      const endTime = calculateEndTime(time, formData.localId);
                      setFormData(prev => ({ 
                        ...prev, 
                        horaInicio: time,
                        horaFim: endTime
                      }));
                    }}
                    interval={selectedVenueConfig?.intervalo || 60}
                    minTime={selectedVenueConfig?.horarioAbertura || '07:00'}
                    maxTime={selectedVenueConfig?.horarioFechamento || '22:00'}
                    occupiedTimes={occupiedTimes.map(ot => ot.start)}
                    venueSelected={!!formData.localId}
                    dateSelected={!!formData.data}
                    required
                  />

                  <SeletorHora
                    id="horaFim"
                    label="Término"
                    value={formData.horaFim}
                    onChange={(time) => setFormData(prev => ({ ...prev, horaFim: time }))}
                    interval={selectedVenueConfig?.intervalo || 60}
                    minTime={selectedVenueConfig?.horarioAbertura || '07:00'}
                    maxTime={selectedVenueConfig?.horarioFechamento || '22:00'}
                    occupiedTimes={occupiedTimes.map(ot => ot.start)}
                    venueSelected={!!formData.localId}
                    dateSelected={!!formData.data}
                    required
                  />
                </div>

                {/* Modalidade */}
                <div className="space-y-1">
                  <Label htmlFor="modalidade" className="text-sm">Modalidade</Label>
                  <Input
                    id="modalidade"
                    value={formData.modalidade}
                    onChange={(e) => setFormData(prev => ({ ...prev, modalidade: e.target.value }))}
                    placeholder="Ex: Futebol, Vôlei, Tênis..."
                    className="h-9"
                  />
                </div>

                {/* Observações */}
                <div className="space-y-1">
                  <Label htmlFor="observacoes" className="text-sm">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                    placeholder="Observações sobre o evento..."
                    rows={2}
                    className="resize-none"
                  />
                </div>

                {/* Evento Recorrente */}
                <div className="space-y-2 lg:space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-2 lg:p-3 rounded-lg border bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-900/20 dark:to-gray-800/20">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800/30 flex-shrink-0">
                        <Repeat className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <Label htmlFor="recorrente" className="text-sm font-semibold text-gray-900 dark:text-gray-100 cursor-pointer">
                          Evento Recorrente
                        </Label>
                        <p className="text-xs text-gray-700 dark:text-gray-300">
                          Criar vários eventos baseados em um padrão
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="recorrente"
                      checked={formData.recorrente}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, recorrente: checked }))}
                      className="data-[state=checked]:bg-gray-600 self-start sm:self-auto"
                    />
                  </div>
                  
                  {formData.recorrente && (
                    <div className="space-y-2 lg:space-y-3 p-2 lg:p-3 border rounded-lg bg-gray-50/30 dark:bg-gray-900/10">
                      <div className="space-y-1">
                        <Label htmlFor="tipoRecorrencia" className="text-sm font-medium">
                          Frequência de repetição
                        </Label>
                        <Select 
                          value={formData.tipoRecorrencia} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, tipoRecorrencia: value }))}
                        >
                          <SelectTrigger className="w-full h-9">
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
                      
                      {formData.tipoRecorrencia === 'custom' && (
                        <div className="space-y-1">
                          <Label htmlFor="diasRecorrenciaPersonalizada" className="text-sm font-medium">
                            Dias personalizados
                          </Label>
                          <Input
                            id="diasRecorrenciaPersonalizada"
                            value={formData.diasRecorrenciaPersonalizada}
                            onChange={(e) => setFormData(prev => ({ ...prev, diasRecorrenciaPersonalizada: e.target.value }))}
                            placeholder="Ex: Segunda, Quarta, Sexta"
                            className="w-full h-9"
                          />
                          <p className="text-xs text-muted-foreground">
                            Especifique os dias da semana separados por vírgula
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Resumo do Evento */}
                {formData.totalMinutos > 0 && (
                  <div className="p-2 lg:p-3 bg-muted/30 rounded-lg border">
                    <h3 className="font-semibold mb-1 lg:mb-2 text-sm lg:text-base">Resumo do Evento</h3>
                    <div className="space-y-1 lg:space-y-2 text-xs lg:text-sm">
                      <div className="flex justify-between">
                        <span>Duração:</span>
                        <span>{formatDuration(formData.totalMinutos)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxa por hora:</span>
                        <span>R$ {formData.valorHora.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-sm lg:text-base border-t pt-1 lg:pt-2">
                        <span>Valor Total:</span>
                        <span>R$ {totalValue.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Botões de Ação */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="flex-1 order-1 sm:order-1"
                    disabled={!formData.clienteId || !formData.localId || !formData.data || !formData.horaInicio || !formData.horaFim}
                  >
                    {isEdit ? 'Atualizar' : 'Salvar'} Evento
                  </Button>
                  
                  <div className="flex gap-2 order-2 sm:order-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleReserveNow}
                            className="flex-1 sm:flex-none px-3"
                            disabled={!formData.clienteId || !formData.localId || !formData.data || !formData.horaInicio || !formData.horaFim}
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
                      className="flex-1 sm:flex-none"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <div className="flex flex-col min-h-0">
            <Card className="flex-1 flex flex-col">
              <CardContent className="h-full p-0 flex flex-col">
                <EventTimeline
                  selectedDate={timelineState.selectedDate}
                  events={timelineEvents}
                  selectedVenue={timelineState.selectedVenue}
                  loading={timelineState.loading}
                  getLocalByName={getLocalByName}
                  onTimeSlotClick={handleTimelineTimeSlotClick}
                  onEventEdit={handleTimelineEventEdit}
                  editingEventId={editingEventId ? parseInt(editingEventId) : null}
                  onEventSelect={handleTimelineEventSelect}
                  onCancelEdit={handleTimelineCancelEdit}
                  onDeleteEvent={handleTimelineDeleteEvent}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <PageTour title="Tutorial do Formulário" steps={tourSteps} />
    </div>
  );
};

export default Evento; 