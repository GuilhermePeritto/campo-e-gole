
import BaseList from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import SummaryCards from '@/components/table/SummaryCards';
import { Badge } from '@/components/ui/badge';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { useLocais } from '@/hooks/useLocais';
import { Activity, Building, Clock, DollarSign, MapPin, Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Locais = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  // Filtros para o hook
  const filtros = useMemo(() => {
    const filters = [];
    
    if (searchTerm.trim()) {
      filters.push({
        property: 'nome',
        operator: 'contains',
        value: searchTerm.trim()
      });
    }

    if (statusFilter) {
      filters.push({
        property: 'situacao',
        operator: 'equals',
        value: statusFilter
      });
    }

    return {
      Page: currentPage,
      Limit: pageSize,
      Filter: filters.length > 0 ? JSON.stringify(filters) : ''
    };
  }, [currentPage, pageSize, searchTerm, statusFilter]);

  const { locais, loading, pagination, fetchLocais } = useLocais(filtros);

  useEffect(() => {
    fetchLocais(filtros);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filtros)]);

  // Debug: verificar se os dados estão chegando
  console.log('Locais - dados recebidos:', locais);
  console.log('Locais - quantidade:', locais.length);
  console.log('Locais - loading:', loading);
  console.log('Locais - pagination:', pagination);

  // Calculate summary metrics
  const summaryData = useMemo(() => {
    if (!locais.length) return [];

    const totalLocals = pagination.totalCount;
    const activeLocals = locais.filter(local => local.situacao === 'ativo').length;
    const averageHourlyRate = locais.reduce((sum, local) => sum + local.valorHora, 0) / locais.length;
    const maintenanceLocals = locais.filter(local => local.situacao === 'manutencao').length;
    const inactiveLocals = locais.filter(local => local.situacao === 'inativo').length;

    return [
      {
        title: 'Total de Locais',
        value: totalLocals,
        description: 'Locais cadastrados',
        icon: Building,
        trend: {
          value: 12,
          label: 'vs mês anterior',
          type: 'positive' as const
        },
        color: 'bg-blue-500'
      },
      {
        title: 'Locais Ativos',
        value: activeLocals,
        description: `${Math.round((activeLocals / totalLocals) * 100)}% do total`,
        icon: Activity,
        trend: {
          value: 5,
          label: 'este mês',
          type: 'positive' as const
        },
        color: 'bg-green-500'
      },
      {
        title: 'Valor Médio/Hora',
        value: `R$ ${averageHourlyRate.toFixed(2)}`,
        description: 'Média geral',
        icon: DollarSign,
        trend: {
          value: 8,
          label: 'vs mês anterior',
          type: 'positive' as const
        },
        color: 'bg-emerald-500'
      },
      {
        title: 'Em Manutenção',
        value: maintenanceLocals,
        description: 'Locais indisponíveis',
        icon: Clock,
        trend: {
          value: -2,
          label: 'vs semana anterior',
          type: 'negative' as const
        },
        color: 'bg-orange-500'
      }
    ];
  }, [locais, pagination.totalCount]);

  const columns = [
    {
      key: 'nome',
      label: 'Nome',
      sortable: true,
      filterable: true,
      filterType: 'text' as const
    },
    {
      key: 'tipo',
      label: 'Tipo',
      filterable: true,
      filterType: 'select' as const
    },
    {
      key: 'intervalo',
      label: 'Intervalo',
      render: (item: any) => `${item.intervalo} min`
    },
    {
      key: 'valorHora',
      label: 'Valor/Hora',
      render: (item: any) => `R$ ${item.valorHora.toFixed(2)}`
    },
    {
      key: 'capacidade',
      label: 'Capacidade',
      render: (item: any) => item.capacidade ? `${item.capacidade} pessoas` : 'N/A'
    },
    {
      key: 'situacao',
      label: 'Situação',
      filterable: true,
      filterType: 'select' as const,
      render: (item: any) => {
        const statusConfig = {
          ativo: { variant: 'default' as const, label: 'Ativo' },
          inativo: { variant: 'destructive' as const, label: 'Inativo' },
          manutencao: { variant: 'secondary' as const, label: 'Manutenção' }
        };
        const config = statusConfig[item.situacao] || statusConfig.inativo;
        return <Badge variant={config.variant}>{config.label}</Badge>;
      }
    }
  ];

  const actions = [
    {
      label: 'Editar',
      onClick: (item: any) => navigate(`/eventos/locais/${item.id}`),
      variant: 'outline' as const
    }
  ];

  const createButton = {
    label: 'Novo Local',
    icon: <Plus className="h-4 w-4" />,
    onClick: () => {
      sessionStorage.setItem('returnUrl', window.location.pathname);
      navigate('/eventos/locais/novo');
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <ModuleHeader
        title="Locais"
        icon={<MapPin className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}
      />

      <main className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 xl:px-12 py-6 overflow-hidden">
        <div className="flex flex-col h-full space-y-6">
          <div className="flex-shrink-0">
            <SummaryCards cards={summaryData} loading={loading} />
          </div>
          
          <div className="flex-1 min-h-0">
            <BaseList
              title="Gerenciar Locais"
              description="Cadastre e gerencie os locais disponíveis para reserva"
              data={locais}
              columns={columns}
              actions={actions}
              createButton={createButton}
              searchPlaceholder="Buscar locais..."
              searchFields={['nome', 'tipo']}
              getItemId={(item) => item.id}
              pageSize={pageSize}
              entityName="locais"
              loading={loading}
              className="h-full"
              showDebugInfo={true}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Locais;
