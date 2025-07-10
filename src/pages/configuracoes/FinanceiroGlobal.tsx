
import ModuleHeader from '@/components/ModuleHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { MODULE_COLORS } from '@/constants/moduleColors';
import CampoValor from '@/core/components/CampoValor';
import { DollarSign, Plus, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';

const FinanceiroGlobal = () => {
  const [configuracoes, setConfiguracoes] = useState({
    planoContas: [
      { id: 1, codigo: '1.1.001', nome: 'Receitas de Eventos', tipo: 'receita' },
      { id: 2, codigo: '1.1.002', nome: 'Receitas do Bar', tipo: 'receita' },
      { id: 3, codigo: '1.1.003', nome: 'Receitas da Escolinha', tipo: 'receita' },
      { id: 4, codigo: '2.1.001', nome: 'Salários e Encargos', tipo: 'despesa' },
      { id: 5, codigo: '2.1.002', nome: 'Aluguel e Condomínio', tipo: 'despesa' },
      { id: 6, codigo: '2.1.003', nome: 'Energia Elétrica', tipo: 'despesa' }
    ],
    formasPagamento: [
      { id: 1, nome: 'Dinheiro', ativo: true, taxa: '0' },
      { id: 2, nome: 'PIX', ativo: true, taxa: '0' },
      { id: 3, nome: 'Cartão Débito', ativo: true, taxa: '2.5' },
      { id: 4, nome: 'Cartão Crédito', ativo: true, taxa: '3.8' },
      { id: 5, nome: 'Boleto', ativo: true, taxa: '2.9' }
    ],
    impostos: {
      iss: '5.0',
      cofins: '3.0',
      pis: '0.65',
      csll: '1.0',
      irpj: '1.2'
    },
    configuracoesFiscais: {
      estado: 'SP',
      municipio: 'São Paulo',
      regimeTributario: 'simples',
      certificadoDigital: false,
      nfeAutomatica: false
    }
  });

  const [novoPlano, setNovoPlano] = useState({ codigo: '', nome: '', tipo: 'receita' });
  const [novaFormaPagamento, setNovaFormaPagamento] = useState({ nome: '', taxa: '0' });

  const handleSave = () => {
    console.log('Salvando configurações financeiras:', configuracoes);
    // Aqui faria a chamada para a API
  };

  const adicionarPlanoContas = () => {
    if (novoPlano.codigo && novoPlano.nome) {
      setConfiguracoes({
        ...configuracoes,
        planoContas: [
          ...configuracoes.planoContas,
          {
            id: Date.now(),
            ...novoPlano
          }
        ]
      });
      setNovoPlano({ codigo: '', nome: '', tipo: 'receita' });
    }
  };

  const removerPlanoContas = (id: number) => {
    setConfiguracoes({
      ...configuracoes,
      planoContas: configuracoes.planoContas.filter(plano => plano.id !== id)
    });
  };

  const adicionarFormaPagamento = () => {
    if (novaFormaPagamento.nome) {
      setConfiguracoes({
        ...configuracoes,
        formasPagamento: [
          ...configuracoes.formasPagamento,
          {
            id: Date.now(),
            ativo: true,
            ...novaFormaPagamento
          }
        ]
      });
      setNovaFormaPagamento({ nome: '', taxa: '0' });
    }
  };

  const removerFormaPagamento = (id: number) => {
    setConfiguracoes({
      ...configuracoes,
      formasPagamento: configuracoes.formasPagamento.filter(forma => forma.id !== id)
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Financeiro Global"
        icon={<DollarSign className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.inicio}
        mustReturn={true}
        backTo="/configuracoes"
        backLabel="Configurações"
      />

      <main className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Configurações Financeiras Globais</h2>
            <p className="text-muted-foreground">
              Configure parâmetros fiscais, contábeis e formas de pagamento
            </p>
          </div>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>

        <div className="space-y-6">
          {/* Plano de Contas */}
          <Card>
            <CardHeader>
              <CardTitle>Plano de Contas Contábil</CardTitle>
              <CardDescription>
                Configure as contas para organização contábil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="novo-codigo">Código</Label>
                  <Input
                    id="novo-codigo"
                    value={novoPlano.codigo}
                    onChange={(e) => setNovoPlano({...novoPlano, codigo: e.target.value})}
                    className="h-11"
                    placeholder="1.1.001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="novo-nome">Nome da Conta</Label>
                  <Input
                    id="novo-nome"
                    value={novoPlano.nome}
                    onChange={(e) => setNovoPlano({...novoPlano, nome: e.target.value})}
                    className="h-11"
                    placeholder="Ex: Receitas de Eventos"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="novo-tipo">Tipo</Label>
                  <Select value={novoPlano.tipo} onValueChange={(value) => setNovoPlano({...novoPlano, tipo: value})}>
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="receita">Receita</SelectItem>
                      <SelectItem value="despesa">Despesa</SelectItem>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="passivo">Passivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={adicionarPlanoContas} className="w-full h-11">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg">
                <div className="grid grid-cols-4 gap-4 p-3 bg-muted/30 font-medium text-sm">
                  <span>Código</span>
                  <span>Nome da Conta</span>
                  <span>Tipo</span>
                  <span className="text-center">Ações</span>
                </div>
                {configuracoes.planoContas.map((conta) => (
                  <div key={conta.id} className="grid grid-cols-4 gap-4 p-3 border-t text-sm">
                    <span className="font-mono">{conta.codigo}</span>
                    <span>{conta.nome}</span>
                    <span className="capitalize">{conta.tipo}</span>
                    <div className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removerPlanoContas(conta.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Formas de Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle>Formas de Pagamento</CardTitle>
              <CardDescription>
                Configure os métodos de pagamento aceitos e suas taxas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="nova-forma-nome">Nome</Label>
                  <Input
                    id="nova-forma-nome"
                    value={novaFormaPagamento.nome}
                    onChange={(e) => setNovaFormaPagamento({...novaFormaPagamento, nome: e.target.value})}
                    className="h-11"
                    placeholder="Ex: Transferência Bancária"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nova-forma-taxa">Taxa (%)</Label>
                  <Input
                    id="nova-forma-taxa"
                    value={novaFormaPagamento.taxa}
                    onChange={(e) => setNovaFormaPagamento({...novaFormaPagamento, taxa: e.target.value})}
                    className="h-11"
                    placeholder="0.00"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={adicionarFormaPagamento} className="w-full h-11">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg">
                <div className="grid grid-cols-4 gap-4 p-3 bg-muted/30 font-medium text-sm">
                  <span>Nome</span>
                  <span>Taxa (%)</span>
                  <span>Status</span>
                  <span className="text-center">Ações</span>
                </div>
                {configuracoes.formasPagamento.map((forma) => (
                  <div key={forma.id} className="grid grid-cols-4 gap-4 p-3 border-t text-sm items-center">
                    <span>{forma.nome}</span>
                    <span>{forma.taxa}%</span>
                    <div>
                      <Switch
                        checked={forma.ativo}
                        onCheckedChange={(checked) => 
                          setConfiguracoes({
                            ...configuracoes,
                            formasPagamento: configuracoes.formasPagamento.map(f => 
                              f.id === forma.id ? {...f, ativo: checked} : f
                            )
                          })
                        }
                      />
                    </div>
                    <div className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removerFormaPagamento(forma.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Impostos e Taxas */}
          <Card>
            <CardHeader>
              <CardTitle>Impostos e Taxas</CardTitle>
              <CardDescription>
                Configure as alíquotas de impostos aplicáveis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <CampoValor
                  id="iss"
                  label="ISS (%)"
                  value={configuracoes.impostos.iss}
                  onChange={(value) => setConfiguracoes({
                    ...configuracoes,
                    impostos: { ...configuracoes.impostos, iss: value }
                  })}
                />
                <CampoValor
                  id="cofins"
                  label="COFINS (%)"
                  value={configuracoes.impostos.cofins}
                  onChange={(value) => setConfiguracoes({
                    ...configuracoes,
                    impostos: { ...configuracoes.impostos, cofins: value }
                  })}
                />
                <CampoValor
                  id="pis"
                  label="PIS (%)"
                  value={configuracoes.impostos.pis}
                  onChange={(value) => setConfiguracoes({
                    ...configuracoes,
                    impostos: { ...configuracoes.impostos, pis: value }
                  })}
                />
                <CampoValor
                  id="csll"
                  label="CSLL (%)"
                  value={configuracoes.impostos.csll}
                  onChange={(value) => setConfiguracoes({
                    ...configuracoes,
                    impostos: { ...configuracoes.impostos, csll: value }
                  })}
                />
                <CampoValor
                  id="irpj"
                  label="IRPJ (%)"
                  value={configuracoes.impostos.irpj}
                  onChange={(value) => setConfiguracoes({
                    ...configuracoes,
                    impostos: { ...configuracoes.impostos, irpj: value }
                  })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Configurações Fiscais */}
          <Card>
            <CardHeader>
              <CardTitle>Configurações Fiscais</CardTitle>
              <CardDescription>
                Parâmetros para emissão de notas fiscais e compliance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Select 
                    value={configuracoes.configuracoesFiscais.estado} 
                    onValueChange={(value) => setConfiguracoes({
                      ...configuracoes,
                      configuracoesFiscais: { ...configuracoes.configuracoesFiscais, estado: value }
                    })}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      <SelectItem value="MG">Minas Gerais</SelectItem>
                      <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="municipio">Município</Label>
                  <Input
                    id="municipio"
                    value={configuracoes.configuracoesFiscais.municipio}
                    onChange={(e) => setConfiguracoes({
                      ...configuracoes,
                      configuracoesFiscais: { ...configuracoes.configuracoesFiscais, municipio: e.target.value }
                    })}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regime">Regime Tributário</Label>
                  <Select 
                    value={configuracoes.configuracoesFiscais.regimeTributario} 
                    onValueChange={(value) => setConfiguracoes({
                      ...configuracoes,
                      configuracoesFiscais: { ...configuracoes.configuracoesFiscais, regimeTributario: value }
                    })}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simples">Simples Nacional</SelectItem>
                      <SelectItem value="lucro_presumido">Lucro Presumido</SelectItem>
                      <SelectItem value="lucro_real">Lucro Real</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="certificado-digital"
                    checked={configuracoes.configuracoesFiscais.certificadoDigital}
                    onCheckedChange={(checked) => setConfiguracoes({
                      ...configuracoes,
                      configuracoesFiscais: { ...configuracoes.configuracoesFiscais, certificadoDigital: checked }
                    })}
                  />
                  <Label htmlFor="certificado-digital">Possui certificado digital A1/A3</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="nfe-automatica"
                    checked={configuracoes.configuracoesFiscais.nfeAutomatica}
                    onCheckedChange={(checked) => setConfiguracoes({
                      ...configuracoes,
                      configuracoesFiscais: { ...configuracoes.configuracoesFiscais, nfeAutomatica: checked }
                    })}
                  />
                  <Label htmlFor="nfe-automatica">Emissão automática de NF-e</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default FinanceiroGlobal;
