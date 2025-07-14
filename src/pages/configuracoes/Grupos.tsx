
import { Badge } from '@/components/ui/badge';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Listagem } from '@/core/components/listagem';
import { useGruposPermissoes } from '@/hooks/useGruposPermissoes';
import { GrupoPermissao } from '@/types/grupo-permissao';
import { Plus, Settings, Shield, ShieldCheck, Trash2, UserCheck, Users, UserX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Grupos = () => {
  const navigate = useNavigate();
  const gruposHook = useGruposPermissoes();

  const colunas = [
    {
      chave: 'nome',
      titulo: 'Grupo',
      ordenavel: true,
      filtravel: true,
      tipoFiltro: 'select' as const,
      renderizar: (grupo: GrupoPermissao) => (
        <div>
          <div className="font-medium">{grupo.nome}</div>
          <div className="text-sm text-muted-foreground">{grupo.descricao}</div>
        </div>
      ),
    },
    {
      chave: 'usuarios',
      titulo: 'Usuários',
      ordenavel: true,
      renderizar: (grupo: GrupoPermissao) => (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{grupo.usuarios?.length || 0}</span>
        </div>
      ),
    },
    {
      chave: 'permissoes',
      titulo: 'Permissões',
      renderizar: (grupo: GrupoPermissao) => (
        <div className="flex gap-1 flex-wrap">
          {grupo.permissoes?.slice(0, 3).map((permissao) => (
            <Badge key={permissao.id} variant="outline" className="text-xs">
              {permissao.moduloPai}
            </Badge>
          ))}
          {grupo.permissoes && grupo.permissoes.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{grupo.permissoes.length - 3}
            </Badge>
          )}
        </div>
      ),
    },
    {
      chave: 'ativo',
      titulo: 'Status',
      ordenavel: true,
      filtravel: true,
      tipoFiltro: 'select' as const,
      renderizar: (grupo: GrupoPermissao) => (
        <Badge variant={grupo.ativo ? 'default' : 'secondary'}>
          {grupo.ativo ? 'Ativo' : 'Inativo'}
        </Badge>
      ),
    },
  ];

  const acoes = [
    {
      titulo: 'Editar',
      icone: <Settings className="h-4 w-4" />,
      onClick: (grupo: GrupoPermissao) => navigate(`/configuracoes/grupos/${grupo.id}/editar`),
      variante: 'outline' as const,
    },
    {
      titulo: 'Excluir',
      icone: <Trash2 className="h-4 w-4" />,
      onClick: (grupo: GrupoPermissao) => {
        if (confirm(`Tem certeza que deseja excluir o grupo "${grupo.nome}"?`)) {
          gruposHook.deleteItem(grupo.id);
        }
      },
      variante: 'destructive' as const,
      mostrar: (grupo: GrupoPermissao) => !grupo.usuarios || grupo.usuarios.length === 0,
    },
  ];

  const cardsResumo = [
    {
      titulo: 'Total de Grupos',
      valor: (data: GrupoPermissao[] = []) => Array.isArray(data) ? data.length : 0,
      icone: Shield,
      cor: 'bg-blue-500',
    },
    {
      titulo: 'Grupos Ativos',
      valor: (data: GrupoPermissao[] = []) => Array.isArray(data) ? data.filter(g => g.ativo).length : 0,
      icone: ShieldCheck,
      cor: 'bg-green-500',
    },
    {
      titulo: 'Grupos Inativos',
      valor: (data: GrupoPermissao[] = []) => Array.isArray(data) ? data.filter(g => !g.ativo).length : 0,
      icone: UserX,
      cor: 'bg-red-500',
    },
    {
      titulo: 'Com Usuários',
      valor: (data: GrupoPermissao[] = []) => Array.isArray(data) ? data.filter(g => g.usuarios && g.usuarios.length > 0).length : 0,
      icone: UserCheck,
      cor: 'bg-purple-500',
    },
  ];

  return (
    <Listagem<GrupoPermissao>
      titulo="Grupos de Permissão"
      descricao="Gerencie grupos e perfis de acesso reutilizáveis"
      icone={<Shield className="h-6 w-6" />}
      corModulo={MODULE_COLORS.settings}
      nomeEntidade="Grupo"
      nomeEntidadePlural="Grupos"
      rotaEntidade="/configuracoes/grupos"
      rotaResumo="/configuracoes"
      hook={gruposHook}
      colunas={colunas}
      acoes={acoes}
      botaoCriar={{
        titulo: "Novo Grupo",
        icone: <Plus className="h-4 w-4" />,
        rota: "/configuracoes/grupos/novo"
      }}
      cardsResumo={cardsResumo}
      mostrarExportar={true}
      nomeArquivoExportar="grupos"
      ordenacaoPadrao="nome"
      tamanhoPaginaPadrao={20}
      camposBusca={['nome', 'descricao']}
      placeholderBusca="Buscar grupo..."
    />
  );
};

export default Grupos;
