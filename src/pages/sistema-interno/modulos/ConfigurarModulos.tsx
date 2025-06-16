
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Plus, Settings, Users } from 'lucide-react';
import BaseList, { BaseListColumn, BaseListAction } from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';

interface Modulo {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  clientesAtivos: number;
  status: 'Ativo' | 'Inativo';
  categoria: string;
}

const ConfigurarModulos = () => {
  const navigate = useNavigate();

  const modulos: Modulo[] = [
    {
      id: '1',
      nome: 'Módulo Eventos',
      descricao: 'Gestão completa de eventos e reservas',
      preco: 99.90,
      clientesAtivos: 15,
      status: 'Ativo',
      categoria: 'Gestão'
    },
    {
      id: '2',
      nome: 'Módulo Financeiro',
      descricao: 'Controle financeiro e relatórios',
      preco: 149.90,
      clientesAtivos: 12,
      status: 'Ativo',
      categoria: 'Financeiro'
    },
    {
      id: '3',
      nome: 'Módulo Escolinha',
      descricao: 'Gestão de escolas esportivas',
      preco: 79.90,
      clientesAtivos: 8,
      status: 'Ativo',
      categoria: 'Educação'
    },
    {
      id: '4',
      nome: 'Módulo Bar',
      descricao: 'Gestão de vendas e estoque',
      preco: 59.90,
      clientesAtivos: 5,
      status: 'Inativo',
      categoria: 'Vendas'
    }
  ];

  const columns: BaseListColumn<Modulo>[] = [
    {
      key: 'nome',
      label: 'Módulo',
      sortable: true
    },
    {
      key: 'descricao',
      label: 'Descrição'
    },
    {
      key: 'categoria',
      label: 'Categoria',
      sortable: true
    },
    {
      key: 'preco',
      label: 'Preço',
      render: (modulo) => `R$ ${modulo.preco.toFixed(2)}`,
      sortable: true
    },
    {
      key: 'clientesAtivos',
      label: 'Clientes Ativos',
      render: (modulo) => modulo.clientesAtivos.toString(),
      sortable: true
    },
    {
      key: 'status',
      label: 'Status',
      render: (modulo) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          modulo.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {modulo.status}
        </span>
      ),
      sortable: true
    }
  ];

  const actions: BaseListAction<Modulo>[] = [
    {
      label: 'Configurar',
      icon: <Settings className="h-4 w-4" />,
      onClick: (modulo) => navigate(`/sistema-interno/modulos/${modulo.id}/configurar`),
      variant: 'outline'
    },
    {
      label: 'Clientes',
      icon: <Users className="h-4 w-4" />,
      onClick: (modulo) => navigate(`/sistema-interno/modulos/${modulo.id}/clientes`),
      variant: 'outline'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Configurar Módulos"
        icon={<Package className="h-6 w-6" />}
        moduleColor="bg-purple-600"
        backTo="/sistema-interno"
        backLabel="Sistema Interno"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-80px)]">
        <BaseList
          data={modulos}
          columns={columns}
          actions={actions}
          title="Módulos do Sistema"
          description="Configure preços e disponibilidade dos módulos"
          searchPlaceholder="Buscar módulos..."
          searchFields={['nome', 'categoria', 'descricao']}
          getItemId={(modulo) => modulo.id}
          createButton={{
            label: 'Novo Módulo',
            icon: <Plus className="h-4 w-4" />,
            onClick: () => navigate('/sistema-interno/modulos/novo')
          }}
          showExport={true}
          exportFilename="modulos"
        />
      </main>
    </div>
  );
};

export default ConfigurarModulos;
