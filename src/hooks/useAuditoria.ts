
import { useState, useCallback } from 'react';
import { LogAuditoria, mockLogsAuditoria } from '@/data/mockAuditoria';

export const useAuditoria = () => {
  const [logs, setLogs] = useState<LogAuditoria[]>(mockLogsAuditoria);
  const [loading, setLoading] = useState(false);

  const getLogs = useCallback((filtros?: {
    usuario?: string;
    modulo?: string;
    acao?: string;
    dataInicio?: string;
    dataFim?: string;
  }) => {
    setLoading(true);
    setTimeout(() => {
      let filteredLogs = mockLogsAuditoria;
      
      if (filtros) {
        if (filtros.usuario) {
          filteredLogs = filteredLogs.filter(log => 
            log.usuario.toLowerCase().includes(filtros.usuario!.toLowerCase())
          );
        }
        if (filtros.modulo) {
          filteredLogs = filteredLogs.filter(log => log.modulo === filtros.modulo);
        }
        if (filtros.acao) {
          filteredLogs = filteredLogs.filter(log => 
            log.acao.toLowerCase().includes(filtros.acao!.toLowerCase())
          );
        }
      }
      
      setLogs(filteredLogs);
      setLoading(false);
    }, 500);
  }, []);

  return {
    logs,
    loading,
    getLogs
  };
};
