
import BaseList, { BaseListAction, BaseListColumn } from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import SummaryCards from '@/components/table/SummaryCards';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Edit, Plus, Users, UserCheck, UserPlus, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';

interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  tipo: string;
  situacao: 'Ativo' | 'Inativo' | 'Pendente';
  dataCadastro: string;
}

const Clientes = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const clientes: Cliente[] = [
    {
      id: '1',
      nome: 'João Silva',
      email: 'joao@email.com',
      telefone: '(11) 99999-1111',
      tipo: 'Pessoa Física',
      situacao: 'Ativo',
      dataCadastro: '2024-01-15'
    },
    {
      id: '2',
      nome: 'Maria Santos',
      email: 'maria@email.com',
      telefone: '(11) 88888-2222',
      tipo: 'Pessoa Física',
      situacao: 'Ativo',
      dataCadastro: '2024-02-20'
    },
    {
      id: '3',
      nome: 'Empresa XYZ Ltda',
      email: 'contato@xyz.com',
      telefone: '(11) 77777-3333',
      tipo: 'Pessoa Jurídica',
      situacao: 'Pendente',
      dataCadastro: '2024-03-10'
    }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Calculate summary metrics
  const summaryData = useMemo(() => {
    if (!clientes.length) return [];

    const totalClients = clientes.length;
    const activeClients = clientes.filter(c => c.situacao === 'Ativo').length;
    const thisMonth = new Date().getMonth();
    const newThisMonth = clientes.filter(c => 
      new Date(c.dataCadastro).getMonth() === thisMonth
    ).length;
    const corporateClients = clientes.filter(c => c.tipo === 'Pessoa Jurídica').length;

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

  const columns: BaseListColumn<Cliente>[] = [
    {
      key: 'nome',
      label: 'Nome',
      sortable: true
    },
    {
      key: 'email',
      label: 'E-mail',
      sortable: true
    },
    {
      key: 'telefone',
      label: 'Telefone'
    },
    {
      key: 'tipo',
      label: 'Tipo',
      sortable: true
    },
    {
      key: 'situacao',
      label: 'Situação',
      sortable: true
    },
    {
      key: 'dataCadastro',
      label: 'Data Cadastro',
      sortable: true
    }
  ];

  const actions: BaseListAction<Cliente>[] = [
    {
      label: 'Editar',
      icon: <Edit className="h-4 w-4" />,
      onClick: (cliente) => navigate(`/eventos/clientes/${cliente.id}/editar`),
      variant: 'outline'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Clientes"
        icon={<Users className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos"
        backLabel="Eventos"
      />

      <main className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-80px)]">
        <div className="space-y-6">
          <SummaryCards cards={summaryData} loading={loading} />
          
          <BaseList
            data={clientes}
            columns={columns}
            actions={actions}
            title="Gerenciar Clientes"
            description="Visualize e gerencie todos os clientes do módulo de eventos"
            searchPlaceholder="Buscar clientes..."
            searchFields={['nome', 'email', 'tipo']}
            getItemId={(cliente) => cliente.id}
            createButton={{
              label: 'Novo Cliente',
              icon: <Plus className="h-4 w-4" />,
              onClick: () => navigate('/eventos/clientes/novo')
            }}
            showExport={true}
            exportFilename="clientes-eventos"
            entityName="clientes"
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
};

export default Clientes;
