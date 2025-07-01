
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Reservation } from '@/hooks/useCalendar';
import { format, parseISO, addDays, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Clock, MapPin, Loader2 } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import EventoArrastavel from './EventoArrastavel';
import SkeletonDiaAgenda from './SkeletonDiaAgenda';

interface VisualizacaoAgendaProps {
  eventos: Reservation[];
  currentDate: Date;
  selectedVenue: string;
  selectedLocais: string[];
  isLoading?: boolean;
  onEventClick: (evento: Reservation) => void;
  onDragStart: (evento: Reservation) => void;
  onDragEnd: (newDate?: Date, newTime?: string) => void;
}

const VisualizacaoAgenda = ({
  eventos,
  currentDate,
  selectedVenue,
  selectedLocais,
  isLoading = false,
  onEventClick,
  onDragStart,
  onDragEnd
}: VisualizacaoAgendaProps) => {
  const [displayedEvents, setDisplayedEvents] = useState<Reservation[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Filtrar eventos por local selecionado
  const filteredEvents = eventos.filter(evento => {
    if (selectedVenue === 'all' && selectedLocais.includes('all')) return true;
    if (selectedVenue !== 'all' && evento.venueId === selectedVenue) return true;
    if (selectedLocais.includes('all')) return true;
    return selectedLocais.includes(evento.venueId);
  });

  // Resetar quando mudam os filtros
  useEffect(() => {
    setDisplayedEvents([]);
    setPage(1);
    setHasMore(true);
    loadEvents(1, true);
  }, [selectedVenue, selectedLocais, currentDate]);

  const loadEvents = useCallback(async (pageNum: number, reset = false) => {
    if (isLoadingMore) return;
    
    setIsLoadingMore(true);
    
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const itemsPerPage = 10;
    const startIndex = (pageNum - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Agrupar eventos por data
    const eventosAgrupados = filteredEvents.reduce((grupos, evento) => {
      const dataEvento = parseISO(evento.start.split('T')[0]);
      const dataKey = format(dataEvento, 'yyyy-MM-dd');
      
      if (!grupos[dataKey]) {
        grupos[dataKey] = [];
      }
      grupos[dataKey].push(evento);
      return grupos;
    }, {} as Record<string, Reservation[]>);

    const datasOrdenadas = Object.keys(eventosAgrupados).sort();
    const eventosOrdenados = datasOrdenadas.flatMap(data => 
      eventosAgrupados[data].sort((a, b) => a.startTime.localeCompare(b.startTime))
    );

    const newEvents = eventosOrdenados.slice(startIndex, endIndex);
    
    if (reset) {
      setDisplayedEvents(newEvents);
    } else {
      setDisplayedEvents(prev => [...prev, ...newEvents]);
    }
    
    setHasMore(newEvents.length === itemsPerPage && endIndex < eventosOrdenados.length);
    setIsLoadingMore(false);
  }, [filteredEvents, isLoadingMore]);

  const loadMore = () => {
    if (!isLoadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadEvents(nextPage);
    }
  };

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

  if (isLoading) {
    return <SkeletonDiaAgenda tipo="agenda" />;
  }

  // Agrupar eventos exibidos por data
  const eventosAgrupados = displayedEvents.reduce((grupos, evento) => {
    const dataEvento = parseISO(evento.start.split('T')[0]);
    const dataKey = format(dataEvento, 'yyyy-MM-dd');
    
    if (!grupos[dataKey]) {
      grupos[dataKey] = [];
    }
    grupos[dataKey].push(evento);
    return grupos;
  }, {} as Record<string, Reservation[]>);

  const datasOrdenadas = Object.keys(eventosAgrupados).sort();

  if (datasOrdenadas.length === 0 && !isLoadingMore) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Nenhum evento encontrado</h3>
          <p>Não há eventos para os filtros selecionados.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-6 pb-6">
      {datasOrdenadas.map(data => {
        const dataObj = parseISO(data);
        const eventosData = eventosAgrupados[data];

        return (
          <div key={data} className="space-y-4">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold text-foreground">
                  {format(dataObj, "dd 'de' MMMM", { locale: ptBR })}
                </h3>
                <span className="text-sm text-muted-foreground capitalize">
                  {format(dataObj, 'EEEE', { locale: ptBR })}
                </span>
              </div>
              <Badge variant="outline" className="bg-muted/50">
                {eventosData.length} {eventosData.length === 1 ? 'evento' : 'eventos'}
              </Badge>
            </div>

            <div className="grid gap-3">
              {eventosData.map(evento => (
                <EventoArrastavel
                  key={evento.id}
                  evento={evento}
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                >
                  <Card 
                    className="hover:shadow-md hover:shadow-primary/10 transition-all duration-200 cursor-pointer group border-border/50"
                    onClick={() => onEventClick(evento)}
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
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </EventoArrastavel>
              ))}
            </div>
          </div>
        );
      })}

      {/* Botão para carregar mais */}
      {hasMore && (
        <div className="flex justify-center pt-6">
          <Button
            onClick={loadMore}
            disabled={isLoadingMore}
            variant="outline"
            className="w-full max-w-xs"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Carregando...
              </>
            ) : (
              'Carregar mais eventos'
            )}
          </Button>
        </div>
      )}

      {/* Loading skeleton para mais eventos */}
      {isLoadingMore && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="h-3 w-3 rounded-full bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/3" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default VisualizacaoAgenda;
