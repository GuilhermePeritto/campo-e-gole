
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  Calendar, 
  Package, 
  Users, 
  BarChart3, 
  AlertTriangle, 
  Settings,
  Save,
  Banknote,
  ShoppingCart,
  GraduationCap,
  PartyPopper
} from 'lucide-react';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    eventos: {
      controlaRecursos: true,
      recursosPadrao: ['Mesas', 'Cadeiras', 'Som', 'Iluminação'],
      novoRecurso: ''
    },
    bar: {
      controlaEstoque: true,
      estoqueNegativo: false,
      estoqueMinimo: 10,
      quantidadeAviso: 5,
      usaComandas: true,
      categoriaPadrao: 'Bebidas'
    },
    escolinha: {
      diasFuncionamento: ['segunda', 'terca', 'quarta', 'quinta', 'sexta'],
      horarioInicio: '08:00',
      horarioFim: '18:00',
      intervaloAulas: 60,
      limiteTurma: 20
    },
    financeiro: {
      notificarLucro: true,
      notificarPrejuizo: true,
      horarioNotificacao: '18:00',
      metaLucroMensal: 10000,
      alertaPrejuizo: true
    }
  });

  const diasSemana = [
    { id: 'segunda', label: 'Segunda-feira' },
    { id: 'terca', label: 'Terça-feira' },
    { id: 'quarta', label: 'Quarta-feira' },
    { id: 'quinta', label: 'Quinta-feira' },
    { id: 'sexta', label: 'Sexta-feira' },
    { id: 'sabado', label: 'Sábado' },
    { id: 'domingo', label: 'Domingo' }
  ];

  const handleDiaChange = (dia: string, checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      escolinha: {
        ...prev.escolinha,
        diasFuncionamento: checked
          ? [...prev.escolinha.diasFuncionamento, dia]
          : prev.escolinha.diasFuncionamento.filter(d => d !== dia)
      }
    }));
  };

  const adicionarRecurso = () => {
    if (settings.eventos.novoRecurso.trim()) {
      setSettings(prev => ({
        ...prev,
        eventos: {
          ...prev.eventos,
          recursosPadrao: [...prev.eventos.recursosPadrao, prev.eventos.novoRecurso.trim()],
          novoRecurso: ''
        }
      }));
    }
  };

  const removerRecurso = (recurso: string) => {
    setSettings(prev => ({
      ...prev,
      eventos: {
        ...prev.eventos,
        recursosPadrao: prev.eventos.recursosPadrao.filter(r => r !== recurso)
      }
    }));
  };

  const handleSave = () => {
    console.log('Salvando configurações:', settings);
    toast({
      title: "Configurações salvas",
      description: "As configurações do sistema foram atualizadas com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-full mb-4">
          <Settings className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Configurações do Sistema
        </h1>
        <p className="text-muted-foreground mt-2">
          Configure os módulos específicos da aplicação
        </p>
      </div>

      {/* Eventos */}
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-card to-card/50">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center">
              <PartyPopper className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Módulo Eventos</CardTitle>
              <CardDescription>Configurações para gestão de eventos e recursos</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium">Controlar Recursos</Label>
              <p className="text-sm text-muted-foreground">Ativar controle de recursos para eventos</p>
            </div>
            <Switch
              checked={settings.eventos.controlaRecursos}
              onCheckedChange={(checked) => 
                setSettings(prev => ({
                  ...prev,
                  eventos: { ...prev.eventos, controlaRecursos: checked }
                }))
              }
            />
          </div>

          {settings.eventos.controlaRecursos && (
            <div className="space-y-4 pt-4 border-t">
              <Label className="text-base font-medium">Recursos Padrão</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Adicionar novo recurso..."
                  value={settings.eventos.novoRecurso}
                  onChange={(e) => 
                    setSettings(prev => ({
                      ...prev,
                      eventos: { ...prev.eventos, novoRecurso: e.target.value }
                    }))
                  }
                  onKeyPress={(e) => e.key === 'Enter' && adicionarRecurso()}
                />
                <Button onClick={adicionarRecurso} variant="outline">
                  Adicionar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {settings.eventos.recursosPadrao.map((recurso) => (
                  <Badge key={recurso} variant="secondary" className="cursor-pointer" onClick={() => removerRecurso(recurso)}>
                    {recurso} ×
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bar */}
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-card to-card/50">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Módulo Bar</CardTitle>
              <CardDescription>Configurações para controle de estoque e vendas</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Controlar Estoque</Label>
                  <p className="text-sm text-muted-foreground">Ativar controle de estoque</p>
                </div>
                <Switch
                  checked={settings.bar.controlaEstoque}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({
                      ...prev,
                      bar: { ...prev.bar, controlaEstoque: checked }
                    }))
                  }
                />
              </div>

              {settings.bar.controlaEstoque && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">Estoque Negativo</Label>
                      <p className="text-sm text-muted-foreground">Permitir vendas com estoque negativo</p>
                    </div>
                    <Switch
                      checked={settings.bar.estoqueNegativo}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          bar: { ...prev.bar, estoqueNegativo: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Estoque Mínimo</Label>
                    <Input
                      type="number"
                      value={settings.bar.estoqueMinimo}
                      onChange={(e) => 
                        setSettings(prev => ({
                          ...prev,
                          bar: { ...prev.bar, estoqueMinimo: parseInt(e.target.value) || 0 }
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Quantidade para Aviso</Label>
                    <Input
                      type="number"
                      value={settings.bar.quantidadeAviso}
                      onChange={(e) => 
                        setSettings(prev => ({
                          ...prev,
                          bar: { ...prev.bar, quantidadeAviso: parseInt(e.target.value) || 0 }
                        }))
                      }
                    />
                  </div>
                </>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Usar Comandas</Label>
                  <p className="text-sm text-muted-foreground">Sistema de comandas para controle</p>
                </div>
                <Switch
                  checked={settings.bar.usaComandas}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({
                      ...prev,
                      bar: { ...prev.bar, usaComandas: checked }
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Categoria Padrão</Label>
                <Input
                  value={settings.bar.categoriaPadrao}
                  onChange={(e) => 
                    setSettings(prev => ({
                      ...prev,
                      bar: { ...prev.bar, categoriaPadrao: e.target.value }
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Escolinha */}
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-card to-card/50">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Módulo Escolinha</CardTitle>
              <CardDescription>Configurações para gestão escolar</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <Label className="text-base font-medium">Dias de Funcionamento</Label>
                <div className="space-y-2">
                  {diasSemana.map((dia) => (
                    <div key={dia.id} className="flex items-center space-x-2">
                      <Checkbox
                        checked={settings.escolinha.diasFuncionamento.includes(dia.id)}
                        onCheckedChange={(checked) => handleDiaChange(dia.id, checked as boolean)}
                      />
                      <Label className="text-sm">{dia.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Horário de Início</Label>
                <Input
                  type="time"
                  value={settings.escolinha.horarioInicio}
                  onChange={(e) => 
                    setSettings(prev => ({
                      ...prev,
                      escolinha: { ...prev.escolinha, horarioInicio: e.target.value }
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Horário de Fim</Label>
                <Input
                  type="time"
                  value={settings.escolinha.horarioFim}
                  onChange={(e) => 
                    setSettings(prev => ({
                      ...prev,
                      escolinha: { ...prev.escolinha, horarioFim: e.target.value }
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Intervalo entre Aulas (minutos)</Label>
                <Input
                  type="number"
                  value={settings.escolinha.intervaloAulas}
                  onChange={(e) => 
                    setSettings(prev => ({
                      ...prev,
                      escolinha: { ...prev.escolinha, intervaloAulas: parseInt(e.target.value) || 0 }
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Limite de Alunos por Turma</Label>
                <Input
                  type="number"
                  value={settings.escolinha.limiteTurma}
                  onChange={(e) => 
                    setSettings(prev => ({
                      ...prev,
                      escolinha: { ...prev.escolinha, limiteTurma: parseInt(e.target.value) || 0 }
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financeiro */}
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-card to-card/50">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
              <Banknote className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Módulo Financeiro</CardTitle>
              <CardDescription>Configurações para controle financeiro e notificações</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Notificar Lucro</Label>
                  <p className="text-sm text-muted-foreground">Notificação diária de lucro</p>
                </div>
                <Switch
                  checked={settings.financeiro.notificarLucro}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({
                      ...prev,
                      financeiro: { ...prev.financeiro, notificarLucro: checked }
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Notificar Prejuízo</Label>
                  <p className="text-sm text-muted-foreground">Notificação diária de prejuízo</p>
                </div>
                <Switch
                  checked={settings.financeiro.notificarPrejuizo}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({
                      ...prev,
                      financeiro: { ...prev.financeiro, notificarPrejuizo: checked }
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Alerta de Prejuízo</Label>
                  <p className="text-sm text-muted-foreground">Alerta imediato em caso de prejuízo</p>
                </div>
                <Switch
                  checked={settings.financeiro.alertaPrejuizo}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({
                      ...prev,
                      financeiro: { ...prev.financeiro, alertaPrejuizo: checked }
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Horário das Notificações</Label>
                <Input
                  type="time"
                  value={settings.financeiro.horarioNotificacao}
                  onChange={(e) => 
                    setSettings(prev => ({
                      ...prev,
                      financeiro: { ...prev.financeiro, horarioNotificacao: e.target.value }
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Meta de Lucro Mensal (R$)</Label>
                <Input
                  type="number"
                  value={settings.financeiro.metaLucroMensal}
                  onChange={(e) => 
                    setSettings(prev => ({
                      ...prev,
                      financeiro: { ...prev.financeiro, metaLucroMensal: parseFloat(e.target.value) || 0 }
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleSave}
          className="px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};

export default SystemSettings;
