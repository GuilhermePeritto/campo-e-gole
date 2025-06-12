
import { isToday } from '@/utils/calendarUtils';

interface CalendarMonthViewProps {
  monthDays: Date[];
  currentDate: Date;
  mockReservations: any[];
  handleDateClick: (date: Date) => void;
  handleEventClick: (event: any, e: React.MouseEvent) => void;
  handleDayMouseEnter: (day: Date, e: React.MouseEvent) => void;
  handleDayMouseLeave: () => void;
  handleDayMouseMove: (e: React.MouseEvent) => void;
}

const CalendarMonthView = ({
  monthDays,
  currentDate,
  mockReservations,
  handleDateClick,
  handleEventClick,
  handleDayMouseEnter,
  handleDayMouseLeave,
  handleDayMouseMove
}: CalendarMonthViewProps) => {
  return (
    <div>
      {/* Days Header */}
      <div className="grid grid-cols-7">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
          <div key={day} className="p-3 text-center text-sm font-medium text-gray-900 dark:text-gray-300 border-r border last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7">
        {monthDays.map((day, index) => {
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const isTodayDate = isToday(day);
          const dayReservations = mockReservations.filter(r =>
            r.day.toDateString() === day.toDateString()
          );

          return (
            <div
              key={index}
              className={`min-h-[120px] p-2 border-r border-b border last:border-r-0 cursor-pointer hover:bg-secondary hover:text-gray-900 dark:hover:text-gray-300
                ${!isCurrentMonth ? 'opacity-50' : ''}`}
              onClick={() => handleDateClick(day)}
              onMouseEnter={(e) => handleDayMouseEnter(day, e)}
              onMouseLeave={handleDayMouseLeave}
              onMouseMove={handleDayMouseMove}
            >
              <div className={`text-sm font-medium mb-2 ${isTodayDate
                ? 'bg-green-600 text-gray-900 dark:text-gray-300 w-6 h-6 rounded-full flex items-center justify-center'
                : isCurrentMonth ? 'text-gray-900 dark:text-gray-300' : 'text-gray-400'
                }`}>
                {day.getDate()}
              </div>
              <div className="space-y-1">
                {dayReservations.slice(0, 3).map(reservation => (
                  <div
                    key={reservation.id}
                    className="text-xs p-1 rounded text-gray-600 dark:text-gray-300 font-medium truncate cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: reservation.color }}
                    onClick={(e) => handleEventClick(reservation, e)}
                  >
                    {reservation.startTime} {reservation.client}
                  </div>
                ))}
                {dayReservations.length > 3 && (
                  <div className="text-xs text-gray-500">
                    +{dayReservations.length - 3} mais
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

export default CalendarMonthView;
