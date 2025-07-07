import { memo, useMemo } from 'react';
import { format, addMinutes, startOfDay, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Reservation } from '@/hooks/useCalendar';
import { useSkeletonLoading } from '@/core/hooks/useSkeletonLoading';
import DropZone from '../dnd/DropZone';
import EventoDraggable from '../dnd/EventoDraggable';
import SkeletonDiaDiario from '../skeletons/SkeletonDiaDiario';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DiarioComDnDProps {
  currentDate: Date;
  eventos: Reservation[];
  selectedLocais: string[];
  onEventClick: (evento: Reservation) => void;
}

const DiarioComDnD = memo(({
  currentDate,
  eventos,
  selectedLocais,
  onEventClick
}: DiarioComDnDProps) => {
  const { isDayLoading } = useSkeletonLoading({
    viewType: 'day',
    currentDate,
    shouldReload: false
  });

  // Gerar slots de horário (6h às 23h com intervalos de 30min)
  const timeSlots = useMemo(() => {
    const slots = [];
    const startTime = startOfDay(currentDate);
    const startHour = addMinutes(startTime, 6 * 60); // 6:00

    for (let i = 0; i < 36; i++) { // 18 horas * 2 slots por hora = 36 slots
      const time = addMinutes(startHour, i * 30);
      slots.push({
        time: format(time, 'HH:mm'),
        label: format(time, 'HH:mm'),
        fullTime: time
      });
    }
    return slots;
  }, [currentDate]);

  // Filtrar eventos do dia
  const eventosDoDia = useMemo(() => {
    return eventos.filter(evento => {
      const isSameDate = isSameDay(evento.day, currentDate);
      const matchesLocation = selectedLocais.includes('all') || selectedLocais.includes(evento.venueId);
      return isSameDate && matchesLocation;
    }).sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [eventos, currentDate, selectedLocais]);

  const isLoading = isDayLoading(currentDate);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Cabeçalho do dia */}
      <div className="p-6 border-b border-border/50 bg-gradient-to-r from-background to-muted/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {format(currentDate, "dd 'de' MMMM", { locale: ptBR })}
            </h2>
            <p className="text-muted-foreground capitalize">
              {format(currentDate, 'EEEE', { locale: ptBR })}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              {eventosDoDia.length} {eventosDoDia.length === 1 ? 'evento' : 'eventos'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Timeline de horários */}
      <ScrollArea className="flex-1">
        {isLoading ? (
          <div className="p-6">
            <SkeletonDiaDiario timeSlots={12} hasEvents={true} />
          </div>
        ) : (
          <div className="p-6 space-y-0">
            {timeSlots.map(slot => {
              // Filtrar eventos para este slot
              const slotEvents = eventosDoDia.filter(evento => {
                const eventStartTime = evento.startTime;
                return eventStartTime === slot.time;
              });

              const isHourMark = slot.time.endsWith(':00');

              return (
                <DropZone
                  key={slot.time}
                  id={`day-slot-${format(currentDate, 'yyyy-MM-dd')}-${slot.time}`}
                  data={{
                    date: format(currentDate, 'yyyy-MM-dd'),
                    time: slot.time,
                    type: 'timeSlot'
                  }}
                  className={cn(
                    "flex items-start space-x-4 py-2 transition-all duration-200",
                    isHourMark && "border-t border-border/30 pt-4",
                    !isHourMark && "border-t border-border/10"
                  )}
                >
                  {/* Coluna de horário */}
                  <div className="w-16 text-right pt-1 flex-shrink-0">
                    <span className={cn(
                      "text-sm font-medium",
                      isHourMark ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {slot.label}
                    </span>
                  </div>

                  {/* Área de eventos */}
                  <div className="flex-1 min-h-12 relative">
                    {slotEvents.length === 0 ? (
                      <div className="h-12 rounded-lg border-2 border-dashed border-transparent hover:border-border/40 transition-colors" />
                    ) : (
                      <div className="space-y-2">
                        {slotEvents.map(evento => (
                          <EventoDraggable
                            key={evento.id}
                            evento={evento}
                            className="cursor-pointer"
                          >
                            <Card 
                              className="hover:shadow-md hover:shadow-primary/10 transition-all duration-200 cursor-pointer group border-border/50"
                              onClick={(e) => {
                                e.stopPropagation();
                                onEventClick(evento);
                              }}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1 space-y-3">
                                    <div className="flex items-center space-x-3">
                                      <div 
                                        className="w-3 h-3 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform"
                                        style={{ backgroundColor: evento.color }}
                                      />
                                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                        {evento.client}
                                      </h4>
                                      <Badge 
                                        className={
                                          evento.status === 'confirmed' 
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                            : evento.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                        }
                                        variant="secondary"
                                      >
                                        {evento.status === 'confirmed' ? 'Confirmado' : evento.status === 'pending' ? 'Pendente' : 'Cancelado'}
                                      </Badge>
                                    </div>

                                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                                      <div className="flex items-center space-x-2">
                                        <Clock className="h-4 w-4" />
                                        <span className="font-medium">
                                          {evento.startTime} - {evento.endTime}
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <MapPin className="h-4 w-4" />
                                        <span>{evento.venue}</span>
                                      </div>
                                    </div>

                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </EventoDraggable>
                        ))}
                      </div>
                    )}
                  </div>
                </DropZone>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
});

DiarioComDnD.displayName = 'DiarioComDnD';

export default DiarioComDnD;