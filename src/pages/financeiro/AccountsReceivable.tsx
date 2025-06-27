
import BaseList, { BaseListAction, BaseListColumn } from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { useUniversalPayment } from '@/hooks/useUniversalPayment';
import { Calendar, CreditCard, DollarSign, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Receivable {
  id: number;
  description: string;
  amount: number;
  dueDate: string;
  module: string;
  client: string;
  status: string;
}

const ContasAReceber = () => {
  const navigate = useNavigate();
  const { navigateToPayment } = useUniversalPayment();

  const mockReceivables: Receivable[] = [
    {
      id: 1,
      description: 'Reserva Quadra A - João Silva',
      amount: 120.00,
      dueDate: '2024-06-10',
      module: 'eventos',
      client: 'João Silva',
      status: 'Pendente'
    },
    {
      id: 2,
      description: 'Mensalidade Junho - Pedro Martins',
      amount: 150.00,
      dueDate: '2024-06-15',
      module: 'escolinha',
      client: 'Pedro Martins',
      status: 'Vencido'
    },
    {
      id: 3,
      description: 'Evento Corporativo - Empresa ABC',
      amount: 800.00,
      dueDate: '2024-06-20',
      module: 'eventos',
      client: 'Empresa ABC',
      status: 'Pendente'
    },
    {
      id: 4,
      description: 'Comanda Bar - Mesa 12',
      amount: 75.50,
      dueDate: '2024-06-08',
      module: 'bar',
      client: 'Cliente Balcão',
      status: 'Vencido'
    },
    {
      id: 5,
      description: 'Mensalidade Junho - Ana Costa',
      amount: 150.00,
      dueDate: '2024-06-25',
      module: 'escolinha',
      client: 'Ana Costa',
      status: 'Pendente'
    }
  ];

  const handleReceivePayment = (receivableId: number) => {
    navigateToPayment({
      type: 'financial_receivable',
      id: receivableId.toString()
    });
  };

  const getModuleColor = (module: string) => {
    switch (module) {
      case 'eventos': return 'default';
      case 'bar': return 'secondary';
      case 'escolinha': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendente': return 'secondary';
      case 'Vencido': return 'destructive';
      default: return 'secondary';
    }
  };

  const totalAmount = mockReceivables.reduce((sum, receivable) => sum + receivable.amount, 0);
  const overdueAmount = mockReceivables
    .filter(r => r.status === 'Vencido')
    .reduce((sum, receivable) => sum + receivable.amount, 0);

  const columns: BaseListColumn<Receivable>[] = [
    {
      key: 'description',
      label: 'Descrição',
      render: (receivable) => (
        <div className="font-medium">{receivable.description}</div>
      )
    },
    {
      key: 'client',
      label: 'Cliente',
      render: (receivable) => receivable.client
    },
    {
      key: 'amount',
      label: 'Valor',
      render: (receivable) => (
        <span className="font-bold text-orange-600">
          R$ {receivable.amount.toFixed(2).replace('.', ',')}
        </span>
      )
    },
    {
      key: 'dueDate',
      label: 'Vencimento',
      render: (receivable) => new Date(receivable.dueDate).toLocaleDateString('pt-BR')
    },
    {
      key: 'module',
      label: 'Módulo',
      render: (receivable) => (
        <Badge variant={getModuleColor(receivable.module)}>
          {receivable.module === 'eventos' ? 'Eventos' : receivable.module === 'bar' ? 'Bar' : 'Escolinha'}
        </Badge>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (receivable) => (
        <Badge variant={getStatusColor(receivable.status)}>
          {receivable.status}
        </Badge>
      )
    }
  ];

  const actions: BaseListAction<Receivable>[] = [
    {
      label: 'Receber',
      icon: <CreditCard className="h-4 w-4" />,
      onClick: (receivable) => handleReceivePayment(receivable.id),
      variant: 'outline'
    }
  ];

  const renderReceivableCard = (receivable: Receivable, actions: BaseListAction<Receivable>[]) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-medium">{receivable.description}</div>
              <div className="text-sm text-muted-foreground">{receivable.client}</div>
            </div>
            <Badge variant={getStatusColor(receivable.status)}>
              {receivable.status}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Valor:</span>
              <span className="font-bold text-orange-600">R$ {receivable.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Vencimento:</span>
              <span>{new Date(receivable.dueDate).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Módulo:</span>
              <Badge variant={getModuleColor(receivable.module)} className="text-xs">
                {receivable.module === 'eventos' ? 'Eventos' : receivable.module === 'bar' ? 'Bar' : 'Escolinha'}
              </Badge>
            </div>
          </div>

          <div className="pt-3">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                size="sm"
                className="w-full gap-2"
                onClick={() => action.onClick(receivable)}
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Contas a Receber"
        icon={<Calendar className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.financial}
        backTo="/financeiro"
        backLabel="Financeiro"
      />

      <main className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total a Receber</p>
                  <p className="text-2xl font-bold text-orange-600">R$ {totalAmount.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vencidos</p>
                  <p className="text-2xl font-bold text-red-600">R$ {overdueAmount.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Títulos</p>
                  <p className="text-2xl font-bold text-blue-600">{mockReceivables.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vencidos</p>
                  <p className="text-2xl font-bold text-yellow-600">{mockReceivables.filter(r => r.status === 'Vencido').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <BaseList
          data={mockReceivables}
          columns={columns}
          actions={actions}
          title="Títulos a Receber"
          description="Todas as contas pendentes de recebimento"
          searchPlaceholder="Buscar por descrição ou cliente..."
          searchFields={['description', 'client']}
          getItemId={(receivable) => receivable.id}
          pageSize={10}
          renderCard={renderReceivableCard}
          createButton={{
            label: 'Nova Conta',
            icon: <Plus className="h-4 w-4" />,
            onClick: () => navigate('/financeiro/contas-a-receber/novo')
          }}
        />
      </main>
    </div>
  );
};

export default ContasAReceber;
