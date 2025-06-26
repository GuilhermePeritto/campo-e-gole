
import ModuleHeader from '@/components/ModuleHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Globe, Save, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import { useState } from 'react';

const Integracoes = () => {
  const [integracoes, setIntegracoes] = useState({
    pagSeguro: {
      ativo: false,
      email: '',
      token: '',
      ambiente: 'sandbox'
    },
    mercadoPago: {
      ativo: true,
      publicKey: 'TEST-123456789',
      accessToken: '',
      ambiente: 'producao'
    },
    whatsapp: {
      ativo: true,
      token: '',
      telefone: '5511999999999',
      mensagemReserva: 'Sua reserva foi confirmada para {data} às {hora}.',
      mensagemLembrete: 'Lembrete: você tem uma reserva hoje às {hora}.'
    },
    googleCalendar: {
      ativo: false,
      clientId: '',
      clientSecret: '',
      calendarioId: ''
    },
    nfe: {
      ativo: false,
      certificado: '',
      ambiente: 'homologacao'
    }
  });

  const handleSave = () => {
    console.log('Salvando integrações:', integracoes);
    // Aqui faria a chamada para a API
  };

  const statusIntegracao = (ativo: boolean) => {
    return ativo ? (
      <div className="flex items-center gap-2 text-green-600">
        <CheckCircle className="h-4 w-4" />
        <span className="text-sm font-medium">Conectado</span>
      </div>
    ) : (
      <div className="flex items-center gap-2 text-orange-600">
        <AlertCircle className="h-4 w-4" />
        <span className="text-sm font-medium">Desconectado</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Integrações"
        icon={<Globe className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.inicio}
        mustReturn={true}
        backTo="/configuracoes"
        backLabel="Configurações"
      />

      <main className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Integrações</h2>
            <p className="text-muted-foreground">
              Conecte o sistema com serviços externos para automatizar processos
            </p>
          </div>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>

        <div className="grid gap-6">
          {/* Gateways de Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle>Gateways de Pagamento</CardTitle>
              <CardDescription>
                Configure os métodos de pagamento aceitos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* PagSeguro */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">PS</span>
                    </div>
                    <div>
                      <h4 className="font-medium">PagSeguro</h4>
                      <p className="text-sm text-muted-foreground">Gateway de pagamento brasileiro</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {statusIntegracao(integracoes.pagSeguro.ativo)}
                    <Switch
                      checked={integracoes.pagSeguro.ativo}
                      onCheckedChange={(checked) => 
                        setIntegracoes({
                          ...integracoes,
                          pagSeguro: { ...integracoes.pagSeguro, ativo: checked }
                        })
                      }
                    />
                  </div>
                </div>
                
                {integracoes.pagSeguro.ativo && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="pagseguro-email">E-mail PagSeguro</Label>
                      <Input
                        id="pagseguro-email"
                        type="email"
                        value={integracoes.pagSeguro.email}
                        onChange={(e) => setIntegracoes({
                          ...integracoes,
                          pagSeguro: { ...integracoes.pagSeguro, email: e.target.value }
                        })}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pagseguro-token">Token</Label>
                      <Input
                        id="pagseguro-token"
                        type="password"
                        value={integracoes.pagSeguro.token}
                        onChange={(e) => setIntegracoes({
                          ...integracoes,
                          pagSeguro: { ...integracoes.pagSeguro, token: e.target.value }
                        })}
                        className="h-11"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Mercado Pago */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-white">MP</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Mercado Pago</h4>
                      <p className="text-sm text-muted-foreground">Solução completa de pagamentos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {statusIntegracao(integracoes.mercadoPago.ativo)}
                    <Switch
                      checked={integracoes.mercadoPago.ativo}
                      onCheckedChange={(checked) => 
                        setIntegracoes({
                          ...integracoes,
                          mercadoPago: { ...integracoes.mercadoPago, ativo: checked }
                        })
                      }
                    />
                  </div>
                </div>
                
                {integracoes.mercadoPago.ativo && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="mp-public-key">Public Key</Label>
                      <Input
                        id="mp-public-key"
                        value={integracoes.mercadoPago.publicKey}
                        onChange={(e) => setIntegracoes({
                          ...integracoes,
                          mercadoPago: { ...integracoes.mercadoPago, publicKey: e.target.value }
                        })}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mp-access-token">Access Token</Label>
                      <Input
                        id="mp-access-token"
                        type="password"
                        value={integracoes.mercadoPago.accessToken}
                        onChange={(e) => setIntegracoes({
                          ...integracoes,
                          mercadoPago: { ...integracoes.mercadoPago, accessToken: e.target.value }
                        })}
                        className="h-11"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* WhatsApp Business */}
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Business</CardTitle>
              <CardDescription>
                Envio automático de mensagens de confirmação e lembretes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-white">WA</span>
                    </div>
                    <div>
                      <h4 className="font-medium">WhatsApp Business API</h4>
                      <p className="text-sm text-muted-foreground">Comunicação direta com clientes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {statusIntegracao(integracoes.whatsapp.ativo)}
                    <Switch
                      checked={integracoes.whatsapp.ativo}
                      onCheckedChange={(checked) => 
                        setIntegracoes({
                          ...integracoes,
                          whatsapp: { ...integracoes.whatsapp, ativo: checked }
                        })
                      }
                    />
                  </div>
                </div>
                
                {integracoes.whatsapp.ativo && (
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="whatsapp-token">Token da API</Label>
                        <Input
                          id="whatsapp-token"
                          type="password"
                          value={integracoes.whatsapp.token}
                          onChange={(e) => setIntegracoes({
                            ...integracoes,
                            whatsapp: { ...integracoes.whatsapp, token: e.target.value }
                          })}
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="whatsapp-telefone">Número do WhatsApp</Label>
                        <Input
                          id="whatsapp-telefone"
                          value={integracoes.whatsapp.telefone}
                          onChange={(e) => setIntegracoes({
                            ...integracoes,
                            whatsapp: { ...integracoes.whatsapp, telefone: e.target.value }
                          })}
                          className="h-11"
                          placeholder="5511999999999"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mensagem-reserva">Mensagem de Confirmação de Reserva</Label>
                      <Input
                        id="mensagem-reserva"
                        value={integracoes.whatsapp.mensagemReserva}
                        onChange={(e) => setIntegracoes({
                          ...integracoes,
                          whatsapp: { ...integracoes.whatsapp, mensagemReserva: e.target.value }
                        })}
                        className="h-11"
                      />
                      <p className="text-xs text-muted-foreground">
                        Use {'{data}'} para a data e {'{hora}'} para o horário
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Google Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Calendários Externos</CardTitle>
              <CardDescription>
                Sincronize reservas com calendários externos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-white">GC</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Google Calendar</h4>
                      <p className="text-sm text-muted-foreground">Sincronização de eventos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {statusIntegracao(integracoes.googleCalendar.ativo)}
                    <Switch
                      checked={integracoes.googleCalendar.ativo}
                      onCheckedChange={(checked) => 
                        setIntegracoes({
                          ...integracoes,
                          googleCalendar: { ...integracoes.googleCalendar, ativo: checked }
                        })
                      }
                    />
                  </div>
                </div>
                
                {integracoes.googleCalendar.ativo && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="google-client-id">Client ID</Label>
                      <Input
                        id="google-client-id"
                        value={integracoes.googleCalendar.clientId}
                        onChange={(e) => setIntegracoes({
                          ...integracoes,
                          googleCalendar: { ...integracoes.googleCalendar, clientId: e.target.value }
                        })}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="google-calendar-id">Calendar ID</Label>
                      <Input
                        id="google-calendar-id"
                        value={integracoes.googleCalendar.calendarioId}
                        onChange={(e) => setIntegracoes({
                          ...integracoes,
                          googleCalendar: { ...integracoes.googleCalendar, calendarioId: e.target.value }
                        })}
                        className="h-11"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Integracoes;
