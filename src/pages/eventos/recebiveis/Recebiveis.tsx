
import BaseList from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import SummaryCards from '@/components/table/SummaryCards';
import { Badge } from '@/components/ui/badge';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { CreditCard, DollarSign, Edit, Plus, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRecebiveis } from '@/hooks/useRecebiveis';
import { useMemo } from 'react';

const Recebiveis = () => {
  const navigate = useNavigate();
  const { recebiveis, loading } = useRecebiveis();

  // Calculate summary metrics
  const summaryData = useMemo(() => {
    if (!recebiveis.length) return [];

    const totalAmount = recebiveis.reduce((sum, r) => sum + r.amount, 0);
    const pendingAmount = recebiveis.filter(r => r.status === 'pending').reduce((sum, r) => sum + r.amount, 0);
    const overdueAmount = recebiveis.filter(r => r.status === 'overdue').reduce((sum, r) => sum + r.amount, 0);
    const paidAmount = recebiveis.filter(r => r.status === 'paid').reduce((sum, r) => sum + r.amount, 0);

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
        description: 'Aguardando recebimento',
        icon: TrendingUp,
        trend: {
          value: -5,
          label: 'vs semana anterior',
          type: 'negative' as const
        },
        color: 'bg-yellow-500'
      },
      {
        title: 'Vencidos',
        value: `R$ ${overdueAmount.toFixed(2)}`,
        description: 'Valores em atraso',
        icon: AlertTriangle,
        trend: {
          value: -15,
          label: 'vs mês anterior',
          type: 'positive' as const
        },
        color: 'bg-red-500'
      },
      {
        title: 'Recebidos',
        value: `R$ ${paidAmount.toFixed(2)}`,
        description: 'Valores quitados',
        icon: CheckCircle,
        trend: {
          value: 20,
          label: 'este mês',
          type: 'positive' as const
        },
        color: 'bg-green-500'
      }
    ];
  }, [recebiveis]);

  const columns = [
    {
      key: 'client',
      label: 'Cliente',
      sortable: true,
      filterable: true,
      filterType: 'select' as const
    },
    {
      key: 'description',
      label: 'Descrição'
    },
    {
      key: 'dueDate',
      label: 'Vencimento'
    },
    {
      key: 'amount',
      label: 'Valor'
    },
    {
      key: 'status',
      label: 'Situação',
      filterable: true,
      filterType: 'select' as const,
      render: (item: any) => {
        const variants = {
          pending: 'default',
          overdue: 'destructive',
          paid: 'default'
        } as const;
        
        const labels = {
          pending: 'Pendente',
          overdue: 'Vencido',
          paid: 'Pago'
        };
        
        return (
          <Badge variant={variants[item.status as keyof typeof variants]}>
            {labels[item.status as keyof typeof labels]}
          </Badge>
        );
      }
    }
  ];

  const actions = [
    {
      label: 'Editar',
      onClick: (item: any) => navigate(`/eventos/recebiveis/${item.id}/editar`),
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
    onClick: () => navigate('/eventos/recebiveis/novo')
  };

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Recebíveis"
        icon={<DollarSign className="h-5 w-5" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos"
        backLabel="Módulo Eventos"
      />

      <main className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8 h-[calc(100vh-80px)]">
        <div className="space-y-6">
          <SummaryCards cards={summaryData} loading={loading} />
          
          <BaseList
            title="Recebíveis"
            description="Gerencie as contas pendentes e recebimentos"
            data={recebiveis}
            columns={columns}
            actions={actions}
            createButton={createButton}
            searchPlaceholder="Buscar contas..."
            searchFields={['client', 'description']}
            getItemId={(item) => item.id}
            pageSize={10}
            entityName="recebiveis"
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
};

export default Recebiveis;
