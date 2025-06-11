
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, MapPin, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

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

interface EventHoverPopupProps {
  events: Event[];
  date: Date;
  mousePosition: { x: number; y: number };
  isVisible: boolean;
}

const EventHoverPopup = ({ events, date, mousePosition, isVisible }: EventHoverPopupProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const popup = document.getElementById('event-hover-popup');
    if (popup && isVisible) {
      const popupRect = popup.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      let x = mousePosition.x + 15;
      let y = mousePosition.y - 10;
      
      // Adjust position if popup goes off screen
      if (x + popupRect.width > windowWidth) {
        x = mousePosition.x - popupRect.width - 15;
      }
      
      if (y + popupRect.height > windowHeight) {
        y = mousePosition.y - popupRect.height + 10;
      }
      
      setPosition({ x, y });
    }
  }, [mousePosition, isVisible]);

  if (!isVisible || events.length === 0) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  // If there are many events, show a summary instead of a scrollable list
  const showSummary = events.length > 4;

  return (
    <div
      id="event-hover-popup"
      className="fixed z-50 pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.2s ease-out'
      }}
    >
      <Card className={`${showSummary ? 'w-80' : 'w-96'} shadow-xl border-2 bg-background/95 backdrop-blur-sm`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {date.toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              day: '2-digit', 
              month: 'long' 
            })}
          </CardTitle>
          <div className="text-xs text-muted-foreground">
            {events.length} evento{events.length !== 1 ? 's' : ''} agendado{events.length !== 1 ? 's' : ''}
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          {showSummary ? (
            // Summary view for many events
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    {events.filter(e => e.status === 'confirmed').length}
                  </div>
                  <div className="text-xs text-green-700">Confirmados</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="text-lg font-bold text-yellow-600">
                    {events.filter(e => e.status === 'pending').length}
                  </div>
                  <div className="text-xs text-yellow-700">Pendentes</div>
                </div>
              </div>
              
              <div className="text-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 inline mr-2" />
                {events[0]?.startTime} - {events[events.length - 1]?.endTime}
              </div>
              
              <div className="text-xs text-center text-muted-foreground bg-muted/50 p-2 rounded">
                Clique no dia para ver todos os eventos
              </div>
            </div>
          ) : (
            // Detailed view for fewer events
            <div className="space-y-3 max-h-64">
              {events.map((event) => (
                <div 
                  key={event.id}
                  className="p-3 rounded-lg border bg-card"
                  style={{ borderLeftColor: event.color, borderLeftWidth: '4px' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium text-sm">{event.client}</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getStatusColor(event.status)}`}
                    >
                      {getStatusText(event.status)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{event.startTime} - {event.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{event.venue}</span>
                    </div>
                    {event.sport && (
                      <div className="mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {event.sport}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventHoverPopup;
