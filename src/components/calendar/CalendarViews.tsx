
import CalendarMonthView from './CalendarMonthView';
import CalendarWeekView from './CalendarWeekView';
import CalendarDayView from './CalendarDayView';
import { getWeekDays, getMonthDays } from '@/utils/calendarUtils';

interface CalendarViewsProps {
  viewType: string;
  currentDate: Date;
  mockReservations: any[];
  handleDateClick: (date: Date) => void;
  handleEventClick: (event: any, e: React.MouseEvent) => void;
  handleDayMouseEnter: (day: Date, e: React.MouseEvent) => void;
  handleDayMouseLeave: () => void;
  handleDayMouseMove: (e: React.MouseEvent) => void;
}

const CalendarViews = ({
  viewType,
  currentDate,
  mockReservations,
  handleDateClick,
  handleEventClick,
  handleDayMouseEnter,
  handleDayMouseLeave,
  handleDayMouseMove
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
          handleDayMouseEnter={handleDayMouseEnter}
          handleDayMouseLeave={handleDayMouseLeave}
          handleDayMouseMove={handleDayMouseMove}
        />
      )}

      {viewType === 'week' && (
        <CalendarWeekView
          weekDays={weekDays}
          mockReservations={mockReservations}
          handleDateClick={handleDateClick}
          handleEventClick={handleEventClick}
          handleDayMouseEnter={handleDayMouseEnter}
          handleDayMouseLeave={handleDayMouseLeave}
          handleDayMouseMove={handleDayMouseMove}
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
