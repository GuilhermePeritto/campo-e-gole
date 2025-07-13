import { useDebounce } from '@/hooks/use-debounce';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

// Tipos
export type TipoColuna = 'texto' | 'email' | 'documento' | 'telefone' | 'data' | 'hora' | 'datahora' | 'situacao' | 'valor' | 'numero' | 'percentual' | 'badge';

export interface ColunaListagem<T> {
  chave: keyof T | string;
  titulo: string;
  ordenavel?: boolean;
  filtravel?: boolean;
  tipoFiltro?: 'select' | 'text';
  podeOcultar?: boolean;
  renderizar?: (item: T) => React.ReactNode;
  largura?: number;
  tipo?: TipoColuna;
  opcoesSituacao?: Record<string | number, { label: string; variant: 'default' | 'destructive' | 'secondary' | 'outline' }>;
  mapeamentoValores?: Record<string | number, string | number>;
  tipoEntidade?: 'recebivel' | 'cliente' | 'local' | 'reserva';
}

export interface AcaoListagem<T> {
  titulo: string;
  onClick: (item: T) => void;
  variante?: 'default' | 'outline' | 'destructive';
  icone?: React.ReactNode;
  mostrar?: (item: T) => boolean;
  className?: string;
}

export interface CardResumo {
  titulo: string;
  valor: string | number;
  descricao?: string;
  icone: React.ComponentType<any>;
  cor: string;
  tendencia?: {
    valor: number;
    label: string;
    tipo: 'positivo' | 'negativo' | 'neutro';
  };
}

export interface ConfiguracaoListagem<T> {
  // Configuração da página
  titulo: string;
  descricao?: string;
  icone: React.ReactNode;
  corModulo: string;
  
  // Configuração da entidade
  nomeEntidade: string;
  nomeEntidadePlural: string;
  rotaEntidade: string;
  rotaResumo: string;
  
  // Hook com métodos CRUD
  hook: {
    data: T[];
    loading: boolean;
    pagination: any;
    fetchData: (params: any) => Promise<void>;
    deleteItem: (id: string | number) => Promise<void>;
    fetchSummaryData?: (params?: any) => Promise<any>;
  };
  
  // Configuração das colunas
  colunas: ColunaListagem<T>[];
  
  // Configuração das ações
  acoes?: AcaoListagem<T>[];
  
  // Configuração do botão de criar
  botaoCriar?: {
    titulo: string;
    icone?: React.ReactNode;
    rota: string;
  };
  
  // Configuração dos cards de resumo
  cardsResumo?: Array<{
    titulo: string;
    valor: (data: T[], pagination: any, summaryData?: any) => string | number;
    descricao?: string;
    icone: React.ComponentType<any>;
    cor: string;
    tendencia?: {
      valor: number;
      label: string;
      tipo: 'positivo' | 'negativo' | 'neutro';
    };
  }>;
  
  // Configurações adicionais
  camposBusca?: (keyof T)[];
  placeholderBusca?: string;
  mostrarExportar?: boolean;
  nomeArquivoExportar?: string;
  ordenacaoPadrao?: string;
  tamanhoPaginaPadrao?: number;
}

interface EstadoListagem<T> {
  // Estados de dados
  dados: T[];
  carregando: boolean;
  carregandoResumo: boolean;
  paginacao: any;
  dadosResumo: any;
  
  // Estados de controle
  paginaAtual: number;
  tamanhoPagina: number;
  termoBusca: string;
  termoBuscaDebounced: string;
  campoOrdenacao: string;
  direcaoOrdenacao: 'asc' | 'desc';
  filtros: Record<string, string[]>;
  
  // Estados de UI
  modoVisualizacao: 'tabela' | 'grade';
  visibilidadeColunas: Record<string, boolean>;
  ordemColunas: string[];
  tamanhosColunas: Record<string, number>;
  fixacaoColunas: { left?: string[]; right?: string[] };
  
  // Configuração
  config: ConfiguracaoListagem<T>;
}

interface ContextoListagem<T> extends EstadoListagem<T> {
  // Ações de controle
  definirPaginaAtual: (pagina: number) => void;
  definirTamanhoPagina: (tamanho: number) => void;
  definirTermoBusca: (termo: string) => void;
  definirOrdenacao: (campo: string, direcao: 'asc' | 'desc') => void;
  definirFiltro: (campo: string, valores: string[]) => void;
  limparFiltros: () => void;
  
