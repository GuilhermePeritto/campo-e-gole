
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Filter } from 'lucide-react';

const Calendar = () => {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState('week');
  const [selectedVenue, setSelectedVenue] = useState('all');
  const [currentDate, setCurrentDate] = useState(new Date());

  const venues = [
    { id: 'all', name: 'Todos os Locais' },
    { id: 'quadra-a', name: 'Quadra A - Futebol Society' },
    { id: 'quadra-b', name: 'Quadra B - Basquete' },
    { id: 'campo-1', name: 'Campo 1 - Futebol 11' },
    { id: 'campo-2', name: 'Campo 2 - Futebol 7' }
  ];

  const timeSlots = Array.from({ length: 18 }, (_, i) => {
    const hour = i + 6;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const mockReservations = [
    { id: 1, venue: 'Quadra A', client: 'João Silva', time: '08:00', duration: 2, status: 'confirmed', day: 1 },
    { id: 2, venue: 'Campo 1', client: 'Time Unidos', time: '14:00', duration: 1.5, status: 'pending', day: 2 },
    { id: 3, venue: 'Quadra B', client: 'Maria Santos', time: '18:00', duration: 1, status: 'confirmed', day: 3 },
    { id: 4, venue: 'Campo 2', client: 'Grupo Amigos', time: '20:00', duration: 2, status: 'confirmed', day: 1 }
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
    
    // Adicionar dias do mês anterior para completar a primeira semana
    const firstDayWeek = start.getDay();
    for (let i = firstDayWeek - 1; i >= 0; i--) {
      const day = new Date(start);
      day.setDate(start.getDate() - (i + 1));
      days.push(day);
    }
    
    // Adicionar todos os dias do mês
    for (let i = 1; i <= end.getDate(); i++) {
      const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      days.push(day);
    }
    
    // Adicionar dias do próximo mês para completar a última semana
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
    navigate(`/events/reservations/new?date=${formattedDate}`);
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

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/events')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-semibold">Agenda</h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Select value={selectedVenue} onValueChange={setSelectedVenue}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {venues.map((venue) => (
                    <SelectItem key={venue.id} value={venue.id}>{venue.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={viewType} onValueChange={setViewType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Dia</SelectItem>
                  <SelectItem value="week">Semana</SelectItem>
                  <SelectItem value="month">Mês</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={() => navigate('/events/reservations/new')} className="gap-2">
                <Plus className="h-4 w-4" />
                Nova Reserva
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navegação de Data */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold min-w-[300px]">
              {getDateTitle()}
            </h2>
            <Button variant="outline" size="sm" onClick={() => navigateDate('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
            Hoje
          </Button>
        </div>

        {/* Vista Mensal */}
        {viewType === 'month' && (
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                  <div key={day} className="p-2 text-center font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {monthDays.map((day, index) => {
                  const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                  const isToday = day.toDateString() === new Date().toDateString();
                  const dayReservations = mockReservations.filter(r => r.day === day.getDate() && isCurrentMonth);
                  
                  return (
                    <div 
                      key={index} 
                      className={`min-h-[100px] p-2 border border-border cursor-pointer hover:bg-accent ${
                        !isCurrentMonth ? 'opacity-50' : ''
                      } ${isToday ? 'bg-primary/10 border-primary' : ''}`}
                      onClick={() => handleDateClick(day)}
                    >
                      <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary' : ''}`}>
                        {day.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayReservations.slice(0, 2).map(reservation => (
                          <div key={reservation.id} className={`text-xs p-1 rounded ${
                            reservation.status === 'confirmed' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-secondary text-secondary-foreground'
                          }`}>
                            {reservation.time} {reservation.client}
                          </div>
                        ))}
                        {dayReservations.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{dayReservations.length - 2} mais
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Vista Semanal */}
        {viewType === 'week' && (
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Cabeçalho dos dias */}
                  <div className="grid grid-cols-8 gap-1 mb-4">
                    <div className="p-2 text-sm font-medium text-muted-foreground">Horário</div>
                    {weekDays.map((day, index) => {
                      const isToday = day.toDateString() === new Date().toDateString();
                      return (
                        <div key={index} className="p-2 text-center cursor-pointer hover:bg-accent rounded" onClick={() => handleDateClick(day)}>
                          <div className={`text-sm font-medium ${isToday ? 'text-primary' : ''}`}>
                            {day.toLocaleDateString('pt-BR', { weekday: 'short' })}
                          </div>
                          <div className={`text-lg font-semibold ${isToday ? 'text-primary' : ''}`}>
                            {day.getDate()}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Grade de horários */}
                  <div className="space-y-1">
                    {timeSlots.map((time) => (
                      <div key={time} className="grid grid-cols-8 gap-1">
                        <div className="p-3 text-sm text-muted-foreground bg-muted rounded">
                          {time}
                        </div>
                        {weekDays.map((day, dayIndex) => {
                          const reservation = mockReservations.find(
                            r => r.time === time && r.day === dayIndex + 1
                          );
                          
                          return (
                            <div 
                              key={dayIndex} 
                              className="p-1 h-14 border border-border rounded hover:bg-accent cursor-pointer"
                              onClick={() => handleDateClick(day)}
                            >
                              {reservation && (
                                <div className={`p-2 rounded text-xs font-medium h-full flex flex-col justify-center ${
                                  reservation.status === 'confirmed' 
                                    ? 'bg-primary text-primary-foreground' 
                                    : 'bg-secondary text-secondary-foreground'
                                }`}>
                                  <div className="truncate font-semibold">{reservation.client}</div>
                                  <div className="text-xs opacity-75">{reservation.venue}</div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Vista Diária */}
        {viewType === 'day' && (
          <Card>
            <CardContent className="p-6">
              <div className="max-w-2xl mx-auto">
                <div className="space-y-1">
                  {timeSlots.map((time) => {
                    const reservation = mockReservations.find(r => r.time === time);
                    
                    return (
                      <div key={time} className="flex items-center gap-4">
                        <div className="w-20 text-sm text-muted-foreground">
                          {time}
                        </div>
                        <div 
                          className="flex-1 h-16 border border-border rounded hover:bg-accent cursor-pointer p-2"
                          onClick={() => handleDateClick(currentDate)}
                        >
                          {reservation && (
                            <div className={`p-3 rounded h-full flex items-center ${
                              reservation.status === 'confirmed' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-secondary text-secondary-foreground'
                            }`}>
                              <div>
                                <div className="font-semibold">{reservation.client}</div>
                                <div className="text-sm opacity-75">{reservation.venue}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Resumo */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumo de Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total de Reservas:</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between">
                  <span>Confirmadas:</span>
                  <span className="font-semibold text-primary">6</span>
                </div>
                <div className="flex justify-between">
                  <span>Pendentes:</span>
                  <span className="font-semibold text-secondary">2</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa de Ocupação:</span>
                  <span className="font-semibold">75%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximas Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockReservations.slice(0, 3).map((reservation) => (
                  <div key={reservation.id} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      reservation.status === 'confirmed' ? 'bg-primary' : 'bg-secondary'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{reservation.client}</div>
                      <div className="text-xs text-muted-foreground">{reservation.time} - {reservation.venue}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/events/reservations/new')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Reserva
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/events/venues')}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Gerenciar Locais
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
