
import { useState, useEffect } from 'react';
import { mockRecebiveis } from '@/data/mockRecebiveis';

export const useRecebiveis = () => {
  const [recebiveis, setRecebiveis] = useState(mockRecebiveis);
  const [loading, setLoading] = useState(true);

  // Simulate API call
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const createRecebivel = (recebivelData: any) => {
    const newRecebivel = {
      ...recebivelData,
      id: Date.now().toString(),
    };
    setRecebiveis(prev => [...prev, newRecebivel]);
    return newRecebivel;
  };

  const updateRecebivel = (id: string, recebivelData: any) => {
    setRecebiveis(prev => prev.map(recebivel => 
      recebivel.id === id ? { ...recebivel, ...recebivelData } : recebivel
    ));
  };

  const deleteRecebivel = (id: string) => {
    setRecebiveis(prev => prev.filter(recebivel => recebivel.id !== id));
  };

  return {
    recebiveis,
    loading,
    createRecebivel,
    updateRecebivel,
    deleteRecebivel,
  };
};
