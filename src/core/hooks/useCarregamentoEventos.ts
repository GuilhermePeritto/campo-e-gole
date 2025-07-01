
import { useState, useCallback, useMemo } from 'react';
import type { Reservation } from '@/hooks/useCalendar';
import { parseISO, format } from 'date-fns';

interface UseCarregamentoEventosProps {
  eventos: Reservation[];
  selectedVenue: string;
  selectedLocais: string[];
}

export const useCarregamentoEventos = ({ 
  eventos, 
  selectedVenue, 
  selectedLocais 
}: UseCarregamentoEventosProps) => {
  const [displayedEvents, setDisplayedEvents] = useState<Reservation[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Filtrar eventos por local selecionado
  const filteredEvents = useMemo(() => {
    return eventos.filter(evento => {
      if (selectedVenue === 'all' && selectedLocais.includes('all')) return true;
      if (selectedVenue !== 'all' && evento.venueId === selectedVenue) return true;
      if (selectedLocais.includes('all')) return true;
      return selectedLocais.includes(evento.venueId);
    });
  }, [eventos, selectedVenue, selectedLocais]);

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

  const resetAndLoad = useCallback(() => {
    setDisplayedEvents([]);
    setPage(1);
    setHasMore(true);
    loadEvents(1, true);
  }, [loadEvents]);

  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadEvents(nextPage);
    }
  }, [page, isLoadingMore, hasMore, loadEvents]);

  return {
    displayedEvents,
    isLoadingMore,
    hasMore,
    loadEvents,
    resetAndLoad,
    loadMore
  };
};
