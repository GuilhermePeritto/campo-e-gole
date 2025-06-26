
import ModuleHeader from '@/components/ModuleHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { toast } from '@/hooks/use-toast';
import { useGrupos } from '@/hooks/useGrupos';
import { useUsuarios } from '@/hooks/useUsuarios';
import { Shield, User, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PermissoesUsuario = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { buscarUsuarioPorId, atualizarUsuario } = useUsuarios();
  const { grupos, permissoes, buscarGrupos, buscarPermissoesPorModulo } = useGrupos();
  
  const [usuario, setUsuario] = useState<any>(null);
  const [grupoSelecionado, setGrupoSelecionado] = useState<number>(0);
  const [permissoesSelecionadas, setPermissoesSelecionadas] = useState<number[]>([]);
  const [usarGrupo, setUsarGrupo] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const permissoesPorModulo = buscarPermissoesPorModulo();

  useEffect(() => {
    if (id) {
      carregarUsuario(parseInt(id));
    }
    buscarGrupos();
  }, [id]);

  const carregarUsuario = async (usuarioId: number) => {
    setLoading(true);
    const usuarioEncontrado = await buscarUsuarioPorId(usuarioId);
    
    if (usuarioEncontrado) {
      setUsuario(usuarioEncontrado);
      setGrupoSelecionado(usuarioEncontrado.grupoId);
      
      if (usuarioEncontrado.permissoesCustomizadas) {
        setPermissoesSelecionadas(usuarioEncontrado.permissoesCustomizadas);
        setUsarGrupo(false);
      } else {
        const grupo = grupos.find(g => g.id === usuarioEncontrado.grupoId);
        setPermissoesSelecionadas(grupo?.permissoes || []);
        setUsarGrupo(true);
      }
    }
    setLoading(false);
  };

  const handleGrupoChange = (grupoId: string) => {
    const id = parseInt(grupoId);
    setGrupoSelecionado(id);
    
    if (usarGrupo) {
      const grupo = grupos.find(g => g.id === id);
      setPermissoesSelecionadas(grupo?.permissoes || []);
    }
  };

  const handlePermissaoToggle = (permissaoId: number) => {
    if (usarGrupo) return; // Não permite edição quando usando grupo
    
    setPermissoesSelecionadas(prev => 
      prev.includes(permissaoId) 
        ? prev.filter(id => id !== permissaoId)
        : [...prev, permissaoId]
    );
  };

  const handleModoPermissaoChange = (usarGrupoPermissoes: boolean) => {
    setUsarGrupo(usarGrupoPermissoes);
    
    if (usarGrupoPermissoes) {
      const grupo = grupos.find(g => g.id === grupoSelecionado);
      setPermissoesSelecionadas(grupo?.permissoes || []);
    }
  };

  const handleSalvar = async () => {
    if (!usuario) return;
    
    setLoading(true);
    
    try {
      const dadosAtualizacao: any = {
        grupoId: grupoSelecionado
      };
      
      if (!usarGrupo) {
        dadosAtualizacao.permissoesCustomizadas = permissoesSelecionadas;
      } else {
        dadosAtualizacao.permissoesCustomizadas = undefined;
      }
      
      await atualizarUsuario(usuario.id, dadosAtualizacao);
      
      toast({
        title: "Permissões atualizadas",
        description: "As permissões do usuário foram atualizadas com sucesso.",
      });
      
      navigate('/configuracoes/usuarios');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar as permissões.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!usuario) {
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
        <div className="container mx-auto p-6">
          <div className="text-center">Carregando...</div>
        </div>
      </div>
    );
  }

  const grupoAtual = grupos.find(g => g.id === grupoSelecionado);

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

      <main className="container mx-auto p-6 max-w-6xl">
        {/* Informações do Usuário */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {usuario.nome}
            </CardTitle>
            <CardDescription>
              {usuario.cargo} • {usuario.email}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Configuração de Permissões */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Configuração de Permissões</CardTitle>
            <CardDescription>
              Configure como as permissões serão aplicadas para este usuário
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Grupo de Permissões</label>
                <Select value={grupoSelecionado.toString()} onValueChange={handleGrupoChange}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Selecione o grupo" />
                  </SelectTrigger>
                  <SelectContent>
                    {grupos.filter(g => g.ativo).map((grupo) => (
                      <SelectItem key={grupo.id} value={grupo.id.toString()}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${grupo.cor}`} />
                          {grupo.nome}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Modo de Permissões</label>
                <div className="flex gap-4 pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={usarGrupo}
                      onChange={() => handleModoPermissaoChange(true)}
                      className="text-primary"
                    />
                    <span className="text-sm">Usar permissões do grupo</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!usarGrupo}
                      onChange={() => handleModoPermissaoChange(false)}
                      className="text-primary"
                    />
                    <span className="text-sm">Permissões customizadas</span>
                  </label>
                </div>
              </div>
            </div>

            {grupoAtual && usarGrupo && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${grupoAtual.cor}`} />
                  <span className="font-medium">{grupoAtual.nome}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{grupoAtual.descricao}</p>
                <p className="text-sm text-orange-600">
                  As permissões serão herdadas automaticamente do grupo selecionado
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lista de Permissões */}
        <div className="space-y-6">
          {Object.entries(permissoesPorModulo).map(([modulo, permissoesModulo]) => (
            <Card key={modulo}>
              <CardHeader>
                <CardTitle className="text-lg">{modulo}</CardTitle>
                <CardDescription>
                  Permissões para o módulo {modulo}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {permissoesModulo.map((permissao) => (
                    <div
                      key={permissao.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg border ${
                        usarGrupo ? 'bg-muted/50' : 'hover:bg-muted/50'
                      }`}
                    >
                      <Checkbox
                        id={`permissao-${permissao.id}`}
                        checked={permissoesSelecionadas.includes(permissao.id)}
                        onCheckedChange={() => handlePermissaoToggle(permissao.id)}
                        disabled={usarGrupo}
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={`permissao-${permissao.id}`}
                          className={`text-sm font-medium ${usarGrupo ? 'cursor-default' : 'cursor-pointer'}`}
                        >
                          {permissao.nome}
                        </label>
                        <p className="text-xs text-muted-foreground">
                          {permissao.descricao}
                        </p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {permissao.acao}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-4 mt-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/configuracoes/usuarios')}
          >
            Cancelar
          </Button>
          <Button onClick={handleSalvar} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Salvando...' : 'Salvar Permissões'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PermissoesUsuario;
