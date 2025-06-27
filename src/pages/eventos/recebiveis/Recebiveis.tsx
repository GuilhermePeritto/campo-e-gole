
import BaseList from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import { Badge } from '@/components/ui/badge';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { CreditCard, DollarSign, Edit, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRecebiveis } from '@/hooks/useRecebiveis';

const Recebiveis = () => {
  const navigate = useNavigate();
  const { recebiveis } = useRecebiveis();

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
      label: 'Vencimento',
      render: (item: any) => new Date(item.dueDate).toLocaleDateString('pt-BR')
    },
    {
      key: 'amount',
      label: 'Valor',
      render: (item: any) => `R$ ${item.amount.toFixed(2)}`
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
        />
      </main>
    </div>
  );
};

export default Recebiveis;
