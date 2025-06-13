import BaseList, { BaseListAction, BaseListColumn } from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { CreditCard, DollarSign, Edit, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Receivable {
  id: number;
  client: string;
  amount: number;
  dueDate: string;
  status: string;
  description: string;
  createdAt: string;
}

const Receivables = () => {
  const navigate = useNavigate();

  const receivables: Receivable[] = [
    { 
      id: 1, 
      client: 'João Silva', 
      amount: 150, 
      dueDate: '2024-06-10', 
      status: 'pendente',
      description: 'Reserva Quadra A - 08/06',
      createdAt: '2024-06-01'
    },
    { 
      id: 2, 
      client: 'Time Unidos', 
      amount: 300, 
      dueDate: '2024-06-08', 
      status: 'vencido',
      description: 'Reserva Campo 1 - 05/06',
      createdAt: '2024-05-28'
    },
    { 
      id: 3, 
      client: 'Maria Santos', 
      amount: 200, 
      dueDate: '2024-06-15', 
      status: 'pendente',
      description: 'Reserva Quadra B - 12/06',
      createdAt: '2024-06-03'
    },
    { 
      id: 4, 
      client: 'Carlos Oliveira', 
      amount: 120, 
      dueDate: '2024-06-20', 
      status: 'pendente',
      description: 'Reserva Campo 2 - 18/06',
      createdAt: '2024-06-05'
    },
    { 
      id: 5, 
      client: 'Ana Costa', 
      amount: 180, 
      dueDate: '2024-06-05', 
      status: 'vencido',
      description: 'Reserva Quadra A - 02/06',
      createdAt: '2024-05-25'
    },
    { 
      id: 6, 
      client: 'Pedro Martins', 
      amount: 250, 
      dueDate: '2024-06-12', 
      status: 'pendente',
      description: 'Reserva Campo 1 - 10/06',
      createdAt: '2024-06-02'
    },
    { 
      id: 7, 
      client: 'Clube Esportivo', 
      amount: 400, 
      dueDate: '2024-06-18', 
      status: 'pendente',
      description: 'Reserva múltipla - 16/06',
      createdAt: '2024-06-04'
    },
    { 
      id: 8, 
      client: 'Lucas Ferreira', 
      amount: 160, 
      dueDate: '2024-06-22', 
      status: 'pendente',
      description: 'Reserva Quadra C - 20/06',
      createdAt: '2024-06-06'
    },
    { 
      id: 9, 
      client: 'Fernanda Lima', 
      amount: 320, 
      dueDate: '2024-06-25', 
      status: 'pendente',
      description: 'Reserva Campo 3 - 23/06',
      createdAt: '2024-06-07'
    },
    { 
      id: 10, 
      client: 'Roberto Silva', 
      amount: 180, 
      dueDate: '2024-06-28', 
      status: 'pendente',
      description: 'Reserva Quadra D - 26/06',
      createdAt: '2024-06-08'
    },
    { 
      id: 11, 
      client: 'Mariana Costa', 
      amount: 220, 
      dueDate: '2024-06-30', 
      status: 'vencido',
      description: 'Reserva Campo 2 - 28/06',
      createdAt: '2024-06-09'
    },
    { 
      id: 12, 
      client: 'Eduardo Santos', 
      amount: 150, 
      dueDate: '2024-07-02', 
      status: 'pendente',
      description: 'Reserva Quadra A - 30/06',
      createdAt: '2024-06-10'
    },
    { 
      id: 13, 
      client: 'Patrícia Oliveira', 
      amount: 280, 
      dueDate: '2024-07-05', 
      status: 'pendente',
      description: 'Reserva Campo 1 - 03/07',
      createdAt: '2024-06-11'
    },
    { 
      id: 14, 
      client: 'Gustavo Martins', 
      amount: 190, 
      dueDate: '2024-07-08', 
      status: 'pendente',
      description: 'Reserva Quadra B - 06/07',
      createdAt: '2024-06-12'
    },
    { 
      id: 15, 
      client: 'Juliana Ferreira', 
      amount: 240, 
      dueDate: '2024-07-10', 
      status: 'pendente',
      description: 'Reserva Campo 3 - 08/07',
      createdAt: '2024-06-13'
    },
    { 
      id: 16, 
      client: 'Ricardo Lima', 
      amount: 350, 
      dueDate: '2024-07-12', 
      status: 'vencido',
      description: 'Reserva múltipla - 10/07',
      createdAt: '2024-06-14'
    },
    { 
      id: 17, 
      client: 'Camila Santos', 
      amount: 170, 
      dueDate: '2024-07-15', 
      status: 'pendente',
      description: 'Reserva Quadra C - 13/07',
      createdAt: '2024-06-15'
    },
    { 
      id: 18, 
      client: 'Bruno Costa', 
      amount: 200, 
      dueDate: '2024-07-18', 
      status: 'pendente',
      description: 'Reserva Campo 2 - 16/07',
      createdAt: '2024-06-16'
    },
    { 
      id: 19, 
      client: 'Larissa Silva', 
      amount: 160, 
      dueDate: '2024-07-20', 
      status: 'pendente',
      description: 'Reserva Quadra A - 18/07',
      createdAt: '2024-06-17'
    },
    { 
      id: 20, 
      client: 'Thiago Oliveira', 
      amount: 290, 
      dueDate: '2024-07-22', 
      status: 'pendente',
      description: 'Reserva Campo 1 - 20/07',
      createdAt: '2024-06-18'
    },
    { 
      id: 21, 
      client: 'Vanessa Martins', 
      amount: 210, 
      dueDate: '2024-07-25', 
      status: 'vencido',
      description: 'Reserva Quadra D - 23/07',
      createdAt: '2024-06-19'
    },
    { 
      id: 22, 
      client: 'André Ferreira', 
      amount: 180, 
      dueDate: '2024-07-28', 
      status: 'pendente',
      description: 'Reserva Campo 3 - 26/07',
      createdAt: '2024-06-20'
    },
    { 
      id: 23, 
      client: 'Priscila Lima', 
      amount: 250, 
      dueDate: '2024-07-30', 
      status: 'pendente',
      description: 'Reserva Quadra B - 28/07',
      createdAt: '2024-06-21'
    },
    { 
      id: 24, 
      client: 'Felipe Santos', 
      amount: 320, 
      dueDate: '2024-08-02', 
      status: 'pendente',
      description: 'Reserva múltipla - 31/07',
      createdAt: '2024-06-22'
    },
    { 
      id: 25, 
      client: 'Daniela Costa', 
      amount: 140, 
      dueDate: '2024-08-05', 
      status: 'pendente',
      description: 'Reserva Quadra C - 03/08',
      createdAt: '2024-06-23'
    },
    { 
      id: 26, 
      client: 'Marcos Silva', 
      amount: 190, 
      dueDate: '2024-08-08', 
      status: 'vencido',
      description: 'Reserva Campo 2 - 06/08',
      createdAt: '2024-06-24'
    },
    { 
      id: 27, 
      client: 'Tatiana Oliveira', 
      amount: 230, 
      dueDate: '2024-08-10', 
      status: 'pendente',
      description: 'Reserva Quadra A - 08/08',
      createdAt: '2024-06-25'
    },
    { 
      id: 28, 
      client: 'Rodrigo Martins', 
      amount: 270, 
      dueDate: '2024-08-12', 
      status: 'pendente',
      description: 'Reserva Campo 1 - 10/08',
      createdAt: '2024-06-26'
    },
    { 
      id: 29, 
      client: 'Cristina Ferreira', 
      amount: 200, 
      dueDate: '2024-08-15', 
      status: 'pendente',
      description: 'Reserva Quadra D - 13/08',
      createdAt: '2024-06-27'
    },
    { 
      id: 30, 
      client: 'Gabriel Lima', 
      amount: 300, 
      dueDate: '2024-08-18', 
      status: 'pendente',
      description: 'Reserva Campo 3 - 16/08',
      createdAt: '2024-06-28'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente': return 'secondary';
      case 'vencido': return 'destructive';
      case 'pago': return 'default';
      default: return 'outline';
    }
  };

  const columns: BaseListColumn<Receivable>[] = [
    {
      key: 'client',
      label: 'Cliente',
      render: (receivable) => (
        <div>
          <div className="font-medium">{receivable.client}</div>
          <div className="text-sm text-muted-foreground">{receivable.description}</div>
        </div>
      )
    },
    {
      key: 'amount',
      label: 'Valor',
      render: (receivable) => (
        <span className="font-medium">R$ {receivable.amount.toFixed(2)}</span>
      )
    },
    {
      key: 'dueDate',
      label: 'Vencimento',
      render: (receivable) => receivable.dueDate
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
      label: 'Editar',
      icon: <Edit className="h-4 w-4" />,
      onClick: (receivable) => navigate(`/eventos/contas-a-receber/${receivable.id}/editar`)
    },
    {
      label: 'Receber',
      icon: <DollarSign className="h-4 w-4" />,
      onClick: (receivable) => navigate(`/eventos/contas-a-receber/${receivable.id}/receber`),
      variant: 'default'
    }
  ];

  const renderReceivableCard = (receivable: Receivable, actions: BaseListAction<Receivable>[]) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{receivable.client}</CardTitle>
            <CardDescription>{receivable.description}</CardDescription>
          </div>
          <Badge variant={getStatusColor(receivable.status)}>
            {receivable.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 pt-3 border-t">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">R$ {receivable.amount.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">Valor</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{receivable.dueDate}</div>
              <div className="text-xs text-muted-foreground">Vencimento</div>
            </div>
          </div>

          <div className="flex gap-2 pt-3">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "outline"}
                size="sm"
                className="flex-1 gap-1"
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

  const totalPendente = receivables
    .filter(r => r.status === 'pendente')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalVencido = receivables
    .filter(r => r.status === 'vencido')
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="h-screen flex flex-col bg-background">
      <ModuleHeader
        title="Contas a Receber"
        icon={<CreditCard className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos"
        backLabel="Eventos"
      />

      <main className="flex-1 flex flex-col max-w-7xl 3xl:max-w-9xl 4xl:max-w-10xl mx-auto w-full px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16 py-8 min-h-0">
        {/* Summary Cards - Fixed height */}
        <div className="flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6 3xl:gap-8 4xl:gap-10 mb-8">
          <Card className="border">
            <CardContent className="p-6 3xl:p-8 4xl:p-10">
              <div className="flex items-center gap-3 3xl:gap-4 4xl:gap-5">
                <div className="p-2 3xl:p-3 4xl:p-4 bg-yellow-100 rounded-lg">
                  <CreditCard className="h-5 w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm 3xl:text-base 4xl:text-lg font-medium text-gray-600">Pendente</p>
                  <p className="text-2xl 3xl:text-3xl 4xl:text-4xl font-bold text-gray-600 dark:text-gray-300">R$ {totalPendente.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardContent className="p-6 3xl:p-8 4xl:p-10">
              <div className="flex items-center gap-3 3xl:gap-4 4xl:gap-5">
                <div className="p-2 3xl:p-3 4xl:p-4 bg-red-100 rounded-lg">
                  <CreditCard className="h-5 w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7 text-red-600" />
                </div>
                <div>
                  <p className="text-sm 3xl:text-base 4xl:text-lg font-medium text-gray-600">Vencido</p>
                  <p className="text-2xl 3xl:text-3xl 4xl:text-4xl font-bold text-gray-600 dark:text-gray-300">R$ {totalVencido.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardContent className="p-6 3xl:p-8 4xl:p-10">
              <div className="flex items-center gap-3 3xl:gap-4 4xl:gap-5">
                <div className="p-2 3xl:p-3 4xl:p-4 bg-green-100 rounded-lg">
                  <CreditCard className="h-5 w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7 text-green-600" />
                </div>
                <div>
                  <p className="text-sm 3xl:text-base 4xl:text-lg font-medium text-gray-600">Total</p>
                  <p className="text-2xl 3xl:text-3xl 4xl:text-4xl font-bold text-gray-600 dark:text-gray-300">R$ {(totalPendente + totalVencido).toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 min-h-0">
          <BaseList
            data={receivables}
            columns={columns}
            actions={actions}
            title="Lista de Contas a Receber"
            description="Gerencie todas as contas pendentes e vencidas"
            searchPlaceholder="Buscar por cliente ou descrição..."
            searchFields={['client', 'description']}
            getItemId={(receivable) => receivable.id}
            pageSize={5}
            renderCard={renderReceivableCard}
            createButton={{
              label: 'Nova Conta',
              icon: <Plus className="h-4 w-4" />,
              onClick: () => navigate('/eventos/contas-a-receber/novo')
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Receivables;
