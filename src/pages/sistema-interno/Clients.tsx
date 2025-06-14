
import BaseList, { BaseListColumn, BaseListAction } from '@/components/BaseList';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Eye, Settings, Trash2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Client {
  id: number;
  name: string;
  email: string;
  company: string;
  status: 'Ativo' | 'Inativo' | 'Suspenso';
  plan: string;
  monthlyValue: number;
  joinDate: string;
  modules: string[];
}

const InternalClients = () => {
  const navigate = useNavigate();

  const mockClients: Client[] = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@exemplo.com',
      company: 'Clube Esportivo ABC',
      status: 'Ativo',
      plan: 'Premium',
      monthlyValue: 850.00,
      joinDate: '2024-01-15',
      modules: ['Eventos', 'Financeiro', 'Bar', 'Escola']
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@exemplo.com',
      company: 'Academia FitLife',
      status: 'Ativo',
      plan: 'Básico',
      monthlyValue: 450.00,
      joinDate: '2024-02-20',
      modules: ['Eventos', 'Financeiro']
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro@exemplo.com',
      company: 'Centro Esportivo XYZ',
      status: 'Suspenso',
      plan: 'Intermediário',
      monthlyValue: 650.00,
      joinDate: '2023-11-10',
      modules: ['Eventos', 'Bar', 'Escola']
    }
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Ativo': return 'default';
      case 'Inativo': return 'secondary';
      case 'Suspenso': return 'destructive';
      default: return 'secondary';
    }
  };

  const columns: BaseListColumn<Client>[] = [
    {
      key: 'name',
      label: 'Nome',
      render: (client) => (
        <div>
          <div className="font-medium">{client.name}</div>
          <div className="text-sm text-muted-foreground">{client.email}</div>
        </div>
      )
    },
    {
      key: 'company',
      label: 'Empresa',
      render: (client) => (
        <div className="font-medium">{client.company}</div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (client) => (
        <Badge variant={getStatusVariant(client.status)}>
          {client.status}
        </Badge>
      )
    },
    {
      key: 'plan',
      label: 'Plano',
      render: (client) => (
        <div className="font-medium">{client.plan}</div>
      )
    },
    {
      key: 'monthlyValue',
      label: 'Valor Mensal',
      render: (client) => (
        <div className="font-bold text-green-600">
          R$ {client.monthlyValue.toFixed(2)}
        </div>
      )
    },
    {
      key: 'modules',
      label: 'Módulos',
      render: (client) => (
        <div className="text-sm">
          {client.modules.length} módulos
        </div>
      )
    }
  ];

  const actions: BaseListAction<Client>[] = [
    {
      label: 'Visualizar',
      icon: <Eye className="h-4 w-4" />,
      onClick: (client) => navigate(`/sistema-interno/clientes/${client.id}`)
    },
    {
      label: 'Editar',
      icon: <Edit className="h-4 w-4" />,
      onClick: (client) => navigate(`/sistema-interno/clientes/${client.id}/editar`)
    },
    {
      label: 'Configurar',
      icon: <Settings className="h-4 w-4" />,
      onClick: (client) => navigate(`/sistema-interno/clientes/${client.id}/configuracoes`)
    },
    {
      label: 'Excluir',
      icon: <Trash2 className="h-4 w-4" />,
      variant: 'destructive',
      onClick: (client) => {
        console.log('Excluir cliente:', client.id);
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
                onClick={() => navigate('/sistema-interno')}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Sistema Interno
              </button>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <h1 className="text-xl font-semibold">Clientes</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BaseList
          data={mockClients}
          columns={columns}
          actions={actions}
          title="Clientes do Sistema"
          description="Gerencie todos os clientes que utilizam o sistema"
          searchPlaceholder="Buscar por nome, empresa ou email..."
          searchFields={['name', 'company', 'email']}
          getItemId={(client) => client.id}
          createButton={{
            label: 'Novo Cliente',
            icon: <Users className="h-4 w-4" />,
            onClick: () => navigate('/sistema-interno/clientes/novo')
          }}
          showExport={true}
          exportFilename="clientes-sistema"
        />
      </main>
    </div>
  );
};

export default InternalClients;
