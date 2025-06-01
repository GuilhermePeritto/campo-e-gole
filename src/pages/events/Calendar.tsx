
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

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ];

  const mockReservations = [
    { id: 1, venue: 'Quadra A', client: 'João Silva', time: '08:00', duration: 2, status: 'confirmed' },
    { id: 2, venue: 'Campo 1', client: 'Time Unidos', time: '14:00', duration: 1.5, status: 'pending' },
    { id: 3, venue: 'Quadra B', client: 'Maria Santos', time: '18:00', duration: 1, status: 'confirmed' },
    { id: 4, venue: 'Campo 2', client: 'Grupo Amigos', time: '20:00', duration: 2, status: 'confirmed' }
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

  const weekDays = getWeekDays();

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
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
            <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">
              {viewType === 'week' && 
                `${weekDays[0].toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} - ${weekDays[6].toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}`
              }
            </h2>
            <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
            Hoje
          </Button>
        </div>

        {/* Vista Semanal */}
        {viewType === 'week' && (
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Agenda Semanal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Cabeçalho dos dias */}
                  <div className="grid grid-cols-8 gap-1 mb-4">
                    <div className="p-2 text-sm font-medium text-gray-500">Horário</div>
                    {weekDays.map((day, index) => (
                      <div key={index} className="p-2 text-center">
                        <div className="text-sm font-medium">
                          {day.toLocaleDateString('pt-BR', { weekday: 'short' })}
                        </div>
                        <div className="text-lg font-semibold">
                          {day.getDate()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Grade de horários */}
                  <div className="space-y-1">
                    {timeSlots.map((time) => (
                      <div key={time} className="grid grid-cols-8 gap-1">
                        <div className="p-2 text-sm text-gray-500 bg-gray-50 dark:bg-gray-800 rounded">
                          {time}
                        </div>
                        {weekDays.map((day, dayIndex) => {
                          const reservation = mockReservations.find(
                            r => r.time === time && dayIndex === 1 // Mock data para segunda-feira
                          );
                          
                          return (
                            <div key={dayIndex} className="p-1 h-12 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                              {reservation && (
                                <div className={`p-1 rounded text-xs font-medium h-full flex items-center justify-center ${
                                  reservation.status === 'confirmed' 
                                    ? 'bg-primary text-white' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  <div className="text-center">
                                    <div className="truncate">{reservation.client}</div>
                                    <div className="text-xs opacity-75">{reservation.venue}</div>
                                  </div>
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

        {/* Resumo do Dia */}
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
                  <span className="font-semibold text-green-600">6</span>
                </div>
                <div className="flex justify-between">
                  <span>Pendentes:</span>
                  <span className="font-semibold text-yellow-600">2</span>
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
                      reservation.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{reservation.client}</div>
                      <div className="text-xs text-gray-500">{reservation.time} - {reservation.venue}</div>
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