  // Ações de UI
  definirModoVisualizacao: (modo: 'tabela' | 'grade') => void;
  definirVisibilidadeColuna: (chave: string, visivel: boolean) => void;
  definirOrdemColunas: (ordem: string[]) => void;
  definirTamanhoColuna: (chave: string, tamanho: number) => void;
  definirFixacaoColuna: (chave: string, posicao: 'left' | 'right' | null) => void;
  
  // Ações CRUD
  excluirItem: (item: T) => Promise<void>;
  recarregarDados: () => Promise<void>;
  recarregarResumo: () => Promise<void>;
  
  // Dados computados
  dadosFiltrados: T[];
  filtrosAtivos: Array<{ id: string; titulo: string; valor: string }>;
  resumoDados: CardResumo[];
  parametrosApi: any;
  
  // Paginação
  totalPaginas: number;
  temPaginaAnterior: boolean;
  temProximaPagina: boolean;
  indiceInicial: number;
  indiceFinal: number;
}

const ListagemContext = createContext<ContextoListagem<any> | null>(null);

export function ListagemProvider<T extends Record<string, any>>({
  children,
  configuracao
}: {
  children: React.ReactNode;
  configuracao: ConfiguracaoListagem<T>;
}) {
  // Estados principais
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [tamanhoPagina, setTamanhoPagina] = useState(configuracao.tamanhoPaginaPadrao || 10);
  const [termoBusca, setTermoBusca] = useState('');
  const [campoOrdenacao, setCampoOrdenacao] = useState(configuracao.ordenacaoPadrao || 'id');
  const [direcaoOrdenacao, setDirecaoOrdenacao] = useState<'asc' | 'desc'>('asc');
  const [filtros, setFiltros] = useState<Record<string, string[]>>({});
  const [dadosResumo, setDadosResumo] = useState<any>(null);
  const [carregandoResumo, setCarregandoResumo] = useState(false);
  
  // Estados de UI
  const [modoVisualizacao, setModoVisualizacao] = useState<'tabela' | 'grade'>('tabela');
  const [visibilidadeColunas, setVisibilidadeColunas] = useState<Record<string, boolean>>({});
  const [ordemColunas, setOrdemColunas] = useState<string[]>(
    configuracao.colunas.map(col => String(col.chave))
  );
  const [tamanhosColunas, setTamanhosColunas] = useState<Record<string, number>>({});
  const [fixacaoColunas, setFixacaoColunas] = useState<{ left?: string[]; right?: string[] }>({});
  
  // Debounce do termo de busca
  const termoBuscaDebounced = useDebounce(termoBusca, 300);
  
  // Refs para evitar chamadas desnecessárias
  const parametrosAnterioresRef = useRef<string>('');
  
  // Dados do hook
  const { data, loading, pagination, fetchData, deleteItem } = configuracao.hook;
  
  // Parâmetros para API compatíveis com o backend
  const parametrosApi = useMemo(() => {
    const params: any = {
      page: paginaAtual,
      limit: tamanhoPagina,
    };
    
    // Ordenação - formato do backend: campo ou -campo para descendente
    if (campoOrdenacao && campoOrdenacao !== 'id') {
      params.sort = direcaoOrdenacao === 'desc' ? `-${campoOrdenacao}` : campoOrdenacao;
    }
    
    // Filtros - formato do backend
    let filterValue = '';
    
    // Busca por texto
    if (termoBuscaDebounced.trim()) {
      filterValue = termoBuscaDebounced.trim();
    }
    
    // Filtros avançados
    const filtrosAvancados: Record<string, string[]> = {};
    Object.entries(filtros).forEach(([chave, valores]) => {
      if (valores.length > 0) {
        filtrosAvancados[chave] = valores;
      }
    });
    
    // Combinar busca e filtros
    if (filterValue && Object.keys(filtrosAvancados).length > 0) {
      // Se tem busca e filtros, usar formato JSON
      params.filter = JSON.stringify({
        search: filterValue,
        ...filtrosAvancados
      });
    } else if (filterValue) {
      // Apenas busca por texto
      params.filter = filterValue;
    } else if (Object.keys(filtrosAvancados).length > 0) {
      // Apenas filtros avançados
      if (Object.keys(filtrosAvancados).length === 1) {
        const [chave, valores] = Object.entries(filtrosAvancados)[0];
        if (valores.length === 1) {
          // Filtro simples: campo:valor
          params.filter = `${chave}:${valores[0]}`;
        } else {
          // Múltiplos valores - usar JSON
          params.filter = JSON.stringify({ [chave]: valores });
        }
      } else {
        // Múltiplos campos - usar JSON
        params.filter = JSON.stringify(filtrosAvancados);
      }
    }
    
    return params;
  }, [paginaAtual, tamanhoPagina, termoBuscaDebounced, campoOrdenacao, direcaoOrdenacao, filtros]);
  
  // Carregar dados quando parâmetros mudarem
  useEffect(() => {
    const parametrosString = JSON.stringify(parametrosApi);
    
    if (parametrosString !== parametrosAnterioresRef.current) {
      parametrosAnterioresRef.current = parametrosString;
      fetchData(parametrosApi);
    }
  }, [parametrosApi, fetchData]);
  
  // Carregar dados do resumo apenas na inicialização
  useEffect(() => {
    // Verificar se o hook tem o método fetchSummaryData
    if (configuracao.hook.fetchSummaryData) {
      console.log('📊 Carregando resumo inicial...');
      setCarregandoResumo(true);
      configuracao.hook.fetchSummaryData({})
        .then(dados => {
          console.log('📊 Resumo carregado:', dados);
          setDadosResumo(dados);
        })
        .catch(error => console.error('Erro ao carregar resumo:', error))
        .finally(() => setCarregandoResumo(false));
    }
  }, []); // Remover dependência do hook para evitar múltiplas chamadas
  
  // Dados filtrados localmente (para visualização imediata)
  const dadosFiltrados = useMemo(() => {
    return data; // Os filtros já são aplicados no backend
  }, [data]);
  
  // Filtros ativos para exibição
  const filtrosAtivos = useMemo(() => {
    const ativos: Array<{ id: string; titulo: string; valor: string }> = [];
    
    Object.entries(filtros).forEach(([chave, valores]) => {
      const coluna = configuracao.colunas.find(col => String(col.chave) === chave);
      if (coluna) {
        valores.forEach(valor => {
          ativos.push({
            id: `${chave}-${valor}`,
            titulo: `${coluna.titulo}: ${valor}`,
            valor: valor
          });
        });
      }
    });
    
    return ativos;
  }, [filtros, configuracao.colunas]);
  
  // Dados de resumo
  const resumoDados = useMemo(() => {
    if (!configuracao.cardsResumo) return [];
    
    // Garantir que dadosFiltrados seja sempre um array
    const dadosSeguros = Array.isArray(dadosFiltrados) ? dadosFiltrados : [];
    
    return configuracao.cardsResumo.map(card => ({
      titulo: card.titulo,
      valor: card.valor(dadosSeguros, pagination, dadosResumo),
      descricao: card.descricao,
      icone: card.icone,
      cor: card.cor,
      tendencia: card.tendencia
    }));
  }, [configuracao.cardsResumo, dadosFiltrados, pagination, dadosResumo]);
  
  // Dados de paginação
  const totalPaginas = pagination?.totalPages || Math.ceil((pagination?.totalItems || 0) / tamanhoPagina) || 1;
  const temPaginaAnterior = paginaAtual > 1;
  const temProximaPagina = paginaAtual < totalPaginas;
  const indiceInicial = ((paginaAtual - 1) * tamanhoPagina) + 1;
  const indiceFinal = Math.min(paginaAtual * tamanhoPagina, pagination?.totalItems || 0);
  
  // Ações
  const definirPaginaAtual = useCallback((pagina: number) => {
    setPaginaAtual(pagina);
  }, []);
  
  const definirTamanhoPagina = useCallback((tamanho: number) => {
    setTamanhoPagina(tamanho);
    setPaginaAtual(1);
  }, []);
  
  const definirTermoBusca = useCallback((termo: string) => {
    setTermoBusca(termo);
    setPaginaAtual(1);
  }, []);
  
  const definirOrdenacao = useCallback((campo: string, direcao: 'asc' | 'desc') => {
    setCampoOrdenacao(campo);
    setDirecaoOrdenacao(direcao);
    setPaginaAtual(1);
  }, []);
  
  const definirFiltro = useCallback((campo: string, valores: string[]) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valores
    }));
    setPaginaAtual(1);
  }, []);
  
  const limparFiltros = useCallback(() => {
    setTermoBusca('');
    setFiltros({});
    setPaginaAtual(1);
  }, []);
  
  const definirModoVisualizacao = useCallback((modo: 'tabela' | 'grade') => {
    setModoVisualizacao(modo);
  }, []);
  
  const definirVisibilidadeColuna = useCallback((chave: string, visivel: boolean) => {
    setVisibilidadeColunas(prev => ({
      ...prev,
      [chave]: visivel
    }));
  }, []);
  
  const definirOrdemColunas = useCallback((ordem: string[]) => {
    setOrdemColunas(ordem);
  }, []);
  
  const definirTamanhoColuna = useCallback((chave: string, tamanho: number) => {
    setTamanhosColunas(prev => ({
      ...prev,
      [chave]: tamanho
    }));
  }, []);
  
  const definirFixacaoColuna = useCallback((chave: string, posicao: 'left' | 'right' | null) => {
    setFixacaoColunas(prev => {
      const novaFixacao = { ...prev };
      
      // Remover de qualquer posição anterior
      if (novaFixacao.left) {
        novaFixacao.left = novaFixacao.left.filter(c => c !== chave);
      }
      if (novaFixacao.right) {
        novaFixacao.right = novaFixacao.right.filter(c => c !== chave);
      }
      
      // Adicionar na nova posição
      if (posicao) {
        if (!novaFixacao[posicao]) {
          novaFixacao[posicao] = [];
        }
        novaFixacao[posicao]!.push(chave);
      }
      
      return novaFixacao;
    });
  }, []);
  
  const excluirItem = useCallback(async (item: T) => {
    try {
      await deleteItem((item as any).id);
      toast.success(`${configuracao.nomeEntidade} excluído com sucesso!`);
    } catch (error) {
      toast.error(`Erro ao excluir ${configuracao.nomeEntidade}`);
      throw error;
    }
  }, [deleteItem, configuracao.nomeEntidade]);
  
  const recarregarDados = useCallback(async () => {
    await fetchData(parametrosApi);
  }, [fetchData, parametrosApi]);

  const recarregarResumo = useCallback(async () => {
    if (configuracao.hook.fetchSummaryData) {
      console.log('📊 Recarregando resumo...');
      setCarregandoResumo(true);
      try {
        const dados = await configuracao.hook.fetchSummaryData({});
        console.log('📊 Resumo recarregado:', dados);
        setDadosResumo(dados);
      } catch (error) {
        console.error('Erro ao recarregar resumo:', error);
      } finally {
        setCarregandoResumo(false);
      }
    }
  }, [configuracao.hook.fetchSummaryData]);
  
  const valor: ContextoListagem<T> = {
    // Estados
    dados: data,
    carregando: loading,
    carregandoResumo,
    paginacao: pagination,
    dadosResumo,
    paginaAtual,
    tamanhoPagina,
    termoBusca,
    termoBuscaDebounced,
    campoOrdenacao,
    direcaoOrdenacao,
    filtros,
    modoVisualizacao,
    visibilidadeColunas,
    ordemColunas,
    tamanhosColunas,
    fixacaoColunas,
    config: configuracao,
    
    // Ações
    definirPaginaAtual,
    definirTamanhoPagina,
    definirTermoBusca,
    definirOrdenacao,
    definirFiltro,
    limparFiltros,
    definirModoVisualizacao,
    definirVisibilidadeColuna,
    definirOrdemColunas,
    definirTamanhoColuna,
    definirFixacaoColuna,
    excluirItem,
    recarregarDados,
    recarregarResumo,
    
    // Dados computados
    dadosFiltrados,
    filtrosAtivos,
    resumoDados,
    parametrosApi,
    
    // Paginação
    totalPaginas,
    temPaginaAnterior,
    temProximaPagina,
    indiceInicial,
    indiceFinal,
  };
  
  return (
    <ListagemContext.Provider value={valor}>
      {children}
    </ListagemContext.Provider>
  );
}

export function useListagem<T>() {
  const contexto = useContext(ListagemContext) as ContextoListagem<T> | null;
  
  if (!contexto) {
    throw new Error('useListagem deve ser usado dentro de um ListagemProvider');
  }
  
  return contexto;
} 