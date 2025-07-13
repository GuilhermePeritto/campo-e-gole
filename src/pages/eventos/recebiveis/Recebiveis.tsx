
import { Listagem } from '@/core/components/listagem';
import { useRecebiveis } from '@/hooks/useRecebiveis';
import type { Recebivel } from '@/types/reservas';
import { AlertTriangle, CheckCircle, CreditCard, DollarSign, Edit, Plus, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Recebiveis = () => {
  const navigate = useNavigate();
  const baseHook = useRecebiveis();
  
  // Adaptador para converter a interface do hook para a interface da listagem
  const hook = {
    data: baseHook.recebiveis,
    loading: baseHook.loading,
    pagination: {
      currentPage: baseHook.pagination.pageNumber,
      totalPages: baseHook.pagination.totalPages,
      totalItems: baseHook.pagination.totalCount,
      pageSize: baseHook.pagination.pageSize,
      startIndex: ((baseHook.pagination.pageNumber - 1) * baseHook.pagination.pageSize) + 1,
      endIndex: Math.min(baseHook.pagination.pageNumber * baseHook.pagination.pageSize, baseHook.pagination.totalCount),
      hasNextPage: baseHook.pagination.pageNumber < baseHook.pagination.totalPages,
      hasPreviousPage: baseHook.pagination.pageNumber > 1,
    },
    fetchData: baseHook.fetchRecebiveis,
    deleteItem: baseHook.deleteRecebivel,
    fetchSummaryData: baseHook.fetchSummaryData
  };

  return (
    <Listagem<Recebivel>
      titulo="Recebíveis"
      descricao="Gerencie as contas a receber e recebimentos"
      icone={<DollarSign className="h-6 w-6" />}
      corModulo="rgb(var(--module-events))"
      nomeEntidade="Recebível"
      nomeEntidadePlural="Recebíveis"
      rotaEntidade="/eventos/recebiveis"
      rotaResumo="/eventos/recebiveis/resumo"
      hook={hook}
      colunas={[
        {
          chave: 'cliente',
          titulo: 'Cliente',
          ordenavel: true,
          filtravel: true,
          tipoFiltro: 'select'
        },
        {
          chave: 'descricao',
          titulo: 'Descrição',
          ordenavel: true,
          filtravel: true,
          tipoFiltro: 'text'
        },
        {
          chave: 'valor',
          titulo: 'Valor',
          ordenavel: true,
          renderizar: (recebivel) => `R$ ${recebivel.valor.toFixed(2)}`
        },
        {
          chave: 'dataVencimento',
          titulo: 'Vencimento',
          ordenavel: true,
          renderizar: (recebivel) => new Date(recebivel.dataVencimento).toLocaleDateString('pt-BR')
        },
        {
          chave: 'situacao',
          titulo: 'Situação',
          ordenavel: true,
          filtravel: true,
          tipoFiltro: 'select',
          renderizar: (recebivel) => {
            const statusConfig = {
              pendente: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800' },
              pago: { label: 'Pago', className: 'bg-green-100 text-green-800' },
              vencido: { label: 'Vencido', className: 'bg-red-100 text-red-800' }
            };
            const config = statusConfig[recebivel.situacao] || statusConfig.pendente;
            return (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
                {config.label}
              </span>
            );
          }
        },
        {
          chave: 'dataCadastro',
          titulo: 'Data Criação',
          ordenavel: true,
          renderizar: (recebivel) => new Date(recebivel.dataCadastro).toLocaleDateString('pt-BR')
        }
      ]}
      acoes={[
        {
          titulo: 'Editar',
          onClick: (recebivel) => navigate(`/eventos/recebiveis/${recebivel.id}`),
          variante: 'outline',
          icone: <Edit className="h-4 w-4" />
        },
        {
          titulo: 'Receber',
          onClick: (recebivel) => navigate(`/eventos/recebiveis/${recebivel.id}/receber`),
          variante: 'default',
          icone: <CreditCard className="h-4 w-4" />,
          mostrar: (recebivel) => recebivel.situacao === 'pendente' || recebivel.situacao === 'vencido'
        }
      ]}
      botaoCriar={{
        titulo: 'Novo Recebível',
        icone: <Plus className="h-4 w-4" />,
        rota: '/eventos/recebiveis/novo'
      }}
      cardsResumo={[
        {
          titulo: 'Total a Receber',
          valor: (_data, _pagination, summaryData) => {
            const valor = summaryData?.totalAmount ?? 0;
            return `R$ ${valor.toFixed(2)}`;
          },
          descricao: 'Valor total',
          icone: DollarSign,
          cor: 'bg-blue-500',
          tendencia: {
            valor: 12,
            label: 'vs mês anterior',
            tipo: 'positivo'
          }
        },
        {
          titulo: 'Pendentes',
          valor: (_data, _pagination, summaryData) => {
            const valor = summaryData?.pendingAmount ?? 0;
            return `R$ ${valor.toFixed(2)}`;
          },
          descricao: 'Aguardando pagamento',
          icone: TrendingUp,
          cor: 'bg-yellow-500',
          tendencia: {
            valor: -5,
            label: 'vs semana anterior',
            tipo: 'negativo'
          }
        },
        {
          titulo: 'Pagos',
          valor: (_data, _pagination, summaryData) => {
            const valor = summaryData?.paidAmount ?? 0;
            return `R$ ${valor.toFixed(2)}`;
          },
          descricao: 'Recebimentos confirmados',
          icone: CheckCircle,
          cor: 'bg-green-500',
          tendencia: {
            valor: 20,
            label: 'este mês',
            tipo: 'positivo'
          }
        },
        {
          titulo: 'Vencidos',
          valor: (_data, _pagination, summaryData) => {
            const valor = summaryData?.overdueAmount ?? 0;
            return `R$ ${valor.toFixed(2)}`;
          },
          descricao: 'Contas em atraso',
          icone: AlertTriangle,
          cor: 'bg-red-500',
          tendencia: {
            valor: -15,
            label: 'vs mês anterior',
            tipo: 'negativo'
          }
        }
      ]}
      camposBusca={['cliente', 'descricao']}
      placeholderBusca="Buscar recebíveis..."
      mostrarExportar={true}
      nomeArquivoExportar="recebiveis-eventos"
      ordenacaoPadrao="dataVencimento"
      tamanhoPaginaPadrao={10}
    />
  );
};

export default Recebiveis;
