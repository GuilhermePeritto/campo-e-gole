import { useClientesEscolinhaBase } from '@/hooks/useClientesEscolinhaBase';
import { BaseCrudPage } from '@/pages/base/BaseCrudPage';
import { BaseCrudAction, BaseCrudColumn } from '@/pages/base/types/BaseCrudTypes';
import { Calendar, CheckCircle, Mail, Phone, Plus, Users, XCircle } from 'lucide-react';

// Interface para o cliente
interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  status: 'ativo' | 'inativo';
  dataCadastro: string;
}

export default function ClientesEscolinha() {
  const hook = useClientesEscolinhaBase();

  // Configuração das colunas
  const columns: BaseCrudColumn<Cliente>[] = [
    {
      key: 'nome',
      label: 'Nome',
      sortable: true,
      filterable: true,
      filterType: 'select',
      canHide: false
    },
    {
      key: 'email',
      label: 'E-mail',
      sortable: true,
      filterable: true,
      filterType: 'select',
      render: (item) => (
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{item.email}</span>
        </div>
      )
    },
    {
      key: 'telefone',
      label: 'Telefone',
      sortable: true,
      filterable: true,
      filterType: 'select',
      render: (item) => (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{item.telefone}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      filterable: true,
      filterType: 'select',
      render: (item) => (
        <div className="flex items-center gap-2">
          {item.status === 'ativo' ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <XCircle className="h-4 w-4 text-red-600" />
          )}
          <span className={`text-sm font-medium ${
            item.status === 'ativo' ? 'text-green-600' : 'text-red-600'
          }`}>
            {item.status === 'ativo' ? 'Ativo' : 'Inativo'}
          </span>
        </div>
      )
    },
    {
      key: 'dataCadastro',
      label: 'Data de Cadastro',
      sortable: true,
      filterable: true,
      filterType: 'select',
      render: (item) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            {new Date(item.dataCadastro).toLocaleDateString('pt-BR')}
          </span>
        </div>
      )
    }
  ];

  // Configuração das ações
  const actions: BaseCrudAction<Cliente>[] = [
    {
      label: 'Excluir',
      onClick: (item) => {
        if (confirm(`Tem certeza que deseja excluir o cliente ${item.nome}?`)) {
          hook.deleteItem(item.id);
        }
      },
      variant: 'destructive',
      show: () => true // Sempre mostrar para teste
    }
  ];

  // Configuração dos cards de resumo
  const summaryCards = [
    {
      title: 'Total de Clientes',
      value: (data: Cliente[]) => data.length,
      description: 'Clientes cadastrados',
      icon: Users,
      color: 'bg-blue-500',
      trend: {
        value: 12,
        label: 'este mês',
        type: 'positive' as const
      }
    },
    {
      title: 'Clientes Ativos',
      value: (data: Cliente[]) => data.filter(c => c.status === 'ativo').length,
      description: 'Clientes ativos',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'Clientes Inativos',
      value: (data: Cliente[]) => data.filter(c => c.status === 'inativo').length,
      description: 'Clientes inativos',
      icon: XCircle,
      color: 'bg-red-500'
    },
    {
      title: 'Novos este Mês',
      value: (data: Cliente[]) => {
        const thisMonth = new Date().getMonth();
        const thisYear = new Date().getFullYear();
        return data.filter(c => {
          const cadastro = new Date(c.dataCadastro);
          return cadastro.getMonth() === thisMonth && cadastro.getFullYear() === thisYear;
        }).length;
      },
      description: 'Novos cadastros',
      icon: Calendar,
      color: 'bg-purple-500'
    }
  ];

  return (
    <BaseCrudPage<Cliente>
      title="Clientes"
      description="Gerencie os clientes da escolinha"
      icon={<Users className="h-6 w-6" />}
      moduleColor="bg-blue-500"
      entityName="Cliente"
      entityNamePlural="Clientes"
      entityRoute="/escolinha/clientes"
      hook={hook}
      columns={columns}
      actions={actions}
      createButton={{
        label: "Novo Cliente",
        icon: <Plus className="h-4 w-4" />,
        route: "/escolinha/clientes/novo"
      }}
      summaryCards={summaryCards}
      searchFields={['nome', 'email', 'telefone']}
      searchPlaceholder="Buscar clientes por nome, email ou telefone..."
      showExport={true}
      exportFilename="clientes-escolinha"
      defaultSort="nome"
      defaultPageSize={10}
    />
  );
} 