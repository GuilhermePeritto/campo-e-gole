
import ModuleHeader from '@/components/ModuleHeader';
import BaseList, { BaseListColumn, BaseListAction } from '@/components/BaseList';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { usePagination } from '@/hooks/usePagination';
import { Calendar, DollarSign, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Payable {
  id: number;
  description: string;
  supplier: string;
  amount: number;
  dueDate: string;
  category: string;
  status: string;
}

const ContasAPagar = () => {
  const navigate = useNavigate();

  const mockPayables: Payable[] = [
    {
      id: 1,
      description: 'Fornecedor de Bebidas - Pedido #123',
      supplier: 'Distribuidora XYZ',
      amount: 850.00,
      dueDate: '2024-06-15',
      category: 'Fornecedores',
      status: 'Pendente'
    },
    {
      id: 2,
      description: 'Energia Elétrica - Junho',
      supplier: 'Companhia Elétrica',
      amount: 450.00,
      dueDate: '2024-06-10',
      category: 'Utilidades',
      status: 'Vencido'
    },
    {
      id: 3,
      description: 'Salário - João da Silva',
      supplier: 'Funcionário',
      amount: 2500.00,
      dueDate: '2024-06-30',
      category: 'Pessoal',
      status: 'Pendente'
    },
    {
      id: 4,
      description: 'Material de Limpeza',
      supplier: 'Limpeza Total Ltda',
      amount: 180.00,
      dueDate: '2024-06-08',
      category: 'Manutenção',
      status: 'Vencido'
    },
    {
      id: 5,
      description: 'Equipamentos Esportivos',
      supplier: 'Sport Equipment Inc',
      amount: 1200.00,
      dueDate: '2024-06-25',
      category: 'Equipamentos',
      status: 'Pendente'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Fornecedores': return 'default';
      case 'Utilidades': return 'secondary';
      case 'Pessoal': return 'outline';
      case 'Manutenção': return 'secondary';
      case 'Equipamentos': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendente': return 'secondary';
      case 'Vencido': return 'destructive';
      case 'Pago': return 'default';
      default: return 'secondary';
    }
  };

  const totalAmount = mockPayables.reduce((sum, payable) => sum + payable.amount, 0);
  const overdueAmount = mockPayables
    .filter(p => p.status === 'Vencido')
    .reduce((sum, payable) => sum + payable.amount, 0);

  const columns: BaseListColumn<Payable>[] = [
    {
      key: 'description',
      label: 'Descrição',
      render: (payable) => (
        <div className="font-medium">{payable.description}</div>
      )
    },
    {
      key: 'supplier',
      label: 'Fornecedor',
      render: (payable) => payable.supplier
    },
    {
      key: 'amount',
      label: 'Valor',
      render: (payable) => (
        <span className="font-bold text-purple-600">
          R$ {payable.amount.toFixed(2).replace('.', ',')}
        </span>
      )
    },
    {
      key: 'dueDate',
      label: 'Vencimento',
      render: (payable) => new Date(payable.dueDate).toLocaleDateString('pt-BR')
    },
    {
      key: 'category',
      label: 'Categoria',
      render: (payable) => (
        <Badge variant={getCategoryColor(payable.category)}>
          {payable.category}
        </Badge>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (payable) => (
        <Badge variant={getStatusColor(payable.status)}>
          {payable.status}
        </Badge>
      )
    }
  ];

  const actions: BaseListAction<Payable>[] = [
    {
      label: 'Pagar',
      icon: <DollarSign className="h-4 w-4" />,
      onClick: (payable) => console.log('Pagar', payable.id),
      variant: 'outline'
    },
    {
      label: 'Detalhes',
      icon: <Calendar className="h-4 w-4" />,
      onClick: (payable) => console.log('Detalhes', payable.id),
      variant: 'outline'
    }
  ];

  const renderPayableCard = (payable: Payable, actions: BaseListAction<Payable>[]) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-medium">{payable.description}</div>
              <div className="text-sm text-muted-foreground">{payable.supplier}</div>
            </div>
            <Badge variant={getStatusColor(payable.status)}>
              {payable.status}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Valor:</span>
              <span className="font-bold text-purple-600">R$ {payable.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Vencimento:</span>
              <span>{new Date(payable.dueDate).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Categoria:</span>
              <Badge variant={getCategoryColor(payable.category)} className="text-xs">
                {payable.category}
              </Badge>
            </div>
          </div>

          <div className="flex gap-2 pt-3">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                size="sm"
                className="flex-1 gap-1"
                onClick={() => action.onClick(payable)}
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
        title="Contas a Pagar"
        icon={<Calendar className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.financial}
        backTo="/financeiro"
        backLabel="Financeiro"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total a Pagar</p>
                  <p className="text-2xl font-bold text-purple-600">R$ {totalAmount.toFixed(2).replace('.', ',')}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Total de Contas</p>
                  <p className="text-2xl font-bold text-blue-600">{mockPayables.length}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Vencidas</p>
                  <p className="text-2xl font-bold text-yellow-600">{mockPayables.filter(p => p.status === 'Vencido').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <BaseList
          data={mockPayables}
          columns={columns}
          actions={actions}
          title="Contas a Pagar"
          description="Todas as contas pendentes de pagamento"
          searchPlaceholder="Buscar por descrição ou fornecedor..."
          searchFields={['description', 'supplier']}
          getItemId={(payable) => payable.id}
          pageSize={10}
          renderCard={renderPayableCard}
          createButton={{
            label: 'Nova Conta',
            icon: <Plus className="h-4 w-4" />,
            onClick: () => navigate('/financeiro/novo-payable')
          }}
        />
      </main>
    </div>
  );
};

export default ContasAPagar;
