
import { Listagem } from '@/core/components/listagem';
import { useClientes } from '@/hooks/useClientes';
import type { Cliente } from '@/types/reservas';
import { Calendar, IdCard, Mail, Phone, UserCheck, UserPlus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Clientes() {
  const navigate = useNavigate();
  const hook = useClientes();

  return (
    <Listagem<Cliente>
      titulo="Clientes"
      descricao="Visualize e gerencie todos os clientes do módulo de eventos"
      icone={<Users className="h-6 w-6" />}
      corModulo="bg-green-600"
      nomeEntidade="Cliente"
      nomeEntidadePlural="Clientes"
      rotaEntidade="/clientes"
      rotaResumo="/clientes/resumo"
      hook={hook}
      colunas={[
        {
          chave: 'nome',
          titulo: 'Nome',
          ordenavel: true,
          renderizar: (cliente) => (
            <div className="flex items-center gap-2">
              <span>{cliente.nome}</span>
            </div>
          ),
        },
        {
          chave: 'email',
          titulo: 'E-mail',
          ordenavel: true,
          renderizar: (cliente) => (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{cliente.email}</span>
            </div>
          ),
        },
        {
          chave: 'telefone',
          titulo: 'Telefone',
          renderizar: (cliente) => (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{cliente.telefone}</span>
            </div>
          ),
        },
        {
          chave: 'documento',
          titulo: 'Documento',
          renderizar: (cliente) => (
            <div className="flex items-center gap-2">
              <IdCard className="h-4 w-4 text-muted-foreground" />
              <span>{cliente.documento}</span>
            </div>
          ),
        },
        {
          chave: 'situacao',
          titulo: 'Situação',
          ordenavel: true,
          renderizar: (cliente) => (
            <span className={
              cliente.situacao === 'ativo'
                ? 'text-green-600 font-medium flex items-center gap-1'
                : 'text-red-600 font-medium flex items-center gap-1'
            }>
              <UserCheck className="h-4 w-4" />
              {cliente.situacao === 'ativo' ? 'Ativo' : 'Inativo'}
            </span>
          ),
        },
        {
          chave: 'dataCriacao',
          titulo: 'Data Cadastro',
          ordenavel: true,
          renderizar: (cliente) => {
            let data = '';
            try {
              const d = new Date(cliente.dataCriacao);
              data = isNaN(d.getTime()) ? '-' : d.toLocaleDateString('pt-BR');
            } catch {
              data = '-';
            }
            return (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{data}</span>
              </div>
            );
          },
        },
      ]}
      acoes={[
        {
          titulo: 'Editar',
          onClick: (cliente) => navigate(`/eventos/clientes/${cliente.id}`),
          variante: 'outline',
        },
      ]}
      botaoCriar={{
        titulo: 'Novo Cliente',
        icone: <UserPlus className="h-4 w-4" />,
        rota: '/eventos/clientes/novo',
      }}
      cardsResumo={[
        {
          titulo: 'Total de Clientes',
          valor: (_data, _pagination, summaryData) => summaryData?.totalClientes ?? 0,
          descricao: 'Clientes cadastrados',
          icone: Users,
          cor: 'bg-blue-500',
        },
        {
          titulo: 'Clientes Ativos',
          valor: (_data, _pagination, summaryData) => summaryData?.ativos ?? 0,
          descricao: 'Clientes ativos',
          icone: UserCheck,
          cor: 'bg-green-500',
        },
        {
          titulo: 'Novos Este Mês',
          valor: (_data, _pagination, summaryData) => summaryData?.novosMes ?? 0,
          descricao: 'Cadastros recentes',
          icone: UserPlus,
          cor: 'bg-emerald-500',
        },
        {
          titulo: 'Pessoa Jurídica',
          valor: (_data, _pagination, summaryData) => summaryData?.pessoaJuridica ?? 0,
          descricao: 'Clientes PJ',
          icone: Calendar,
          cor: 'bg-purple-500',
        },
      ]}
      camposBusca={['nome', 'email', 'documento']}
      placeholderBusca="Buscar clientes..."
      mostrarExportar={true}
      nomeArquivoExportar="clientes-eventos"
      ordenacaoPadrao="nome"
      tamanhoPaginaPadrao={10}
    />
  );
}
