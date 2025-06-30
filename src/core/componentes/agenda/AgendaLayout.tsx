
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalTimeZone, today } from "@internationalized/date";
import { useSidebarAgenda } from '@/core/hooks/useSidebarAgenda';
import { useAgendaNova } from '@/core/hooks/useAgendaNova';
import SidebarAgenda from './SidebarAgenda';
import HeaderAgenda from './HeaderAgenda';
import VisualizacaoGrade from './VisualizacaoGrade';
import VisualizacaoLista from './VisualizacaoLista';
import { useCalendar } from '@/hooks/useCalendar';

const AgendaLayout: React.FC = () => {
  const navigate = useNavigate();
  const { isExpanded, toggleSidebar } = useSidebarAgenda();
  const {
    viewType,
    setViewType,
    selectedDate,
    setSelectedDate,
    selectedLocais,
    currentDate,
    venues,
    filteredReservations,
    navigateDate,
    goToToday,
    handleEventClick,
    handleDateClick,
    handleDayFilterClick,
    toggleLocalSelection
  } = useAgendaNova();

  // Usar o hook existente para manter compatibilidade
  const { mockReservations } = useCalendar();

  const handleNewEvent = () => {
    navigate('/eventos/reserva');
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    // Converter para Date regular para sincronizar com currentDate
    if (date) {
      const jsDate = new Date(date.year, date.month - 1, date.day);
      // Aqui você pode adicionar lógica para sincronizar com currentDate se necessário
    }
  };

  const renderMainContent = () => {
    switch (viewType) {
      case 'week':
        return (
          <VisualizacaoGrade
            currentDate={currentDate}
            reservations={mockReservations}
            onEventClick={handleEventClick}
            onDayFilterClick={handleDayFilterClick}
          />
        );
      case 'agenda':
        return (
          <VisualizacaoLista
            currentDate={currentDate}
            reservations={mockReservations}
            onEventClick={handleEventClick}
          />
        );
      case 'month':
      case 'day':
        // Por enquanto usar a visualização de grade para todos os tipos
        return (
          <VisualizacaoGrade
            currentDate={currentDate}
            reservations={mockReservations}
            onEventClick={handleEventClick}
            onDayFilterClick={handleDayFilterClick}
          />
        );
      default:
        return (
          <VisualizacaoGrade
            currentDate={currentDate}
            reservations={mockReservations}
            onEventClick={handleEventClick}
            onDayFilterClick={handleDayFilterClick}
          />
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <HeaderAgenda
        currentDate={currentDate}
        viewType={viewType}
        onViewTypeChange={setViewType}
        onNavigateDate={navigateDate}
        onGoToToday={goToToday}
        onNewEvent={handleNewEvent}
      />

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <SidebarAgenda
          isExpanded={isExpanded}
          onToggle={toggleSidebar}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          venues={venues}
          selectedLocais={selectedLocais}
          onToggleLocal={toggleLocalSelection}
        />

        {/* Conteúdo Principal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};

export default AgendaLayout;
