
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Listagem } from '@/core/components/listagem';
import { useUsuarios } from '@/hooks/useUsuarios';
import { Usuario } from '@/types/usuario';
import { Building, Mail, Phone, Plus, Settings, Shield, User, UserCheck, Users, UserX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Usuarios = () => {
  const navigate = useNavigate();
  const usuariosHook = useUsuarios();

  const colunas = [
    {
      chave: 'nome',
      titulo: 'Usuário',
      ordenavel: true,
      filtravel: true,
      tipoFiltro: 'select' as const,
      renderizar: (usuario: Usuario) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={usuario.foto} />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{usuario.nome}</div>
            <div className="text-sm text-muted-foreground">{usuario.cargo}</div>
          </div>
        </div>
      ),
    },
    {
      chave: 'email',
      titulo: 'Contato',
      renderizar: (usuario: Usuario) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-3 w-3 text-muted-foreground" />
            <span>{usuario.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-3 w-3 text-muted-foreground" />
            <span>{usuario.telefone}</span>
          </div>
        </div>
      ),
    },
    {
      chave: 'filial',
      titulo: 'Filial',
      ordenavel: true,
      filtravel: true,
      tipoFiltro: 'select' as const,
      renderizar: (usuario: Usuario) => (
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-muted-foreground" />
          <span>{usuario.filial?.nome || 'N/A'}</span>
        </div>
      ),
    },
    {
      chave: 'grupo',
      titulo: 'Grupo',
      ordenavel: true,
      filtravel: true,
      tipoFiltro: 'select' as const,
      renderizar: (usuario: Usuario) => {
        return (
          <div className="flex items-center gap-2">
            {usuario.grupo && (
              <>
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: usuario.grupo?.cor || '#888' }}
                />
                <span>{usuario.grupo?.nome || 'N/A'}</span>
              </>
            )}
          </div>
        );
      },
    },
    {
      chave: 'ativo',
      titulo: 'Status',
      ordenavel: true,
      filtravel: true,
      tipoFiltro: 'select' as const,
      renderizar: (usuario: Usuario) => (
        <Badge variant={usuario.ativo ? 'default' : 'secondary'}>
          {usuario.ativo ? 'Ativo' : 'Inativo'}
        </Badge>
      ),
    },
    {
      chave: 'ultimoAcesso',
      titulo: 'Último Acesso',
      ordenavel: true,
      renderizar: (usuario: Usuario) => (
        <span className="text-sm text-muted-foreground">
          {usuario.ultimoAcesso || 'Nunca'}
        </span>
      ),
    },
  ];

  const acoes = [
    {
      titulo: 'Editar',
      icone: <Settings className="h-4 w-4" />,
      onClick: (usuario: Usuario) => navigate(`/configuracoes/usuarios/${usuario.id}/editar`),
      variante: 'outline' as const,
    },
    {
      titulo: 'Permissões',
      icone: <Shield className="h-4 w-4" />,
      onClick: (usuario: Usuario) => navigate(`/configuracoes/usuarios/${usuario.id}/permissoes`),
      variante: 'outline' as const,
    },
  ];

  const cardsResumo = [
    {
      titulo: 'Total de Usuários',
      valor: (data: Usuario[] = []) => Array.isArray(data) ? data.length : 0,
      icone: Users,
      cor: 'bg-blue-500',
    },
    {
      titulo: 'Usuários Ativos',
      valor: (data: Usuario[] = []) => Array.isArray(data) ? data.filter(u => u.ativo).length : 0,
      icone: UserCheck,
      cor: 'bg-green-500',
    },
    {
      titulo: 'Usuários Inativos',
      valor: (data: Usuario[] = []) => Array.isArray(data) ? data.filter(u => !u.ativo).length : 0,
      icone: UserX,
      cor: 'bg-red-500',
    },
    {
      titulo: 'Com Último Acesso',
      valor: (data: Usuario[] = []) => Array.isArray(data) ? data.filter(u => u.ultimoAcesso).length : 0,
      icone: User,
      cor: 'bg-purple-500',
    },
  ];

  return (
    <Listagem<Usuario>
      titulo="Usuários"
      descricao="Gerencie usuários do sistema e suas permissões"
      icone={<Users className="h-6 w-6" />}
      corModulo={MODULE_COLORS.inicio}
      nomeEntidade="Usuário"
      nomeEntidadePlural="Usuários"
      rotaEntidade="/configuracoes/usuarios"
      rotaResumo="/configuracoes"
      hook={usuariosHook}
      colunas={colunas}
      acoes={acoes}
      botaoCriar={{
        titulo: "Novo Usuário",
        icone: <Plus className="h-4 w-4" />,
        rota: "/configuracoes/usuarios/novo"
      }}
      cardsResumo={cardsResumo}
      mostrarExportar={true}
      nomeArquivoExportar="usuarios"
      ordenacaoPadrao="nome"
      tamanhoPaginaPadrao={20}
      camposBusca={['nome', 'email', 'cargo']}
      placeholderBusca="Buscar usuário..."
    />
  );
};

export default Usuarios;
