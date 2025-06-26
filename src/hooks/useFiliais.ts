
import { useState, useCallback } from 'react';
import { Filial, mockFiliais } from '@/data/mockFiliais';

export const useFiliais = () => {
  const [filiais, setFiliais] = useState<Filial[]>(mockFiliais);
  const [loading, setLoading] = useState(false);

  const getFiliais = useCallback(() => {
    setLoading(true);
    // Simula chamada de API
    setTimeout(() => {
      setFiliais(mockFiliais);
      setLoading(false);
    }, 500);
  }, []);

  const getFilialById = useCallback((id: number) => {
    return filiais.find(filial => filial.id === id);
  }, [filiais]);

  const createFilial = useCallback((filialData: Omit<Filial, 'id' | 'dataCadastro'>) => {
    const newFilial: Filial = {
      ...filialData,
      id: Math.max(...filiais.map(f => f.id)) + 1,
      dataCadastro: new Date().toISOString().split('T')[0]
    };
    setFiliais(prev => [...prev, newFilial]);
    return newFilial;
  }, [filiais]);

  const updateFilial = useCallback((id: number, filialData: Partial<Filial>) => {
    setFiliais(prev => prev.map(filial => 
      filial.id === id ? { ...filial, ...filialData } : filial
    ));
  }, []);

  const deleteFilial = useCallback((id: number) => {
    setFiliais(prev => prev.filter(filial => filial.id !== id));
  }, []);

  return {
    filiais,
    loading,
    getFiliais,
    getFilialById,
    createFilial,
    updateFilial,
    deleteFilial
  };
};
