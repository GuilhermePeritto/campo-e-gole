
import ModuleHeader from '@/components/ModuleHeader';
import BaseList, { BaseListColumn, BaseListAction } from '@/components/BaseList';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { useUniversalPayment } from '@/hooks/useUniversalPayment';
import { CreditCard, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Payment {
  id: number;
  studentName: string;
  month: string;
  amount: number;
  dueDate: string;
  paidDate: string | null;
  status: string;
}

const Payments = () => {
  const navigate = useNavigate();
  const { navigateToPayment } = useUniversalPayment();

  const payments: Payment[] = [
    { 
      id: 1, 
      studentName: 'Pedro Silva', 
      month: 'Junho/2024',
      amount: 150,
      dueDate: '2024-06-05',
      paidDate: '2024-06-03',
      status: 'pago'
    },
    { 
      id: 2, 
      studentName: 'Ana Costa', 
      month: 'Junho/2024',
      amount: 150,
      dueDate: '2024-06-05',
      paidDate: null,
      status: 'atrasado'
    },
    { 
      id: 3, 
      studentName: 'João Santos', 
      month: 'Junho/2024',
      amount: 180,
      dueDate: '2024-06-05',
      paidDate: '2024-06-04',
      status: 'pago'
    },
    { 
      id: 4, 
      studentName: 'Maria Oliveira', 
      month: 'Junho/2024',
      amount: 150,
      dueDate: '2024-06-05',
      paidDate: null,
      status: 'pendente'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago':
        return 'default';
      case 'pendente':
        return 'secondary';
      case 'atrasado':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const totalReceived = payments
    .filter(p => p.status === 'pago')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter(p => p.status !== 'pago')
    .reduce((sum, p) => sum + p.amount, 0);

  const handleReceivePayment = (paymentId: number) => {
    navigateToPayment({
      type: 'school_payment',
      id: paymentId.toString()
    });
  };

  const columns: BaseListColumn<Payment>[] = [
    {
      key: 'studentName',
      label: 'Aluno',
      render: (payment) => (
        <div className="font-medium">{payment.studentName}</div>
      )
    },
    {
      key: 'month',
      label: 'Mês/Ano',
      render: (payment) => payment.month
    },
    {
      key: 'amount',
      label: 'Valor',
      render: (payment) => (
        <span className="font-medium">R$ {payment.amount.toFixed(2)}</span>
      )
    },
    {
      key: 'dueDate',
      label: 'Vencimento',
      render: (payment) => payment.dueDate
    },
    {
      key: 'paidDate',
      label: 'Data Pagamento',
      render: (payment) => payment.paidDate || '-'
    },
    {
      key: 'status',
      label: 'Status',
      render: (payment) => (
        <Badge variant={getStatusColor(payment.status)}>
          {payment.status}
        </Badge>
      )
    }
  ];

  const actions: BaseListAction<Payment>[] = [
    {
      label: 'Receber',
      icon: <DollarSign className="h-4 w-4" />,
      onClick: (payment) => handleReceivePayment(payment.id)
    }
  ];

  const renderPaymentCard = (payment: Payment, actions: BaseListAction<Payment>[]) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-medium">{payment.studentName}</div>
              <div className="text-sm text-muted-foreground">{payment.month}</div>
            </div>
            <Badge variant={getStatusColor(payment.status)}>
              {payment.status}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Valor:</span>
              <span className="font-medium">R$ {payment.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Vencimento:</span>
              <span>{payment.dueDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Pagamento:</span>
              <span>{payment.paidDate || '-'}</span>
            </div>
          </div>

          {payment.status !== 'pago' && (
            <div className="pt-3">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  size="sm"
                  className="w-full gap-2"
                  onClick={() => action.onClick(payment)}
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background text-gray-600 dark:text-gray-300">
      <ModuleHeader
        title="Mensalidades"
        icon={<CreditCard className="h-5 w-5" />}
        moduleColor={MODULE_COLORS.school}
        backTo="/escolinha"
        backLabel="Escolinha"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Recebido</p>
                  <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">R$ {totalReceived.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pendente</p>
                  <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">R$ {totalPending.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">R$ {(totalReceived + totalPending).toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payments List */}
        <BaseList
          data={payments}
          columns={columns}
          actions={actions.filter((action) => 
            payments.some(payment => payment.status !== 'pago')
          )}
          title="Controle de Mensalidades"
          description="Gerencie os pagamentos das mensalidades dos alunos"
          searchPlaceholder="Buscar por nome do aluno..."
          searchFields={['studentName']}
          getItemId={(payment) => payment.id}
          pageSize={8}
          renderCard={renderPaymentCard}
        />
      </main>
    </div>
  );
};

export default Payments;
