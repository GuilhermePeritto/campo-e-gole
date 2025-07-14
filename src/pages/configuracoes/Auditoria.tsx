import ModuleHeader from '@/components/ModuleHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Activity, Calendar, FileText, Filter, Search, User } from 'lucide-react';
import { useEffect, useState } from 'react';
// import { useAuditoria } from '@/hooks/useAuditoria';

const Auditoria = () => {
  // const { logs, loading, buscarLogs, buscarEstatisticas, exportarLogs } = useAuditoria();
  const [estatisticas, setEstatisticas] = useState({
    acoesHoje: 0,
    usuariosAtivos: 0,
    erros: 0,
    acoesEstaSemana: 0
  });
  
  const [filtros, setFiltros] = useState({
    usuario: '',
    modulo: '',
    acao: '',
    dataInicio: '',
    dataFim: '',
    status: ''
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    // await buscarLogs();
    // const stats = await buscarEstatisticas();
    // setEstatisticas(stats);
  };

  const aplicarFiltros = async () => {
    const filtrosLimpos = Object.fromEntries(
      Object.entries(filtros).filter(([_, value]) => value !== '')
    );
    // await buscarLogs(filtrosLimpos);
  };

  const limparFiltros = async () => {
    setFiltros({
      usuario: '',
      modulo: '',
      acao: '',
      dataInicio: '',
      dataFim: '',
      status: ''
    });
    // await buscarLogs();
  };

  const columns = [
    {
      key: 'dataHora',
      label: 'Data/Hora',
      sortable: true,
      render: (log: any) => (
        <div className="text-sm">
          <div className="font-medium">{log.dataHora.split(' ')[0]}</div>
          <div className="text-muted-foreground">{log.dataHora.split(' ')[1]}</div>
        </div>
      ),
    },
    {
      key: 'usuario',
      label: 'Usuário',
      sortable: true,
      render: (log: any) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{log.usuario}</span>
        </div>
      ),
    },
    {
      key: 'modulo',
      label: 'Módulo',
      sortable: true,
      render: (log: any) => (
        <Badge variant="outline">{log.modulo}</Badge>
      ),
    },
    {
      key: 'acao',
      label: 'Ação',
      sortable: true,
      render: (log: any) => (
        <span className="font-medium">{log.acao}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (log: any) => {
        const variants = {
          sucesso: 'default',
          erro: 'destructive',
          aviso: 'secondary'
        } as const;
        
        return (
          <Badge variant={variants[log.status as keyof typeof variants]}>
            {log.status}
          </Badge>
        );
      },
    },
    {
      key: 'ip',
      label: 'IP',
      sortable: true,
      render: (log: any) => (
        <span className="font-mono text-sm text-muted-foreground">{log.ip}</span>
      ),
    },
    {
      key: 'detalhes',
      label: 'Detalhes',
      render: (log: any) => (
        <span className="text-sm text-muted-foreground">{log.detalhes}</span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Auditoria e Logs"
        icon={<FileText className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.settings}
        mustReturn={true}
        backTo="/configuracoes"
        backLabel="Configurações"
      />

      <main className="container mx-auto p-6">
        {/* Estatísticas Rápidas */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Activity className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ações Hoje</p>
                  <p className="text-2xl font-bold">{estatisticas.acoesHoje}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Usuários Ativos</p>
                  <p className="text-2xl font-bold">{estatisticas.usuariosAtivos}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FileText className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Erros</p>
                  <p className="text-2xl font-bold">{estatisticas.erros}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Esta Semana</p>
                  <p className="text-2xl font-bold">{estatisticas.acoesEstaSemana}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros de Auditoria
            </CardTitle>
            <CardDescription>
              Filtre os logs por usuário, módulo, ação ou período
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
              <div className="space-y-2">
                <Label htmlFor="filtro-usuario">Usuário</Label>
                <Input
                  id="filtro-usuario"
                  value={filtros.usuario}
                  onChange={(e) => setFiltros({...filtros, usuario: e.target.value})}
                  placeholder="Nome do usuário"
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="filtro-modulo">Módulo</Label>
                <Select value={filtros.modulo} onValueChange={(value) => setFiltros({...filtros, modulo: value})}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os módulos</SelectItem>
                    <SelectItem value="Eventos">Eventos</SelectItem>
                    <SelectItem value="Bar">Bar</SelectItem>
                    <SelectItem value="Escolinha">Escolinha</SelectItem>
                    <SelectItem value="Financeiro">Financeiro</SelectItem>
                    <SelectItem value="Configurações">Configurações</SelectItem>
                    <SelectItem value="Autenticação">Autenticação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="filtro-status">Status</Label>
                <Select value={filtros.status} onValueChange={(value) => setFiltros({...filtros, status: value})}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os status</SelectItem>
                    <SelectItem value="sucesso">Sucesso</SelectItem>
                    <SelectItem value="erro">Erro</SelectItem>
                    <SelectItem value="aviso">Aviso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="data-inicio">Data Início</Label>
                <Input
                  id="data-inicio"
                  type="date"
                  value={filtros.dataInicio}
                  onChange={(e) => setFiltros({...filtros, dataInicio: e.target.value})}
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="data-fim">Data Fim</Label>
                <Input
                  id="data-fim"
                  type="date"
                  value={filtros.dataFim}
                  onChange={(e) => setFiltros({...filtros, dataFim: e.target.value})}
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Ações</Label>
                <div className="flex gap-2">
                  <Button onClick={aplicarFiltros} size="sm" className="h-11">
                    <Search className="h-4 w-4 mr-2" />
                    Filtrar
                  </Button>
                  <Button onClick={limparFiltros} variant="outline" size="sm" className="h-11">
                    Limpar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Logs */}
        {/* <BaseList
          data={logs}
          columns={columns}
          title="Logs de Auditoria"
          description="Histórico completo de atividades do sistema"
          searchPlaceholder="Buscar nos logs..."
          searchFields={['usuario', 'acao', 'modulo', 'detalhes']}
          getItemId={(log) => log.id}
          createButton={{
            label: 'Exportar Logs',
            icon: <Download className="h-4 w-4" />,
            onClick: () => exportarLogs('csv'),
          }}
          showExport={true}
          exportFilename="logs-auditoria"
        /> */}
      </main>
    </div>
  );
};

export default Auditoria;
