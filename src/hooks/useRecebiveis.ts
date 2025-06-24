
import { useState, useCallback } from 'react';
import { mockRecebiveis, MockRecebivel } from '@/data/mockRecebiveis';

export const useRecebiveis = () => {
  const [recebiveis, setRecebiveis] = useState<MockRecebivel[]>(mockRecebiveis);
  const [loading, setLoading] = useState(false);

  const getRecebivelById = useCallback((id: string) => {
    return recebiveis.find(r => r.id === id);
  }, [recebiveis]);

  const getRecebiveisByClient = useCallback((clientId: string) => {
    return recebiveis.filter(r => r.clientId === clientId);
  }, [recebiveis]);

  const getRecebiveisByStatus = useCallback((status: 'pending' | 'paid' | 'overdue') => {
    return recebiveis.filter(r => r.status === status);
  }, [recebiveis]);

  const createRecebivel = useCallback((data: Omit<MockRecebivel, 'id' | 'createdAt'>) => {
    setLoading(true);
    const newRecebivel: MockRecebivel = {
      ...data,
      id: (parseInt(recebiveis[recebiveis.length - 1]?.id || '0') + 1).toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setRecebiveis(prev => [...prev, newRecebivel]);
    setLoading(false);
    return newRecebivel;
  }, [recebiveis]);

  const updateRecebivel = useCallback((id: string, data: Partial<MockRecebivel>) => {
    setLoading(true);
    setRecebiveis(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));
    setLoading(false);
  }, []);

  const deleteRecebivel = useCallback((id: string) => {
    setLoading(true);
    setRecebiveis(prev => prev.filter(r => r.id !== id));
    setLoading(false);
  }, []);

  // Para campos de busca - sempre retornar todos os recebíveis
  const getRecebiveisForSearch = useCallback(() => {
    return recebiveis.map(recebivel => ({
      id: recebivel.id,
      label: `Recebível #${recebivel.id}`,
      subtitle: `R$ ${recebivel.amount.toFixed(2)} - ${recebivel.description}`
    }));
  }, [recebiveis]);

  return {
    recebiveis,
    loading,
    getRecebivelById,
    getRecebiveisByClient,
    getRecebiveisByStatus,
    createRecebivel,
    updateRecebivel,
    deleteRecebivel,
    getRecebiveisForSearch
  };
};
