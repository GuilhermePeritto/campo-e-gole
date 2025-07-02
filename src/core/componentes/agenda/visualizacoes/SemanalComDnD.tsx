import { memo, useMemo } from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addHours, startOfDay, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Reservation } from '@/hooks/useCalendar';
import { useSkeletonLoading } from '@/core/hooks/useSkeletonLoading';
import DropZone from '../dnd/DropZone';
import EventoDraggable from '../dnd/EventoDraggable';
import SkeletonDiaSemanal from '../skeletons/SkeletonDiaSemanal';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface SemanalComDnDProps {
  currentDate: Date;
  eventos: Reservation[];
  selectedLocais: string[];
  onEventClick: (evento: Reservation) => void;
  onDateClick: (date: Date) => void;
}

const SemanalComDnD = memo(({
  currentDate,
  eventos,
  selectedLocais,
  onEventClick,
  onDateClick
}: SemanalComDnDProps) => {
  const { isDayLoading } = useSkeletonLoading({
    viewType: 'week',
    currentDate,
    shouldReload: false
  });

  // Gerar dias da semana
  const weekDays = useMemo(() => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: weekStart, end: weekEnd });
  }, [currentDate]);

  // Gerar slots de horário (6h às 23h)
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 6; hour <= 23; hour++) {
      slots.push({
        time: `${hour.toString().padStart(2, '0')}:00`,
        label: `${hour}:00`
      });
    }
    return slots;
  }, []);

  // Filtrar e agrupar eventos por dia
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

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Cabeçalho dos dias */}
      <div className="grid grid-cols-8 border-b border-border/50 bg-muted/30">
        <div className="p-3 border-r border-border/30 text-center font-semibold text-muted-foreground">
          Horário
        </div>
        {weekDays.map(day => {
          const isToday = isSameDay(day, new Date());
          return (
            <div 
              key={format(day, 'yyyy-MM-dd')} 
              className={cn(
                "p-3 text-center border-r border-border/30 last:border-r-0 transition-colors cursor-pointer hover:bg-accent/30",
                isToday && "bg-primary/10 border-primary/20"
              )}
              onClick={() => onDateClick(day)}
            >
              <div className="space-y-1">
                <div className="text-xs font-medium text-muted-foreground uppercase">
                  {format(day, 'EEE', { locale: ptBR })}
                </div>
                <div className={cn(
                  "text-lg font-semibold transition-colors",
                  isToday && "text-primary"
                )}>
                  {format(day, 'd')}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grade de horários */}
      <ScrollArea className="flex-1">
        <div className="grid grid-cols-8 gap-0">
          {timeSlots.map(slot => (
            <div key={slot.time} className="contents">
              {/* Coluna de horário */}
              <div className="p-2 border-r border-b border-border/30 text-right text-sm font-medium text-muted-foreground bg-muted/10">
                {slot.label}
              </div>
              
              {/* Colunas dos dias */}
              {weekDays.map(day => {
                const dayKey = format(day, 'yyyy-MM-dd');
                const dayEvents = eventosPorDia[dayKey] || [];
                const isLoading = isDayLoading(day);
                
                // Filtrar eventos para este slot de horário
                const slotEvents = dayEvents.filter(evento => {
                  const eventHour = parseInt(evento.startTime.split(':')[0]);
                  const slotHour = parseInt(slot.time.split(':')[0]);
                  return eventHour === slotHour;
                });

                return (
                  <DropZone
                    key={`${dayKey}-${slot.time}`}
                    id={`week-slot-${dayKey}-${slot.time}`}
                    data={{
                      date: dayKey,
                      time: slot.time,
                      type: 'timeSlot'
                    }}
                    className="border-r border-b border-border/30 last:border-r-0 min-h-16 p-1"
                  >
                    {isLoading ? (
                      <SkeletonDiaSemanal 
                        hasEvents={slotEvents.length > 0}
                        eventCount={Math.min(slotEvents.length, 1)}
                      />
                    ) : (
                      <div className="space-y-1">
                        {slotEvents.map(evento => (
                          <EventoDraggable
                            key={evento.id}
                            evento={evento}
                            className="cursor-pointer"
                          >
                            <div 
                              className="p-2 rounded bg-gradient-to-r from-card/80 to-card/60 border border-border/40 hover:border-primary/30 transition-all duration-200 group cursor-pointer"
                              style={{ 
                                borderLeftColor: evento.color,
                                borderLeftWidth: '3px'
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onEventClick(evento);
                              }}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                    {evento.client}
                                  </span>
                                  <Badge variant="outline" className="text-xs h-4 px-1">
                                    {evento.status === 'confirmed' ? 'OK' : evento.status === 'pending' ? 'P' : 'X'}
                                  </Badge>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {evento.startTime} - {evento.endTime}
                                </div>
                                <div className="text-xs text-muted-foreground truncate">
                                  {evento.venue}
                                </div>
                              </div>
                            </div>
                          </EventoDraggable>
                        ))}
                      </div>
                    )}
                  </DropZone>
                );
              })}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
});

SemanalComDnD.displayName = 'SemanalComDnD';

export default SemanalComDnD;