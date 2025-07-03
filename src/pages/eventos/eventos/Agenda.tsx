
import ModuleHeader from '@/components/ModuleHeader';
import CalendarViews from '@/components/calendar/CalendarViews';
import ModernAgendaLayout from '@/core/componentes/agenda/ModernAgendaLayout';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { useCalendar } from '@/hooks/useCalendar';
import { Calendar as CalendarIcon } from 'lucide-react';

const Agenda = () => {
  const {
    viewType,
    setViewType,
    selectedVenue,
    setSelectedVenue,
    currentDate,
    setCurrentDate,
    venues,
    mockReservations,
    navigateDate,
    handleDateClick,
    handleEventClick,
    handleDayFilterClick
  } = useCalendar();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ModuleHeader
        title="Agenda"
        icon={<CalendarIcon className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos"
        backLabel="Eventos"
      />

      <main className="max-w-none mx-auto">
        <ModernAgendaLayout
          viewType={viewType}
          currentDate={currentDate}
          selectedVenue={selectedVenue}
          mockReservations={mockReservations}
          onViewTypeChange={setViewType}
          onNavigateDate={navigateDate}
          onSetCurrentDate={setCurrentDate}
          onEventClick={handleEventClick}
        >
          {/* Renderizar as visualizações existentes quando não for tipo 'agenda' */}
          <CalendarViews
            viewType={viewType}
            currentDate={currentDate}
            selectedVenue={selectedVenue}
            mockReservations={mockReservations}
            handleDateClick={handleDateClick}
            handleEventClick={handleEventClick}
            handleDayFilterClick={handleDayFilterClick}
          />
        </ModernAgendaLayout>
      </main>
    </div>
  );
};

export default Agenda;
