
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Eye, Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUniversalPayment } from '@/hooks/useUniversalPayment';
import BaseList, { BaseListColumn, BaseListAction } from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';

interface Comanda {
  id: number;
  customer: string;
  total: number;
  openTime: string;
  status: string;
}

const Comandas = () => {
  const navigate = useNavigate();
  const { navigateToPayment } = useUniversalPayment();

  const comandas: Comanda[] = [
    { id: 1, customer: 'Mesa 1', total: 45.50, openTime: '10:30', status: 'aberta' },
    { id: 2, customer: 'João Silva', total: 22.00, openTime: '11:00', status: 'aberta' },
    { id: 3, customer: 'Mesa 5', total: 120.00, openTime: '12:15', status: 'fechada' },
    { id: 4, customer: 'Maria Costa', total: 67.80, openTime: '13:45', status: 'aberta' },
    { id: 5, customer: 'Mesa 3', total: 89.90, openTime: '14:00', status: 'aberta' },
    { id: 6, customer: 'Carlos Souza', total: 34.20, openTime: '15:30', status: 'fechada' },
    { id: 7, customer: 'Mesa 2', total: 55.00, openTime: '16:45', status: 'aberta' },
    { id: 8, customer: 'Ana Oliveira', total: 92.50, openTime: '17:00', status: 'aberta' },
    { id: 9, customer: 'Mesa 4', total: 76.30, openTime: '18:15', status: 'fechada' },
    { id: 10, customer: 'Pedro Santos', total: 41.10, openTime: '19:30', status: 'aberta' },
  ];

  const handleCloseComanda = (comandaId: number) => {
    navigateToPayment({
      type: 'bar_comanda',
      id: comandaId.toString()
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aberta': return 'default';
      case 'fechada': return 'secondary';
      default: return 'outline';
    }
  };

  const columns: BaseListColumn<Comanda>[] = [
    {
      key: 'id',
      label: 'Comanda',
      render: (comanda) => `#${comanda.id}`
    },
    {
      key: 'customer',
      label: 'Mesa/Cliente',
      render: (comanda) => comanda.customer
    },
    {
      key: 'total',
      label: 'Valor',
      render: (comanda) => (
        <span className="font-medium">R$ {comanda.total.toFixed(2)}</span>
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
        <Badge variant={getStatusColor(comanda.status)}>
          {comanda.status}
        </Badge>
      )
    }
  ];

  const actions: BaseListAction<Comanda>[] = [
    {
      label: 'Visualizar',
      icon: <Eye className="h-4 w-4" />,
      onClick: (comanda) => navigate(`/bar/comandas/${comanda.id}`)
    },
    {
      label: 'Fechar',
      icon: <CreditCard className="h-4 w-4" />,
      onClick: (comanda) => handleCloseComanda(comanda.id),
      variant: 'default'
    }
  ];

  const renderComandaCard = (comanda: Comanda, actions: BaseListAction<Comanda>[]) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">#{comanda.id}</CardTitle>
            <CardDescription>{comanda.customer}</CardDescription>
          </div>
          <Badge variant={getStatusColor(comanda.status)}>
            {comanda.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 pt-3 border-t">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">R$ {comanda.total.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">Valor Total</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{comanda.openTime}</div>
              <div className="text-xs text-muted-foreground">Abertura</div>
            </div>
          </div>

          <div className="flex gap-2 pt-3">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-1"
              onClick={() => navigate(`/bar/comandas/${comanda.id}`)}
            >
              <Eye className="h-4 w-4" />
              Ver
            </Button>
            {comanda.status === 'aberta' && (
              <Button
                size="sm"
                className="flex-1 gap-1"
                onClick={() => handleCloseComanda(comanda.id)}
              >
                <CreditCard className="h-4 w-4" />
                Fechar
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const totalValue = comandas.reduce((sum, comanda) => sum + comanda.total, 0);
  const openCount = comandas.filter(comanda => comanda.status === 'aberta').length;
  const closedCount = comandas.filter(comanda => comanda.status === 'fechada').length;

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Comandas"
        icon={<CreditCard className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.bar}
        backTo="/bar"
        backLabel="Bar"
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
                  <p className="text-sm font-medium text-gray-600">Valor Total</p>
                  <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">R$ {totalValue.toFixed(2)}</p>
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
                  <p className="text-sm font-medium text-gray-600">Comandas Abertas</p>
                  <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">{openCount}</p>
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
                  <p className="text-sm font-medium text-gray-600">Comandas Fechadas</p>
                  <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">{closedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end mb-6">
          <Button onClick={() => navigate('/bar/comandas/novo')} className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Comanda
          </Button>
        </div>

        <BaseList
          data={comandas}
          columns={columns}
          actions={actions}
          title="Comandas Ativas"
          description="Gerencie as comandas em andamento"
          searchPlaceholder="Buscar por mesa ou cliente..."
          searchFields={['customer']}
          getItemId={(comanda) => comanda.id}
          pageSize={8}
          renderCard={renderComandaCard}
          createButton={{
            label: 'Nova Comanda',
            icon: <Plus className="h-4 w-4" />,
            onClick: () => navigate('/bar/comandas/novo')
          }}
        />
      </main>
    </div>
  );
};

export default Comandas;
