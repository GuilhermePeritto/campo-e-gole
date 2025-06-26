
import { useState, useCallback } from 'react';
import { Parametro, mockParametros } from '@/data/mockParametros';

export const useParametros = () => {
  const [parametros, setParametros] = useState<Parametro[]>(mockParametros);
  const [loading, setLoading] = useState(false);

  const buscarParametros = useCallback(async (filialId?: number) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let parametrosFiltrados = mockParametros;
    if (filialId !== undefined) {
      parametrosFiltrados = mockParametros.filter(p => 
        p.filialId === filialId || p.filialId === undefined
      );
    }
    
    setParametros(parametrosFiltrados);
    setLoading(false);
  }, []);

  const buscarParametrosPorCategoria = useCallback(async (categoria: string, filialId?: number) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let parametrosFiltrados = mockParametros.filter(p => p.categoria === categoria);
    if (filialId !== undefined) {
      parametrosFiltrados = parametrosFiltrados.filter(p => 
        p.filialId === filialId || p.filialId === undefined
      );
    }
    
    setLoading(false);
    return parametrosFiltrados;
  }, []);

  const atualizarParametro = useCallback(async (id: number, novoValor: string | number | boolean) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setParametros(prev => prev.map(parametro => 
      parametro.id === id ? { ...parametro, valor: novoValor } : parametro
    ));
    setLoading(false);
  }, []);

  const buscarCategorias = useCallback(() => {
    const categorias = [...new Set(mockParametros.map(p => p.categoria))];
    return categorias.sort();
  }, []);

  return {
    parametros,
    loading,
    buscarParametros,
    buscarParametrosPorCategoria,
    atualizarParametro,
    buscarCategorias
  };
};
