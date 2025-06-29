
import { useCallback } from 'react';
import { useReservas } from '@/hooks/useReservas';
import { EventoAgenda } from './useAgenda';

export const useDragAndDrop = () => {
  const { updateReserva } = useReservas();

  const moverEvento = useCallback(async (
    eventoId: number,
    novaData: Date,
    novoHorario?: { inicio: string; fim: string }
  ) => {
    try {
      const dataFormatada = novaData.toISOString().split('T')[0];
      
      const dadosAtualizacao: any = {
        date: dataFormatada
      };

      if (novoHorario) {
        dadosAtualizacao.startTime = novoHorario.inicio;
        dadosAtualizacao.endTime = novoHorario.fim;
      }

      updateReserva(eventoId, dadosAtualizacao);
      
      return { sucesso: true };
    } catch (error) {
      console.error('Erro ao mover evento:', error);
      return { sucesso: false, erro: 'Erro ao reagendar evento' };
    }
  }, [updateReserva]);

  const validarMovimento = useCallback((
    evento: EventoAgenda,
    novaData: Date,
    novoHorario?: { inicio: string; fim: string }
  ) => {
    // Validações básicas
    if (novaData < new Date()) {
      return { valido: false, erro: 'Não é possível reagendar para uma data passada' };
    }

    if (novoHorario) {
      const [horaInicio] = novoHorario.inicio.split(':').map(Number);
      const [horaFim] = novoHorario.fim.split(':').map(Number);
      
      if (horaInicio >= horaFim) {
        return { valido: false, erro: 'Hora de início deve ser anterior à hora de fim' };
      }
    }

    return { valido: true };
  }, []);

  return {
    moverEvento,
    validarMovimento
  };
};
