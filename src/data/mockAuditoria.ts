
export interface LogAuditoria {
  id: number;
  usuarioId: number;
  usuario: string;
  acao: string;
  modulo: string;
  detalhes: string;
  ip: string;
  dataHora: string;
  status: 'sucesso' | 'erro' | 'aviso';
}

export const mockLogsAuditoria: LogAuditoria[] = [
  {
    id: 1,
    usuarioId: 1,
    usuario: 'João Silva',
    acao: 'Login no sistema',
    modulo: 'Autenticação',
    detalhes: 'Login realizado com sucesso',
    ip: '192.168.1.10',
    dataHora: '2024-01-15 14:30:25',
    status: 'sucesso'
  },
  {
    id: 2,
    usuarioId: 2,
    usuario: 'Maria Santos',
    acao: 'Criação de reserva',
    modulo: 'Eventos',
    detalhes: 'Reserva #1234 criada para Quadra 1',
    ip: '192.168.1.15',
    dataHora: '2024-01-15 14:25:10',
    status: 'sucesso'
  },
  {
    id: 3,
    usuarioId: 3,
    usuario: 'Pedro Costa',
    acao: 'Tentativa de exclusão',
    modulo: 'Usuários',
    detalhes: 'Tentativa de excluir usuário sem permissão',
    ip: '192.168.1.20',
    dataHora: '2024-01-15 14:20:05',
    status: 'erro'
  }
];
