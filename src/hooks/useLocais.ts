
import { useState, useEffect } from 'react';
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
    createLocal,
    updateLocal,
    deleteLocal,
  };
};
