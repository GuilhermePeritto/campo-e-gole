
import { useState, useCallback } from 'react';
import { LogAuditoria, mockLogsAuditoria } from '@/data/mockAuditoria';

export const useAuditoria = () => {
  const [logs, setLogs] = useState<LogAuditoria[]>(mockLogsAuditoria);
  const [loading, setLoading] = useState(false);

  const buscarLogs = useCallback(async (filtros?: {
    usuario?: string;
    modulo?: string;
    acao?: string;
    dataInicio?: string;
    dataFim?: string;
    status?: string;
  }) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let logsFiltrados = mockLogsAuditoria;
    
    if (filtros) {
      logsFiltrados = mockLogsAuditoria.filter(log => {
        let incluir = true;
        
        if (filtros.usuario && !log.usuario.toLowerCase().includes(filtros.usuario.toLowerCase())) {
          incluir = false;
        }
        
        if (filtros.modulo && log.modulo !== filtros.modulo) {
          incluir = false;
        }
        
        if (filtros.acao && !log.acao.toLowerCase().includes(filtros.acao.toLowerCase())) {
          incluir = false;
        }
        
        if (filtros.status && log.status !== filtros.status) {
          incluir = false;
        }
        
        if (filtros.dataInicio) {
          const dataLog = log.dataHora.split(' ')[0];
          if (dataLog < filtros.dataInicio) {
            incluir = false;
          }
        }
        
        if (filtros.dataFim) {
          const dataLog = log.dataHora.split(' ')[0];
          if (dataLog > filtros.dataFim) {
            incluir = false;
          }
        }
        
        return incluir;
      });
    }
    
    setLogs(logsFiltrados);
    setLoading(false);
  }, []);

  const buscarEstatisticas = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const hoje = new Date().toISOString().split('T')[0];
    const acoesHoje = mockLogsAuditoria.filter(log => 
      log.dataHora.startsWith(hoje)
    ).length;
    
    const usuariosAtivos = new Set(
      mockLogsAuditoria
        .filter(log => log.dataHora.startsWith(hoje))
        .map(log => log.usuarioId)
    ).size;
    
    const erros = mockLogsAuditoria.filter(log => log.status === 'erro').length;
    
    const inicioSemana = new Date();
    inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());
    const acoesEstaSemana = mockLogsAuditoria.filter(log => 
      new Date(log.dataHora) >= inicioSemana
    ).length;
    
    return {
      acoesHoje,
      usuariosAtivos,
      erros,
      acoesEstaSemana
    };
  }, []);

  const exportarLogs = useCallback(async (formato: 'csv' | 'xlsx' = 'csv') => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular exportação
    console.log(`Exportando ${logs.length} logs em formato ${formato}`);
    setLoading(false);
  }, [logs]);

  return {
    logs,
    loading,
    buscarLogs,
    buscarEstatisticas,
    exportarLogs
  };
};
