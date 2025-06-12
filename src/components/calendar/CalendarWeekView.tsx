
import { isToday, getTimeSlots } from '@/utils/calendarUtils';

interface CalendarWeekViewProps {
  weekDays: Date[];
  mockReservations: any[];
  handleDateClick: (date: Date) => void;
  handleEventClick: (event: any, e: React.MouseEvent) => void;
  handleDayMouseEnter: (day: Date, e: React.MouseEvent) => void;
  handleDayMouseLeave: () => void;
  handleDayMouseMove: (e: React.MouseEvent) => void;
}

const CalendarWeekView = ({
  weekDays,
  mockReservations,
  handleDateClick,
  handleEventClick,
  handleDayMouseEnter,
  handleDayMouseLeave,
  handleDayMouseMove
}: CalendarWeekViewProps) => {
  const timeSlots = getTimeSlots();

  return (
    <div>
      {/* Time Header */}
      <div className="grid grid-cols-8 border-b border">
        <div className="p-3 border-r border"></div>
        {weekDays.map((day, index) => {
          const isTodayDate = isToday(day);
          return (
            <div
              key={index}
              className="p-3 text-center border-r border last:border-r-0 cursor-pointer"
              onClick={() => handleDateClick(day)}
              onMouseEnter={(e) => handleDayMouseEnter(day, e)}
              onMouseLeave={handleDayMouseLeave}
              onMouseMove={handleDayMouseMove}
            >
              <div className="text-xs text-gray-600 mb-1">
                {day.toLocaleDateString('pt-BR', { weekday: 'short' })}
              </div>
              <div className={`text-sm font-medium ${isTodayDate
                ? 'bg-green-600 text-gray-900 dark:text-gray-300 w-6 h-6 rounded-full flex items-center justify-center mx-auto'
                : 'text-gray-900 dark:text-gray-300'
                }`}>
                {day.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Time Grid */}
      <div className="relative">
        {timeSlots.map((time, timeIndex) => (
          <div key={time} className="grid grid-cols-8 border-b border-gray-100">
            <div className="p-3 text-sm text-gray-500 border-r border text-right pr-4">
              {time}
            </div>
            {weekDays.map((day, dayIndex) => {
              const reservation = mockReservations.find(
                r => r.startTime === time && r.day.toDateString() === day.toDateString()
              );

              return (
                <div
                  key={dayIndex}
                  className="relative h-16 border-r border last:border-r-0 cursor-pointer"
                  onClick={() => handleDateClick(day)}
                >
                  {reservation && (
                    <div
                      className="absolute inset-x-1 top-1 bottom-1 rounded p-2 text-gray-600 dark:text-gray-300 text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: reservation.color }}
                      onClick={(e) => handleEventClick(reservation, e)}
                    >
                      <div className="font-semibold truncate">{reservation.client}</div>
                      <div className="text-xs opacity-90">{reservation.venue}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarWeekView;
