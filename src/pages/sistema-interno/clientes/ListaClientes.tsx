
import BaseList, { BaseListAction, BaseListColumn } from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import { Edit, Eye, Plus, Trash2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  plano: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  dataContrato: string;
  valorMensal: number;
}

const ListaClientes = () => {
  const navigate = useNavigate();

  const clientes: Cliente[] = [
    {
      id: '1',
      nome: 'Academia Fitness Pro',
      email: 'contato@fitnesspro.com',
      telefone: '(11) 99999-1111',
      plano: 'Premium',
      status: 'Ativo',
      dataContrato: '2024-01-15',
      valorMensal: 299.90
    },
    {
      id: '2',
      nome: 'Escola de Futebol Champions',
      email: 'admin@champions.com',
      telefone: '(11) 88888-2222',
      plano: 'Básico',
      status: 'Ativo',
      dataContrato: '2024-02-20',
      valorMensal: 149.90
    },
    {
      id: '3',
      nome: 'Centro Esportivo Vila',
      email: 'gestao@vila.com',
      telefone: '(11) 77777-3333',
      plano: 'Empresarial',
      status: 'Pendente',
      dataContrato: '2024-03-10',
      valorMensal: 499.90
    }
  ];

  const columns: BaseListColumn<Cliente>[] = [
    {
      key: 'nome',
      label: 'Cliente',
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
      key: 'plano',
      label: 'Plano',
      sortable: true
    },
    {
      key: 'status',
      label: 'Status',
      render: (cliente) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          cliente.status === 'Ativo' ? 'bg-green-100 text-green-800' :
          cliente.status === 'Inativo' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {cliente.status}
        </span>
      ),
      sortable: true
    },
    {
      key: 'valorMensal',
      label: 'Valor Mensal',
      render: (cliente) => `R$ ${cliente.valorMensal.toFixed(2)}`,
      sortable: true
    }
  ];

  const actions: BaseListAction<Cliente>[] = [
    {
      label: 'Visualizar',
      icon: <Eye className="h-4 w-4" />,
      onClick: (cliente) => navigate(`/sistema-interno/clientes/${cliente.id}`),
      variant: 'outline'
    },
    {
      label: 'Editar',
      icon: <Edit className="h-4 w-4" />,
      onClick: (cliente) => navigate(`/sistema-interno/clientes/${cliente.id}/editar`),
      variant: 'outline'
    },
    {
      label: 'Excluir',
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (cliente) => console.log('Excluir cliente:', cliente.id),
      variant: 'destructive'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Clientes do Sistema"
        icon={<Users className="h-6 w-6" />}
        moduleColor="bg-blue-600"
        backTo="/sistema-interno"
        backLabel="Sistema Interno"
      />

      <main className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-80px)]">
        <BaseList
          data={clientes}
          columns={columns}
          actions={actions}
          title="Gerenciar Clientes"
          description="Visualize e gerencie todos os clientes do sistema"
          searchPlaceholder="Buscar clientes..."
          searchFields={['nome', 'email', 'plano']}
          getItemId={(cliente) => cliente.id}
          createButton={{
            label: 'Novo Cliente',
            icon: <Plus className="h-4 w-4" />,
            onClick: () => navigate('/sistema-interno/clientes/novo')
          }}
          showExport={true}
          exportFilename="clientes"
        />
      </main>
    </div>
  );
};

export default ListaClientes;
