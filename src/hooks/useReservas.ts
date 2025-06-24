
import { useState, useCallback, useMemo } from 'react';
import { mockReservations, MockReservation } from '@/data/mockReservations';

export const useReservas = () => {
  const [reservas, setReservas] = useState<MockReservation[]>(mockReservations);
  const [loading, setLoading] = useState(false);

  const getReservaById = useCallback((id: number) => {
    return reservas.find(r => r.id === id);
  }, [reservas]);

  const getReservasByDate = useCallback((date: string) => {
    return reservas.filter(r => r.date === date);
  }, [reservas]);

  const getReservasByVenue = useCallback((venueId: string) => {
    if (venueId === 'all') return reservas;
    return reservas.filter(r => r.venueId === venueId);
  }, [reservas]);

  const getReservasByClient = useCallback((clientId: string) => {
    return reservas.filter(r => r.clientId === clientId);
  }, [reservas]);

  const createReserva = useCallback((data: Omit<MockReservation, 'id' | 'createdAt'>) => {
    setLoading(true);
    const newReserva: MockReservation = {
      ...data,
      id: Math.max(...reservas.map(r => r.id)) + 1,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setReservas(prev => [...prev, newReserva]);
    setLoading(false);
    return newReserva;
  }, [reservas]);

  const updateReserva = useCallback((id: number, data: Partial<MockReservation>) => {
    setLoading(true);
    setReservas(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));
    setLoading(false);
  }, []);

  const deleteReserva = useCallback((id: number) => {
    setLoading(true);
    setReservas(prev => prev.filter(r => r.id !== id));
    setLoading(false);
  }, []);

  // Converter para formato do calendário
  const getCalendarReservations = useMemo(() => {
    return reservas.map(reservation => {
      const reservationDate = new Date(reservation.date);
      const startDateTime = `${reservation.date}T${reservation.startTime}:00`;
      const endDateTime = `${reservation.date}T${reservation.endTime}:00`;
      
      return {
        id: reservation.id,
        title: `${reservation.client} - ${reservation.sport || 'Reserva'}`,
        start: startDateTime,
        end: endDateTime,
        venueId: reservation.venueId,
        clientName: reservation.client,
        status: reservation.status,
        color: reservation.color,
        client: reservation.client,
        venue: reservation.venue,
        startTime: reservation.startTime,
        endTime: reservation.endTime,
        day: reservationDate
      };
    });
  }, [reservas]);

  return {
    reservas,
    loading,
    getReservaById,
    getReservasByDate,
    getReservasByVenue,
    getReservasByClient,
    createReserva,
    updateReserva,
    deleteReserva,
    getCalendarReservations
  };
};
