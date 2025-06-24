
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, User, X } from 'lucide-react';

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
}

const EventTimeline = ({ 
  selectedDate, 
  events, 
  selectedVenue,
  onTimeSlotClick, 
  onEventEdit, 
  editingEventId,
  onEventSelect,
  onCancelEdit
}: EventTimelineProps) => {
  
  // Filtrar eventos por local selecionado
  const filteredEvents = selectedVenue && selectedVenue !== 'all' 
    ? events.filter(event => event.venue === selectedVenue)
    : events;

  // Gerar slots de 1 em 1 hora (7h às 21h)
  const timeSlots = Array.from({ length: 15 }, (_, i) => {
    const hour = i + 7;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // Converter horário para minutos para cálculos
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Verificar se um horário específico tem espaço disponível
  const getAvailableTimeForSlot = (slotTime: string) => {
    const slotStart = timeToMinutes(slotTime);
    const slotEnd = slotStart + 60; // 1 hora depois
    
    // Verificar se há eventos que se sobrepõem a este slot
    const overlappingEvents = filteredEvents.filter(event => {
      const eventStart = timeToMinutes(event.startTime);
      const eventEnd = timeToMinutes(event.endTime);
      
      // Verifica se há sobreposição
      return !(eventEnd <= slotStart || eventStart >= slotEnd);
    });

    if (overlappingEvents.length === 0) {
      return slotTime; // Horário totalmente livre
    }

    // Verificar se há espaços antes ou depois dos eventos
    const sortedEvents = overlappingEvents.sort((a, b) => 
      timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
    );

    // Verificar espaço antes do primeiro evento
    const firstEventStart = timeToMinutes(sortedEvents[0].startTime);
    if (firstEventStart > slotStart) {
      return slotTime; // Há espaço no início do slot
    }

    // Verificar espaço após o último evento
    const lastEventEnd = timeToMinutes(sortedEvents[sortedEvents.length - 1].endTime);
    if (lastEventEnd < slotEnd) {
      const availableHour = Math.floor(lastEventEnd / 60);
      const availableMinute = lastEventEnd % 60;
      return `${availableHour.toString().padStart(2, '0')}:${availableMinute.toString().padStart(2, '0')}`;
    }

    return null; // Não há espaço disponível
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

  const isEditingMode = editingEventId !== null;
  const isDisabled = (event: Event) => isEditingMode && event.id !== editingEventId;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 bg-background border-b p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Timeline - {new Date(selectedDate).toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              day: '2-digit', 
              month: 'long' 
            })}
            {selectedVenue && selectedVenue !== 'all' && (
              <span className="text-sm text-gray-600 ml-2">({selectedVenue})</span>
            )}
          </h3>
          {isEditingMode && onCancelEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={onCancelEdit}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancelar Edição
            </Button>
          )}
        </div>
        {isEditingMode && (
          <div className="mt-2 text-sm p-2 rounded text-module-events/100 bg-module-events/10">
            Modo de edição ativo. Clique em Cancelar para sair ou selecione outro evento.
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto relative">
        {/* Time slots grid */}
        <div className="relative">
          {timeSlots.map((time, index) => {
            const availableTime = getAvailableTimeForSlot(time);
            const canClickTimeSlot = !isEditingMode && availableTime !== null;
            
            return (
              <div 
                key={time} 
                className={`border-b border-gray-100 h-16 flex items-center p-3 transition-colors relative ${
                  canClickTimeSlot 
                    ? 'hover:bg-green-50 cursor-pointer' 
                    : isEditingMode 
                      ? 'bg-gray-100 opacity-50'
                      : 'bg-gray-50'
                }`}
                onClick={() => canClickTimeSlot && onTimeSlotClick?.(availableTime)}
              >
                <div className="w-16 text-sm font-medium text-gray-600 flex-shrink-0">
                  {time}
                </div>
                
                <div className="flex-1 ml-4 relative">
                  {canClickTimeSlot ? (
                    <div className="text-sm text-green-600 font-medium">
                      ✓ Disponível - Clique para selecionar ({availableTime})
                    </div>
                  ) : isEditingMode && availableTime ? (
                    <div className="text-sm text-gray-400 font-medium">
                      Disponível (modo edição ativo)
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* Events overlay */}
        <div className="absolute top-0 left-0 right-0">
          {filteredEvents.map((event) => {
            const startMinutes = timeToMinutes(event.startTime);
            const endMinutes = timeToMinutes(event.endTime);
            const duration = endMinutes - startMinutes;
            
            // Calcular posição baseada em slots de 1 hora (7h = 0, 8h = 1, etc.)
            const baseHour = 7 * 60; // 7h em minutos
            const topOffset = ((startMinutes - baseHour) / 60) * 64; // 64px por hora
            const height = (duration / 60) * 64; // altura proporcional à duração

            const isCurrentlyEditing = editingEventId === event.id;
            const isDisabledEvent = isDisabled(event);

            return (
              <div
                key={event.id}
                className={`absolute left-20 right-4 rounded-lg p-2 shadow-sm border-l-4 z-10 transition-all cursor-pointer ${
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
                <div className="flex items-start justify-between h-full">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                      <User className="h-3 w-3 text-gray-600 flex-shrink-0" />
                      <span className="font-medium text-xs truncate">{event.client}</span>
                      {isCurrentlyEditing && (
                        <span className="text-xs bg-module-events/10 text-module-events/70 px-1 py-0.5 rounded">
                          Editando
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      <MapPin className="h-3 w-3 text-gray-500 flex-shrink-0" />
                      <span className="text-xs text-gray-600 truncate">{event.venue}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {event.startTime} - {event.endTime}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventTimeline;
