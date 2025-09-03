
import BaseFormPage from '@/components/BaseFormPage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { useGruposPermissoes } from '@/hooks/useGruposPermissoes';
import { usePermissoes } from '@/hooks/usePermissoes';
import { Permissao } from '@/types/permissao';
import { Shield } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const NovoGrupo = () => {
  const navigate = useNavigate();
  const gruposHook = useGruposPermissoes();
  const permissoesHook = usePermissoes();
  
  const [grupoData, setGrupoData] = useState({
    nome: '',
    descricao: '',
    situacao: 'Ativo' as const,
  });

  const [permissoesDisponiveis, setPermissoesDisponiveis] = useState<Permissao[]>([]);
  const [permissoesSelecionadas, setPermissoesSelecionadas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const checkboxRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Carregar permissões disponíveis
  useEffect(() => {
    const carregarPermissoes = async () => {
      try {
        const permissoes = await permissoesHook.getPermissoesForSearch();
        // Buscar permissões completas
        await permissoesHook.fetchData({ limit: 1000 });
        // Garantir que é um array antes de usar
        const permissoesData = Array.isArray(permissoesHook.data) ? permissoesHook.data : [];
        setPermissoesDisponiveis(permissoesData);
      } catch (error) {
        console.error('Erro ao carregar permissões:', error);
        toast.error('Erro ao carregar permissões disponíveis');
      }
    };

    carregarPermissoes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!grupoData.nome.trim()) {
      toast.error('Nome do grupo é obrigatório');
      return;
    }

    setLoading(true);
    try {
      const dadosGrupo = {
        nome: grupoData.nome,
        descricao: grupoData.descricao,
        situacao: grupoData.situacao,
        // Aqui você pode adicionar as permissões selecionadas se a API suportar
        // permissoesIds: permissoesSelecionadas
      };

      await gruposHook.createGrupo(dadosGrupo);
      toast.success('Grupo criado com sucesso!');
      navigate('/configuracoes/grupos');
    } catch (error) {
      console.error('Erro ao criar grupo:', error);
      toast.error('Erro ao criar grupo');
    } finally {
      setLoading(false);
    }
  };

  // Agrupar permissões por módulo
  const permissoesPorModulo = permissoesDisponiveis.reduce((acc, permissao) => {
    const modulo = permissao.moduloPai;
    if (!acc[modulo]) {
      acc[modulo] = [];
    }
    acc[modulo].push(permissao);
    return acc;
  }, {} as Record<string, Permissao[]>);

  const handlePermissaoChange = (permissaoId: string, checked: boolean) => {
    if (checked) {
      setPermissoesSelecionadas(prev => [...prev, permissaoId]);
    } else {
      setPermissoesSelecionadas(prev => prev.filter(id => id !== permissaoId));
    }
  };

  const toggleModulo = (modulo: string, allChecked: boolean) => {
    const permissoesModulo = permissoesPorModulo[modulo] || [];
    const idsModulo = permissoesModulo.map(p => p.id);
    
    if (allChecked) {
      setPermissoesSelecionadas(prev => [...new Set([...prev, ...idsModulo])]);
    } else {
      setPermissoesSelecionadas(prev => prev.filter(id => !idsModulo.includes(id)));
    }
  };

  // Effect to update indeterminate state
  useEffect(() => {
    Object.keys(permissoesPorModulo).forEach((modulo) => {
      const permissoesModulo = permissoesPorModulo[modulo] || [];
      const idsModulo = permissoesModulo.map(p => p.id);
      const allChecked = idsModulo.every(id => permissoesSelecionadas.includes(id));
      const someChecked = idsModulo.some(id => permissoesSelecionadas.includes(id));
      
      const checkboxElement = checkboxRefs.current[`${modulo}-all`];
      if (checkboxElement) {
        const buttonElement = checkboxElement.querySelector('button');
        if (buttonElement) {
          (buttonElement as any).indeterminate = someChecked && !allChecked;
        }
      }
    });
  }, [permissoesSelecionadas, permissoesPorModulo]);

  return (
    <BaseFormPage
      title="Novo Grupo"
      description="Crie um novo grupo de permissões"
      icon={<Shield className="h-6 w-6" />}
      moduleColor={MODULE_COLORS.settings}
      backTo="/configuracoes/grupos"
      backLabel="Grupos"
      onSubmit={handleSubmit}
      submitLabel="Salvar Grupo"
      loading={loading}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
            <CardDescription>
              Dados básicos do grupo de permissões
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Grupo *</Label>
                <Input
                  id="nome"
                  value={grupoData.nome}
                  onChange={(e) => setGrupoData({...grupoData, nome: e.target.value})}
                  className="h-11"
                  placeholder="Ex: Administrador, Atendente"
                />
              </div>
              <div className="flex items-center space-x-2 mt-8">
                <Switch
                  id="ativo"
                  checked={grupoData.situacao === 'Ativo'}
                  onCheckedChange={(checked) => setGrupoData({...grupoData, situacao: checked ? 'Ativo' : 'Inativo'})}
                />
                <Label htmlFor="ativo">Grupo ativo</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                value={grupoData.descricao}
                onChange={(e) => setGrupoData({...grupoData, descricao: e.target.value})}
                placeholder="Descreva as responsabilidades deste grupo"
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permissões por Módulo</CardTitle>
            <CardDescription>
              Configure as permissões específicas para cada módulo do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(permissoesPorModulo).map(([modulo, permissoes]) => {
              const idsModulo = permissoes.map(p => p.id);
              const allChecked = idsModulo.every(id => permissoesSelecionadas.includes(id));
              const someChecked = idsModulo.some(id => permissoesSelecionadas.includes(id));

              return (
                <div key={modulo} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{modulo}</h4>
                      <p className="text-sm text-muted-foreground">
                        {permissoes.length} permissão{permissoes.length !== 1 ? 'ões' : ''} disponível{permissoes.length !== 1 ? 'eis' : ''}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div ref={(el) => { checkboxRefs.current[`${modulo}-all`] = el; }}>
                        <Checkbox
                          id={`${modulo}-all`}
                          checked={allChecked}
                          onCheckedChange={(checked) => toggleModulo(modulo, checked as boolean)}
                        />
                      </div>
                      <Label htmlFor={`${modulo}-all`} className="text-sm font-medium">
                        Todas as permissões
                      </Label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4">
                    {permissoes.map((permissao) => (
                      <div key={permissao.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`permissao-${permissao.id}`}
                          checked={permissoesSelecionadas.includes(permissao.id)}
                          onCheckedChange={(checked) => 
                            handlePermissaoChange(permissao.id, checked as boolean)
                          }
                        />
                        <Label htmlFor={`permissao-${permissao.id}`} className="text-sm">
                          <div>
                            <div className="font-medium">{permissao.nome}</div>
                            {permissao.submodulo && (
                              <div className="text-xs text-muted-foreground">
                                {permissao.submodulo}
                              </div>
                            )}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </BaseFormPage>
  );
};

export default NovoGrupo;
