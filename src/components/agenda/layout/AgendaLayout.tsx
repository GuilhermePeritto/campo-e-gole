
import { useBarraLateralAgenda } from '@/core/hooks/useBarraLateralAgenda';
import { useDragAndDropAvancado } from '@/core/hooks/useDragAndDropAvancado';
import type { Reservation } from '@/hooks/useCalendar';
import { DndContext } from '@dnd-kit/core';
import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VisualizacaoAgenda from '../views/VisualizacaoAgenda';
import HeaderAgenda from './HeaderAgenda';
import SidebarAgenda from './SidebarAgenda';

interface AgendaLayoutProps {
  viewType: 'month' | 'week' | 'day' | 'agenda';
  currentDate: Date;
  selectedVenue: string;
  mockReservations: Reservation[];
  onViewTypeChange: (view: 'month' | 'week' | 'day' | 'agenda') => void;
  onNavigateDate: (direction: 'prev' | 'next') => void;
  onSetCurrentDate: (date: Date) => void;
  onEventClick: (evento: Reservation) => void;
  children?: React.ReactNode;
}

const AgendaLayout = memo(({
  viewType,
  currentDate,
  selectedVenue,
  mockReservations,
  onViewTypeChange,
  onNavigateDate,
  onSetCurrentDate,
  onEventClick,
  children
}: AgendaLayoutProps) => {
  const navigate = useNavigate();
  
  const {
    expandida,
    dataSelecionada,
    locaisSelecionados,
    consulta,
    locais,
    todosLocais,
    eventCountByVenue,
    filteredEvents,
    eventsByDay,
    shouldFilter,
    selectedDateAsDate,
    ultimaAtualizacao,
    alternarBarra,
    manipularMudancaData,
    manipularAlternarLocal,
    isLocalSelecionado,
    manipularMudancaConsulta,
    sincronizarDataComAgenda,
    obterDataSelecionadaComoDate
  } = useBarraLateralAgenda({ 
    viewType, 
    currentDate, 
    allEvents: mockReservations 
  });

  const {
    isDragging,
    handleDragStart,
    handleDragOver,
    handleDragEnd
  } = useDragAndDropAvancado();

  // Sincronizar data da sidebar com a agenda
  useEffect(() => {
    sincronizarDataComAgenda(currentDate);
  }, [currentDate, sincronizarDataComAgenda]);

  // Quando a data é alterada no calendário da sidebar, atualizar a agenda (apenas se necessário)
  useEffect(() => {
    if (shouldFilter && selectedDateAsDate) {
      onSetCurrentDate(selectedDateAsDate);
    }
  }, [shouldFilter, selectedDateAsDate, onSetCurrentDate]);

  const manipularCliqueHoje = () => {
    onSetCurrentDate(new Date());
  };

  const manipularNovoEvento = () => {
    const ano = currentDate.getFullYear();
    const mes = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const dia = currentDate.getDate().toString().padStart(2, '0');
    const dataStr = `${ano}-${mes}-${dia}`;
    navigate(`/eventos/reserva?date=${dataStr}`);
  };

  // Wrapper functions para compatibilidade de tipos
  const handleEventDragStart = useCallback((evento: Reservation) => {
    console.log('Wrapper: Iniciando drag do evento:', evento);
    // O evento real será capturado pelo DndContext
  }, []);

  const handleEventDragEnd = useCallback((newDate?: Date, newTime?: string) => {
    console.log('Wrapper: Finalizando drag:', { newDate, newTime });
    // A lógica real está no useDragAndDropAvancado
  }, []);

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex bg-background overflow-hidden">
        {/* Barra Lateral */}
        <SidebarAgenda
          isExpanded={expandida}
          selectedDate={dataSelecionada}
          selectedLocais={locaisSelecionados}
          searchQuery={consulta}
          locais={locais}
          allLocais={todosLocais}
          eventCountByVenue={eventCountByVenue}
          onToggle={alternarBarra}
          onDateChange={manipularMudancaData}
          onLocalToggle={manipularAlternarLocal}
          isLocalSelected={isLocalSelecionado}
          onSearchChange={manipularMudancaConsulta}
        />
        
        {/* Área Principal */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Cabeçalho */}
          <HeaderAgenda
            currentDate={currentDate}
            viewType={viewType}
            onNavigateDate={onNavigateDate}
            onTodayClick={manipularCliqueHoje}
            onNewEventClick={manipularNovoEvento}
            onViewTypeChange={onViewTypeChange}
          />

          {/* Conteúdo Principal */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-auto">
              {viewType === 'agenda' ? (
                <VisualizacaoAgenda
                  eventos={filteredEvents}
                  currentDate={currentDate}
                  selectedVenue={selectedVenue}
                  selectedLocais={locaisSelecionados}
                  onEventClick={onEventClick}
                  onDragStart={handleEventDragStart}
                  onDragEnd={handleEventDragEnd}
                />
              ) : (
                <div className="h-full">
                  {children}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
});

AgendaLayout.displayName = 'AgendaLayout';

export default AgendaLayout;
