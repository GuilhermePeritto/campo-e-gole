
import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, isSameDay, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import EventoArrastavel from './EventoArrastavel';
import SkeletonDiaAgenda from './SkeletonDiaAgenda';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Reservation {
  id: number;
  title: string;
  start: string;
  end: string;
  venueId: string;
  clientName: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  color: string;
  client: string;
  venue: string;
  startTime: string;
  endTime: string;
  day: Date;
}

interface VisualizacaoGradeProps {
  currentDate: Date;
  reservations: Reservation[];
  onEventClick: (eventId: number) => void;
  onDayFilterClick: (day: Date) => void;
  loading?: boolean;
}

const VisualizacaoGrade: React.FC<VisualizacaoGradeProps> = ({
  currentDate,
  reservations,
  onEventClick,
  onDayFilterClick,
  loading = false
}) => {
  const [loadingDays, setLoadingDays] = useState<Set<string>>(new Set());

  // Horários da grade (8h às 22h)
  const timeSlots = Array.from({ length: 15 }, (_, i) => {
    const hour = i + 8;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // Dias da semana
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Simular loading por dia
  useEffect(() => {
    if (loading) {
      const newLoadingDays = new Set<string>();
      weekDays.forEach(day => {
        newLoadingDays.add(format(day, 'yyyy-MM-dd'));
      });
      setLoadingDays(newLoadingDays);

      // Simular carregamento individual por dia
      weekDays.forEach((day, index) => {
        setTimeout(() => {
          setLoadingDays(prev => {
            const newSet = new Set(prev);
            newSet.delete(format(day, 'yyyy-MM-dd'));
            return newSet;
          });
        }, (index + 1) * 200);
      });
    }
  }, [loading, currentDate]);

  const getEventsForDayAndTime = (day: Date, timeSlot: string) => {
    return reservations.filter(reservation => {
      const reservationDate = parseISO(reservation.start);
      const startHour = parseInt(reservation.startTime.split(':')[0]);
      const timeSlotHour = parseInt(timeSlot.split(':')[0]);
      
      return isSameDay(reservationDate, day) && 
             startHour === timeSlotHour;
    });
  };

  const formatDayHeader = (day: Date) => {
    const dayName = format(day, 'EEE', { locale: ptBR }).toUpperCase();
    const dayNumber = format(day, 'd');
    return `${dayName} ${dayNumber}`;
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="min-w-[800px]">
        {/* Header dos dias */}
        <div className="grid grid-cols-8 border-b border-border sticky top-0 bg-background z-10">
          <div className="p-4 border-r border-border">
            <span className="text-sm font-medium text-muted-foreground">Horário</span>
          </div>
          {weekDays.map(day => (
            <div key={day.toISOString()} className="p-4 border-r border-border last:border-r-0 group relative">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {formatDayHeader(day)}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onDayFilterClick(day)}
                >
                  <Filter className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Grade de horários */}
        <div className="grid grid-cols-8">
          {timeSlots.map(timeSlot => (
            <React.Fragment key={timeSlot}>
              {/* Coluna de horário */}
              <div className="p-4 border-r border-b border-border bg-muted/30">
                <span className="text-sm text-muted-foreground font-mono">
                  {timeSlot}
                </span>
              </div>
              
              {/* Colunas dos dias */}
              {weekDays.map(day => {
                const dayKey = format(day, 'yyyy-MM-dd');
                const isLoadingDay = loadingDays.has(dayKey);
                const events = getEventsForDayAndTime(day, timeSlot);
                
                return (
                  <div 
                    key={`${day.toISOString()}-${timeSlot}`}
                    className="min-h-[60px] p-1 border-r border-b border-border last:border-r-0 hover:bg-accent/50 transition-colors"
                    onDrop={(e) => {
                      e.preventDefault();
                      const eventId = e.dataTransfer.getData('text/plain');
                      // Aqui seria implementado o drop do evento
                      console.log(`Drop event ${eventId} on ${dayKey} at ${timeSlot}`);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {isLoadingDay ? (
                      <SkeletonDiaAgenda isWeekView />
                    ) : (
                      <div className="space-y-1">
                        {events.map(event => (
                          <EventoArrastavel
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            startTime={event.startTime}
                            endTime={event.endTime}
                            color={event.color}
                            clientName={event.clientName}
                            venue={event.venue}
                            status={event.status}
                            onClick={() => onEventClick(event.id)}
                            className="text-xs"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisualizacaoGrade;
