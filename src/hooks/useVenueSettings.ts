
import { useState, useMemo } from 'react';

interface VenueSettings {
  id: string;
  name: string;
  eventInterval: number; // em minutos
}

export const useVenueSettings = () => {
  // Mock data com intervalos diferentes por local
  const [venueSettings] = useState<VenueSettings[]>([
    { id: 'quadra-1', name: 'Quadra Principal', eventInterval: 30 },
    { id: 'quadra-2', name: 'Quadra Society', eventInterval: 60 },
    { id: 'campo-1', name: 'Campo de Futebol', eventInterval: 15 },
    { id: '1', name: 'Quadra A', eventInterval: 30 },
    { id: '2', name: 'Quadra B', eventInterval: 60 },
    { id: '3', name: 'Campo Principal', eventInterval: 15 },
    { id: 'all', name: 'Todos os locais', eventInterval: 30 }
  ]);

  const getVenueInterval = (venueId: string): number => {
    const venue = venueSettings.find(v => v.id === venueId);
    return venue?.eventInterval || 30; // padrão 30 minutos
  };

  const generateTimeSlots = (venueId: string, startHour = 7, endHour = 21): string[] => {
    const interval = getVenueInterval(venueId);
    const slots: string[] = [];
    
    const startMinutes = startHour * 60;
    const endMinutes = endHour * 60;
    
    for (let totalMinutes = startMinutes; totalMinutes < endMinutes; totalMinutes += interval) {
      const hour = Math.floor(totalMinutes / 60);
      const minute = totalMinutes % 60;
      slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    }
    
    return slots;
  };

  return {
    venueSettings,
    getVenueInterval,
    generateTimeSlots
  };
};
