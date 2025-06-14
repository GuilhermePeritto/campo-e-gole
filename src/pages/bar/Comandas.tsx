
import BaseList, { BaseListColumn, BaseListAction } from '@/components/BaseList';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Edit, Eye, Receipt, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Comanda {
  id: number;
  number: string;
  client: string;
  table: string;
  status: 'Aberta' | 'Fechada' | 'Paga';
  openTime: string;
  closeTime?: string;
  total: number;
  itemCount: number;
}

const Comandas = () => {
  const navigate = useNavigate();

  const mockComandas: Comanda[] = [
    {
      id: 1,
      number: 'CMD001',
      client: 'João Silva',
      table: 'Mesa 03',
      status: 'Aberta',
      openTime: '2024-06-05 19:30',
      total: 27.00,
      itemCount: 3
    },
    {
      id: 2,
      number: 'CMD002',
      client: 'Maria Santos',
      table: 'Mesa 07',
      status: 'Fechada',
      openTime: '2024-06-05 18:45',
      closeTime: '2024-06-05 20:15',
      total: 45.50,
      itemCount: 5
    },
    {
      id: 3,
      number: 'CMD003',
      client: 'Pedro Costa',
      table: 'Mesa 12',
      status: 'Paga',
      openTime: '2024-06-05 17:20',
      closeTime: '2024-06-05 19:30',
      total: 62.80,
      itemCount: 7
    }
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
      label: 'Número',
      render: (comanda) => (
        <div className="font-medium">{comanda.number}</div>
      )
    },
    {
      key: 'client',
      label: 'Cliente',
      render: (comanda) => (
        <div className="font-medium">{comanda.client}</div>
      )
    },
    {
      key: 'table',
      label: 'Mesa',
      render: (comanda) => (
        <div>{comanda.table}</div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (comanda) => (
        <Badge variant={getStatusColor(comanda.status)}>
          {comanda.status}
        </Badge>
      )
    },
    {
      key: 'openTime',
      label: 'Abertura',
      render: (comanda) => (
        <div className="text-sm text-muted-foreground">
          {new Date(comanda.openTime).toLocaleString('pt-BR')}
        </div>
      )
    },
    {
      key: 'itemCount',
      label: 'Itens',
      render: (comanda) => (
        <div className="text-center">{comanda.itemCount}</div>
      )
    },
    {
      key: 'total',
      label: 'Total',
      render: (comanda) => (
        <div className="font-bold text-green-600">
          R$ {comanda.total.toFixed(2)}
        </div>
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
      label: 'Editar',
      icon: <Edit className="h-4 w-4" />,
      onClick: (comanda) => {
        if (comanda.status === 'Paga') {
          toast({
            title: "Comanda já paga",
            description: "Não é possível editar comandas já pagas.",
            variant: "destructive"
          });
          return;
        }
        navigate(`/bar/comandas/${comanda.id}`);
      }
    },
    {
      label: 'Excluir',
      icon: <Trash2 className="h-4 w-4" />,
      variant: 'destructive',
      onClick: (comanda) => {
        if (comanda.status === 'Paga') {
          toast({
            title: "Comanda já paga",
            description: "Não é possível excluir comandas já pagas.",
            variant: "destructive"
          });
          return;
        }
        toast({
          title: "Comanda excluída",
          description: `Comanda ${comanda.number} foi excluída.`,
        });
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/bar')}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Bar
              </button>
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-blue-600" />
                <h1 className="text-xl font-semibold">Comandas</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BaseList
          data={mockComandas}
          columns={columns}
          actions={actions}
          title="Comandas"
          description="Gerencie todas as comandas do bar"
          searchPlaceholder="Buscar por cliente, mesa ou número..."
          searchFields={['client', 'table', 'number']}
          getItemId={(comanda) => comanda.id}
          createButton={{
            label: 'Nova Comanda',
            icon: <Receipt className="h-4 w-4" />,
            onClick: () => navigate('/bar/comandas/novo')
          }}
          showExport={true}
          exportFilename="comandas"
        />
      </main>
    </div>
  );
};

export default Comandas;
