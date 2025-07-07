import { memo, useMemo } from 'react';
import { format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Reservation } from '@/hooks/useCalendar';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Plus, User } from 'lucide-react';
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
  onDateClick,
}: ModernDayViewProps) => {
  // Generate time slots from 7 AM to 11 PM
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 7; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
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

  // Convert time to minutes for calculations
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Check slot availability
  const getSlotAvailability = (slotTime: string) => {
    const slotStart = timeToMinutes(slotTime);
    const slotEnd = slotStart + 30; // 30-minute slots
    
    const overlappingEvents = dayEvents.filter(event => {
      const eventStart = timeToMinutes(event.startTime);
      const eventEnd = timeToMinutes(event.endTime);
      
      return !(eventEnd <= slotStart || eventStart >= slotEnd);
    });

    return overlappingEvents.length === 0;
  };

  const handleNewReservation = (time: string) => {
    onDateClick(currentDate);
  };

  const dayKey = format(currentDate, 'yyyy-MM-dd');
  const isToday = isSameDay(currentDate, new Date());
  const slotHeight = 48;

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

      {/* Time grid - using the original agenda layout */}
      <div className="h-[calc(100vh-200px)] overflow-y-auto">
        <Card className="">
          <CardContent className="p-0 flex-1 relative">
            {/* Time slots grid */}
            <div className="relative">
              {timeSlots.map((time, index) => {
                const isAvailable = getSlotAvailability(time);
                
                return (
                  <div 
                    key={time} 
                    className={`border-b border-border flex items-center p-3 transition-colors relative ${
                      isAvailable ? 'cursor-pointer hover:bg-accent/20' : ''
                    }`}
                    style={{ height: `${slotHeight}px` }}
                    onClick={() => isAvailable && handleNewReservation(time)}
                  >
                    <div className="w-16 text-sm font-medium text-muted-foreground flex-shrink-0">
                      {time}
                    </div>
                    
                    <div className="flex-1 ml-4 relative">
                      {isAvailable && (
                        <div className="text-primary text-sm font-medium flex items-center gap-1">
                          <Plus className="h-4 w-4" />
                          Disponível - clique para reservar
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Events overlay */}
            <div className="absolute top-0 left-0 right-0 pointer-events-none">
              {dayEvents.map((event) => {
                const startMinutes = timeToMinutes(event.startTime);
                const endMinutes = timeToMinutes(event.endTime);
                const duration = endMinutes - startMinutes;
                
                // Calculate position based on dynamic slots
                const baseHour = 7 * 60; // 7am in minutes
                const topOffset = ((startMinutes - baseHour) / 30) * slotHeight;
                const height = (duration / 30) * slotHeight;

                return (
                  <div
                    key={event.id}
                    className="absolute left-20 right-4 rounded-lg shadow-sm border-l-4 z-10 cursor-pointer pointer-events-auto hover:shadow-md transition-all border-border"
                    style={{
                      top: `${topOffset}px`,
                      height: `${Math.max(height - 4, 32)}px`,
                      borderLeftColor: event.color,
                      backgroundColor: `${event.color}15`
                    }}
                    onClick={() => onEventClick(event)}
                  >
                    <div className="p-2 h-full overflow-hidden">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                          <span className="font-semibold text-xs truncate text-foreground">{event.client}</span>
                        </div>
                        {height > 60 && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <span className="text-xs text-muted-foreground truncate">{event.venue}</span>
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground font-medium">
                          {event.startTime} - {event.endTime}
                        </div>
                        {height > 80 && (
                          <div className="text-xs text-muted-foreground truncate">
                            {event.title?.split(' - ')[1] || 'Reserva'}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <div className={`h-1.5 w-1.5 rounded-full ${
                            event.status === 'confirmed' ? 'bg-green-500' :
                            event.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                          {height > 60 && (
                            <span className="text-xs text-muted-foreground">
                              {event.status === 'confirmed' ? 'Confirmado' :
                               event.status === 'pending' ? 'Pendente' : 'Cancelado'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});

ModernDayView.displayName = 'ModernDayView';

export default ModernDayView;