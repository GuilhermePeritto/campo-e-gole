
import CalendarMonthView from './CalendarMonthView';
import CalendarWeekView from './CalendarWeekView';
import CalendarDayView from './CalendarDayView';
import { getWeekDays, getMonthDays } from '@/utils/calendarUtils';
import { Reservation } from '@/hooks/useCalendar';

interface CalendarViewsProps {
  viewType: string;
  currentDate: Date;
  selectedVenue: string;
  mockReservations: Reservation[];
  handleDateClick: (date: Date) => void;
  handleEventClick: (event: Reservation) => void;
  handleDayFilterClick?: (day: Date) => void;
}

const CalendarViews = ({
  viewType,
  currentDate,
  selectedVenue,
  mockReservations,
  handleDateClick,
  handleEventClick,
  handleDayFilterClick
}: CalendarViewsProps) => {
  const weekDays = getWeekDays(currentDate);
  const monthDays = getMonthDays(currentDate);

  // Filtrar reservas por local selecionado - corrigindo a filtragem
  const filteredReservations = selectedVenue === 'all' 
    ? mockReservations 
    : mockReservations.filter(r => r.venueId === selectedVenue);

  return (
    <div className="border rounded-lg overflow-hidden">
      {viewType === 'month' && (
        <CalendarMonthView
          monthDays={monthDays}
          currentDate={currentDate}
          mockReservations={filteredReservations}
          handleDateClick={handleDateClick}
          handleEventClick={handleEventClick}
          handleDayFilterClick={handleDayFilterClick}
        />
      )}

      {viewType === 'week' && (
        <CalendarWeekView
          weekDays={weekDays}
          mockReservations={filteredReservations}
          handleDateClick={handleDateClick}
          handleEventClick={handleEventClick}
          handleDayFilterClick={handleDayFilterClick}
        />
      )}

      {viewType === 'day' && (
        <CalendarDayView
          currentDate={currentDate}
          selectedVenue={selectedVenue}
          mockReservations={filteredReservations}
          handleDateClick={handleDateClick}
          handleEventClick={handleEventClick}
        />
      )}
    </div>
  );
};

export default CalendarViews;
