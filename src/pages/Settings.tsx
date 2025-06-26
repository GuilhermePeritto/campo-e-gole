
import ModuleHeader from '@/components/ModuleHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { 
  Building2, 
  Users, 
  Shield, 
  Palette, 
  Plug, 
  DollarSign, 
  FileText, 
  Settings as SettingsIcon,
  ChevronRight,
  MapPin,
  UserCheck,
  Sliders,
  Eye,
  History
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  const configurationSections = [
    {
      id: 'company-branches',
      title: 'Empresa e Filiais',
      description: 'Gerencie dados da empresa, filiais e configurações locais',
      icon: Building2,
      color: 'bg-blue-500',
      items: [
        { name: 'Dados da Empresa', desc: 'CNPJ, endereço, contatos', path: '/configuracoes/empresa' },
        { name: 'Filiais', desc: 'Gestão de filiais e localização', path: '/configuracoes/filiais' },
        { name: 'Horários de Funcionamento', desc: 'Configurar horários por filial', path: '/configuracoes/horarios' }
      ]
    },
    {
      id: 'users-permissions',
      title: 'Usuários e Permissões',
      description: 'Controle de acesso, perfis e gerenciamento de usuários',
      icon: Users,
      color: 'bg-green-500',
      items: [
        { name: 'Usuários', desc: 'Cadastro e gestão de usuários', path: '/configuracoes/usuarios' },
        { name: 'Perfis e Grupos', desc: 'Grupos de permissões e papéis', path: '/configuracoes/grupos' },
        { name: 'Logs de Acesso', desc: 'Histórico de atividades', path: '/configuracoes/logs' }
      ]
    },
    {
      id: 'modules',
      title: 'Parâmetros dos Módulos',
      description: 'Configurações específicas de cada módulo do sistema',
      icon: Sliders,
      color: 'bg-purple-500',
      items: [
        { name: 'Módulo Agenda', desc: 'Horários, regras de reserva', path: '/configuracoes/modulos/agenda' },
        { name: 'Módulo Bar', desc: 'Categorias, impostos, comandas', path: '/configuracoes/modulos/bar' },
        { name: 'Módulo Escola', desc: 'Turmas, inadimplência', path: '/configuracoes/modulos/escola' },
        { name: 'Módulo Financeiro', desc: 'Contas, pagamentos', path: '/configuracoes/modulos/financeiro' }
      ]
    },
    {
      id: 'customization',
      title: 'Personalização Visual',
      description: 'Tema, cores, logo e aparência do sistema',
      icon: Palette,
      color: 'bg-pink-500',
      items: [
        { name: 'Tema e Cores', desc: 'Cores primárias e secundárias', path: '/configuracoes/tema' },
        { name: 'Logo e Marca', desc: 'Upload de logo e imagens', path: '/configuracoes/marca' },
        { name: 'Layout Dashboard', desc: 'Configurar layout inicial', path: '/configuracoes/layout' }
      ]
    },
    {
      id: 'integrations',
      title: 'Integrações',
      description: 'Conexões com serviços externos e APIs',
      icon: Plug,
      color: 'bg-orange-500',
      items: [
        { name: 'Gateways de Pagamento', desc: 'Stripe, PagSeguro, Mercado Pago', path: '/configuracoes/pagamentos' },
        { name: 'WhatsApp Business', desc: 'Notificações automáticas', path: '/configuracoes/whatsapp' },
        { name: 'Google Agenda', desc: 'Sincronização de reservas', path: '/configuracoes/google' },
        { name: 'APIs Fiscais', desc: 'Notas fiscais e boletos', path: '/configuracoes/fiscal' }
      ]
    },
    {
      id: 'financial-global',
      title: 'Financeiro Global',
      description: 'Configurações contábeis e fiscais do sistema',
      icon: DollarSign,
      color: 'bg-emerald-500',
      items: [
        { name: 'Plano de Contas', desc: 'Estrutura contábil', path: '/configuracoes/financeiro/contas' },
        { name: 'Regras Fiscais', desc: 'ISS, ICMS por estado', path: '/configuracoes/financeiro/fiscal' },
        { name: 'Formas de Cobrança', desc: 'Boleto, PIX, cartão', path: '/configuracoes/financeiro/cobranca' },
        { name: 'Relatórios Automáticos', desc: 'Configurar geração', path: '/configuracoes/financeiro/relatorios' }
      ]
    },
    {
      id: 'audit-logs',
      title: 'Auditoria e Logs',
      description: 'Histórico de alterações e monitoramento do sistema',
      icon: History,
      color: 'bg-gray-600',
      items: [
        { name: 'Histórico de Alterações', desc: 'Log completo de mudanças', path: '/configuracoes/auditoria/historico' },
        { name: 'Filtros e Relatórios', desc: 'Análise de atividades', path: '/configuracoes/auditoria/relatorios' },
        { name: 'Exportação de Dados', desc: 'CSV, PDF dos logs', path: '/configuracoes/auditoria/exportacao' }
      ]
    }
  ];

  const handleSectionClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Configurações"
        icon={<SettingsIcon className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.inicio}
        mustReturn={true}
        backTo="/inicio"
        backLabel="Início"
      />

      <main className="container mx-auto p-6 max-w-7xl">
        {/* Header da página */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Configurações do Sistema
          </h1>
          <p className="text-muted-foreground text-lg">
            Gerencie todas as configurações da sua empresa e módulos do sistema
          </p>
        </div>

        {/* Grid de seções de configuração */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {configurationSections.map((section) => {
            const IconComponent = section.icon;
            
            return (
              <Card 
                key={section.id} 
                className="group hover:shadow-lg transition-all duration-300 border-l-4 hover:border-l-8"
                style={{ borderLeftColor: section.color.replace('bg-', '').replace('-500', '') }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className={`p-3 rounded-lg ${section.color} text-white`}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {section.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-2">
                    {section.items.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => handleSectionClick(item.path)}
                        className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent cursor-pointer transition-colors group/item"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.desc}</div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover/item:text-foreground transition-colors" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Seção de acesso rápido */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Acesso Rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate('/configuracoes/usuarios')}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <UserCheck className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">Usuários</div>
                    <div className="text-sm text-muted-foreground">Gestão rápida</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate('/configuracoes/empresa')}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Empresa</div>
                    <div className="text-sm text-muted-foreground">Dados básicos</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate('/configuracoes/tema')}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Palette className="h-5 w-5 text-pink-600" />
                  <div>
                    <div className="font-medium">Tema</div>
                    <div className="text-sm text-muted-foreground">Personalizar</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate('/configuracoes/auditoria/historico')}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-medium">Auditoria</div>
                    <div className="text-sm text-muted-foreground">Ver logs</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Informações do sistema */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="font-semibold text-foreground">Sistema Arena Sports</h3>
              <p className="text-sm text-muted-foreground">
                Versão 2.1.0 • Última atualização: 26 de Junho, 2025
              </p>
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Empresa Ativa: Arena Sports Club</span>
              <span>•</span>
              <span>Filial: Matriz</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
