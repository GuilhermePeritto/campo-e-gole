import EventDetailsPopup from '@/components/EventDetailsPopup';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter, Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState('month');
  const [selectedVenue, setSelectedVenue] = useState('all');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const venues = [
    { id: 'all', name: 'Todos os Locais' },
    { id: 'quadra-a', name: 'Quadra A - Futebol Society' },
    { id: 'quadra-b', name: 'Quadra B - Basquete' },
    { id: 'campo-1', name: 'Campo 1 - Futebol 11' },
    { id: 'campo-2', name: 'Campo 2 - Futebol 7' }
  ];

  const timeSlots = Array.from({ length: 15 }, (_, i) => {
    const hour = i + 7;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const mockReservations = [
    { 
      id: 1, 
      venue: 'Quadra A', 
      client: 'João Silva', 
      startTime: '08:00', 
      endTime: '10:00', 
      status: 'confirmed', 
      day: new Date(), 
      color: '#10b981',
      sport: 'Futebol Society',
      email: 'joao@email.com',
      phone: '(11) 99999-9999',
      price: 160,
      observations: 'Cliente preferencial, sempre pontual'
    },
    { 
      id: 2, 
      venue: 'Campo 1', 
      client: 'Time Unidos', 
      startTime: '14:00', 
      endTime: '15:30', 
      status: 'pending', 
      day: new Date(), 
      color: '#f59e0b',
      sport: 'Futebol 11',
      email: 'unidos@time.com',
      price: 225
    },
    { 
      id: 3, 
      venue: 'Quadra B', 
      client: 'Maria Santos', 
      startTime: '18:00', 
      endTime: '19:00', 
      status: 'confirmed', 
      day: new Date(), 
      color: '#10b981',
      sport: 'Basquete',
      email: 'maria@email.com',
      phone: '(11) 88888-8888',
      price: 60
    },
    { 
      id: 4, 
      venue: 'Campo 2', 
      client: 'Grupo Amigos', 
      startTime: '20:00', 
      endTime: '22:00', 
      status: 'confirmed', 
      day: new Date(), 
      color: '#10b981',
      sport: 'Futebol 7',
      email: 'amigos@grupo.com',
      price: 200,
      observations: 'Grupo que joga toda semana'
    }
  ];

  const getWeekDays = () => {
    const start = new Date(currentDate);
    start.setDate(currentDate.getDate() - currentDate.getDay());

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getMonthDays = () => {
    const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const days = [];

    const firstDayWeek = start.getDay();
    for (let i = firstDayWeek - 1; i >= 0; i--) {
      const day = new Date(start);
      day.setDate(start.getDate() - (i + 1));
      days.push(day);
    }

    for (let i = 1; i <= end.getDate(); i++) {
      const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      days.push(day);
    }

    const totalCells = Math.ceil(days.length / 7) * 7;
    const remaining = totalCells - days.length;
    for (let i = 1; i <= remaining; i++) {
      const day = new Date(end);
      day.setDate(end.getDate() + i);
      days.push(day);
    }

    return days;
  };

  const weekDays = getWeekDays();
  const monthDays = getMonthDays();

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewType === 'day') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewType === 'week') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (viewType === 'month') {
      newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const handleDateClick = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0];
    navigate(`/eventos/reservas/novo?date=${formattedDate}`);
  };

  const handleEventClick = (event: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setIsPopupOpen(true);
  };

  const handleEditEvent = () => {
    setIsPopupOpen(false);
    navigate(`/eventos/reservas/${selectedEvent.id}/editar`);
  };

  const getDateTitle = () => {
    switch (viewType) {
      case 'day':
        return currentDate.toLocaleDateString('pt-BR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      case 'week':
        const startWeek = weekDays[0];
        const endWeek = weekDays[6];
        return `${startWeek.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} - ${endWeek.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}`;
      case 'month':
        return currentDate.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' });
      default:
        return '';
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="shadow-sm border-b border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/eventos')}
                className="gap-2 text-gray-900 dark:text-gray-300"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-6 w-6 text-green-600" />
                <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-300">Agenda</h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Select value={selectedVenue} onValueChange={setSelectedVenue}>
                <SelectTrigger className="w-48 border">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {venues.map((venue) => (
                    <SelectItem key={venue.id} value={venue.id}>{venue.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex bg-muted rounded-lg p-1">
                {['month', 'week', 'day'].map((view) => (
                  <button
                    key={view}
                    onClick={() => setViewType(view)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${viewType === view
                      ? 'text-gray-900 dark:text-gray-300 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300'
                      }`}
                  >
                    {view === 'month' ? 'Mês' : view === 'week' ? 'Semana' : 'Dia'}
                  </button>
                ))}
              </div>

              <Button className="gap-2 text-gray-900 dark:text-gray-300" variant='outline' onClick={() => navigate('/eventos/reservas/novo')}>
                <Plus className="h-4 w-4" />
                Nova Reserva
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateDate('prev')}
                className="p-2"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateDate('next')}
                className="p-2"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-300">
              {getDateTitle()}
            </h2>
          </div>
          <Button
            variant="outline"
            onClick={() => setCurrentDate(new Date())}
            className="border text-gray-900 dark:text-gray-300"
          >
            Hoje
          </Button>
        </div>

        {/* Calendar Views */}
        <div className="border rounded-lg overflow-hidden">
          {/* Month View */}
          {viewType === 'month' && (
            <div>
              {/* Days Header */}
              <div className="grid grid-cols-7">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                  <div key={day} className="p-4 text-center text-sm font-medium text-gray-900 dark:text-gray-300 border-r border last:border-r-0">
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
                        ${!isCurrentMonth ? 'opacity-50' : ''
                        }`}
                      onClick={() => handleDateClick(day)}
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
          )}

          {/* Week View */}
          {viewType === 'week' && (
            <div>
              {/* Time Header */}
              <div className="grid grid-cols-8 border-b border">
                <div className="p-4 border-r border"></div>
                {weekDays.map((day, index) => {
                  const isTodayDate = isToday(day);
                  return (
                    <div
                      key={index}
                      className="p-4 text-center border-r border last:border-r-0 cursor-pointer"
                      onClick={() => handleDateClick(day)}
                    >
                      <div className="text-sm text-gray-600 mb-1">
                        {day.toLocaleDateString('pt-BR', { weekday: 'short' })}
                      </div>
                      <div className={`text-lg font-medium ${isTodayDate
                        ? 'bg-green-600 text-gray-900 dark:text-gray-300 w-8 h-8 rounded-full flex items-center justify-center mx-auto'
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
          )}

          {/* Day View */}
          {viewType === 'day' && (
            <div>
              <div className="p-4 border-b border">
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
          )}
        </div>
      </main>

      {/* Event Details Popup */}
      {selectedEvent && (
        <EventDetailsPopup
          isOpen={isPopupOpen}
          onClose={() => {
            setIsPopupOpen(false);
            setSelectedEvent(null);
          }}
          onEdit={handleEditEvent}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default Calendar;
