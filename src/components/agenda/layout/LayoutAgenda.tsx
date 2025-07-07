import { DndContext } from '@dnd-kit/core';
import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArrastarSoltarAgenda } from '../hooks/useArrastarSoltarAgenda';
import { useBarraLateralAgenda } from '../hooks/useBarraLateralAgenda';
import type { EventoAgenda } from '../hooks/useCalendar';
import VisualizacoesAgenda from '../views/VisualizacoesAgenda';
import BarraLateralAgenda from './BarraLateralAgenda';
import CabecalhoAgenda from './CabecalhoAgenda';

interface LayoutAgendaProps {
  tipoVisualizacao: 'mes' | 'semana' | 'dia' | 'lista';
  dataAtual: Date;
  localSelecionado: string;
  eventos: EventoAgenda[];
  onViewTypeChange: (tipo: 'mes' | 'semana' | 'dia' | 'lista') => void;
  onNavigateDate: (direcao: 'anterior' | 'proxima') => void;
  onSetCurrentDate: (data: Date) => void;
  onEventClick: (evento: EventoAgenda) => void;
  children?: React.ReactNode;
}

const LayoutAgenda = memo(({
  tipoVisualizacao,
  dataAtual,
  localSelecionado,
  eventos,
  onViewTypeChange,
  onNavigateDate,
  onSetCurrentDate,
  onEventClick,
  children
}: LayoutAgendaProps) => {
  console.log('LayoutAgenda - props:', {
    tipoVisualizacao,
    dataAtual,
    localSelecionado,
    eventosCount: eventos.length
  });
  
  const navigate = useNavigate();
  
  const {
    expandida,
    dataSelecionada,
    locaisSelecionados,
    busca,
    locais,
    todosLocais,
    eventCountByVenue,
    filteredEvents,
    eventsByDay,
    shouldFilter,
    selectedDateAsDate,
    alternarBarra,
    aoMudarData,
    aoAlternarLocal,
    estaLocalSelecionado,
    aoMudarBusca,
    sincronizarDataComAgenda
  } = useBarraLateralAgenda({ 
    tipoVisualizacao, 
    dataAtual, 
    eventos 
  });

  console.log('LayoutAgenda - useBarraLateralAgenda result:', {
    expandida,
    dataSelecionada,
    locaisSelecionados,
    shouldFilter,
    selectedDateAsDate
  });

  const {
    handleDragStart,
    handleDragOver,
    handleDragEnd
  } = useArrastarSoltarAgenda();

  // Sincronizar data da sidebar com a agenda
  useEffect(() => {
    console.log('LayoutAgenda - sincronizando data da agenda com sidebar:', dataAtual);
    sincronizarDataComAgenda(dataAtual);
  }, [dataAtual, sincronizarDataComAgenda]);

  // Quando a data é alterada no calendário da sidebar, atualizar a agenda (apenas se necessário)
  useEffect(() => {
    console.log('LayoutAgenda - verificando se precisa atualizar agenda:', {
      shouldFilter,
      selectedDateAsDate
    });
    if (shouldFilter && selectedDateAsDate) {
      console.log('LayoutAgenda - atualizando agenda com data da sidebar:', selectedDateAsDate);
      onSetCurrentDate(selectedDateAsDate);
    }
  }, [shouldFilter, selectedDateAsDate, onSetCurrentDate]);

  const handleNovoEvento = () => {
    console.log('LayoutAgenda - handleNovoEvento chamado');
    const ano = dataAtual.getFullYear();
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const dia = dataAtual.getDate().toString().padStart(2, '0');
    const dataStr = `${ano}-${mes}-${dia}`;
    console.log('LayoutAgenda - navegando para nova reserva:', dataStr);
    navigate(`/eventos/reserva?date=${dataStr}`);
  };

  const handleCliqueData = (data: Date) => {
    console.log('LayoutAgenda - handleCliqueData chamado:', data);
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    const dataStr = `${ano}-${mes}-${dia}`;
    console.log('LayoutAgenda - navegando para reserva:', dataStr);
    navigate(`/eventos/reserva?date=${dataStr}`);
  };

  const handleCliqueEvento = (evento: EventoAgenda) => {
    console.log('LayoutAgenda - handleCliqueEvento chamado:', evento);
    navigate(`/eventos/reserva/${evento.id}/editar`);
  };

  const handleHoje = () => {
    console.log('LayoutAgenda - handleHoje chamado - definindo data atual:', new Date());
    onSetCurrentDate(new Date());
  };

  console.log('LayoutAgenda - renderizando com:', {
    expandida,
    dataAtual,
    tipoVisualizacao,
    filteredEventsCount: filteredEvents.length
  });

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="h-full min-h-0 flex flex-1 bg-sidebar overflow-hidden">
        {/* Barra Lateral */}
        <BarraLateralAgenda
          isExpanded={expandida}
          selectedDate={dataSelecionada}
          selectedLocais={locaisSelecionados}
          searchQuery={busca}
          locais={locais}
          allLocais={todosLocais}
          eventCountByVenue={eventCountByVenue}
          onToggle={() => {
            console.log('LayoutAgenda - onToggle chamado');
            alternarBarra();
          }}
          onDateChange={(data) => {
            console.log('LayoutAgenda - onDateChange chamado:', data);
            aoMudarData(data);
          }}
          onLocalToggle={(localId) => {
            console.log('LayoutAgenda - onLocalToggle chamado:', localId);
            aoAlternarLocal(localId);
          }}
          isLocalSelected={estaLocalSelecionado}
          onSearchChange={(query) => {
            console.log('LayoutAgenda - onSearchChange chamado:', query);
            aoMudarBusca(query);
          }}
          tipoVisualizacao={tipoVisualizacao}
        />
        
        {/* Conteúdo Principal */}
        <div className="flex-1 flex flex-col min-w-0 h-full min-h-0 bg-background">
          {/* Cabeçalho */}
          <CabecalhoAgenda
            dataAtual={dataAtual}
            tipoVisualizacao={tipoVisualizacao}
            aoNavegarData={(direcao) => {
              console.log('LayoutAgenda - aoNavegarData chamado:', direcao);
              onNavigateDate(direcao);
            }}
            aoClicarHoje={handleHoje}
            aoClicarNovoEvento={handleNovoEvento}
            aoMudarTipoVisualizacao={(tipo) => {
              console.log('LayoutAgenda - aoMudarTipoVisualizacao chamado:', tipo);
              onViewTypeChange(tipo);
            }}
          />

          {/* Visualizações */}
          <div className="flex-1 min-h-0 flex flex-col">
            <div className="h-full min-h-0 flex-1 flex flex-col">
              <VisualizacoesAgenda
                tipoVisualizacao={tipoVisualizacao}
                dataAtual={dataAtual}
                eventos={filteredEvents}
                locaisSelecionados={locaisSelecionados}
                aoClicarEvento={(evento) => {
                  console.log('LayoutAgenda - aoClicarEvento chamado:', evento);
                  handleCliqueEvento(evento);
                }}
                aoClicarData={(data) => {
                  console.log('LayoutAgenda - aoClicarData chamado:', data);
                  handleCliqueData(data);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
});

LayoutAgenda.displayName = 'LayoutAgenda';

export default LayoutAgenda;