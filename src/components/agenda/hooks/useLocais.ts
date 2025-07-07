
import { useState, useEffect, useMemo, useCallback } from 'react';
import { mockLocais } from '@/data/mockLocais';

export const useLocais = () => {
  const [locais, setLocais] = useState(mockLocais);
  const [loading, setLoading] = useState(true);

  // Simulate API call
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getLocalById = useCallback((id: string) => {
    return locais.find(local => local.id === id);
  }, [locais]);

  const getLocalByName = useCallback((name: string) => {
    return locais.find(local => local.name === name);
  }, [locais]);

  const getLocalByVenueId = useCallback((venueId: string) => {
    return locais.find(local => local.id === venueId);
  }, [locais]);

  const getVenuesForCalendar = useCallback(() => {
    return locais.map(local => ({
      id: local.id,
      name: local.name,
      color: local.color || '#6b7280'
    }));
  }, [locais]);

  const createLocal = (localData: any) => {
    const newLocal = {
      ...localData,
      id: Date.now().toString(),
    };
    setLocais(prev => [...prev, newLocal]);
    return newLocal;
  };

  const updateLocal = (id: string, localData: any) => {
    setLocais(prev => prev.map(local => 
      local.id === id ? { ...local, ...localData } : local
    ));
  };

  const deleteLocal = (id: string) => {
    setLocais(prev => prev.filter(local => local.id !== id));
  };

  return {
    locais,
    loading,
    getLocalById,
    getLocalByName,
    getLocalByVenueId,
    getVenuesForCalendar,
    createLocal,
    updateLocal,
    deleteLocal,
  };
};
