
import { useAgendaSidebar } from '@/core/hooks/useAgendaSidebar';
import { useDragAndDropAgenda } from '@/core/hooks/useDragAndDropAgenda';
import type { Reservation } from '@/hooks/useCalendar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import HeaderAgenda from './HeaderAgenda';
import SidebarAgenda from './SidebarAgenda';
import VisualizacaoAgenda from './VisualizacaoAgenda';

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

const AgendaLayout = ({
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
    isExpanded,
    selectedDate,
    selectedLocais,
    searchQuery,
    locais,
    allLocais,
    toggleSidebar,
    handleDateChange,
    handleLocalToggle,
    isLocalSelected,
    handleSearchChange,
    syncDateWithAgenda,
    getSelectedDateAsDate
  } = useAgendaSidebar();

  const {
    handleDragStart,
    handleDragEnd
  } = useDragAndDropAgenda();

  // Sincronizar data da sidebar com a agenda
  useEffect(() => {
    syncDateWithAgenda(currentDate);
  }, [currentDate, syncDateWithAgenda]);

  // Quando a data é alterada no calendário da sidebar, atualizar a agenda
  useEffect(() => {
    const newDate = getSelectedDateAsDate();
    if (newDate.getTime() !== currentDate.getTime()) {
      onSetCurrentDate(newDate);
    }
  }, [selectedDate, getSelectedDateAsDate, currentDate, onSetCurrentDate]);

  const handleTodayClick = () => {
    onSetCurrentDate(new Date());
  };

  const handleNewEventClick = () => {
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    navigate(`/eventos/reserva?date=${dateStr}`);
  };

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Sidebar */}
      <SidebarAgenda
        isExpanded={isExpanded}
        selectedDate={selectedDate}
        selectedLocais={selectedLocais}
        searchQuery={searchQuery}
        locais={locais}
        allLocais={allLocais}
        onToggle={toggleSidebar}
        onDateChange={handleDateChange}
        onLocalToggle={handleLocalToggle}
        isLocalSelected={isLocalSelected}
        onSearchChange={handleSearchChange}
      />
      
      {/* Área Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <HeaderAgenda
          currentDate={currentDate}
          viewType={viewType}
          onNavigateDate={onNavigateDate}
          onTodayClick={handleTodayClick}
          onNewEventClick={handleNewEventClick}
          onViewTypeChange={onViewTypeChange}
        />

        {/* Conteúdo Principal */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-auto">
            {viewType === 'agenda' ? (
              <VisualizacaoAgenda
                eventos={mockReservations}
                currentDate={currentDate}
                selectedVenue={selectedVenue}
                selectedLocais={selectedLocais}
                onEventClick={onEventClick}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
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
  );
};

export default AgendaLayout;
