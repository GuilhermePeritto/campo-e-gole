
import type { Reservation } from '@/hooks/useCalendar';
import { parseISO, format } from 'date-fns';
import { useState, useEffect } from 'react';
import SkeletonDiaAgenda from './SkeletonDiaAgenda';
import CabecalhoDiaAgenda from './eventos/CabecalhoDiaAgenda';
import CardEventoAgenda from './eventos/CardEventoAgenda';
import BotaoCarregarMais from './eventos/BotaoCarregarMais';
import SkeletonCarregamentoEventos from './skeletons/SkeletonCarregamentoEventos';
import { useCarregamentoEventos } from '@/core/hooks/useCarregamentoEventos';

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
  const {
    displayedEvents,
    isLoadingMore,
    hasMore,
    resetAndLoad,
    loadMore
  } = useCarregamentoEventos({
    eventos,
    selectedVenue,
    selectedLocais
  });

  // Resetar quando mudam os filtros
  useEffect(() => {
    resetAndLoad();
  }, [selectedVenue, selectedLocais, currentDate, resetAndLoad]);

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
        const eventosData = eventosAgrupados[data];

        return (
          <div key={data} className="space-y-4">
            <CabecalhoDiaAgenda
              data={data}
              quantidadeEventos={eventosData.length}
            />

            <div className="grid gap-3">
              {eventosData.map(evento => (
                <CardEventoAgenda
                  key={evento.id}
                  evento={evento}
                  onEventClick={onEventClick}
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Botão para carregar mais */}
      <BotaoCarregarMais
        isLoading={isLoadingMore}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />

      {/* Loading skeleton para mais eventos */}
      {isLoadingMore && (
        <SkeletonCarregamentoEventos quantidade={3} />
      )}
    </div>
  );
};

export default VisualizacaoAgenda;
