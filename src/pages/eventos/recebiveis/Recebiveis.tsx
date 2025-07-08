
import BaseList from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import SummaryCards from '@/components/table/SummaryCards';
import { Badge } from '@/components/ui/badge';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { useRecebiveis } from '@/hooks/useRecebiveis';
import { AlertTriangle, CheckCircle, CreditCard, DollarSign, Edit, Plus, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Recebiveis = () => {
  const navigate = useNavigate();
  const { recebiveis, loading } = useRecebiveis();

  // Debug: verificar se os dados estão chegando
  console.log('Recebiveis - dados recebidos:', recebiveis);
  console.log('Recebiveis - quantidade:', recebiveis.length);
  console.log('Recebiveis - loading:', loading);

  // Calculate summary metrics
  const summaryData = useMemo(() => {
    if (!recebiveis.length) return [];

    const totalAmount = recebiveis.reduce((sum, r) => sum + r.valor, 0);
    const pendingAmount = recebiveis.filter(r => r.status === 'pendente').reduce((sum, r) => sum + r.valor, 0);
    const paidAmount = recebiveis.filter(r => r.status === 'pago').reduce((sum, r) => sum + r.valor, 0);
    const overdueAmount = recebiveis.filter(r => r.status === 'vencido').reduce((sum, r) => sum + r.valor, 0);

    return [
      {
        title: 'Total a Receber',
        value: `R$ ${totalAmount.toFixed(2)}`,
        description: 'Valor total',
        icon: DollarSign,
        trend: {
          value: 12,
          label: 'vs mês anterior',
          type: 'positive' as const
        },
        color: 'bg-blue-500'
      },
      {
        title: 'Pendentes',
        value: `R$ ${pendingAmount.toFixed(2)}`,
        description: 'Aguardando pagamento',
        icon: TrendingUp,
        trend: {
          value: -5,
          label: 'vs semana anterior',
          type: 'negative' as const
        },
        color: 'bg-yellow-500'
      },
      {
        title: 'Pagos',
        value: `R$ ${paidAmount.toFixed(2)}`,
        description: 'Recebimentos confirmados',
        icon: CheckCircle,
        trend: {
          value: 20,
          label: 'este mês',
          type: 'positive' as const
        },
        color: 'bg-green-500'
      },
      {
        title: 'Vencidos',
        value: `R$ ${overdueAmount.toFixed(2)}`,
        description: 'Contas em atraso',
        icon: AlertTriangle,
        trend: {
          value: -15,
          label: 'vs mês anterior',
          type: 'positive' as const
        },
        color: 'bg-red-500'
      }
    ];
  }, [recebiveis]);

  const columns = [
    {
      key: 'cliente',
      label: 'Cliente',
      sortable: true,
      filterable: true,
      filterType: 'select' as const
    },
    {
      key: 'descricao',
      label: 'Descrição',
      sortable: true,
      filterable: true,
      filterType: 'text' as const
    },
    {
      key: 'valor',
      label: 'Valor',
      sortable: true,
      render: (item: any) => `R$ ${item.valor.toFixed(2)}`
    },
    {
      key: 'dataVencimento',
      label: 'Vencimento',
      sortable: true,
      render: (item: any) => new Date(item.dataVencimento).toLocaleDateString('pt-BR')
    },
    {
      key: 'status',
      label: 'Situação',
      filterable: true,
      filterType: 'select' as const,
      render: (item: any) => {
        const statusConfig = {
          pendente: { variant: 'secondary' as const, label: 'Pendente' },
          pago: { variant: 'default' as const, label: 'Pago' },
          vencido: { variant: 'destructive' as const, label: 'Vencido' }
        };
        const config = statusConfig[item.status] || statusConfig.pendente;
        return <Badge variant={config.variant}>{config.label}</Badge>;
      }
    },
    {
      key: 'criadoEm',
      label: 'Data Criação',
      sortable: true,
      render: (item: any) => new Date(item.criadoEm).toLocaleDateString('pt-BR')
    }
  ];

  const actions = [
    {
      label: 'Editar',
      onClick: (item: any) => navigate(`/eventos/recebiveis/${item.id}`),
      variant: 'outline' as const,
      icon: <Edit className="h-4 w-4" />
    },
    {
      label: 'Receber',
      onClick: (item: any) => navigate(`/eventos/recebiveis/${item.id}/receber`),
      variant: 'default' as const,
      icon: <CreditCard className="h-4 w-4" />
    }
  ];

  const createButton = {
    label: 'Novo Recebível',
    icon: <Plus className="h-4 w-4" />,
    onClick: () => {
      sessionStorage.setItem('returnUrl', window.location.pathname);
      navigate('/eventos/recebiveis/novo');
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <ModuleHeader
        title="Recebíveis"
        icon={<DollarSign className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}

        
      />

      <main className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 xl:px-12 py-6 overflow-hidden">
        <div className="flex flex-col h-full space-y-6">
          <div className="flex-shrink-0">
            <SummaryCards cards={summaryData} loading={loading} />
          </div>
          
          <div className="flex-1 min-h-0">
            <BaseList
              title="Recebíveis"
              description="Gerencie as contas a receber e recebimentos"
              data={recebiveis}
              columns={columns}
              actions={actions}
              createButton={createButton}
              searchPlaceholder="Buscar recebíveis..."
              searchFields={['cliente', 'descricao']}
              getItemId={(item) => item.id}
              pageSize={10}
              entityName="recebiveis"
              loading={loading}
              className="h-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Recebiveis;
