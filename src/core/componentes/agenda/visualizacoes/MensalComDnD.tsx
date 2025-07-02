import { memo, useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Reservation } from '@/hooks/useCalendar';
import { useSkeletonLoading } from '@/core/hooks/useSkeletonLoading';
import DropZone from '../dnd/DropZone';
import EventoDraggable from '../dnd/EventoDraggable';
import SkeletonDiaMensal from '../skeletons/SkeletonDiaMensal';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MensalComDnDProps {
  currentDate: Date;
  eventos: Reservation[];
  selectedLocais: string[];
  onEventClick: (evento: Reservation) => void;
  onDateClick: (date: Date) => void;
}

const MensalComDnD = memo(({
  currentDate,
  eventos,
  selectedLocais,
  onEventClick,
  onDateClick
}: MensalComDnDProps) => {
  const { isDayLoading } = useSkeletonLoading({
    viewType: 'month',
    currentDate,
    shouldReload: false
  });

  // Gerar grid do calendário (42 células)
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentDate]);

  // Filtrar e agrupar eventos por dia
  const eventosPorDia = useMemo(() => {
    const filteredEvents = eventos.filter(evento => {
      if (selectedLocais.includes('all')) return true;
      return selectedLocais.includes(evento.venueId);
    });

    return filteredEvents.reduce((acc, evento) => {
      const eventDate = formato(evento.day, 'yyyy-MM-dd');
      if (!acc[eventDate]) acc[eventDate] = [];
      acc[eventDate].push(evento);
      return acc;
    }, {} as Record<string, Reservation[]>);
  }, [eventos, selectedLocais]);

  const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Cabeçalho dos dias da semana */}
      <div className="grid grid-cols-7 border-b border-border/50 bg-muted/30">
        {diasDaSemana.map(dia => (
          <div key={dia} className="p-3 text-center font-semibold text-muted-foreground border-r border-border/30 last:border-r-0">
            {dia}
          </div>
        ))}
      </div>

      {/* Grid do calendário */}
      <div className="flex-1 grid grid-cols-7 grid-rows-6 gap-0 border-border/50">
        {calendarDays.map(day => {
          const dayKey = format(day, 'yyyy-MM-dd');
          const dayEvents = eventosPorDia[dayKey] || [];
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isToday = isSameDay(day, new Date());
          const isLoading = isDayLoading(day);

          return (
            <DropZone
              key={dayKey}
              id={`month-day-${dayKey}`}
              data={{
                date: dayKey,
                type: 'day'
              }}
              className={cn(
                "border-b border-r border-border/30 last:border-r-0 min-h-24 transition-all duration-200",
                !isCurrentMonth && "bg-muted/20 text-muted-foreground/50",
                isCurrentMonth && "hover:bg-accent/30"
              )}
            >
              <div 
                className="h-full p-1 cursor-pointer"
                onClick={() => onDateClick(day)}
              >
                {/* Número do dia */}
                <div className="flex items-center justify-between mb-1">
                  <span className={cn(
                    "text-sm font-medium transition-colors",
                    isToday && "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs",
                    !isCurrentMonth && "text-muted-foreground/50"
                  )}>
                    {format(day, 'd')}
                  </span>
                  
                  {dayEvents.length > 0 && (
                    <Badge variant="secondary" className="text-xs h-4 px-1">
                      {dayEvents.length}
                    </Badge>
                  )}
                </div>

                {/* Conteúdo do dia */}
                {isLoading ? (
                  <SkeletonDiaMensal 
                    hasEvents={dayEvents.length > 0}
                    eventCount={Math.min(dayEvents.length, 3)}
                  />
                ) : (
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map(evento => (
                      <EventoDraggable
                        key={evento.id}
                        evento={evento}
                        className="cursor-pointer"
                      >
                        <div 
                          className="flex items-center space-x-1 p-1 rounded text-xs hover:bg-accent/50 transition-colors group"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick(evento);
                          }}
                        >
                          <div 
                            className="w-2 h-2 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform"
                            style={{ backgroundColor: evento.color }}
                          />
                          <span className="truncate font-medium group-hover:text-primary transition-colors">
                            {evento.startTime} {evento.client}
                          </span>
                        </div>
                      </EventoDraggable>
                    ))}
                    
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-muted-foreground text-center py-1">
                        +{dayEvents.length - 3} mais
                      </div>
                    )}
                  </div>
                )}
              </div>
            </DropZone>
          );
        })}
      </div>
    </div>
  );
});

// Helper function para format
const formato = format;

MensalComDnD.displayName = 'MensalComDnD';

export default MensalComDnD;