
import { useState, useMemo } from 'react';
import { mockLocais } from '@/data/mockLocais';

interface VenueSettings {
  id: string;
  name: string;
  eventInterval: number; // em minutos
}

export const useVenueSettings = () => {
  // Usar dados centralizados dos locais
  const [venueSettings] = useState<VenueSettings[]>([
    ...mockLocais.map(local => ({
      id: local.id,
      name: local.name,
      eventInterval: local.interval
    })),
    { id: 'all', name: 'Todos os locais', eventInterval: 30 }
  ]);

  const getVenueInterval = (venueId: string): number => {
    const venue = venueSettings.find(v => v.id === venueId);
    return venue?.eventInterval || 30; // padrão 30 minutos
  };

  const generateTimeSlots = (venueId: string, startHour = 7, endHour = 21, customInterval?: number): string[] => {
    let interval: number;
    
    if (customInterval) {
      interval = customInterval;
    } else if (venueId === 'custom') {
      // Para casos especiais onde queremos usar um intervalo customizado
      interval = 30; // padrão se não especificado
    } else {
      interval = getVenueInterval(venueId);
    }
    
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
