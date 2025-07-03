import { memo, useMemo } from 'react';
import { format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Reservation } from '@/hooks/useCalendar';
import { useSkeletonLoading } from '@/core/hooks/useSkeletonLoading';
import DropZone from '../dnd/DropZone';
import EventoDraggable from '../dnd/EventoDraggable';
import { cn } from '@/lib/utils';

interface ModernDayViewProps {
  currentDate: Date;
  eventos: Reservation[];
  selectedLocais: string[];
  onEventClick: (evento: Reservation) => void;
  onDateClick: (date: Date) => void;
}

const ModernDayView = memo(({
  currentDate,
  eventos,
  selectedLocais,
  onEventClick,
}: ModernDayViewProps) => {
  const { isDayLoading } = useSkeletonLoading({
    viewType: 'day',
    currentDate,
    shouldReload: false
  });

  // Generate time slots (6 AM to 11 PM)
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 6; hour <= 23; hour++) {
      slots.push(hour);
    }
    return slots;
  }, []);

  // Filter events for current day
  const dayEvents = useMemo(() => {
    const filteredEvents = eventos.filter(evento => {
      if (selectedLocais.includes('all')) return true;
      return selectedLocais.includes(evento.venueId);
    });

    return filteredEvents.filter(evento => 
      isSameDay(evento.day, currentDate)
    );
  }, [eventos, selectedLocais, currentDate]);

  const getEventPosition = (evento: Reservation) => {
    const startHour = parseInt(evento.startTime.split(':')[0]);
    const startMinute = parseInt(evento.startTime.split(':')[1]);
    const endHour = parseInt(evento.endTime.split(':')[0]);
    const endMinute = parseInt(evento.endTime.split(':')[1]);
    
    const startPosition = ((startHour - 6) * 60 + startMinute) / 60; // Convert to hours from 6 AM
    const duration = ((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) / 60; // Duration in hours
    
    return {
      top: `${startPosition * 80}px`, // 80px per hour
      height: `${Math.max(duration * 80, 40)}px` // Minimum 40px height
    };
  };

  const formatTimeSlot = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    if (hour > 12) return `${hour - 12} PM`;
    return `${hour} AM`;
  };

  const dayKey = format(currentDate, 'yyyy-MM-dd');
  const isToday = isSameDay(currentDate, new Date());
  const isLoading = isDayLoading(currentDate);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Day header */}
      <div className="px-6 py-4 border-b border-border bg-background sticky top-0 z-10">
        <div className="text-center">
          <div className="text-sm text-muted-foreground font-medium mb-1">
            {format(currentDate, 'EEEE', { locale: ptBR }).toUpperCase()}
          </div>
          <div className={cn(
            "text-2xl font-semibold",
            isToday ? "bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto" : "text-foreground"
          )}>
            {format(currentDate, 'dd')}
          </div>
        </div>
      </div>

      {/* Time zone indicator */}
      <div className="px-6 py-2 border-b border-border bg-muted/20">
        <span className="text-sm text-muted-foreground">GMT-3</span>
      </div>

      {/* Time grid */}
      <div className="flex-1 overflow-auto">
        <div className="flex relative">
          {/* Time column */}
          <div className="w-20 border-r border-border bg-background">
            {timeSlots.map(hour => (
              <div key={hour} className="h-[80px] border-b border-border flex items-start justify-end pr-3 pt-2">
                <span className="text-sm text-muted-foreground font-medium">
                  {formatTimeSlot(hour)}
                </span>
              </div>
            ))}
          </div>

          {/* Day column */}
          <div className="flex-1 relative">
            {/* Time slots for drop zones */}
            {timeSlots.map(hour => (
              <DropZone
                key={`${dayKey}-${hour}`}
                id={`day-slot-${dayKey}-${hour}`}
                data={{
                  date: dayKey,
                  time: `${hour.toString().padStart(2, '0')}:00`,
                  type: 'timeSlot'
                }}
                className="h-[80px] border-b border-border hover:bg-accent/20 transition-colors"
              />
            ))}

            {/* Events */}
            {!isLoading && dayEvents.map(evento => {
              const position = getEventPosition(evento);
              
              return (
                <div 
                  key={evento.id}
                  className="absolute left-2 right-2 z-10"
                  style={position}
                >
                  <EventoDraggable
                    evento={evento}
                  >
                  <div 
                    className="w-full h-full rounded-lg p-3 cursor-pointer hover:shadow-lg transition-shadow border"
                    style={{ 
                      backgroundColor: `${evento.color}20`, 
                      borderLeft: `4px solid ${evento.color}`,
                      borderColor: `${evento.color}40`
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(evento);
                    }}
                  >
                    <div className="font-semibold text-foreground text-sm mb-1">
                      {evento.client}
                    </div>
                    <div className="text-muted-foreground text-xs mb-1">
                      {evento.startTime} - {evento.endTime}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {evento.venue}
                    </div>
                    </div>
                  </EventoDraggable>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

ModernDayView.displayName = 'ModernDayView';

export default ModernDayView;