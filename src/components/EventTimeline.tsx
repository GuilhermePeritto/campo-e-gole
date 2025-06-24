
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, User, Plus, X, CreditCard } from 'lucide-react';

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

  // Gerar slots de 30 em 30 minutos (7h às 21h)
  const timeSlots = Array.from({ length: 28 }, (_, i) => {
    const totalMinutes = 7 * 60 + i * 30; // 7h + i*30min
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });

  // Converter horário para minutos para cálculos
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Verificar se há espaço disponível em um slot
  const getAvailableSlot = (slotTime: string) => {
    const slotStart = timeToMinutes(slotTime);
    const slotEnd = slotStart + 30; // 30 minutos depois
    
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

  const isEditingMode = editingEventId !== null;

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
                className={`border-b border-gray-100 h-12 flex items-center p-3 transition-colors relative ${
                  canClick ? 'cursor-pointer hover:bg-green-50' : ''
                }`}
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
            
            // Calcular posição baseada em slots de 30 minutos (7h = 0, 7:30 = 1, etc.)
            const baseHour = 7 * 60; // 7h em minutos
            const topOffset = ((startMinutes - baseHour) / 30) * 48; // 48px por slot de 30min
            const height = (duration / 30) * 48; // altura proporcional à duração

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
                <div className="p-3 h-full">
                  <div className="flex items-start justify-between h-full">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-gray-600 flex-shrink-0" />
                        <span className="font-semibold text-sm truncate">{event.client}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600 truncate">{event.venue}</span>
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        {event.startTime} - {event.endTime}
                      </div>
                      {event.sport && (
                        <div className="text-xs text-gray-500 mt-1">
                          {event.sport}
                        </div>
                      )}
                    </div>
                    {isCurrentlyEditing && onCancelEdit && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCancelEdit();
                        }}
                        className="ml-2 h-8 w-8 p-0 flex-shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
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
