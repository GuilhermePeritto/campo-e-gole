
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCalendar = () => {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState('month');
  const [selectedVenue, setSelectedVenue] = useState('all');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Hover popup states
  const [hoverPopup, setHoverPopup] = useState({
    isVisible: false,
    events: [] as any[],
    date: new Date(),
    mousePosition: { x: 0, y: 0 }
  });

  const venues = [
    { id: 'all', name: 'Todos os Locais' },
    { id: 'quadra-a', name: 'Quadra A - Futebol Society' },
    { id: 'quadra-b', name: 'Quadra B - Basquete' },
    { id: 'campo-1', name: 'Campo 1 - Futebol 11' },
    { id: 'campo-2', name: 'Campo 2 - Futebol 7' }
  ];

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
    navigate(`/eventos/novo?date=${formattedDate}`);
  };

  const handleEventClick = (event: any, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/eventos/${event.id}/editar`);
  };

  const handleDayMouseEnter = (day: Date, e: React.MouseEvent) => {
    const dayReservations = mockReservations.filter(r =>
      r.day.toDateString() === day.toDateString()
    );

    if (dayReservations.length > 0) {
      setHoverPopup({
        isVisible: true,
        events: dayReservations,
        date: day,
        mousePosition: { x: e.clientX, y: e.clientY }
      });
    }
  };

  const handleDayMouseLeave = () => {
    setHoverPopup(prev => ({ ...prev, isVisible: false }));
  };

  const handleDayMouseMove = (e: React.MouseEvent) => {
    if (hoverPopup.isVisible) {
      setHoverPopup(prev => ({
        ...prev,
        mousePosition: { x: e.clientX, y: e.clientY }
      }));
    }
  };

  return {
    viewType,
    setViewType,
    selectedVenue,
    setSelectedVenue,
    currentDate,
    setCurrentDate,
    hoverPopup,
    venues,
    mockReservations,
    navigateDate,
    handleDateClick,
    handleEventClick,
    handleDayMouseEnter,
    handleDayMouseLeave,
    handleDayMouseMove
  };
};
