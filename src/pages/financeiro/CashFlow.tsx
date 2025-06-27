
import BaseList, { BaseListAction, BaseListColumn } from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

interface CashFlowItem {
  id: number;
  date: string;
  description: string;
  type: string;
  amount: number;
}

const FluxoDeCaixa = () => {
  const mockFluxoDeCaixa: CashFlowItem[] = [
    { id: 1, date: '2024-06-01', description: 'Saldo Inicial', type: 'inicial', amount: 10000.00 },
    { id: 2, date: '2024-06-02', description: 'Reserva Quadra A', type: 'entrada', amount: 120.00 },
    { id: 3, date: '2024-06-02', description: 'Conta de Luz', type: 'saida', amount: -450.00 },
    { id: 4, date: '2024-06-03', description: 'Venda Bar', type: 'entrada', amount: 85.50 },
    { id: 5, date: '2024-06-04', description: 'Mensalidade Aluno', type: 'entrada', amount: 150.00 },
    { id: 6, date: '2024-06-05', description: 'Material de Limpeza', type: 'saida', amount: -80.00 },
    { id: 7, date: '2024-06-06', description: 'Reserva Quadra B', type: 'entrada', amount: 200.00 },
    { id: 8, date: '2024-06-07', description: 'Fornecedor Bebidas', type: 'saida', amount: -300.00 },
    { id: 9, date: '2024-06-08', description: 'Aula Particular', type: 'entrada', amount: 100.00 },
    { id: 10, date: '2024-06-09', description: 'Internet', type: 'saida', amount: -150.00 }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'entrada': return 'default';
      case 'saida': return 'destructive';
      case 'inicial': return 'secondary';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'entrada': return <TrendingUp className="h-4 w-4" />;
      case 'saida': return <TrendingDown className="h-4 w-4" />;
      case 'inicial': return <DollarSign className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const columns: BaseListColumn<CashFlowItem>[] = [
    {
      key: 'date',
      label: 'Data',
      render: (item) => new Date(item.date).toLocaleDateString('pt-BR')
    },
    {
      key: 'description',
      label: 'Descrição',
      render: (item) => (
        <div className="flex items-center gap-2">
          {getTypeIcon(item.type)}
          <span>{item.description}</span>
        </div>
      )
    },
    {
      key: 'type',
      label: 'Tipo',
      render: (item) => (
        <Badge variant={getTypeColor(item.type)}>
          {item.type}
        </Badge>
      )
    },
    {
      key: 'amount',
      label: 'Valor',
      render: (item) => (
        <span className={`font-bold ${
          item.amount > 0 ? 'text-green-600' : 
          item.amount < 0 ? 'text-red-600' : 'text-blue-600'
        }`}>
          {item.amount > 0 ? '+' : ''}R$ {Math.abs(item.amount).toFixed(2).replace('.', ',')}
        </span>
      )
    }
  ];

  const actions: BaseListAction<CashFlowItem>[] = []; // Sem ações para fluxo de caixa

  const renderCashFlowCard = (item: CashFlowItem, actions: BaseListAction<CashFlowItem>[]) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {getTypeIcon(item.type)}
              {item.description}
            </CardTitle>
            <CardDescription>{new Date(item.date).toLocaleDateString('pt-BR')}</CardDescription>
          </div>
          <Badge variant={getTypeColor(item.type)}>
            {item.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className={`text-2xl font-bold ${
            item.amount > 0 ? 'text-green-600' : 
            item.amount < 0 ? 'text-red-600' : 'text-blue-600'
          }`}>
            {item.amount > 0 ? '+' : ''}R$ {Math.abs(item.amount).toFixed(2)}
          </div>
          <div className="text-xs text-muted-foreground">Valor da Movimentação</div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="h-screen flex flex-col bg-background">
      <ModuleHeader
        title="Fluxo de Caixa"
        icon={<DollarSign className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.financial}
        backTo="/financeiro"
        backLabel="Financeiro"
      />

      <main className="flex-1 flex flex-col max-w-none mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 min-h-0">
        {/* Resumo - Fixed height */}
        <div className="flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Entradas</p>
                  <p className="text-2xl font-bold text-green-600">R$ 655,50</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Saídas</p>
                  <p className="text-2xl font-bold text-red-600">R$ 980,00</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Saldo Atual</p>
                  <p className="text-2xl font-bold text-blue-600">R$ 9.675,50</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* BaseList - Flexible height to fill remaining space */}
        <div className="flex-1 min-h-0">
          <BaseList
            data={mockFluxoDeCaixa}
            columns={columns}
            actions={actions}
            title="Movimentação Financeira"
            description="Histórico detalhado de entradas e saídas"
            searchPlaceholder="Buscar por descrição..."
            searchFields={['description']}
            getItemId={(item) => item.id}
            pageSize={6}
            renderCard={renderCashFlowCard}
          />
        </div>
      </main>
    </div>
  );
};

export default FluxoDeCaixa;
