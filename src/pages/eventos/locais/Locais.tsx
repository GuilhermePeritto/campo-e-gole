
import BaseList from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import SummaryCards from '@/components/table/SummaryCards';
import { Badge } from '@/components/ui/badge';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { MapPin, Plus, Building, Clock, DollarSign, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocais } from '@/hooks/useLocais';
import { useMemo } from 'react';

const Locais = () => {
  const navigate = useNavigate();
  const { locais, loading } = useLocais();

  // Calculate summary metrics
  const summaryData = useMemo(() => {
    if (!locais.length) return [];

    const totalLocals = locais.length;
    const activeLocals = locais.filter(local => local.status === 'active').length;
    const averageHourlyRate = locais.reduce((sum, local) => sum + local.hourlyRate, 0) / locais.length;
    const maintenanceLocals = locais.filter(local => local.status === 'maintenance').length;

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
  }, [locais]);

  const columns = [
    {
      key: 'name',
      label: 'Nome',
      sortable: true,
      filterable: true,
      filterType: 'text' as const
    },
    {
      key: 'type',
      label: 'Tipo',
      filterable: true,
      filterType: 'select' as const
    },
    {
      key: 'interval',
      label: 'Intervalo',
      render: (item: any) => `${item.interval} min`
    },
    {
      key: 'hourlyRate',
      label: 'Valor/Hora'
    },
    {
      key: 'status',
      label: 'Situação',
      filterable: true,
      filterType: 'select' as const,
      render: (item: any) => (
        <Badge variant={item.status === 'active' ? 'default' : 'destructive'}>
          {item.status === 'active' ? 'Ativo' : 
           item.status === 'maintenance' ? 'Manutenção' : 'Inativo'}
        </Badge>
      )
    }
  ];

  const actions = [
    {
      label: 'Editar',
      onClick: (item: any) => navigate(`/eventos/locais/${item.id}/editar`),
      variant: 'outline' as const
    }
  ];

  const createButton = {
    label: 'Novo Local',
    icon: <Plus className="h-4 w-4" />,
    onClick: () => navigate('/eventos/locais/novo')
  };

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Locais"
        icon={<MapPin className="h-5 w-5" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos"
        backLabel="Módulo Eventos"
      />

      <main className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8 h-[calc(100vh-80px)]">
        <div className="space-y-6">
          <SummaryCards cards={summaryData} loading={loading} />
          
          <BaseList
            title="Gerenciar Locais"
            description="Cadastre e gerencie os locais disponíveis para reserva"
            data={locais}
            columns={columns}
            actions={actions}
            createButton={createButton}
            searchPlaceholder="Buscar locais..."
            searchFields={['name', 'type']}
            getItemId={(item) => item.id}
            pageSize={10}
            entityName="locais"
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
};

export default Locais;
