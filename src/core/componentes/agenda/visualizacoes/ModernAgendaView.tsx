import { memo, useMemo } from 'react';
import { format, isSameDay, startOfDay, addDays, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Reservation } from '@/hooks/useCalendar';
import { useSkeletonLoading } from '@/core/hooks/useSkeletonLoading';
import EventoDraggable from '../dnd/EventoDraggable';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModernAgendaViewProps {
  currentDate: Date;
  eventos: Reservation[];
  selectedLocais: string[];
  onEventClick: (evento: Reservation) => void;
  onDateClick: (date: Date) => void;
}

const ModernAgendaView = memo(({
  currentDate,
  eventos,
  selectedLocais,
  onEventClick,
}: ModernAgendaViewProps) => {
  const { isDayLoading } = useSkeletonLoading({
    viewType: 'agenda',
    currentDate,
    shouldReload: false
  });

  // Filter and group events by date
  const eventosPorData = useMemo(() => {
    const filteredEvents = eventos.filter(evento => {
      if (selectedLocais.includes('all')) return true;
      return selectedLocais.includes(evento.venueId);
    });

    // Group events by date and sort by time
    const grouped = filteredEvents.reduce((acc, evento) => {
      const dateKey = format(evento.day, 'yyyy-MM-dd');
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(evento);
      return acc;
    }, {} as Record<string, Reservation[]>);

    // Sort events within each day by start time
    Object.keys(grouped).forEach(dateKey => {
      grouped[dateKey].sort((a, b) => {
        return a.startTime.localeCompare(b.startTime);
      });
    });

    return grouped;
  }, [eventos, selectedLocais]);

  // Get next 30 days from current date
  const dateRange = useMemo(() => {
    const dates = [];
    for (let i = 0; i < 30; i++) {
      dates.push(addDays(currentDate, i));
    }
    return dates;
  }, [currentDate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  return (
    <div className="h-full bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-8">
          {dateRange.map(date => {
            const dateKey = format(date, 'yyyy-MM-dd');
            const dayEvents = eventosPorData[dateKey] || [];
            const isToday = isSameDay(date, new Date());
            const isLoading = isDayLoading(date);

            if (dayEvents.length === 0 && !isLoading) return null;

            return (
              <div key={dateKey} className="space-y-4">
                {/* Date header */}
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    "flex items-center space-x-3 py-2 px-4 rounded-lg border",
                    isToday ? "bg-primary text-primary-foreground border-primary" : "bg-muted/50 border-border"
                  )}>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {format(date, 'dd')}
                      </div>
                      <div className="text-xs uppercase tracking-wider">
                        {format(date, 'EEE', { locale: ptBR })}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">
                        {format(date, 'MMMM yyyy', { locale: ptBR })}
                      </div>
                      <div className="text-sm opacity-80">
                        {dayEvents.length} evento{dayEvents.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Events list */}
                <div className="space-y-3 ml-8">
                  {isLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <Card key={i} className="animate-pulse">
                          <CardContent className="p-4">
                            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-muted rounded w-1/2"></div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    dayEvents.map(evento => (
                      <EventoDraggable
                        key={evento.id}
                        evento={evento}
                      >
                        <Card 
                          className="hover:shadow-md transition-all duration-200 cursor-pointer group border-l-4"
                          style={{ borderLeftColor: evento.color }}
                          onClick={() => onEventClick(evento)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center space-x-3">
                                  <div 
                                    className="w-3 h-3 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform"
                                    style={{ backgroundColor: evento.color }}
                                  />
                                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {evento.client}
                                  </h3>
                                  <Badge 
                                    className={getStatusColor(evento.status)}
                                    variant="secondary"
                                  >
                                    {getStatusLabel(evento.status)}
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
                                  {evento.title && (
                                    <div className="flex items-center space-x-2">
                                      <User className="h-4 w-4" />
                                      <span>{evento.title}</span>
                                    </div>
                                  )}
                                </div>

                                {/* Additional details if available */}
                                {evento.title && (
                                  <div className="text-sm text-muted-foreground">
                                    {evento.title}
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </EventoDraggable>
                    ))
                  )}
                </div>
              </div>
            );
          })}

          {/* Empty state */}
          {Object.keys(eventosPorData).length === 0 && !isDayLoading && (
            <div className="text-center py-12">
              <div className="text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Nenhum evento encontrado</h3>
                <p className="text-sm">
                  Não há eventos agendados para o período selecionado.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

ModernAgendaView.displayName = 'ModernAgendaView';

export default ModernAgendaView;