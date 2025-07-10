
import BaseFormPage from '@/components/BaseFormPage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { MODULE_COLORS } from '@/constants/moduleColors';
import CampoHorario from '@/core/components/CampoHorario';
import CampoTelefone from '@/core/components/CampoTelefone';
import { MapPin } from 'lucide-react';
import { useState } from 'react';

const NovaFilial = () => {
  const [filialData, setFilialData] = useState({
    nome: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    telefone: '',
    ativo: true,
    horarioFuncionamento: {
      segunda: { inicio: '08:00', fim: '22:00', ativo: true },
      terca: { inicio: '08:00', fim: '22:00', ativo: true },
      quarta: { inicio: '08:00', fim: '22:00', ativo: true },
      quinta: { inicio: '08:00', fim: '22:00', ativo: true },
      sexta: { inicio: '08:00', fim: '22:00', ativo: true },
      sabado: { inicio: '08:00', fim: '22:00', ativo: true },
      domingo: { inicio: '08:00', fim: '22:00', ativo: false }
    },
    modulos: {
      eventos: true,
      bar: false,
      escolinha: false,
      financeiro: true
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Salvando filial:', filialData);
    // Aqui faria a chamada para a API
  };

  const diasSemana = [
    { key: 'segunda', label: 'Segunda-feira' },
    { key: 'terca', label: 'Terça-feira' },
    { key: 'quarta', label: 'Quarta-feira' },
    { key: 'quinta', label: 'Quinta-feira' },
    { key: 'sexta', label: 'Sexta-feira' },
    { key: 'sabado', label: 'Sábado' },
    { key: 'domingo', label: 'Domingo' }
  ];

  return (
    <BaseFormPage
      title="Nova Filial"
      description="Cadastre uma nova filial da empresa"
      icon={<MapPin className="h-6 w-6" />}
      moduleColor={MODULE_COLORS.inicio}
      backTo="/configuracoes/empresa"
      backLabel="Empresa"
      onSubmit={handleSubmit}
      submitLabel="Salvar Filial"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
            <CardDescription>
              Dados principais da filial
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Filial *</Label>
                <Input
                  id="nome"
                  value={filialData.nome}
                  onChange={(e) => setFilialData({...filialData, nome: e.target.value})}
                  className="h-11"
                  placeholder="Ex: Filial Centro"
                />
              </div>
              <CampoTelefone
                id="telefone"
                value={filialData.telefone}
                onChange={(value) => setFilialData({...filialData, telefone: value})}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="endereco">Endereço *</Label>
                <Input
                  id="endereco"
                  value={filialData.endereco}
                  onChange={(e) => setFilialData({...filialData, endereco: e.target.value})}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cep">CEP *</Label>
                <Input
                  id="cep"
                  value={filialData.cep}
                  onChange={(e) => setFilialData({...filialData, cep: e.target.value})}
                  className="h-11"
                  placeholder="00000-000"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade *</Label>
                <Input
                  id="cidade"
                  value={filialData.cidade}
                  onChange={(e) => setFilialData({...filialData, cidade: e.target.value})}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado *</Label>
                <Input
                  id="estado"
                  value={filialData.estado}
                  onChange={(e) => setFilialData({...filialData, estado: e.target.value})}
                  className="h-11"
                  maxLength={2}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="ativo"
                checked={filialData.ativo}
                onCheckedChange={(checked) => setFilialData({...filialData, ativo: checked})}
              />
              <Label htmlFor="ativo">Filial ativa</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Horários de Funcionamento</CardTitle>
            <CardDescription>
              Configure os horários de funcionamento da filial
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {diasSemana.map((dia) => (
              <div key={dia.key} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex items-center space-x-2 min-w-[120px]">
                  <Switch
                    checked={filialData.horarioFuncionamento[dia.key].ativo}
                    onCheckedChange={(checked) => 
                      setFilialData({
                        ...filialData,
                        horarioFuncionamento: {
                          ...filialData.horarioFuncionamento,
                          [dia.key]: { ...filialData.horarioFuncionamento[dia.key], ativo: checked }
                        }
                      })
                    }
                  />
                  <Label className="text-sm font-medium">{dia.label}</Label>
                </div>
                
                {filialData.horarioFuncionamento[dia.key].ativo && (
                  <div className="flex items-center gap-4">
                    <CampoHorario
                      id={`${dia.key}-inicio`}
                      label="Abertura"
                      value={filialData.horarioFuncionamento[dia.key].inicio}
                      onChange={(value) => 
                        setFilialData({
                          ...filialData,
                          horarioFuncionamento: {
                            ...filialData.horarioFuncionamento,
                            [dia.key]: { ...filialData.horarioFuncionamento[dia.key], inicio: value }
                          }
                        })
                      }
                    />
                    <CampoHorario
                      id={`${dia.key}-fim`}
                      label="Fechamento"
                      value={filialData.horarioFuncionamento[dia.key].fim}
                      onChange={(value) => 
                        setFilialData({
                          ...filialData,
                          horarioFuncionamento: {
                            ...filialData.horarioFuncionamento,
                            [dia.key]: { ...filialData.horarioFuncionamento[dia.key], fim: value }
                          }
                        })
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Módulos Habilitados</CardTitle>
            <CardDescription>
              Selecione quais módulos estarão disponíveis nesta filial
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="eventos"
                  checked={filialData.modulos.eventos}
                  onCheckedChange={(checked) => 
                    setFilialData({
                      ...filialData,
                      modulos: { ...filialData.modulos, eventos: checked }
                    })
                  }
                />
                <Label htmlFor="eventos">Módulo de Eventos</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="bar"
                  checked={filialData.modulos.bar}
                  onCheckedChange={(checked) => 
                    setFilialData({
                      ...filialData,
                      modulos: { ...filialData.modulos, bar: checked }
                    })
                  }
                />
                <Label htmlFor="bar">Módulo do Bar</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="escolinha"
                  checked={filialData.modulos.escolinha}
                  onCheckedChange={(checked) => 
                    setFilialData({
                      ...filialData,
                      modulos: { ...filialData.modulos, escolinha: checked }
                    })
                  }
                />
                <Label htmlFor="escolinha">Módulo da Escolinha</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="financeiro"
                  checked={filialData.modulos.financeiro}
                  onCheckedChange={(checked) => 
                    setFilialData({
                      ...filialData,
                      modulos: { ...filialData.modulos, financeiro: checked }
                    })
                  }
                />
                <Label htmlFor="financeiro">Módulo Financeiro</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </BaseFormPage>
  );
};

export default NovaFilial;
