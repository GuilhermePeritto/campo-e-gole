
import { Card, CardContent } from '@/components/ui/card';
import { Clock, MapPin, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  onTimeSlotClick?: (time: string) => void;
  onEventEdit?: (event: Event) => void;
  editingEventId?: number | null;
}

const EventTimeline = ({ selectedDate, events, onTimeSlotClick, onEventEdit, editingEventId }: EventTimelineProps) => {
  const navigate = useNavigate();
  
  const timeSlots = Array.from({ length: 15 }, (_, i) => {
    const hour = i + 7;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // Get events that overlap with specific time slot
  const getEventsForTimeSlot = (time: string) => {
    return events.filter(event => {
      const eventStart = event.startTime;
      const eventEnd = event.endTime;
      return time >= eventStart && time < eventEnd;
    });
  };

  const isTimeSlotAvailable = (time: string) => {
    return getEventsForTimeSlot(time).length === 0;
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
    if (onEventEdit) {
      onEventEdit(event);
    }
  };

  const isEditingMode = editingEventId !== null;
  const isDisabled = (event: Event) => isEditingMode && event.id !== editingEventId;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 bg-background border-b p-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Timeline - {new Date(selectedDate).toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            day: '2-digit', 
            month: 'long' 
          })}
        </h3>
        {isEditingMode && (
          <div className="mt-2 text-sm p-2 rounded text-module-events/100  bg-module-events/10">
            Modo de edição ativo. Clique em Cancelar para sair ou selecione outro evento.
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto relative">
        {/* Time slots grid */}
        <div className="relative">
          {timeSlots.map((time, index) => {
            const isAvailable = isTimeSlotAvailable(time);
            const canClickTimeSlot = !isEditingMode && isAvailable;
            
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
                onClick={() => canClickTimeSlot && onTimeSlotClick?.(time)}
              >
                <div className="w-16 text-sm font-medium text-gray-600 flex-shrink-0">
                  {time}
                </div>
                
                <div className="flex-1 ml-4 relative">
                  {canClickTimeSlot ? (
                    <div className="text-sm text-green-600 font-medium">
                      ✓ Disponível - Clique para selecionar
                    </div>
                  ) : isEditingMode && isAvailable ? (
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
          {events.map((event) => {
            const startHour = parseInt(event.startTime.split(':')[0]);
            const startMinute = parseInt(event.startTime.split(':')[1]);
            const endHour = parseInt(event.endTime.split(':')[0]);
            const endMinute = parseInt(event.endTime.split(':')[1]);
            
            const startOffset = ((startHour - 7) * 60 + startMinute) / 60;
            const duration = ((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) / 60;
            
            const topPosition = startOffset * 64;
            const height = duration * 64;

            const isCurrentlyEditing = editingEventId === event.id;
            const isDisabledEvent = isDisabled(event);

            return (
              <div
                key={event.id}
                className={`absolute left-20 right-4 rounded-lg p-3 shadow-sm border-l-4 z-10 transition-all cursor-pointer ${
                  isCurrentlyEditing 
                    ? 'ring-2 ring-module-events/100 ring-offset-2 bg-module-events/10'
                    : isDisabledEvent
                      ? 'opacity-40 cursor-not-allowed bg-gray-100'
                      : getStatusColor(event.status) + ' hover:shadow-md'
                }`}
                style={{
                  top: `${topPosition}px`,
                  height: `${Math.max(height - 4, 48)}px`,
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
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-3 w-3 text-gray-600 flex-shrink-0" />
                      <span className="font-medium text-sm truncate">{event.client}</span>
                      {isCurrentlyEditing && (
                        <span className="text-xs bg-module-events/10 text-module-events/70 px-2 py-1 rounded">
                          Editando
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-3 w-3 text-gray-500 flex-shrink-0" />
                      <span className="text-xs text-gray-600 truncate">{event.venue}</span>
                    </div>
                    {event.sport && (
                      <div className="mt-1">
                        <span className="text-xs bg-white/60 px-2 py-1 rounded">
                          {event.sport}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end ml-2 flex-shrink-0">
                    <div className="text-xs font-medium text-gray-700">
                      {event.startTime}
                    </div>
                    <div className="text-xs text-gray-500">
                      {event.endTime}
                    </div>
                    <div className="text-xs mt-1 font-medium">
                      {duration.toFixed(1)}h
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
