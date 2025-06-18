
import BaseList, { BaseListAction, BaseListColumn } from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Edit, Plus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
      render: (cliente) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          cliente.situacao === 'Ativo' ? 'bg-green-100 text-green-800' :
          cliente.situacao === 'Inativo' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {cliente.situacao}
        </span>
      ),
      sortable: true
    },
    {
      key: 'dataCadastro',
      label: 'Data Cadastro',
      render: (cliente) => new Date(cliente.dataCadastro).toLocaleDateString('pt-BR'),
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-80px)]">
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
        />
      </main>
    </div>
  );
};

export default Clientes;
