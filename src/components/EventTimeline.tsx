
import { Clock, User, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Event {
  id: number;
  client: string;
  venue: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  color: string;
  sport?: string;
}

interface EventTimelineProps {
  selectedDate: string;
  events: Event[];
  onTimeSlotClick?: (time: string) => void;
}

const EventTimeline = ({ selectedDate, events, onTimeSlotClick }: EventTimelineProps) => {
  const timeSlots = Array.from({ length: 15 }, (_, i) => {
    const hour = i + 7;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // Calculate duration in hours for event sizing
  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(`2000-01-01 ${endTime}`);
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60); // Duration in hours
  };

  // Get events that overlap with specific time slot
  const getEventsForTimeSlot = (time: string) => {
    return events.filter(event => {
      const eventStart = event.startTime;
      const eventEnd = event.endTime;
      return time >= eventStart && time < eventEnd;
    });
  };

  const isTimeSlotAvailable = (time: string) => {
    return getEventsForTimeSlot(time).length === 0;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'border-green-500 bg-green-50';
      case 'pending': return 'border-yellow-500 bg-yellow-50';
      case 'cancelled': return 'border-red-500 bg-red-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <Card className="h-[500px] overflow-hidden">
      <CardContent className="p-0">
        <div className="sticky top-0 bg-background border-b p-4 z-10">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Timeline - {new Date(selectedDate).toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              day: '2-digit', 
              month: 'long' 
            })}
          </h3>
        </div>
        
        <div className="overflow-y-auto h-[420px] relative">
          {/* Time slots grid */}
          <div className="relative">
            {timeSlots.map((time, index) => {
              const isAvailable = isTimeSlotAvailable(time);
              
              return (
                <div 
                  key={time} 
                  className={`border-b border-gray-100 h-16 flex items-center p-3 transition-colors relative ${
                    isAvailable 
                      ? 'hover:bg-green-50 cursor-pointer' 
                      : 'bg-gray-50'
                  }`}
                  onClick={() => isAvailable && onTimeSlotClick?.(time)}
                >
                  <div className="w-16 text-sm font-medium text-gray-600 flex-shrink-0">
                    {time}
                  </div>
                  
                  <div className="flex-1 ml-4 relative">
                    {isAvailable ? (
                      <div className="text-sm text-green-600 font-medium">
                        ✓ Disponível - Clique para selecionar
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Events overlay - positioned absolutely */}
          <div className="absolute top-0 left-0 right-0">
            {events.map((event) => {
              const startHour = parseInt(event.startTime.split(':')[0]);
              const startMinute = parseInt(event.startTime.split(':')[1]);
              const endHour = parseInt(event.endTime.split(':')[0]);
              const endMinute = parseInt(event.endTime.split(':')[1]);
              
              // Calculate position (starting from 7:00)
              const startOffset = ((startHour - 7) * 60 + startMinute) / 60; // Hours from 7:00
              const duration = ((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) / 60; // Duration in hours
              
              const topPosition = startOffset * 64; // 64px per hour (h-16)
              const height = duration * 64; // Height based on duration

              return (
                <div
                  key={event.id}
                  className={`absolute left-20 right-4 rounded-lg p-3 shadow-sm border-l-4 ${getStatusColor(event.status)} z-10`}
                  style={{
                    top: `${topPosition}px`,
                    height: `${Math.max(height - 4, 48)}px`, // Minimum height of 48px with 4px margin
                    backgroundColor: event.color + '20', // Add transparency
                    borderLeftColor: event.color
                  }}
                >
                  <div className="flex items-start justify-between h-full">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-3 w-3 text-gray-600 flex-shrink-0" />
                        <span className="font-medium text-sm truncate">{event.client}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="h-3 w-3 text-gray-500 flex-shrink-0" />
                        <span className="text-xs text-gray-600 truncate">{event.venue}</span>
                      </div>
                      {event.sport && (
                        <div className="mt-1">
                          <span className="text-xs bg-white/60 px-2 py-1 rounded">
                            {event.sport}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-right ml-2 flex-shrink-0">
                      <div className="text-xs font-medium text-gray-700">
                        {event.startTime}
                      </div>
                      <div className="text-xs text-gray-500">
                        {event.endTime}
                      </div>
                      <div className="text-xs mt-1 font-medium">
                        {duration.toFixed(1)}h
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventTimeline;
