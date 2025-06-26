
import { useState, useCallback } from 'react';
import { Filial, mockFiliais } from '@/data/mockFiliais';

export const useFiliais = () => {
  const [filiais, setFiliais] = useState<Filial[]>(mockFiliais);
  const [loading, setLoading] = useState(false);

  const buscarFiliais = useCallback(async () => {
    setLoading(true);
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    setFiliais(mockFiliais);
    setLoading(false);
  }, []);

  const buscarFilialPorId = useCallback(async (id: number): Promise<Filial | undefined> => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    const filial = mockFiliais.find(f => f.id === id);
    setLoading(false);
    return filial;
  }, []);

  const criarFilial = useCallback(async (novaFilial: Omit<Filial, 'id'>) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const id = Math.max(...mockFiliais.map(f => f.id)) + 1;
    const filialComId = { ...novaFilial, id };
    
    setFiliais(prev => [...prev, filialComId]);
    setLoading(false);
    return filialComId;
  }, []);

  const atualizarFilial = useCallback(async (id: number, dadosAtualizados: Partial<Filial>) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setFiliais(prev => prev.map(filial => 
      filial.id === id ? { ...filial, ...dadosAtualizados } : filial
    ));
    setLoading(false);
  }, []);

  const excluirFilial = useCallback(async (id: number) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setFiliais(prev => prev.filter(filial => filial.id !== id));
    setLoading(false);
  }, []);

  return {
    filiais,
    loading,
    buscarFiliais,
    buscarFilialPorId,
    criarFilial,
    atualizarFilial,
    excluirFilial
  };
};
