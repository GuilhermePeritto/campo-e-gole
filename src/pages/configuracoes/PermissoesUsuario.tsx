
import ModuleHeader from '@/components/ModuleHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { useUsuarios } from '@/hooks/useUsuarios';
import { useGrupos } from '@/hooks/useGrupos';
import { Shield, User, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PermissoesUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUsuarioById, updateUsuario } = useUsuarios();
  const { grupos } = useGrupos();
  
  const [usuario, setUsuario] = useState<any>(null);
  const [grupoSelecionado, setGrupoSelecionado] = useState<string>('');
  const [permissoesCustomizadas, setPermissoesCustomizadas] = useState<any>({});
  const [modoPersonalizado, setModoPersonalizado] = useState(false);

  useEffect(() => {
    if (id) {
      const usuarioData = getUsuarioById(parseInt(id));
      if (usuarioData) {
        setUsuario(usuarioData);
        setGrupoSelecionado(usuarioData.grupoId.toString());
      }
    }
  }, [id, getUsuarioById]);

  const modulos = [
    { key: 'eventos', label: 'Eventos', description: 'Reservas e agenda' },
    { key: 'bar', label: 'Bar', description: 'Comandas e vendas' },
    { key: 'escolinha', label: 'Escolinha', description: 'Alunos e turmas' },
    { key: 'financeiro', label: 'Financeiro', description: 'Contas e relatórios' },
    { key: 'configuracoes', label: 'Configurações', description: 'Administração do sistema' }
  ];

  const acoes = [
    { key: 'visualizar', label: 'Visualizar' },
    { key: 'criar', label: 'Criar' },
    { key: 'editar', label: 'Editar' },
    { key: 'excluir', label: 'Excluir' }
  ];

  const grupoSelecionadoData = grupos.find(g => g.id.toString() === grupoSelecionado);

  const handleGrupoChange = (grupoId: string) => {
    setGrupoSelecionado(grupoId);
    setModoPersonalizado(false);
    setPermissoesCustomizadas({});
  };

  const handlePermissaoCustomChange = (modulo: string, acao: string, checked: boolean) => {
    if (!modoPersonalizado) {
      setModoPersonalizado(true);
      // Inicializar com permissões do grupo atual
      const permissoesIniciais: any = {};
      if (grupoSelecionadoData) {
        grupoSelecionadoData.permissoes.forEach(p => {
          permissoesIniciais[p.modulo] = {
            visualizar: p.visualizar,
            criar: p.criar,
            editar: p.editar,
            excluir: p.excluir
          };
        });
      }
      setPermissoesCustomizadas(permissoesIniciais);
    }

    setPermissoesCustomizadas((prev: any) => ({
      ...prev,
      [modulo]: {
        ...prev[modulo],
        [acao]: checked
      }
    }));
  };

  const handleSave = () => {
    if (usuario) {
      updateUsuario(usuario.id, {
        grupoId: parseInt(grupoSelecionado)
      });
      navigate('/configuracoes/usuarios');
    }
  };

  const getPermissaoAtual = (modulo: string, acao: string) => {
    if (modoPersonalizado && permissoesCustomizadas[modulo]) {
      return permissoesCustomizadas[modulo][acao];
    }
    
    if (grupoSelecionadoData) {
      const permissao = grupoSelecionadoData.permissoes.find(p => p.modulo === modulo);
      return permissao ? permissao[acao as keyof typeof permissao] : false;
    }
    
    return false;
  };

  if (!usuario) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Permissões do Usuário"
        icon={<Shield className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.inicio}
        mustReturn={true}
        backTo="/configuracoes/usuarios"
        backLabel="Usuários"
      />

      <main className="container mx-auto p-6 max-w-4xl">
        {/* Informações do Usuário */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={usuario.avatar} />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-lg font-semibold">{usuario.nome}</div>
                <div className="text-sm text-muted-foreground">{usuario.email}</div>
              </div>
            </CardTitle>
            <CardDescription>
              Configure as permissões específicas para este usuário
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Seleção de Grupo */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Grupo de Permissões</CardTitle>
            <CardDescription>
              Selecione um grupo predefinido ou personalize as permissões
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Grupo</Label>
              <Select value={grupoSelecionado} onValueChange={handleGrupoChange}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Selecione um grupo" />
                </SelectTrigger>
                <SelectContent>
                  {grupos.map((grupo) => (
                    <SelectItem key={grupo.id} value={grupo.id.toString()}>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span>{grupo.nome}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {grupoSelecionadoData && (
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">{grupoSelecionadoData.nome}</h4>
                <p className="text-sm text-muted-foreground mb-3">{grupoSelecionadoData.descricao}</p>
                <div className="flex flex-wrap gap-2">
                  {grupoSelecionadoData.permissoes.map((permissao) => {
                    const acoesPermitidas = acoes.filter(acao => 
                      permissao[acao.key as keyof typeof permissao]
                    );
                    
                    if (acoesPermitidas.length > 0) {
                      return (
                        <Badge key={permissao.modulo} variant="outline" className="text-xs">
                          {permissao.modulo}: {acoesPermitidas.map(a => a.label).join(', ')}
                        </Badge>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}

            {modoPersonalizado && (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2 text-orange-700">
                  <Shield className="h-4 w-4" />
                  <span className="font-medium">Modo Personalizado Ativo</span>
                </div>
                <p className="text-sm text-orange-600 mt-1">
                  Você está editando permissões personalizadas para este usuário
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Permissões Detalhadas */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Permissões Detalhadas</CardTitle>
            <CardDescription>
              Visualize e edite as permissões específicas por módulo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {modulos.map((modulo) => (
              <div key={modulo.key} className="border rounded-lg p-4 space-y-4">
                <div>
                  <h4 className="font-medium">{modulo.label}</h4>
                  <p className="text-sm text-muted-foreground">{modulo.description}</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {acoes.map((acao) => (
                    <div key={acao.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${modulo.key}-${acao.key}`}
                        checked={getPermissaoAtual(modulo.key, acao.key)}
                        onCheckedChange={(checked) => 
                          handlePermissaoCustomChange(modulo.key, acao.key, checked as boolean)
                        }
                      />
                      <Label htmlFor={`${modulo.key}-${acao.key}`} className="text-sm">
                        {acao.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/configuracoes/usuarios')}
          >
            Cancelar
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Salvar Permissões
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PermissoesUsuario;
