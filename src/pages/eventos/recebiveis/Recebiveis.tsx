
import { Listagem } from '@/core/components/listagem';
import { useRecebiveis } from '@/hooks/useRecebiveis';
import type { Recebivel } from '@/types';
import { AlertTriangle, CheckCircle, CreditCard, DollarSign, Edit, Plus, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Recebiveis = () => {
  const navigate = useNavigate();
  const hook = useRecebiveis();

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
          tipoFiltro: 'select',
          tipo: 'texto'
        },
        {
          chave: 'descricao',
          titulo: 'Descrição',
          ordenavel: true,
          filtravel: true,
          tipoFiltro: 'text',
          tipo: 'texto'
        },
        {
          chave: 'valor',
          titulo: 'Valor',
          ordenavel: true,
          tipo: 'valor'
        },
        {
          chave: 'dataVencimento',
          titulo: 'Vencimento',
          ordenavel: true,
          tipo: 'data'
        },
        {
          chave: 'situacao',
          titulo: 'Situação',
          ordenavel: true,
          filtravel: true,
          tipoFiltro: 'select',
          tipo: 'situacao',
          tipoEntidade: 'recebivel'
        },
        {
          chave: 'dataCriacao',
          titulo: 'Data Criação',
          ordenavel: true,
          tipo: 'data'
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
          mostrar: (recebivel) => recebivel.situacao === 1 || recebivel.situacao === 2 // Aberto ou Vencido
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
            const valor = summaryData?.valorTotal ?? 0;
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
            const valor = summaryData?.valorPendente ?? 0;
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
            const valor = summaryData?.valorPago ?? 0;
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
            const valor = summaryData?.valorVencido ?? 0;
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
