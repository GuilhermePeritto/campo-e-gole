
import CalendarMonthView from './CalendarMonthView';
import CalendarWeekView from './CalendarWeekView';
import CalendarDayView from './CalendarDayView';
import { getWeekDays, getMonthDays } from '@/utils/calendarUtils';
import { Reservation } from '@/hooks/useCalendar';

interface CalendarViewsProps {
  viewType: string;
  currentDate: Date;
  mockReservations: Reservation[];
  handleDateClick: (date: Date) => void;
  handleEventClick: (event: Reservation) => void;
  handleDayFilterClick?: (day: Date) => void;
}

const CalendarViews = ({
  viewType,
  currentDate,
  mockReservations,
  handleDateClick,
  handleEventClick,
  handleDayFilterClick
}: CalendarViewsProps) => {
  const weekDays = getWeekDays(currentDate);
  const monthDays = getMonthDays(currentDate);

  return (
    <div className="border rounded-lg overflow-hidden">
      {viewType === 'month' && (
        <CalendarMonthView
          monthDays={monthDays}
          currentDate={currentDate}
          mockReservations={mockReservations}
          handleDateClick={handleDateClick}
          handleEventClick={handleEventClick}
          handleDayFilterClick={handleDayFilterClick}
        />
      )}

      {viewType === 'week' && (
        <CalendarWeekView
          weekDays={weekDays}
          mockReservations={mockReservations}
          handleDateClick={handleDateClick}
          handleEventClick={handleEventClick}
          handleDayFilterClick={handleDayFilterClick}
        />
      )}

      {viewType === 'day' && (
        <CalendarDayView
          currentDate={currentDate}
          mockReservations={mockReservations}
          handleDateClick={handleDateClick}
          handleEventClick={handleEventClick}
        />
      )}
    </div>
  );
};

export default CalendarViews;
