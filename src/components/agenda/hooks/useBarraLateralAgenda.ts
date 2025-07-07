import { fromDate, getLocalTimeZone, today } from "@internationalized/date";
import { useCallback, useMemo, useState } from 'react';
import type { DateValue } from "react-aria-components";
import type { EventoAgenda } from './useCalendar';
import { useEventFiltering } from './useEventFiltering';
import { useInteligentDateFilter } from './useInteligentDateFilter';
import { useLocais } from './useLocais';

interface UseBarraLateralAgendaProps {
  tipoVisualizacao: 'mes' | 'semana' | 'dia' | 'lista';
  dataAtual: Date;
  eventos?: EventoAgenda[];
}

export const useBarraLateralAgenda = ({ 
  tipoVisualizacao, 
  dataAtual, 
  eventos = [] 
}: UseBarraLateralAgendaProps) => {
  console.log('useBarraLateralAgenda - props:', {
    tipoVisualizacao,
    dataAtual,
    eventosCount: eventos.length
  });
  
  const [expandida, setExpandida] = useState(true);
  const [dataSelecionada, setDataSelecionada] = useState<DateValue | null>(today(getLocalTimeZone()));
  const [locaisSelecionados, setLocaisSelecionados] = useState<string[]>(['all']);
  const [busca, setBusca] = useState('');
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(Date.now());
  const { locais } = useLocais();

  // Hook para filtragem inteligente
  const { shouldFilter, selectedDateAsDate, getCurrentPeriod } = useInteligentDateFilter({
    tipoVisualizacao,
    dataAtual,
    dataSelecionada
  });

  console.log('useBarraLateralAgenda - useInteligentDateFilter result:', {
    shouldFilter,
    selectedDateAsDate,
    getCurrentPeriod: getCurrentPeriod()
  });

  // Hook para filtrar eventos
  const { filteredEvents, eventsByDay, eventCountByVenue } = useEventFiltering({
    eventos,
    locaisSelecionados,
    busca
  });

  console.log('useBarraLateralAgenda - useEventFiltering result:', {
    filteredEventsCount: filteredEvents.length,
    eventsByDayCount: Object.keys(eventsByDay).length,
    eventCountByVenue
  });

  const alternarBarra = useCallback(() => {
    console.log('useBarraLateralAgenda - alternarBarra chamado');
    setExpandida(prev => !prev);
  }, []);

  const aoMudarData = useCallback((data: DateValue | null) => {
    console.log('Mudança de data na sidebar:', data);
    setDataSelecionada(data);
    if (shouldFilter) {
      setUltimaAtualizacao(Date.now());
    }
  }, [shouldFilter]);

  const aoAlternarLocal = useCallback((localId: string) => {
    console.log('useBarraLateralAgenda - aoAlternarLocal chamado:', localId);
    setLocaisSelecionados(prev => {
      if (localId === 'all') {
        setUltimaAtualizacao(Date.now());
        return ['all'];
      }
      const novaSelecao = prev.includes(localId)
        ? prev.filter(id => id !== localId)
        : [...prev.filter(id => id !== 'all'), localId];
      // Permite que nenhum local seja selecionado (array vazio)
      setUltimaAtualizacao(Date.now());
      return novaSelecao;
    });
  }, []);

  const estaLocalSelecionado = useCallback((localId: string) => {
    const isSelected = locaisSelecionados.includes('all') || locaisSelecionados.includes(localId);
    console.log('useBarraLateralAgenda - estaLocalSelecionado:', { localId, isSelected, locaisSelecionados });
    return isSelected;
  }, [locaisSelecionados]);

  const aoMudarBusca = useCallback((novaBusca: string) => {
    console.log('useBarraLateralAgenda - aoMudarBusca chamado:', novaBusca);
    setBusca(novaBusca);
  }, []);

  const locaisFiltrados = useMemo(() => {
    const filtered = locais.filter(local =>
      (local.name?.toLowerCase().includes(busca.toLowerCase()) ||
      local.type?.toLowerCase().includes(busca.toLowerCase()))
    );
    console.log('useBarraLateralAgenda - locaisFiltrados:', {
      busca,
      totalLocais: locais.length,
      locaisFiltrados: filtered.length
    });
    return filtered;
  }, [locais, busca]);

  // Sincronizar data selecionada com a agenda principal
  const sincronizarDataComAgenda = useCallback((dataAgenda: Date) => {
    console.log('Sincronizando data da agenda com sidebar:', dataAgenda);
    const valorData = fromDate(dataAgenda, getLocalTimeZone());
    setDataSelecionada(valorData);
  }, []);

  // Converter DateValue para Date para a agenda
  const obterDataSelecionadaComoDate = useCallback(() => {
    if (!dataSelecionada) return new Date();
    const convertedDate = new Date(dataSelecionada.year, dataSelecionada.month - 1, dataSelecionada.day);
    console.log('useBarraLateralAgenda - obterDataSelecionadaComoDate:', {
      dataSelecionada,
      convertedDate
    });
    return convertedDate;
  }, [dataSelecionada]);

  const result = {
    expandida,
    dataSelecionada,
    locaisSelecionados,
    busca,
    locais: locaisFiltrados,
    todosLocais: locais,
    eventCountByVenue,
    filteredEvents,
    eventsByDay,
    shouldFilter,
    selectedDateAsDate,
    getCurrentPeriod,
    ultimaAtualizacao,
    alternarBarra,
    aoMudarData,
    aoAlternarLocal,
    estaLocalSelecionado,
    aoMudarBusca,
    sincronizarDataComAgenda,
    obterDataSelecionadaComoDate
  };

  console.log('useBarraLateralAgenda - return:', {
    expandida: result.expandida,
    dataSelecionada: result.dataSelecionada,
    locaisSelecionados: result.locaisSelecionados,
    shouldFilter: result.shouldFilter,
    selectedDateAsDate: result.selectedDateAsDate
  });

  return result;
};
