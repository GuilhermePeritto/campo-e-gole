
export interface Parametro {
  id: number;
  nome: string;
  descricao: string;
  tipo: 'texto' | 'numero' | 'booleano' | 'lista';
  valor: string | number | boolean;
  opcoes?: string[];
  categoria: string;
  filialId?: number;
}

export const mockParametros: Parametro[] = [
  // Parâmetros Globais
  {
    id: 1,
    nome: 'Nome da Empresa',
    descricao: 'Nome oficial da empresa',
    tipo: 'texto',
    valor: 'Arena Sports',
    categoria: 'Empresa'
  },
  {
    id: 2,
    nome: 'CNPJ',
    descricao: 'CNPJ da empresa',
    tipo: 'texto',
    valor: '12.345.678/0001-90',
    categoria: 'Empresa'
  },
  {
    id: 3,
    nome: 'Moeda Padrão',
    descricao: 'Moeda utilizada no sistema',
    tipo: 'lista',
    valor: 'BRL',
    opcoes: ['BRL', 'USD', 'EUR'],
    categoria: 'Financeiro'
  },
  
  // Parâmetros por Filial - Filial Centro
  {
    id: 4,
    nome: 'Horário de Funcionamento',
    descricao: 'Horário de funcionamento da filial',
    tipo: 'texto',
    valor: '06:00 às 22:00',
    categoria: 'Operacional',
    filialId: 1
  },
  {
    id: 5,
    nome: 'Máximo de Reservas Simultâneas',
    descricao: 'Número máximo de reservas por horário',
    tipo: 'numero',
    valor: 10,
    categoria: 'Eventos',
    filialId: 1
  },
  {
    id: 6,
    nome: 'Permitir Reservas Online',
    descricao: 'Se permite reservas através do site',
    tipo: 'booleano',
    valor: true,
    categoria: 'Eventos',
    filialId: 1
  },
  
  // Parâmetros por Filial - Filial Zona Norte
  {
    id: 7,
    nome: 'Horário de Funcionamento',
    descricao: 'Horário de funcionamento da filial',
    tipo: 'texto',
    valor: '07:00 às 21:00',
    categoria: 'Operacional',
    filialId: 2
  },
  {
    id: 8,
    nome: 'Máximo de Reservas Simultâneas',
    descricao: 'Número máximo de reservas por horário',
    tipo: 'numero',
    valor: 8,
    categoria: 'Eventos',
    filialId: 2
  },
  {
    id: 9,
    nome: 'Permitir Reservas Online',
    descricao: 'Se permite reservas através do site',
    tipo: 'booleano',
    valor: false,
    categoria: 'Eventos',
    filialId: 2
  }
];
