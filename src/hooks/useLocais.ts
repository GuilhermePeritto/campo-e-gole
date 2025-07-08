
import { mockLocais } from '@/data/mockLocais';
import type { Local } from '@/types/eventos';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function useLocais() {
  const [loading, setLoading] = useState(true);

  // Debug: verificar dados mockados
  // console.log('useLocais - mockLocais:', mockLocais);
  // console.log('useLocais - mockLocais length:', mockLocais.length);

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const locais: Local[] = useMemo(() => mockLocais.map(local => ({
    id: String(local.id),
    nome: local.name,
    rotulo: local.name,
    subtitulo: local.type,
    tipo: local.type,
    intervalo: local.interval || 60,
    valorHora: local.hourlyRate || 0,
    capacidade: local.capacity,
    descricao: local.description,
    comodidades: local.amenities,
    status: local.status === 'active' ? 'ativo' : local.status === 'maintenance' ? 'manutencao' : 'inativo',
    cor: local.color,
    horarioAbertura: local.openTime || '08:00',
    horarioFechamento: local.closeTime || '22:00'
  })), []);

  // Debug: verificar locais processados
  // console.log('useLocais - locais processados:', locais);
  // console.log('useLocais - locais length:', locais.length);

  const listar = () => locais;
  const buscarPorId = (id: string) => locais.find(l => l.id === id);
  const filtrar = (filtros: Partial<Pick<Local, 'status' | 'tipo'>>) => {
    return locais.filter(l => {
      if (filtros.status && l.status !== filtros.status) return false;
      if (filtros.tipo && l.tipo !== filtros.tipo) return false;
      return true;
    });
  };

  // Função para carregar local por ID (simula chamada para backend)
  const loadLocalById = useCallback(async (id: string): Promise<any> => {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const local = locais.find(l => l.id === id);
    if (!local) {
      throw new Error('Local não encontrado');
    }
    
    // Retornar no formato esperado pelo CampoBusca
    return {
      id: local.id,
      label: local.nome,
      subtitle: local.tipo,
      tipo: local.tipo,
      valorHora: local.valorHora,
      capacidade: local.capacidade,
      descricao: local.descricao,
      comodidades: local.comodidades,
      status: local.status,
      cor: local.cor,
      intervalo: local.intervalo,
      horarioAbertura: local.horarioAbertura,
      horarioFechamento: local.horarioFechamento
    };
  }, [locais]);

  const criar = (local: Omit<Local, 'id'>) => ({ ...local, id: crypto.randomUUID() });
  const editar = (id: string, dados: Partial<Local>) => ({ ...buscarPorId(id), ...dados });
  const deletar = (id: string) => true;

  return { 
    locais, 
    loading, 
    listar, 
    buscarPorId, 
    filtrar, 
    criar, 
    editar, 
    deletar,
    loadLocalById
  };
}
