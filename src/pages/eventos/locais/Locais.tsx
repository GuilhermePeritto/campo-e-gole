
import { Listagem } from '@/core/components/listagem';
import { useLocais } from '@/hooks/useLocais';
import type { Local } from '@/types';
import { Activity, Building, Clock, DollarSign, MapPin, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Locais = () => {
  const navigate = useNavigate();
  const hook = useLocais();

  return (
    <Listagem<Local>
      titulo="Locais"
      descricao="Cadastre e gerencie os locais disponíveis para reserva"
      icone={<MapPin className="h-6 w-6" />}
      corModulo="rgb(var(--module-events))"
      nomeEntidade="Local"
      nomeEntidadePlural="Locais"
      rotaEntidade="/eventos/locais"
      rotaResumo="/eventos/locais/resumo"
      hook={hook}
      colunas={[
        {
          chave: 'nome',
          titulo: 'Nome',
          ordenavel: true,
          filtravel: true,
          tipoFiltro: 'text'
        },
        {
          chave: 'tipo',
          titulo: 'Tipo',
          filtravel: true,
          tipoFiltro: 'select'
        },
        {
          chave: 'intervalo',
          titulo: 'Intervalo',
          renderizar: (local) => `${local.intervalo} min`
        },
        {
          chave: 'valorHora',
          titulo: 'Valor/Hora',
          ordenavel: true,
          renderizar: (local) => `R$ ${local.valorHora.toFixed(2)}`
        },
        {
          chave: 'capacidade',
          titulo: 'Capacidade',
          renderizar: (local) => local.capacidade ? `${local.capacidade} pessoas` : 'N/A'
        },
        {
          chave: 'situacao',
          titulo: 'Situação',
          ordenavel: true,
          filtravel: true,
          tipoFiltro: 'select',
          tipo: 'situacao',
          mapeamentoValores: {
            1: 'ativo',
            0: 'inativo',
            2: 'manutencao'
          },
          opcoesSituacao: {
            ativo: { label: 'Ativo', variant: 'default' },
            inativo: { label: 'Inativo', variant: 'destructive' },
            manutencao: { label: 'Manutenção', variant: 'secondary' }
          }
        }
      ]}
      acoes={[
        {
          titulo: 'Editar',
          onClick: (local) => navigate(`/eventos/locais/${local.id}`),
          variante: 'outline'
        }
      ]}
      botaoCriar={{
        titulo: 'Novo Local',
        icone: <Plus className="h-4 w-4" />,
        rota: '/eventos/locais/novo'
      }}
      cardsResumo={[
        {
          titulo: 'Portfólio de Locais',
          valor: (_data, _pagination, summaryData) => summaryData?.totalLocais ?? 0,
          descricao: 'Total de locais cadastrados',
          icone: Building,
          cor: 'bg-blue-500',
          tendencia: {
            valor: 12,
            label: 'vs mês anterior',
            tipo: 'positivo'
          }
        },
        {
          titulo: 'Taxa de Disponibilidade',
          valor: (_data, _pagination, summaryData) => {
            const ativos = summaryData?.ativos ?? 0;
            const total = summaryData?.totalLocais ?? 1;
            return `${Math.round((ativos / total) * 100)}%`;
          },
          descricao: 'Locais ativos do total',
          icone: Activity,
          cor: 'bg-green-500',
          tendencia: {
            valor: 5,
            label: 'vs mês anterior',
            tipo: 'positivo'
          }
        },
        {
          titulo: 'Ticket Médio',
          valor: (_data, _pagination, summaryData) => {
            const valor = summaryData?.valorMedioHora ?? 0;
            return `R$ ${valor.toFixed(2)}`;
          },
          descricao: 'Valor médio por hora',
          icone: DollarSign,
          cor: 'bg-emerald-500',
          tendencia: {
            valor: 8,
            label: 'vs mês anterior',
            tipo: 'positivo'
          }
        },
        {
          titulo: 'Indisponibilidade',
          valor: (_data, _pagination, summaryData) => {
            const manutencao = summaryData?.manutencao ?? 0;
            const inativos = summaryData?.inativos ?? 0;
            return manutencao + inativos;
          },
          descricao: 'Locais fora de operação',
          icone: Clock,
          cor: 'bg-orange-500',
          tendencia: {
            valor: -2,
            label: 'vs semana anterior',
            tipo: 'negativo'
          }
        }
      ]}
      camposBusca={['nome', 'tipo']}
      placeholderBusca="Buscar locais..."
      mostrarExportar={true}
      nomeArquivoExportar="locais-eventos"
      ordenacaoPadrao="nome"
      tamanhoPaginaPadrao={10}
    />
  );
};

export default Locais;
