
import { useState, useCallback, useEffect } from 'react';

export const useSkeletonPorDia = () => {
  const [estadosLoading, setEstadosLoading] = useState<Record<string, boolean>>({});

  const definirLoading = useCallback((dia: string, loading: boolean) => {
    setEstadosLoading(prev => ({
      ...prev,
      [dia]: loading
    }));
  }, []);

  const obterLoading = useCallback((dia: string) => {
    return estadosLoading[dia] || false;
  }, [estadosLoading]);

  const simularCarregamento = useCallback((dia: string, tempoBase = 800) => {
    definirLoading(dia, true);
    
    // Simula tempo de carregamento variável para cada dia
    const tempoAleatorio = tempoBase + Math.random() * 1200;
    
    setTimeout(() => {
      definirLoading(dia, false);
    }, tempoAleatorio);
  }, [definirLoading]);

  const carregarMultiplosDias = useCallback((dias: string[]) => {
    dias.forEach((dia, index) => {
      setTimeout(() => {
        simularCarregamento(dia);
      }, index * 100); // Escalonamento para efeito visual
    });
  }, [simularCarregamento]);

  useEffect(() => {
    return () => {
      setEstadosLoading({});
    };
  }, []);

  return {
    estadosLoading,
    definirLoading,
    obterLoading,
    simularCarregamento,
    carregarMultiplosDias
  };
};
