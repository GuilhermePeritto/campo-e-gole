
import { useState, useCallback } from 'react';
import { Grupo, mockGrupos, Permissao, mockPermissoes } from '@/data/mockGrupos';

export const useGrupos = () => {
  const [grupos, setGrupos] = useState<Grupo[]>(mockGrupos);
  const [permissoes] = useState<Permissao[]>(mockPermissoes);
  const [loading, setLoading] = useState(false);

  const buscarGrupos = useCallback(async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setGrupos(mockGrupos);
    setLoading(false);
  }, []);

  const buscarGrupoPorId = useCallback(async (id: number): Promise<Grupo | undefined> => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    const grupo = mockGrupos.find(g => g.id === id);
    setLoading(false);
    return grupo;
  }, []);

  const criarGrupo = useCallback(async (novoGrupo: Omit<Grupo, 'id' | 'dataCriacao' | 'usuarios'>) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const id = Math.max(...mockGrupos.map(g => g.id)) + 1;
    const grupoComId = { 
      ...novoGrupo, 
      id,
      usuarios: 0,
      dataCriacao: new Date().toISOString().split('T')[0]
    };
    
    setGrupos(prev => [...prev, grupoComId]);
    setLoading(false);
    return grupoComId;
  }, []);

  const atualizarGrupo = useCallback(async (id: number, dadosAtualizados: Partial<Grupo>) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setGrupos(prev => prev.map(grupo => 
      grupo.id === id ? { ...grupo, ...dadosAtualizados } : grupo
    ));
    setLoading(false);
  }, []);

  const excluirGrupo = useCallback(async (id: number) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setGrupos(prev => prev.filter(grupo => grupo.id !== id));
    setLoading(false);
  }, []);

  const buscarPermissoesPorModulo = useCallback(() => {
    const permissoesPorModulo: Record<string, Permissao[]> = {};
    
    mockPermissoes.forEach(permissao => {
      if (!permissoesPorModulo[permissao.modulo]) {
        permissoesPorModulo[permissao.modulo] = [];
      }
      permissoesPorModulo[permissao.modulo].push(permissao);
    });
    
    return permissoesPorModulo;
  }, []);

  return {
    grupos,
    permissoes,
    loading,
    buscarGrupos,
    buscarGrupoPorId,
    criarGrupo,
    atualizarGrupo,
    excluirGrupo,
    buscarPermissoesPorModulo
  };
};
