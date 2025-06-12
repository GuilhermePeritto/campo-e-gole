
import { getTimeSlots } from '@/utils/calendarUtils';

interface CalendarDayViewProps {
  currentDate: Date;
  mockReservations: any[];
  handleDateClick: (date: Date) => void;
  handleEventClick: (event: any, e: React.MouseEvent) => void;
}

const CalendarDayView = ({
  currentDate,
  mockReservations,
  handleDateClick,
  handleEventClick
}: CalendarDayViewProps) => {
  const timeSlots = getTimeSlots();

  return (
    <div>
      <div className="p-3 border-b border">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-300">
          {currentDate.toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          })}
        </h3>
      </div>

      <div className="max-w-2xl mx-auto">
        {timeSlots.map((time) => {
          const reservation = mockReservations.find(r =>
            r.startTime === time &&
            r.day.toDateString() === currentDate.toDateString()
          );

          return (
            <div key={time} className="flex border-b border-gray-100">
              <div className="w-20 p-4 text-sm text-gray-500 text-right border-r border">
                {time}
              </div>
              <div
                className="flex-1 p-4 cursor-pointer min-h-[60px] flex items-center"
                onClick={() => handleDateClick(currentDate)}
              >
                {reservation && (
                  <div
                    className="p-3 rounded text-gray-600 dark:text-gray-300 font-medium w-full cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: reservation.color }}
                    onClick={(e) => handleEventClick(reservation, e)}
                  >
                    <div className="font-semibold">{reservation.client}</div>
                    <div className="text-sm opacity-90">{reservation.venue}</div>
                    <div className="text-xs opacity-75">{reservation.startTime} - {reservation.endTime}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarDayView;
