import { Button } from '@/components/ui/button';
import { useVenueSettings } from '@/hooks/useVenueSettings';
import { Clock, MapPin, Plus, User, X, Trash } from 'lucide-react';
import { useLocais } from '@/hooks/useLocais';
import EmptyTimelineState from './EmptyTimelineState';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

interface Event {
  id: number;
  client: string;
  venue: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  color: string;
  sport?: string;
}

interface EventTimelineProps {
  selectedDate: string;
  events: Event[];
  selectedVenue?: string;
  onTimeSlotClick?: (time: string) => void;
  onEventEdit?: (event: Event) => void;
  editingEventId?: number | null;
  onEventSelect?: (event: Event) => void;
  onCancelEdit?: () => void;
  onDeleteEvent?: (eventId: number) => void;
}

const EventTimeline = ({ 
  selectedDate, 
  events, 
  selectedVenue,
  onTimeSlotClick, 
  onEventEdit, 
  editingEventId,
  onEventSelect,
  onCancelEdit,
  onDeleteEvent
}: EventTimelineProps) => {
  
  const { generateTimeSlots, getVenueInterval } = useVenueSettings();
  const { getLocalByName } = useLocais();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);
  
  // Se não há local selecionado ou está vazio, mostrar estado vazio
  if (!selectedVenue || selectedVenue === '' || selectedVenue === 'all') {
    return <EmptyTimelineState />;
  }
  
  // Mapear nome do local para ID usando hook
  const getVenueIdByName = (venueName: string) => {
    const venue = getLocalByName(venueName);
    return venue?.id || 'all';
  };
  
  // Gerar slots baseados no local selecionado
  const venueId = selectedVenue ? getVenueIdByName(selectedVenue) : 'all';
  const timeSlots = generateTimeSlots(venueId);
  const interval = getVenueInterval(venueId);
  const slotHeight = 48;
  
  // Filtrar eventos por local selecionado - melhorado para respeitar o filtro
  const filteredEvents = selectedVenue && selectedVenue !== '' && selectedVenue !== 'all' 
    ? events.filter(event => event.venue === selectedVenue)
    : [];

  // Converter horário para minutos para cálculos
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Verificar se há espaço disponível em um slot
  const getAvailableSlot = (slotTime: string) => {
    const slotStart = timeToMinutes(slotTime);
    const slotEnd = slotStart + interval;
    
    // Verificar se há algum evento que conflita com este slot
    const hasConflict = filteredEvents.some(event => {
      const eventStart = timeToMinutes(event.startTime);
      const eventEnd = timeToMinutes(event.endTime);
      
      // Verifica se há sobreposição
      return !(eventEnd <= slotStart || eventStart >= slotEnd);
    });

    if (!hasConflict) {
      return { available: true, time: slotTime };
    }

    return { available: false };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'border-green-500 bg-green-50';
      case 'pending': return 'border-yellow-500 bg-yellow-50';
      case 'cancelled': return 'border-red-500 bg-red-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const handleEventClick = (event: Event) => {
    if (onEventSelect) {
      onEventSelect(event);
    }
    if (onEventEdit) {
      onEventEdit(event);
    }
  };

  const handleTimeSlotClick = (time: string) => {
    if (editingEventId === null && onTimeSlotClick) {
      onTimeSlotClick(time);
    }
  };

  const handleDeleteEvent = (eventId: number) => {
    setEventToDelete(eventId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (eventToDelete && onDeleteEvent) {
      onDeleteEvent(eventToDelete);
    }
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  };

  const isEditingMode = editingEventId !== null;

  return (
    <>
      <div className="flex flex-col h-full max-h-[calc(100vh-110px)] overflow-hidden">
        <div className="flex-shrink-0 bg-background border-b p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Timeline - {new Date(selectedDate).toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                day: '2-digit', 
                month: 'long' 
              })}
              {selectedVenue && selectedVenue !== 'all' && selectedVenue !== '' && (
                <span className="text-sm text-gray-600 ml-2">({selectedVenue}) - Intervalo: {interval}min</span>
              )}
            </h3>
          </div>
          {isEditingMode && (
            <div className="mt-2 text-sm p-2 rounded text-module-events/100 bg-module-events/10">
              Modo de edição ativo. Clique no botão cancelar no evento para sair ou selecione outro evento.
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto relative">
          {/* Time slots grid */}
          <div className="relative">
            {timeSlots.map((time, index) => {
              const availability = getAvailableSlot(time);
              const canClick = !isEditingMode && availability.available;
              
              return (
                <div 
                  key={time} 
                  className={`border-b border-gray-100 flex items-center p-3 transition-colors relative ${
                    canClick ? 'cursor-pointer hover:bg-green-50' : ''
                  }`}
                  style={{ height: `${slotHeight}px` }}
                  onClick={() => canClick && handleTimeSlotClick(time)}
                >
                  <div className="w-16 text-sm font-medium text-gray-600 flex-shrink-0">
                    {time}
                  </div>
                  
                  <div className="flex-1 ml-4 relative">
                    {canClick && (
                      <div className="text-green-600 text-sm font-medium flex items-center gap-1">
                        <Plus className="h-4 w-4" />
                        Disponível - clique para reservar
                      </div>
                    )}
                    {isEditingMode && availability.available && (
                      <div className="text-sm text-gray-400 font-medium">
                        Disponível (modo edição ativo)
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Events overlay */}
          <div className="absolute top-0 left-0 right-0 pointer-events-none">
            {filteredEvents.map((event) => {
              const startMinutes = timeToMinutes(event.startTime);
              const endMinutes = timeToMinutes(event.endTime);
              const duration = endMinutes - startMinutes;
              
              // Calcular posição baseada nos slots dinâmicos do local específico
              const eventVenueId = getVenueIdByName(event.venue);
              const eventInterval = getVenueInterval(eventVenueId);
              const baseHour = 7 * 60; // 7h em minutos
              const topOffset = ((startMinutes - baseHour) / eventInterval) * slotHeight;
              const height = (duration / eventInterval) * slotHeight;

              const isCurrentlyEditing = editingEventId === event.id;
              const isDisabledEvent = isEditingMode && !isCurrentlyEditing;

              return (
                <div
                  key={event.id}
                  className={`absolute left-20 right-4 rounded-lg shadow-sm border-l-4 z-10 transition-all cursor-pointer pointer-events-auto ${
                    isCurrentlyEditing 
                      ? 'ring-2 ring-module-events/100 ring-offset-2 bg-module-events/10'
                      : isDisabledEvent
                        ? 'opacity-40 cursor-not-allowed bg-gray-100'
                        : getStatusColor(event.status) + ' hover:shadow-md'
                  }`}
                  style={{
                    top: `${topOffset}px`,
                    height: `${Math.max(height - 4, 32)}px`,
                    backgroundColor: isCurrentlyEditing 
                      ? ''
                      : isDisabledEvent 
                        ? '#f3f4f6'
                        : event.color + '20',
                    borderLeftColor: isCurrentlyEditing 
                      ? 'rgb(var(--module-events))'
                      : isDisabledEvent 
                        ? '#9ca3af'
                        : event.color
                  }}
                  onClick={() => !isDisabledEvent && handleEventClick(event)}
                >
                  <div className="p-2 h-full overflow-hidden">
                    <div className="flex items-start justify-between h-full">
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3 text-gray-600 flex-shrink-0" />
                          <span className="font-semibold text-xs truncate">{event.client}</span>
                        </div>
                        {height > 60 && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-500 flex-shrink-0" />
                            <span className="text-xs text-gray-600 truncate">{event.venue}</span>
                          </div>
                        )}
                        <div className="text-xs text-gray-500 font-medium">
                          {event.startTime} - {event.endTime}
                        </div>
                        {event.sport && height > 80 && (
                          <div className="text-xs text-gray-500 truncate">
                            {event.sport}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <div className={`h-1.5 w-1.5 rounded-full ${
                            event.status === 'confirmed' ? 'bg-green-500' :
                            event.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                          {height > 60 && (
                            <span className="text-xs text-gray-500 capitalize">
                              {event.status === 'confirmed' ? 'Confirmado' :
                               event.status === 'pending' ? 'Pendente' : 'Cancelado'}
                            </span>
                          )}
                        </div>
                      </div>
                      {isCurrentlyEditing && (
                        <div className="flex flex-col gap-1 ml-1 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteEvent(event.id);
                            }}
                            className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash className="h-3 w-3" />
                          </Button>
                          {onCancelEdit && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onCancelEdit();
                              }}
                              className="h-6 w-6 p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EventTimeline;
