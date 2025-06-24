
import { useState, useCallback } from 'react';
import { mockLocais, MockLocal } from '@/data/mockLocais';

export const useLocais = () => {
  const [locais, setLocais] = useState<MockLocal[]>(mockLocais);
  const [loading, setLoading] = useState(false);

  const getLocalById = useCallback((id: string) => {
    return locais.find(l => l.id === id);
  }, [locais]);

  const getLocalByName = useCallback((name: string) => {
    return locais.find(l => l.name === name || l.label === name);
  }, [locais]);

  const getActiveLocais = useCallback(() => {
    return locais.filter(l => l.status === 'active');
  }, [locais]);

  const createLocal = useCallback((data: Omit<MockLocal, 'id'>) => {
    setLoading(true);
    const newLocal: MockLocal = {
      ...data,
      id: (parseInt(locais[locais.length - 1]?.id || '0') + 1).toString()
    };
    setLocais(prev => [...prev, newLocal]);
    setLoading(false);
    return newLocal;
  }, [locais]);

  const updateLocal = useCallback((id: string, data: Partial<MockLocal>) => {
    setLoading(true);
    setLocais(prev => prev.map(l => l.id === id ? { ...l, ...data } : l));
    setLoading(false);
  }, []);

  const deleteLocal = useCallback((id: string) => {
    setLoading(true);
    setLocais(prev => prev.filter(l => l.id !== id));
    setLoading(false);
  }, []);

  // Para o seletor de venues no calendário
  const getVenuesForCalendar = useCallback(() => {
    return [
      { id: 'all', name: 'Todos os locais', color: '#6b7280' },
      ...locais.map(local => ({
        id: local.id,
        name: local.name,
        color: local.color
      }))
    ];
  }, [locais]);

  // Para campos de busca - sempre retornar todos os locais
  const getLocaisForSearch = useCallback(() => {
    return locais.map(local => ({
      id: local.id,
      label: local.label,
      subtitle: local.subtitle
    }));
  }, [locais]);

  // Função para buscar local por venueId das reservas
  const getLocalByVenueId = useCallback((venueId: string) => {
    return locais.find(l => l.id === venueId);
  }, [locais]);

  return {
    locais,
    loading,
    getLocalById,
    getLocalByName,
    getLocalByVenueId,
    getActiveLocais,
    createLocal,
    updateLocal,
    deleteLocal,
    getVenuesForCalendar,
    getLocaisForSearch
  };
};
