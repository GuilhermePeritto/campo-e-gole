
import { useNavigate } from 'react-router-dom';
import SidebarAgenda from './SidebarAgenda';
import HeaderAgenda from './HeaderAgenda';
import VisualizacaoAgenda from './VisualizacaoAgenda';
import { useAgendaSidebar } from '@/core/hooks/useAgendaSidebar';
import { useDragAndDropAgenda } from '@/core/hooks/useDragAndDropAgenda';
import { cn } from '@/lib/utils';
import type { Reservation } from '@/hooks/useCalendar';

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
    locais,
    toggleSidebar,
    handleDateChange,
    handleLocalToggle,
    isLocalSelected
  } = useAgendaSidebar();

  const {
    handleDragStart,
    handleDragEnd
  } = useDragAndDropAgenda();

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
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <HeaderAgenda
        currentDate={currentDate}
        viewType={viewType}
        onNavigateDate={onNavigateDate}
        onTodayClick={handleTodayClick}
        onNewEventClick={handleNewEventClick}
        onViewTypeChange={onViewTypeChange}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <SidebarAgenda
          isExpanded={isExpanded}
          selectedDate={selectedDate}
          selectedLocais={selectedLocais}
          locais={locais}
          onToggle={toggleSidebar}
          onDateChange={handleDateChange}
          onLocalToggle={handleLocalToggle}
          isLocalSelected={isLocalSelected}
        />

        {/* Main Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {viewType === 'agenda' ? (
              <VisualizacaoAgenda
                eventos={mockReservations}
                currentDate={currentDate}
                selectedVenue={selectedVenue}
                onEventClick={onEventClick}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaLayout;
