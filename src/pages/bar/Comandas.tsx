
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Receipt, Eye, Edit, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BaseList, { BaseListColumn, BaseListAction } from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';

interface Comanda {
  id: number;
  number: string;
  client: string;
  table: string;
  status: 'Aberta' | 'Fechada' | 'Paga';
  openTime: string;
  closeTime?: string;
  total: number;
  itemsCount: number;
}

const Comandas = () => {
  const navigate = useNavigate();

  const mockComandas: Comanda[] = [
    { id: 1, number: 'CMD001', client: 'João Silva', table: 'Mesa 03', status: 'Aberta', openTime: '2024-06-05 19:30', total: 27.00, itemsCount: 3 },
    { id: 2, number: 'CMD002', client: 'Maria Santos', table: 'Mesa 07', status: 'Fechada', openTime: '2024-06-05 18:15', closeTime: '2024-06-05 20:45', total: 45.50, itemsCount: 5 },
    { id: 3, number: 'CMD003', client: 'Pedro Costa', table: 'Mesa 12', status: 'Paga', openTime: '2024-06-05 17:00', closeTime: '2024-06-05 19:30', total: 62.80, itemsCount: 4 },
    { id: 4, number: 'CMD004', client: 'Ana Oliveira', table: 'Mesa 05', status: 'Aberta', openTime: '2024-06-05 20:00', total: 18.00, itemsCount: 2 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aberta': return 'default';
      case 'Fechada': return 'secondary';
      case 'Paga': return 'outline';
      default: return 'secondary';
    }
  };

  const columns: BaseListColumn<Comanda>[] = [
    {
      key: 'number',
      label: 'Comanda',
      render: (comanda) => (
        <div>
          <div className="font-medium">{comanda.number}</div>
          <div className="text-sm text-muted-foreground">{comanda.client}</div>
        </div>
      )
    },
    {
      key: 'table',
      label: 'Mesa',
      render: (comanda) => comanda.table
    },
    {
      key: 'items',
      label: 'Itens',
      render: (comanda) => `${comanda.itemsCount} itens`
    },
    {
      key: 'total',
      label: 'Total',
      render: (comanda) => (
        <span className="font-medium text-green-600">R$ {comanda.total.toFixed(2)}</span>
      )
    },
    {
      key: 'openTime',
      label: 'Abertura',
      render: (comanda) => comanda.openTime
    },
    {
      key: 'status',
      label: 'Status',
      render: (comanda) => (
        <Badge variant={getStatusColor(comanda.status) as any}>
          {comanda.status}
        </Badge>
      )
    }
  ];

  const actions: BaseListAction<Comanda>[] = [
    {
      label: 'Ver',
      icon: <Eye className="h-4 w-4" />,
      onClick: (comanda) => navigate(`/bar/comandas/${comanda.id}`)
    },
    {
      label: 'Editar',
      icon: <Edit className="h-4 w-4" />,
      onClick: (comanda) => {
        if (comanda.status === 'Aberta') {
          navigate(`/bar/comandas/${comanda.id}`)
        }
      }
    }
  ];

  const renderComandaCard = (comanda: Comanda, actions: BaseListAction<Comanda>[]) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{comanda.number}</CardTitle>
            <CardDescription>{comanda.client}</CardDescription>
          </div>
          <Badge variant={getStatusColor(comanda.status) as any}>
            {comanda.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{comanda.table}</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{comanda.itemsCount} itens</span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">R$ {comanda.total.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold flex items-center justify-center gap-1">
                <Clock className="h-3 w-3" />
                {comanda.openTime.split(' ')[1]}
              </div>
              <div className="text-xs text-muted-foreground">Abertura</div>
            </div>
          </div>

          <div className="flex gap-2 pt-3">
            {actions.filter(action => {
              if (action.label === 'Editar') {
                return comanda.status === 'Aberta';
              }
              return true;
            }).map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="flex-1 gap-1"
                onClick={() => action.onClick(comanda)}
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

  const openComandas = mockComandas.filter(c => c.status === 'Aberta').length;
  const totalValue = mockComandas.reduce((sum, comanda) => sum + comanda.total, 0);

  return (
    <div className="h-screen flex flex-col bg-background">
      <ModuleHeader
        title="Comandas"
        icon={<Receipt className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.bar}
        backTo="/bar"
        backLabel="Bar"
      />

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 min-h-0">
        {/* Summary Cards */}
        <div className="flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Receipt className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Comandas</p>
                  <p className="text-2xl font-bold text-blue-600">{mockComandas.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Receipt className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Comandas Abertas</p>
                  <p className="text-2xl font-bold text-green-600">{openComandas}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Receipt className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
                  <p className="text-2xl font-bold text-orange-600">R$ {totalValue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* BaseList */}
        <div className="flex-1 min-h-0">
          <BaseList
            data={mockComandas}
            columns={columns}
            actions={actions}
            title="Lista de Comandas"
            description="Gerencie todas as comandas do bar"
            searchPlaceholder="Buscar comandas por número, cliente ou mesa..."
            searchFields={['number', 'client', 'table']}
            getItemId={(comanda) => comanda.id}
            pageSize={10}
            renderCard={renderComandaCard}
            createButton={{
              label: 'Nova Comanda',
              icon: <Plus className="h-4 w-4" />,
              onClick: () => navigate('/bar/comandas/novo')
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Comandas;
