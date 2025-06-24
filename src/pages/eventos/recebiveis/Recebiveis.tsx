
import BaseList from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import { Badge } from '@/components/ui/badge';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { CreditCard, DollarSign, Edit, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Recebiveis = () => {
  const navigate = useNavigate();

  // Mock data
  const recebiveis = [
    {
      id: 1,
      client: 'João Silva',
      description: 'Reserva Quadra A - 15/06/2024',
      dueDate: '2024-06-20',
      amount: 120.00,
      status: 'pendente',
      installment: '1/1'
    },
    {
      id: 2,
      client: 'Maria Santos',
      description: 'Reserva Quadra B - 18/06/2024',
      dueDate: '2024-06-25',
      amount: 160.00,
      status: 'vencido',
      installment: '1/3'
    },
    {
      id: 3,
      client: 'Pedro Costa',
      description: 'Reserva Campo Principal - 20/06/2024',
      dueDate: '2024-06-15',
      amount: 200.00,
      status: 'pago',
      installment: '2/2'
    }
  ];

  const columns = [
    {
      key: 'client',
      label: 'Cliente',
      sortable: true
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
      key: 'installment',
      label: 'Parcela'
    },
    {
      key: 'status',
      label: 'Situação',
      render: (item: any) => {
        const variants = {
          pendente: 'default',
          vencido: 'destructive',
          pago: 'default'
        } as const;
        
        const labels = {
          pendente: 'Pendente',
          vencido: 'Vencido',
          pago: 'Pago'
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
      label: 'Pagar',
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-80px)]">
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
