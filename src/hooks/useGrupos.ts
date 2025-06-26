
import { useState, useCallback } from 'react';
import { Grupo, mockGrupos } from '@/data/mockGrupos';

export const useGrupos = () => {
  const [grupos, setGrupos] = useState<Grupo[]>(mockGrupos);
  const [loading, setLoading] = useState(false);

  const getGrupos = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setGrupos(mockGrupos);
      setLoading(false);
    }, 500);
  }, []);

  const getGrupoById = useCallback((id: number) => {
    return grupos.find(grupo => grupo.id === id);
  }, [grupos]);

  const createGrupo = useCallback((grupoData: Omit<Grupo, 'id' | 'dataCadastro'>) => {
    const newGrupo: Grupo = {
      ...grupoData,
      id: Math.max(...grupos.map(g => g.id)) + 1,
      dataCadastro: new Date().toISOString().split('T')[0]
    };
    setGrupos(prev => [...prev, newGrupo]);
    return newGrupo;
  }, [grupos]);

  const updateGrupo = useCallback((id: number, grupoData: Partial<Grupo>) => {
    setGrupos(prev => prev.map(grupo => 
      grupo.id === id ? { ...grupo, ...grupoData } : grupo
    ));
  }, []);

  const deleteGrupo = useCallback((id: number) => {
    setGrupos(prev => prev.filter(grupo => grupo.id !== id));
  }, []);

  return {
    grupos,
    loading,
    getGrupos,
    getGrupoById,
    createGrupo,
    updateGrupo,
    deleteGrupo
  };
};
