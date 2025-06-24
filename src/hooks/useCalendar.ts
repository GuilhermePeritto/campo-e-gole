
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface Venue {
  id: string;
  name: string;
  color: string;
}

export interface Reservation {
  id: number;
  title: string;
  start: string;
  end: string;
  venueId: string;
  clientName: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  color: string;
  client: string;
  venue: string;
  startTime: string;
  endTime: string;
  day: Date;
}

export interface HoverPopup {
  isVisible: boolean;
  events: Reservation[];
  date: Date;
  mousePosition: { x: number; y: number };
}

export const useCalendar = () => {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<'month' | 'week' | 'day'>('month');
  const [selectedVenue, setSelectedVenue] = useState<string>('all');
  const [currentDate, setCurrentDate] = useState(new Date());

  const venues: Venue[] = [
    { id: 'all', name: 'Todos os locais', color: '#6b7280' },
    { id: '1', name: 'Quadra A', color: '#10b981' },
    { id: '2', name: 'Quadra B', color: '#f59e0b' },
    { id: '3', name: 'Campo Principal', color: '#3b82f6' }
  ];

  // Eventos mockados expandidos com horários quebrados
  const mockReservations: Reservation[] = [
    {
      id: 1,
      title: 'João Silva - Treino',
      start: '2025-06-18T09:00:00',
      end: '2025-06-18T11:00:00',
      venueId: '1',
      clientName: 'João Silva',
      status: 'confirmed',
      color: '#10b981',
      client: 'João Silva',
      venue: 'Quadra A',
      startTime: '09:00',
      endTime: '11:00',
      day: new Date('2025-06-18')
    },
    {
      id: 2,
      title: 'Maria Santos - Aula',
      start: '2025-06-18T09:30:00',
      end: '2025-06-18T10:30:00',
      venueId: '2',
      clientName: 'Maria Santos',
      status: 'pending',
      color: '#f59e0b',
      client: 'Maria Santos',
      venue: 'Quadra B',
      startTime: '09:30',
      endTime: '10:30',
      day: new Date('2025-06-18')
    },
    {
      id: 3,
      title: 'Pedro Costa - Pelada',
      start: '2025-06-18T10:00:00',
      end: '2025-06-18T11:00:00',
      venueId: '3',
      clientName: 'Pedro Costa',
      status: 'confirmed',
      color: '#3b82f6',
      client: 'Pedro Costa',
      venue: 'Campo Principal',
      startTime: '10:00',
      endTime: '11:00',
      day: new Date('2025-06-18')
    },
    {
      id: 4,
      title: 'Ana Paula - Vôlei',
      start: '2025-06-18T14:00:00',
      end: '2025-06-18T16:00:00',
      venueId: '1',
      clientName: 'Ana Paula',
      status: 'confirmed',
      color: '#10b981',
      client: 'Ana Paula',
      venue: 'Quadra A',
      startTime: '14:00',
      endTime: '16:00',
      day: new Date('2025-06-18')
    },
    {
      id: 5,
      title: 'Carlos - Futebol',
      start: '2025-06-18T19:00:00',
      end: '2025-06-18T21:00:00',
      venueId: '3',
      clientName: 'Carlos Mendes',
      status: 'confirmed',
      color: '#3b82f6',
      client: 'Carlos Mendes',
      venue: 'Campo Principal',
      startTime: '19:00',
      endTime: '21:00',
      day: new Date('2025-06-18')
    },
    {
      id: 6,
      title: 'Julia - Tênis',
      start: '2025-06-18T15:30:00',
      end: '2025-06-18T17:00:00',
      venueId: '2',
      clientName: 'Julia Rodrigues',
      status: 'pending',
      color: '#f59e0b',
      client: 'Julia Rodrigues',
      venue: 'Quadra B',
      startTime: '15:30',
      endTime: '17:00',
      day: new Date('2025-06-18')
    },
    // Eventos para outros dias
    {
      id: 7,
      title: 'Roberto - Basquete',
      start: '2025-06-19T08:30:00',
      end: '2025-06-19T10:00:00',
      venueId: '1',
      clientName: 'Roberto Lima',
      status: 'confirmed',
      color: '#10b981',
      client: 'Roberto Lima',
      venue: 'Quadra A',
      startTime: '08:30',
      endTime: '10:00',
      day: new Date('2025-06-19')
    },
    {
      id: 8,
      title: 'Fernanda - Aeróbica',
      start: '2025-06-19T18:15:00',
      end: '2025-06-19T19:45:00',
      venueId: '2',
      clientName: 'Fernanda Costa',
      status: 'confirmed',
      color: '#f59e0b',
      client: 'Fernanda Costa',
      venue: 'Quadra B',
      startTime: '18:15',
      endTime: '19:45',
      day: new Date('2025-06-19')
    }
  ];

  const navigateDate = useCallback((direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      switch (viewType) {
        case 'month':
          newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
          break;
        case 'week':
          newDate.setDate(prev.getDate() + (direction === 'next' ? 7 : -7));
          break;
        case 'day':
          newDate.setDate(prev.getDate() + (direction === 'next' ? 1 : -1));
          break;
      }
      return newDate;
    });
  }, [viewType]);

  const handleDateClick = useCallback((date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    navigate(`/eventos/reserva?date=${dateStr}`);
  }, [navigate]);

  const handleEventClick = useCallback((event: Reservation) => {
    navigate(`/eventos/reserva/${event.id}`);
  }, [navigate]);

  const handleDayFilterClick = useCallback((day: Date) => {
    setCurrentDate(day);
    setViewType('day');
  }, []);

  const handleViewTypeChange = useCallback((view: 'month' | 'week' | 'day') => {
    setViewType(view);
  }, []);

  return {
    viewType,
    setViewType: handleViewTypeChange,
    selectedVenue,
    setSelectedVenue,
    currentDate,
    setCurrentDate,
    venues,
    mockReservations,
    navigateDate,
    handleDateClick,
    handleEventClick,
    handleDayFilterClick
  };
};
