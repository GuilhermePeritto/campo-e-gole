
import BaseList, { BaseListAction, BaseListColumn } from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import SummaryCards from '@/components/table/SummaryCards';
import { Badge } from '@/components/ui/badge';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { useClientes } from '@/hooks/useClientes';
import { Calendar, Edit, Plus, UserCheck, UserPlus, Users } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Clientes = () => {
  const navigate = useNavigate();
  const { clientes, loading } = useClientes();

  // Debug: verificar se os dados estão chegando
  console.log('Clientes - dados recebidos:', clientes);
  console.log('Clientes - quantidade:', clientes.length);
  console.log('Clientes - loading:', loading);

  // Calculate summary metrics
  const summaryData = useMemo(() => {
    if (!clientes.length) return [];

    const totalClients = clientes.length;
    const activeClients = clientes.filter(c => c.status === 'active').length;
    const thisMonth = new Date().getMonth();
    const newThisMonth = clientes.filter(c => 
      new Date(c.createdAt).getMonth() === thisMonth
    ).length;
    const corporateClients = clientes.filter(c => c.document.includes('/')).length;

    return [
      {
        title: 'Total de Clientes',
        value: totalClients,
        description: 'Clientes cadastrados',
        icon: Users,
        trend: {
          value: 15,
          label: 'vs mês anterior',
          type: 'positive' as const
        },
        color: 'bg-blue-500'
      },
      {
        title: 'Clientes Ativos',
        value: activeClients,
        description: `${Math.round((activeClients / totalClients) * 100)}% do total`,
        icon: UserCheck,
        trend: {
          value: 8,
          label: 'este mês',
          type: 'positive' as const
        },
        color: 'bg-green-500'
      },
      {
        title: 'Novos Este Mês',
        value: newThisMonth,
        description: 'Cadastros recentes',
        icon: UserPlus,
        trend: {
          value: 25,
          label: 'vs mês anterior',
          type: 'positive' as const
        },
        color: 'bg-emerald-500'
      },
      {
        title: 'Pessoa Jurídica',
        value: corporateClients,
        description: `${Math.round((corporateClients / totalClients) * 100)}% do total`,
        icon: Calendar,
        trend: {
          value: 0,
          label: 'sem alteração',
          type: 'neutral' as const
        },
        color: 'bg-purple-500'
      }
    ];
  }, [clientes]);

  const columns: BaseListColumn<any>[] = [
    {
      key: 'name',
      label: 'Nome',
      sortable: true
    },
    {
      key: 'email',
      label: 'E-mail',
      sortable: true
    },
    {
      key: 'phone',
      label: 'Telefone'
    },
    {
      key: 'document',
      label: 'Documento',
      render: (cliente) => {
        const isCNPJ = cliente.document.includes('/');
        return (
          <div>
            <div className="font-medium">{cliente.document}</div>
            <div className="text-sm text-muted-foreground">
              {isCNPJ ? 'CNPJ' : 'CPF'}
            </div>
          </div>
        );
      }
    },
    {
      key: 'status',
      label: 'Situação',
      sortable: true,
      render: (cliente) => (
        <Badge variant={cliente.status === 'active' ? 'default' : 'destructive'}>
          {cliente.status === 'active' ? 'Ativo' : 'Inativo'}
        </Badge>
      )
    },
    {
      key: 'createdAt',
      label: 'Data Cadastro',
      sortable: true,
      render: (cliente) => new Date(cliente.createdAt).toLocaleDateString('pt-BR')
    }
  ];

  const actions: BaseListAction<any>[] = [
    {
      label: 'Editar',
      icon: <Edit className="h-4 w-4" />,
      onClick: (cliente) => navigate(`/eventos/clientes/${cliente.id}`),
      variant: 'outline'
    }
  ];

  return (
    <div className="h-screen bg-background flex flex-col">
      <ModuleHeader
        title="Clientes"
        icon={<Users className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}

        
      />

      <main className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
        <div className="flex flex-col h-full space-y-6">
          <div className="flex-shrink-0">
            <SummaryCards cards={summaryData} loading={loading} />
          </div>
          
          <div className="flex-1 min-h-0">
            <BaseList
              data={clientes}
              columns={columns}
              actions={actions}
              title="Gerenciar Clientes"
              description="Visualize e gerencie todos os clientes do módulo de eventos"
              searchPlaceholder="Buscar clientes..."
              searchFields={['name', 'email', 'document']}
              getItemId={(cliente) => cliente.id}
              createButton={{
                label: 'Novo Cliente',
                icon: <Plus className="h-4 w-4" />,
                onClick: () => {
      sessionStorage.setItem('returnUrl', window.location.pathname);
      navigate('/eventos/clientes/novo');
    }
              }}
              showExport={true}
              exportFilename="clientes-eventos"
              loading={loading}
              entityName="clientes"
              showDebugInfo={true}
              className="h-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Clientes;
