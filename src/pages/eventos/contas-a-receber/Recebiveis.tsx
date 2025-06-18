
import BaseList from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { DollarSign, Plus } from 'lucide-react';

const Recebiveis = () => {
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
      render: (value: string) => new Date(value).toLocaleDateString('pt-BR')
    },
    {
      key: 'amount',
      label: 'Valor',
      render: (value: number) => `R$ ${value.toFixed(2)}`
    },
    {
      key: 'installment',
      label: 'Parcela'
    },
    {
      key: 'status',
      label: 'Situação',
      render: (value: string) => {
        const variants = {
          pendente: 'default',
          vencido: 'destructive',
          pago: 'success'
        } as const;
        
        const labels = {
          pendente: 'Pendente',
          vencido: 'Vencido',
          pago: 'Pago'
        };
        
        return (
          <Badge variant={variants[value as keyof typeof variants]}>
            {labels[value as keyof typeof labels]}
          </Badge>
        );
      }
    }
  ];

  const actions = [
    {
      label: 'Nova Conta a Receber',
      icon: <Plus className="h-4 w-4" />,
      href: '/eventos/contas-a-receber/novo',
      variant: 'default' as const
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Contas a Receber"
        icon={<DollarSign className="h-5 w-5" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos"
        backLabel="Módulo Eventos"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BaseList
          title="Contas a Receber"
          description="Gerencie as contas pendentes e recebimentos"
          data={recebiveis}
          columns={columns}
          actions={actions}
          searchPlaceholder="Buscar contas..."
          searchFields={['client', 'description']}
          itemsPerPage={10}
          editPath="/eventos/contas-a-receber/:id/editar"
        />
      </main>
    </div>
  );
};

export default Recebiveis;
