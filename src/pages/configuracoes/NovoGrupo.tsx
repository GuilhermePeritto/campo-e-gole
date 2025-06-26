
import BaseFormPage from '@/components/BaseFormPage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Shield } from 'lucide-react';
import { useState } from 'react';

const NovoGrupo = () => {
  const [grupoData, setGrupoData] = useState({
    nome: '',
    descricao: '',
    ativo: true,
    permissoes: {
      eventos: {
        visualizar: false,
        criar: false,
        editar: false,
        excluir: false
      },
      bar: {
        visualizar: false,
        criar: false,
        editar: false,
        excluir: false
      },
      escolinha: {
        visualizar: false,
        criar: false,
        editar: false,
        excluir: false
      },
      financeiro: {
        visualizar: false,
        criar: false,
        editar: false,
        excluir: false
      },
      configuracoes: {
        visualizar: false,
        criar: false,
        editar: false,
        excluir: false
      }
    }
  });

  const handleSave = () => {
    console.log('Salvando grupo:', grupoData);
    // Aqui faria a chamada para a API
  };

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

  const handlePermissaoChange = (modulo: string, acao: string, checked: boolean) => {
    setGrupoData({
      ...grupoData,
      permissoes: {
        ...grupoData.permissoes,
        [modulo]: {
          ...grupoData.permissoes[modulo],
          [acao]: checked
        }
      }
    });
  };

  const toggleModulo = (modulo: string, allChecked: boolean) => {
    const newPermissoes = { ...grupoData.permissoes };
    acoes.forEach(acao => {
      newPermissoes[modulo][acao.key] = allChecked;
    });
    setGrupoData({
      ...grupoData,
      permissoes: newPermissoes
    });
  };

  return (
    <BaseFormPage
      title="Novo Grupo"
      subtitle="Crie um novo grupo de permissões"
      icon={<Shield className="h-6 w-6" />}
      backTo="/configuracoes/grupos"
      onSave={handleSave}
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
                  checked={grupoData.ativo}
                  onCheckedChange={(checked) => setGrupoData({...grupoData, ativo: checked})}
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
            {modulos.map((modulo) => {
              const moduloPermissoes = grupoData.permissoes[modulo.key];
              const allChecked = acoes.every(acao => moduloPermissoes[acao.key]);
              const someChecked = acoes.some(acao => moduloPermissoes[acao.key]);

              return (
                <div key={modulo.key} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{modulo.label}</h4>
                      <p className="text-sm text-muted-foreground">{modulo.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${modulo.key}-all`}
                        checked={allChecked}
                        ref={(ref) => {
                          if (ref) {
                            ref.indeterminate = someChecked && !allChecked;
                          }
                        }}
                        onCheckedChange={(checked) => toggleModulo(modulo.key, checked as boolean)}
                      />
                      <Label htmlFor={`${modulo.key}-all`} className="text-sm font-medium">
                        Todas as permissões
                      </Label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pl-4">
                    {acoes.map((acao) => (
                      <div key={acao.key} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${modulo.key}-${acao.key}`}
                          checked={moduloPermissoes[acao.key]}
                          onCheckedChange={(checked) => 
                            handlePermissaoChange(modulo.key, acao.key, checked as boolean)
                          }
                        />
                        <Label htmlFor={`${modulo.key}-${acao.key}`} className="text-sm">
                          {acao.label}
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
