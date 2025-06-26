
export interface LogAuditoria {
  id: number;
  usuario: string;
  usuarioId: number;
  acao: string;
  modulo: string;
  detalhes: string;
  ip: string;
  dataHora: string;
  status: 'sucesso' | 'erro' | 'aviso';
  dadosAntes?: any;
  dadosDepois?: any;
}

export const mockLogsAuditoria: LogAuditoria[] = [
  {
    id: 1,
    usuario: 'João Silva',
    usuarioId: 1,
    acao: 'Login no sistema',
    modulo: 'Autenticação',
    detalhes: 'Login realizado com sucesso',
    ip: '192.168.1.10',
    dataHora: '2024-01-15 14:30:25',
    status: 'sucesso'
  },
  {
    id: 2,
    usuario: 'Maria Santos',
    usuarioId: 2,
    acao: 'Criação de reserva',
    modulo: 'Eventos',
    detalhes: 'Reserva #1234 criada para Quadra 1',
    ip: '192.168.1.15',
    dataHora: '2024-01-15 14:25:10',
    status: 'sucesso',
    dadosDepois: { id: 1234, quadra: 'Quadra 1', cliente: 'Cliente Teste' }
  },
  {
    id: 3,
    usuario: 'Pedro Costa',
    usuarioId: 3,
    acao: 'Tentativa de exclusão',
    modulo: 'Usuários',
    detalhes: 'Tentativa de excluir usuário sem permissão',
    ip: '192.168.1.20',
    dataHora: '2024-01-15 14:20:05',
    status: 'erro'
  },
  {
    id: 4,
    usuario: 'Ana Oliveira',
    usuarioId: 4,
    acao: 'Alteração de configurações',
    modulo: 'Configurações',
    detalhes: 'Parâmetros do módulo financeiro alterados',
    ip: '192.168.1.12',
    dataHora: '2024-01-15 14:15:00',
    status: 'aviso',
    dadosAntes: { moeda: 'USD' },
    dadosDepois: { moeda: 'BRL' }
  },
  {
    id: 5,
    usuario: 'Carlos Lima',
    usuarioId: 1,
    acao: 'Geração de relatório',
    modulo: 'Financeiro',
    detalhes: 'Relatório de receitas gerado',
    ip: '192.168.1.18',
    dataHora: '2024-01-15 14:10:30',
    status: 'sucesso'
  }
];
