
import ModuleHeader from '@/components/ModuleHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MODULE_COLORS } from '@/constants/moduleColors';
import CampoHorario from '@/core/components/CampoHorario';
import CampoValor from '@/core/components/CampoValor';
import { BarChart3, Calendar, DollarSign, GraduationCap, Save, Settings as SettingsIcon } from 'lucide-react';
import { useState } from 'react';

const Parametros = () => {
  const [parametros, setParametros] = useState({
    eventos: {
      horaInicioReservas: '06:00',
      horaFimReservas: '23:00',
      intervaloMinimo: 30,
      antecedenciaMinima: 24,
      antecedenciaMaxima: 90,
      permiteCancelamento: true,
      tempoLimiteCancelamento: 2,
      valorTaxaCancelamento: '10.00',
      reservaRecorrenteDefault: false,
      emailConfirmacao: true,
      whatsappConfirmacao: true
    },
    bar: {
      categoriasProdutos: ['Bebidas', 'Lanches', 'Pratos', 'Sobremesas'],
      percentualImposto: '12.50',
      layoutComanda: 'compacto',
      permiteFiado: false,
      limiteFiado: '100.00',
      desconto: true,
      percentualDescontoMaximo: '15.00',
      impressaoAutomatica: true,
      fecharComandaAutomatico: false
    },
    escolinha: {
      maxAlunosTurma: 15,
      regraInadimplencia: 30,
      toleranciaAtraso: 15,
      notificacaoVencimento: 5,
      descontoIrmao: '10.00',
      descontoPagamentoAntecipado: '5.00',
      bloqueioInadimplencia: true,
      chamadaObrigatoria: true,
      relatorioProfessor: true
    },
    financeiro: {
      planoContas: ['Receitas', 'Despesas Operacionais', 'Investimentos'],
      formasPagamento: ['Dinheiro', 'PIX', 'Cartão Débito', 'Cartão Crédito', 'Boleto'],
      contaBancaria: '001-Banco do Brasil',
      vencimentoPadrao: 30,
      multaAtraso: '2.00',
      jurosAtraso: '0.33',
      notificacaoVencimento: 3,
      relatorioAutomatico: true,
      frequenciaRelatorio: 'mensal'
    }
  });

  const handleSave = () => {
    console.log('Salvando parâmetros:', parametros);
    // Aqui faria a chamada para a API
  };

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Parâmetros dos Módulos"
        icon={<SettingsIcon className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.inicio}
        mustReturn={true}
        backTo="/configuracoes"
        backLabel="Configurações"
      />

      <main className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Parâmetros dos Módulos</h2>
            <p className="text-muted-foreground">
              Configure o comportamento específico de cada módulo do sistema
            </p>
          </div>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>

        <Tabs defaultValue="eventos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="eventos" className="gap-2">
              <Calendar className="h-4 w-4" />
              Eventos
            </TabsTrigger>
            <TabsTrigger value="bar" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Bar
            </TabsTrigger>
            <TabsTrigger value="escolinha" className="gap-2">
              <GraduationCap className="h-4 w-4" />
              Escolinha
            </TabsTrigger>
            <TabsTrigger value="financeiro" className="gap-2">
              <DollarSign className="h-4 w-4" />
              Financeiro
            </TabsTrigger>
          </TabsList>

          <TabsContent value="eventos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Reservas</CardTitle>
                <CardDescription>
                  Parâmetros para o módulo de eventos e reservas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <CampoHorario
                    id="hora-inicio"
                    label="Horário início das reservas"
                    value={parametros.eventos.horaInicioReservas}
                    onChange={(value) => setParametros({
                      ...parametros,
                      eventos: { ...parametros.eventos, horaInicioReservas: value }
                    })}
                  />
                  <CampoHorario
                    id="hora-fim"
                    label="Horário fim das reservas"
                    value={parametros.eventos.horaFimReservas}
                    onChange={(value) => setParametros({
                      ...parametros,
                      eventos: { ...parametros.eventos, horaFimReservas: value }
                    })}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="intervalo">Intervalo mínimo (minutos)</Label>
                    <Input
                      id="intervalo"
                      type="number"
                      value={parametros.eventos.intervaloMinimo}
                      onChange={(e) => setParametros({
                        ...parametros,
                        eventos: { ...parametros.eventos, intervaloMinimo: parseInt(e.target.value) }
                      })}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="antecedencia-min">Antecedência mínima (horas)</Label>
                    <Input
                      id="antecedencia-min"
                      type="number"
                      value={parametros.eventos.antecedenciaMinima}
                      onChange={(e) => setParametros({
                        ...parametros,
                        eventos: { ...parametros.eventos, antecedenciaMinima: parseInt(e.target.value) }
                      })}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="antecedencia-max">Antecedência máxima (dias)</Label>
                    <Input
                      id="antecedencia-max"
                      type="number"
                      value={parametros.eventos.antecedenciaMaxima}
                      onChange={(e) => setParametros({
                        ...parametros,
                        eventos: { ...parametros.eventos, antecedenciaMaxima: parseInt(e.target.value) }
                      })}
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tempo-cancelamento">Tempo limite cancelamento (horas)</Label>
                    <Input
                      id="tempo-cancelamento"
                      type="number"
                      value={parametros.eventos.tempoLimiteCancelamento}
                      onChange={(e) => setParametros({
                        ...parametros,
                        eventos: { ...parametros.eventos, tempoLimiteCancelamento: parseInt(e.target.value) }
                      })}
                      className="h-11"
                      disabled={!parametros.eventos.permiteCancelamento}
                    />
                  </div>
                  <CampoValor
                    id="taxa-cancelamento"
                    label="Taxa de cancelamento"
                    value={parametros.eventos.valorTaxaCancelamento}
                    onChange={(value) => setParametros({
                      ...parametros,
                      eventos: { ...parametros.eventos, valorTaxaCancelamento: value }
                    })}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="permite-cancelamento"
                      checked={parametros.eventos.permiteCancelamento}
                      onCheckedChange={(checked) => setParametros({
                        ...parametros,
                        eventos: { ...parametros.eventos, permiteCancelamento: checked }
                      })}
                    />
                    <Label htmlFor="permite-cancelamento">Permitir cancelamento de reservas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="reserva-recorrente-default"
                      checked={parametros.eventos.reservaRecorrenteDefault}
                      onCheckedChange={(checked) => setParametros({
                        ...parametros,
                        eventos: { ...parametros.eventos, reservaRecorrenteDefault: checked }
                      })}
                    />
                    <Label htmlFor="reserva-recorrente-default">Reserva recorrente como padrão</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="email-confirmacao"
                      checked={parametros.eventos.emailConfirmacao}
                      onCheckedChange={(checked) => setParametros({
                        ...parametros,
                        eventos: { ...parametros.eventos, emailConfirmacao: checked }
                      })}
                    />
                    <Label htmlFor="email-confirmacao">Enviar confirmação por e-mail</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="whatsapp-confirmacao"
                      checked={parametros.eventos.whatsappConfirmacao}
                      onCheckedChange={(checked) => setParametros({
                        ...parametros,
                        eventos: { ...parametros.eventos, whatsappConfirmacao: checked }
                      })}
                    />
                    <Label htmlFor="whatsapp-confirmacao">Enviar confirmação por WhatsApp</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Bar</CardTitle>
                <CardDescription>
                  Parâmetros para comandas, produtos e vendas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <CampoValor
                    id="percentual-imposto"
                    label="Percentual de imposto (%)"
                    value={parametros.bar.percentualImposto}
                    onChange={(value) => setParametros({
                      ...parametros,
                      bar: { ...parametros.bar, percentualImposto: value }
                    })}
                  />
                  <div className="space-y-2">
                    <Label htmlFor="layout-comanda">Layout da comanda</Label>
                    <Select 
                      value={parametros.bar.layoutComanda} 
                      onValueChange={(value) => setParametros({
                        ...parametros,
                        bar: { ...parametros.bar, layoutComanda: value }
                      })}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compacto">Compacto</SelectItem>
                        <SelectItem value="detalhado">Detalhado</SelectItem>
                        <SelectItem value="visual">Visual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <CampoValor
                    id="limite-fiado"
                    label="Limite para fiado"
                    value={parametros.bar.limiteFiado}
                    onChange={(value) => setParametros({
                      ...parametros,
                      bar: { ...parametros.bar, limiteFiado: value }
                    })}
                  />
                  <CampoValor
                    id="desconto-maximo"
                    label="Desconto máximo (%)"
                    value={parametros.bar.percentualDescontoMaximo}
                    onChange={(value) => setParametros({
                      ...parametros,
                      bar: { ...parametros.bar, percentualDescontoMaximo: value }
                    })}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="permite-fiado"
                      checked={parametros.bar.permiteFiado}
                      onCheckedChange={(checked) => setParametros({
                        ...parametros,
                        bar: { ...parametros.bar, permiteFiado: checked }
                      })}
                    />
                    <Label htmlFor="permite-fiado">Permitir vendas fiado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="desconto"
                      checked={parametros.bar.desconto}
                      onCheckedChange={(checked) => setParametros({
                        ...parametros,
                        bar: { ...parametros.bar, desconto: checked }
                      })}
                    />
                    <Label htmlFor="desconto">Permitir desconto</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="impressao-automatica"
                      checked={parametros.bar.impressaoAutomatica}
                      onCheckedChange={(checked) => setParametros({
                        ...parametros,
                        bar: { ...parametros.bar, impressaoAutomatica: checked }
                      })}
                    />
                    <Label htmlFor="impressao-automatica">Impressão automática de comandas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="fechar-comanda-automatico"
                      checked={parametros.bar.fecharComandaAutomatico}
                      onCheckedChange={(checked) => setParametros({
                        ...parametros,
                        bar: { ...parametros.bar, fecharComandaAutomatico: checked }
                      })}
                    />
                    <Label htmlFor="fechar-comanda-automatico">Fechar comanda automaticamente após pagamento</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="escolinha" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações da Escolinha</CardTitle>
                <CardDescription>
                  Parâmetros para alunos, turmas e mensalidades
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="max-alunos">Máximo de alunos por turma</Label>
                    <Input
                      id="max-alunos"
                      type="number"
                      value={parametros.escolinha.maxAlunosTurma}
                      onChange={(e) => setParametros({
                        ...parametros,
                        escolinha: { ...parametros.escolinha, maxAlunosTurma: parseInt(e.target.value) }
                      })}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regra-inadimplencia">Regra inadimplência (dias)</Label>
                    <Input
                      id="regra-inadimplencia"
                      type="number"
                      value={parametros.escolinha.regraInadimplencia}
                      onChange={(e) => setParametros({
                        ...parametros,
                        escolinha: { ...parametros.escolinha, regraInadimplencia: parseInt(e.target.value) }
                      })}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tolerancia-atraso">Tolerância atraso (minutos)</Label>
                    <Input
                      id="tolerancia-atraso"
                      type="number"
                      value={parametros.escolinha.toleranciaAtraso}
                      onChange={(e) => setParametros({
                        ...parametros,
                        escolinha: { ...parametros.escolinha, toleranciaAtraso: parseInt(e.target.value) }
                      })}
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="notificacao-vencimento">Notificação vencimento (dias)</Label>
                    <Input
                      id="notificacao-vencimento"
                      type="number"
                      value={parametros.escolinha.notificacaoVencimento}
                      onChange={(e) => setParametros({
                        ...parametros,
                        escolinha: { ...parametros.escolinha, notificacaoVencimento: parseInt(e.target.value) }
                      })}
                      className="h-11"
                    />
                  </div>
                  <CampoValor
                    id="desconto-irmao"
                    label="Desconto irmão (%)"
                    value={parametros.escolinha.descontoIrmao}
                    onChange={(value) => setParametros({
                      ...parametros,
                      escolinha: { ...parametros.escolinha, descontoIrmao: value }
                    })}
                  />
                  <CampoValor
                    id="desconto-antecipado"
                    label="Desconto pagamento antecipado (%)"
                    value={parametros.escolinha.descontoPagamentoAntecipado}
                    onChange={(value) => setParametros({
                      ...parametros,
                      escolinha: { ...parametros.escolinha, descontoPagamentoAntecipado: value }
                    })}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="bloqueio-inadimplencia"
                      checked={parametros.escolinha.bloqueioInadimplencia}
                      onCheckedChange={(checked) => setParametros({
                        ...parametros,
                        escolinha: { ...parametros.escolinha, bloqueioInadimplencia: checked }
                      })}
                    />
                    <Label htmlFor="bloqueio-inadimplencia">Bloquear acesso em caso de inadimplência</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="chamada-obrigatoria"
                      checked={parametros.escolinha.chamadaObrigatoria}
                      onCheckedChange={(checked) => setParametros({
                        ...parametros,
                        escolinha: { ...parametros.escolinha, chamadaObrigatoria: checked }
                      })}
                    />
                    <Label htmlFor="chamada-obrigatoria">Chamada obrigatória</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="relatorio-professor"
                      checked={parametros.escolinha.relatorioProfessor}
                      onCheckedChange={(checked) => setParametros({
                        ...parametros,
                        escolinha: { ...parametros.escolinha, relatorioProfessor: checked }
                      })}
                    />
                    <Label htmlFor="relatorio-professor">Gerar relatório automático para professores</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financeiro" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Financeiras</CardTitle>
                <CardDescription>
                  Parâmetros para contas, pagamentos e relatórios
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="conta-bancaria">Conta bancária padrão</Label>
                    <Input
                      id="conta-bancaria"
                      value={parametros.financeiro.contaBancaria}
                      onChange={(e) => setParametros({
                        ...parametros,
                        financeiro: { ...parametros.financeiro, contaBancaria: e.target.value }
                      })}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vencimento-padrao">Vencimento padrão (dias)</Label>
                    <Input
                      id="vencimento-padrao"
                      type="number"
                      value={parametros.financeiro.vencimentoPadrao}
                      onChange={(e) => setParametros({
                        ...parametros,
                        financeiro: { ...parametros.financeiro, vencimentoPadrao: parseInt(e.target.value) }
                      })}
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <CampoValor
                    id="multa-atraso"
                    label="Multa por atraso (%)"
                    value={parametros.financeiro.multaAtraso}
                    onChange={(value) => setParametros({
                      ...parametros,
                      financeiro: { ...parametros.financeiro, multaAtraso: value }
                    })}
                  />
                  <CampoValor
                    id="juros-atraso"
                    label="Juros por atraso (% ao dia)"
                    value={parametros.financeiro.jurosAtraso}
                    onChange={(value) => setParametros({
                      ...parametros,
                      financeiro: { ...parametros.financeiro, jurosAtraso: value }
                    })}
                  />
                  <div className="space-y-2">
                    <Label htmlFor="notificacao-vencimento-fin">Notificação vencimento (dias)</Label>
                    <Input
                      id="notificacao-vencimento-fin"
                      type="number"
                      value={parametros.financeiro.notificacaoVencimento}
                      onChange={(e) => setParametros({
                        ...parametros,
                        financeiro: { ...parametros.financeiro, notificacaoVencimento: parseInt(e.target.value) }
                      })}
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="frequencia-relatorio">Frequência relatório automático</Label>
                    <Select 
                      value={parametros.financeiro.frequenciaRelatorio} 
                      onValueChange={(value) => setParametros({
                        ...parametros,
                        financeiro: { ...parametros.financeiro, frequenciaRelatorio: value }
                      })}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="semanal">Semanal</SelectItem>
                        <SelectItem value="mensal">Mensal</SelectItem>
                        <SelectItem value="trimestral">Trimestral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2 mt-8">
                    <Switch
                      id="relatorio-automatico"
                      checked={parametros.financeiro.relatorioAutomatico}
                      onCheckedChange={(checked) => setParametros({
                        ...parametros,
                        financeiro: { ...parametros.financeiro, relatorioAutomatico: checked }
                      })}
                    />
                    <Label htmlFor="relatorio-automatico">Gerar relatório automático</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Parametros;
