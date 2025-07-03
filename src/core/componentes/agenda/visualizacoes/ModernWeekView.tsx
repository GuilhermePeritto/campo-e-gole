import { memo, useMemo } from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addHours, setHours, setMinutes } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Reservation } from '@/hooks/useCalendar';
import { useSkeletonLoading } from '@/core/hooks/useSkeletonLoading';
import DropZone from '../dnd/DropZone';
import EventoDraggable from '../dnd/EventoDraggable';
import { cn } from '@/lib/utils';

interface ModernWeekViewProps {
  currentDate: Date;
  eventos: Reservation[];
  selectedLocais: string[];
  onEventClick: (evento: Reservation) => void;
  onDateClick: (date: Date) => void;
}

const ModernWeekView = memo(({
  currentDate,
  eventos,
  selectedLocais,
  onEventClick,
  onDateClick
}: ModernWeekViewProps) => {
  const { isDayLoading } = useSkeletonLoading({
    viewType: 'week',
    currentDate,
    shouldReload: false
  });

  // Generate week days
  const weekDays = useMemo(() => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: weekStart, end: weekEnd });
  }, [currentDate]);

  // Generate time slots (6 AM to 11 PM)
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 6; hour <= 23; hour++) {
      slots.push(hour);
    }
    return slots;
  }, []);

  // Filter and group events by day
  const eventosPorDia = useMemo(() => {
    const filteredEvents = eventos.filter(evento => {
      if (selectedLocais.includes('all')) return true;
      return selectedLocais.includes(evento.venueId);
    });

    return filteredEvents.reduce((acc, evento) => {
      const eventDate = format(evento.day, 'yyyy-MM-dd');
      if (!acc[eventDate]) acc[eventDate] = [];
      acc[eventDate].push(evento);
      return acc;
    }, {} as Record<string, Reservation[]>);
  }, [eventos, selectedLocais]);

  const formatDayHeader = (day: Date) => {
    const dayName = format(day, 'EEE', { locale: ptBR }).toUpperCase();
    const dayNumber = format(day, 'dd');
    return { dayName, dayNumber };
  };

  const getEventPosition = (evento: Reservation) => {
    const startHour = parseInt(evento.startTime.split(':')[0]);
    const startMinute = parseInt(evento.startTime.split(':')[1]);
    const endHour = parseInt(evento.endTime.split(':')[0]);
    const endMinute = parseInt(evento.endTime.split(':')[1]);
    
    const startPosition = ((startHour - 6) * 60 + startMinute) / 60; // Convert to hours from 6 AM
    const duration = ((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) / 60; // Duration in hours
    
    return {
      top: `${startPosition * 60}px`, // 60px per hour
      height: `${Math.max(duration * 60, 30)}px` // Minimum 30px height
    };
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Time zone indicator */}
      <div className="px-6 py-2 border-b border-border bg-muted/20">
        <span className="text-sm text-muted-foreground">GMT-3</span>
      </div>

      {/* Header with days */}
      <div className="grid grid-cols-8 border-b border-border bg-background sticky top-0 z-10">
        {/* Time column header */}
        <div className="border-r border-border p-4"></div>
        
        {/* Day headers */}
        {weekDays.map(day => {
          const { dayName, dayNumber } = formatDayHeader(day);
          const isToday = isSameDay(day, new Date());
          
          return (
            <div 
              key={format(day, 'yyyy-MM-dd')}
              className="border-r border-border last:border-r-0 p-4 text-center cursor-pointer hover:bg-accent/30 transition-colors"
              onClick={() => onDateClick(day)}
            >
              <div className="text-xs text-muted-foreground font-medium mb-1">
                {dayName}
              </div>
              <div className={cn(
                "text-xl font-medium",
                isToday ? "bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mx-auto" : "text-foreground"
              )}>
                {dayNumber}
              </div>
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-8 relative">
          {/* Time column */}
          <div className="border-r border-border">
            {timeSlots.map(hour => (
              <div key={hour} className="h-[60px] border-b border-border flex items-start justify-end pr-2 pt-1">
                <span className="text-xs text-muted-foreground">
                  {hour === 0 ? '12 AM' : hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {weekDays.map(day => {
            const dayKey = format(day, 'yyyy-MM-dd');
            const dayEvents = eventosPorDia[dayKey] || [];
            const isLoading = isDayLoading(day);

            return (
              <div key={dayKey} className="border-r border-border last:border-r-0 relative">
                {/* Time slots for drop zones */}
                {timeSlots.map(hour => (
                  <DropZone
                    key={`${dayKey}-${hour}`}
                    id={`week-slot-${dayKey}-${hour}`}
                    data={{
                      date: dayKey,
                      time: `${hour.toString().padStart(2, '0')}:00`,
                      type: 'timeSlot'
                    }}
                    className="h-[60px] border-b border-border hover:bg-accent/20 transition-colors"
                  />
                ))}

                {/* Events */}
                {!isLoading && dayEvents.map(evento => {
                  const position = getEventPosition(evento);
                  
                  return (
                    <div 
                      key={evento.id}
                      className="absolute left-1 right-1 z-10"
                      style={position}
                    >
                      <EventoDraggable
                        evento={evento}
                      >
                      <div 
                        className="w-full h-full rounded-md p-2 text-xs cursor-pointer hover:shadow-md transition-shadow"
                        style={{ backgroundColor: `${evento.color}20`, borderLeft: `3px solid ${evento.color}` }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(evento);
                        }}
                      >
                        <div className="font-medium text-foreground truncate">
                          {evento.client}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {evento.startTime} - {evento.endTime}
                        </div>
                        </div>
                      </EventoDraggable>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

ModernWeekView.displayName = 'ModernWeekView';

export default ModernWeekView;