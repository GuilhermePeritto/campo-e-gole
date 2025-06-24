
import { useState } from 'react';
import { Reservation } from '@/hooks/useCalendar';
import { ChevronDown, Filter } from 'lucide-react';

interface CalendarMonthViewProps {
  monthDays: Date[];
  currentDate: Date;
  mockReservations: Reservation[];
  handleDateClick: (date: Date) => void;
  handleEventClick: (event: Reservation) => void;
  handleDayFilterClick?: (day: Date) => void;
}

const CalendarMonthView = ({
  monthDays,
  currentDate,
  mockReservations,
  handleDateClick,
  handleEventClick,
  handleDayFilterClick
}: CalendarMonthViewProps) => {
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);

  const getDayEvents = (day: Date) => {
    return mockReservations.filter(event =>
      event.day.toDateString() === day.toDateString()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const handleFilterClick = (day: Date, e: React.MouseEvent) => {
    e.stopPropagation();
    if (handleDayFilterClick) {
      handleDayFilterClick(day);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
          <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-700">
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {monthDays.map((day, index) => {
          const dayEvents = getDayEvents(day);
          const isHovered = hoveredDay?.toDateString() === day.toDateString();
          
          return (
            <div
              key={index}
              className={`bg-white p-2 min-h-[120px] cursor-pointer hover:bg-gray-50 transition-colors relative ${
                !isCurrentMonth(day) ? 'bg-gray-50 text-gray-400' : ''
              } ${isToday(day) ? 'bg-blue-50' : ''}`}
              onClick={() => handleDateClick(day)}
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm font-medium ${isToday(day) ? 'text-blue-600' : ''}`}>
                  {day.getDate()}
                </span>
                {dayEvents.length > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                      {dayEvents.length}
                    </span>
                    {isHovered && (
                      <button
                        onClick={(e) => handleFilterClick(day, e)}
                        className="p-1 hover:bg-primary/20 rounded transition-colors"
                        title="Filtrar por este dia"
                      >
                        <Filter className="h-3 w-3 text-primary" />
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="text-xs p-1 rounded text-white truncate cursor-pointer hover:opacity-80"
                    style={{ backgroundColor: event.color }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEventClick(event);
                    }}
                  >
                    {event.startTime} - {event.client}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 pl-1">
                    +{dayEvents.length - 3} mais
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
