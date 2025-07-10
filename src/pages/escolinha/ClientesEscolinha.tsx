import type { AcaoListagem, ColunaListagem } from '@/core/components/listagem';
import { Listagem } from '@/core/components/listagem';
import { useClientesEscolinhaBase } from '@/hooks/useClientesEscolinhaBase';
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
  const colunas: ColunaListagem<Cliente>[] = [
    {
      chave: 'nome',
      titulo: 'Nome',
      ordenavel: true,
      filtravel: true,
      tipoFiltro: 'select',
      podeOcultar: false
    },
    {
      chave: 'email',
      titulo: 'E-mail',
      ordenavel: true,
      filtravel: true,
      tipoFiltro: 'select',
      renderizar: (item) => (
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{item.email}</span>
        </div>
      )
    },
    {
      chave: 'telefone',
      titulo: 'Telefone',
      ordenavel: true,
      filtravel: true,
      tipoFiltro: 'select',
      renderizar: (item) => (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{item.telefone}</span>
        </div>
      )
    },
    {
      chave: 'status',
      titulo: 'Status',
      ordenavel: true,
      filtravel: true,
      tipoFiltro: 'select',
      renderizar: (item) => (
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
      chave: 'dataCadastro',
      titulo: 'Data de Cadastro',
      ordenavel: true,
      filtravel: true,
      tipoFiltro: 'select',
      renderizar: (item) => (
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
  const acoes: AcaoListagem<Cliente>[] = [
    {
      titulo: 'Excluir',
      onClick: (item) => {
        if (confirm(`Tem certeza que deseja excluir o cliente ${item.nome}?`)) {
          hook.deleteItem(item.id);
        }
      },
      variante: 'destructive',
      mostrar: () => true // Sempre mostrar para teste
    }
  ];

  // Configuração dos cards de resumo
  const cardsResumo = [
    {
      titulo: 'Total de Clientes',
      valor: (data: Cliente[]) => data.length,
      descricao: 'Clientes cadastrados',
      icone: Users,
      cor: 'bg-blue-500',
      tendencia: {
        valor: 12,
        label: 'este mês',
        tipo: 'positivo' as const
      }
    },
    {
      titulo: 'Clientes Ativos',
      valor: (data: Cliente[]) => data.filter(c => c.status === 'ativo').length,
      descricao: 'Clientes ativos',
      icone: CheckCircle,
      cor: 'bg-green-500'
    },
    {
      titulo: 'Clientes Inativos',
      valor: (data: Cliente[]) => data.filter(c => c.status === 'inativo').length,
      descricao: 'Clientes inativos',
      icone: XCircle,
      cor: 'bg-red-500'
    },
    {
      titulo: 'Novos este Mês',
      valor: (data: Cliente[]) => {
        const thisMonth = new Date().getMonth();
        const thisYear = new Date().getFullYear();
        return data.filter(c => {
          const cadastro = new Date(c.dataCadastro);
          return cadastro.getMonth() === thisMonth && cadastro.getFullYear() === thisYear;
        }).length;
      },
      descricao: 'Novos cadastros',
      icone: Calendar,
      cor: 'bg-purple-500'
    }
  ];

  return (
    <Listagem<Cliente>
      titulo="Clientes"
      descricao="Gerencie os clientes da escolinha"
      icone={<Users className="h-6 w-6" />}
      corModulo="rgb(var(--module-school))"
      nomeEntidade="Cliente"
      nomeEntidadePlural="Clientes"
      rotaEntidade="/escolinha/clientes"
      hook={hook}
      colunas={colunas}
      acoes={acoes}
      botaoCriar={{
        titulo: "Novo Cliente",
        icone: <Plus className="h-4 w-4" />,
        rota: "/escolinha/clientes/novo"
      }}
      cardsResumo={cardsResumo}
      camposBusca={['nome', 'email', 'telefone']}
      placeholderBusca="Buscar clientes por nome, email ou telefone..."
      mostrarExportar={true}
      nomeArquivoExportar="clientes-escolinha"
      ordenacaoPadrao="nome"
      tamanhoPaginaPadrao={10}
    />
  );
} 