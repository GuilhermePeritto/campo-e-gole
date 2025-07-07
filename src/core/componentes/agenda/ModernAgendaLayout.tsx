import { useBarraLateralAgenda } from '@/core/hooks/useBarraLateralAgenda';
import { DndContext } from '@dnd-kit/core';
import { useDragAndDropAvancado } from '@/core/hooks/useDragAndDropAvancado';
import type { Reservation } from '@/hooks/useCalendar';
import { useNavigate } from 'react-router-dom';
import { useEffect, memo, useCallback } from 'react';
import ModernHeader from './layout/ModernHeader';
import ModernSidebar from './layout/ModernSidebar';
import ModernViews from './visualizacoes/ModernViews';

interface ModernAgendaLayoutProps {
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

const ModernAgendaLayout = memo(({
  viewType,
  currentDate,
  selectedVenue,
  mockReservations,
  onViewTypeChange,
  onNavigateDate,
  onSetCurrentDate,
  onEventClick,
  children
}: ModernAgendaLayoutProps) => {
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

  const handleNewEvent = () => {
    const ano = currentDate.getFullYear();
    const mes = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const dia = currentDate.getDate().toString().padStart(2, '0');
    const dataStr = `${ano}-${mes}-${dia}`;
    navigate(`/eventos/reserva?date=${dataStr}`);
  };

  const handleDateClick = (date: Date) => {
    const ano = date.getFullYear();
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const dia = date.getDate().toString().padStart(2, '0');
    const dataStr = `${ano}-${mes}-${dia}`;
    navigate(`/eventos/reserva?date=${dataStr}`);
  };

  const handleEventClick = (evento: any) => {
    navigate(`/eventos/reserva/${evento.id}/editar`);
  };

  const handleToday = () => {
    onSetCurrentDate(new Date());
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen flex bg-sidebar overflow-hidden">
        {/* Modern Sidebar */}
        <ModernSidebar
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
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 bg-background">
          {/* Modern Header */}
          <ModernHeader
            currentDate={currentDate}
            viewType={viewType}
            onNavigateDate={onNavigateDate}
            onTodayClick={handleToday}
            onNewEventClick={handleNewEvent}
            onViewTypeChange={onViewTypeChange}
          />

          {/* Calendar Content */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full">
              <ModernViews
                viewType={viewType}
                currentDate={currentDate}
                eventos={filteredEvents}
                selectedLocais={locaisSelecionados}
                onEventClick={handleEventClick}
                onDateClick={handleDateClick}
              />
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
});

ModernAgendaLayout.displayName = 'ModernAgendaLayout';

export default ModernAgendaLayout;