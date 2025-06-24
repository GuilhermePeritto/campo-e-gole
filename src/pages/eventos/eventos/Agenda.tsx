
import ModuleHeader from '@/components/ModuleHeader';
import CalendarControls from '@/components/calendar/CalendarControls';
import CalendarViews from '@/components/calendar/CalendarViews';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useCalendar } from '@/hooks/useCalendar';
import { getWeekDays, getDateTitle } from '@/utils/calendarUtils';

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

  const weekDays = getWeekDays(currentDate);
  const dateTitle = getDateTitle(viewType, currentDate, weekDays);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ModuleHeader
        title="Agenda"
        icon={<CalendarIcon className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos"
        backLabel="Eventos"
      />

      <main className="max-w-7xl mx-auto px-6 py-6">
        <CalendarControls
          viewType={viewType}
          setViewType={setViewType}
          selectedVenue={selectedVenue}
          setSelectedVenue={setSelectedVenue}
          venues={venues}
          navigateDate={navigateDate}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          dateTitle={dateTitle}
        />

        <CalendarViews
          viewType={viewType}
          currentDate={currentDate}
          selectedVenue={selectedVenue}
          mockReservations={mockReservations}
          handleDateClick={handleDateClick}
          handleEventClick={handleEventClick}
          handleDayFilterClick={handleDayFilterClick}
        />
      </main>
    </div>
  );
};

export default Agenda;
