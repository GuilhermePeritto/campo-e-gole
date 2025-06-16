
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Plus, Edit, Eye, DollarSign } from 'lucide-react';
import BaseList, { BaseListColumn, BaseListAction } from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';

interface ContaReceber {
  id: string;
  cliente: string;
  valor: number;
  vencimento: string;
  status: 'Pendente' | 'Pago' | 'Vencido';
  descricao: string;
  dataPagamento?: string;
}

const ContasReceber = () => {
  const navigate = useNavigate();

  const contas: ContaReceber[] = [
    {
      id: '1',
      cliente: 'Academia Fitness Pro',
      valor: 299.90,
      vencimento: '2024-06-10',
      status: 'Pendente',
      descricao: 'Mensalidade Junho 2024'
    },
    {
      id: '2',
      cliente: 'Escola de Futebol Champions',
      valor: 149.90,
      vencimento: '2024-06-05',
      status: 'Pago',
      descricao: 'Mensalidade Junho 2024',
      dataPagamento: '2024-06-03'
    },
    {
      id: '3',
      cliente: 'Centro Esportivo Vila',
      valor: 499.90,
      vencimento: '2024-05-30',
      status: 'Vencido',
      descricao: 'Mensalidade Maio 2024'
    }
  ];

  const columns: BaseListColumn<ContaReceber>[] = [
    {
      key: 'cliente',
      label: 'Cliente',
      sortable: true
    },
    {
      key: 'descricao',
      label: 'Descrição',
      sortable: true
    },
    {
      key: 'valor',
      label: 'Valor',
      render: (conta) => `R$ ${conta.valor.toFixed(2)}`,
      sortable: true
    },
    {
      key: 'vencimento',
      label: 'Vencimento',
      render: (conta) => new Date(conta.vencimento).toLocaleDateString('pt-BR'),
      sortable: true
    },
    {
      key: 'status',
      label: 'Status',
      render: (conta) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          conta.status === 'Pago' ? 'bg-green-100 text-green-800' :
          conta.status === 'Vencido' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {conta.status}
        </span>
      ),
      sortable: true
    }
  ];

  const actions: BaseListAction<ContaReceber>[] = [
    {
      label: 'Visualizar',
      icon: <Eye className="h-4 w-4" />,
      onClick: (conta) => navigate(`/sistema-interno/contas/receber/${conta.id}`),
      variant: 'outline'
    },
    {
      label: 'Receber',
      icon: <DollarSign className="h-4 w-4" />,
      onClick: (conta) => navigate(`/sistema-interno/contas/receber/${conta.id}/pagamento`),
      variant: 'default'
    },
    {
      label: 'Editar',
      icon: <Edit className="h-4 w-4" />,
      onClick: (conta) => navigate(`/sistema-interno/contas/receber/${conta.id}/editar`),
      variant: 'outline'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Contas a Receber"
        icon={<CreditCard className="h-6 w-6" />}
        moduleColor="bg-green-600"
        backTo="/sistema-interno"
        backLabel="Sistema Interno"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-80px)]">
        <BaseList
          data={contas}
          columns={columns}
          actions={actions}
          title="Contas a Receber"
          description="Gerencie as cobranças dos clientes do sistema"
          searchPlaceholder="Buscar contas..."
          searchFields={['cliente', 'descricao']}
          getItemId={(conta) => conta.id}
          createButton={{
            label: 'Nova Conta',
            icon: <Plus className="h-4 w-4" />,
            onClick: () => navigate('/sistema-interno/contas/receber/nova')
          }}
          showExport={true}
          exportFilename="contas-receber"
        />
      </main>
    </div>
  );
};

export default ContasReceber;
