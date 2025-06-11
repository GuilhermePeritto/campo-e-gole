
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
        
        <div className="overflow-y-auto h-[420px]">
          {timeSlots.map((time) => {
            const slotEvents = getEventsForTimeSlot(time);
            const isAvailable = isTimeSlotAvailable(time);
            
            return (
              <div 
                key={time} 
                className={`border-b border-gray-100 min-h-[60px] flex items-center p-3 transition-colors ${
                  isAvailable 
                    ? 'hover:bg-green-50 cursor-pointer' 
                    : 'bg-gray-50'
                }`}
                onClick={() => isAvailable && onTimeSlotClick?.(time)}
              >
                <div className="w-16 text-sm font-medium text-gray-600 flex-shrink-0">
                  {time}
                </div>
                
                <div className="flex-1 ml-4">
                  {isAvailable ? (
                    <div className="text-sm text-green-600 font-medium">
                      ✓ Disponível
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {slotEvents.map((event) => (
                        <div 
                          key={event.id}
                          className={`p-3 rounded-lg border-l-4 ${getStatusColor(event.status)}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-600" />
                              <span className="font-medium">{event.client}</span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {event.startTime} - {event.endTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="h-3 w-3 text-gray-500" />
                            <span className="text-sm text-gray-600">{event.venue}</span>
                            {event.sport && (
                              <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                                {event.sport}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventTimeline;
