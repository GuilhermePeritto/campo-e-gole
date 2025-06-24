
import { useState } from 'react';
import { Reservation } from '@/hooks/useCalendar';
import { Filter } from 'lucide-react';

interface CalendarWeekViewProps {
  weekDays: Date[];
  mockReservations: Reservation[];
  handleDateClick: (date: Date) => void;
  handleEventClick: (event: Reservation) => void;
  handleDayFilterClick?: (day: Date) => void;
}

const CalendarWeekView = ({
  weekDays,
  mockReservations,
  handleDateClick,
  handleEventClick,
  handleDayFilterClick
}: CalendarWeekViewProps) => {
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
        {weekDays.map((day, index) => {
          const dayEvents = getDayEvents(day);
          const isHovered = hoveredDay?.toDateString() === day.toDateString();
          
          return (
            <div key={index} className="bg-gray-50 p-3 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="text-sm font-medium text-gray-900">
                  {day.toLocaleDateString('pt-BR', { weekday: 'short' })}
                </div>
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
              <div className={`text-2xl font-bold ${isToday(day) ? 'text-blue-600' : 'text-gray-900'}`}>
                {day.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Days Content */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 min-h-[500px]">
        {weekDays.map((day, index) => {
          const dayEvents = getDayEvents(day);
          
          return (
            <div
              key={index}
              className={`bg-white p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                isToday(day) ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleDateClick(day)}
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              <div className="space-y-1">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="text-xs p-2 rounded text-white cursor-pointer hover:opacity-80"
                    style={{ backgroundColor: event.color }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEventClick(event);
                    }}
                  >
                    <div className="font-medium">{event.startTime}</div>
                    <div className="truncate">{event.client}</div>
                    <div className="truncate text-xs opacity-90">{event.venue}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarWeekView;
