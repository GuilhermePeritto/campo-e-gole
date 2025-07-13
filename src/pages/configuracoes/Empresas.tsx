import { Badge } from '@/components/ui/badge';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Listagem } from '@/core/components/listagem';
import { useEmpresas, type Empresa } from '@/hooks/useEmpresas';
import { Building, CheckCircle, Mail, MapPin, Phone, Plus, Settings, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Empresas = () => {
  const navigate = useNavigate();
  const empresasHook = useEmpresas();

  const colunas = [
    {
      chave: 'nome',
      titulo: 'Empresa',
      ordenavel: true,
      filtravel: true,
      tipoFiltro: 'select' as const,
      renderizar: (empresa: Empresa) => (
        <div>
          <div className="font-medium">{empresa.nome}</div>
          <div className="text-sm text-muted-foreground">CNPJ: {empresa.cnpj}</div>
        </div>
      ),
    },
    {
      chave: 'contato',
      titulo: 'Contato',
      renderizar: (empresa: Empresa) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-3 w-3 text-muted-foreground" />
            <span>{empresa.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-3 w-3 text-muted-foreground" />
            <span>{empresa.telefone}</span>
          </div>
        </div>
      ),
    },
    {
      chave: 'endereco',
      titulo: 'Localização',
      renderizar: (empresa: Empresa) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{empresa.cidade} - {empresa.estado}</span>
        </div>
      ),
    },
    {
      chave: 'filiais',
      titulo: 'Filiais',
      ordenavel: true,
      renderizar: (empresa: Empresa) => (
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{empresa.filiais?.length || 0}</span>
        </div>
      ),
    },
    {
      chave: 'ativo',
      titulo: 'Status',
      ordenavel: true,
      filtravel: true,
      tipoFiltro: 'select' as const,
      renderizar: (empresa: Empresa) => (
        <div className="flex items-center gap-2">
          {empresa.ativo ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
          <Badge variant={empresa.ativo ? 'default' : 'secondary'}>
            {empresa.ativo ? 'Ativa' : 'Inativa'}
          </Badge>
        </div>
      ),
    },
  ];

  const acoes = [
    {
      titulo: 'Editar',
      icone: <Settings className="h-4 w-4" />,
      onClick: (empresa: Empresa) => navigate(`/configuracoes/empresas/${empresa.id}/editar`),
      variante: 'outline' as const,
    },
  ];

  const cardsResumo = [
    {
      titulo: 'Total de Empresas',
      valor: (data: Empresa[]) => data.length,
      icone: Building,
      cor: 'bg-blue-500',
    },
    {
      titulo: 'Empresas Ativas',
      valor: (data: Empresa[]) => data.filter(e => e.ativo).length,
      icone: CheckCircle,
      cor: 'bg-green-500',
    },
    {
      titulo: 'Empresas Inativas',
      valor: (data: Empresa[]) => data.filter(e => !e.ativo).length,
      icone: XCircle,
      cor: 'bg-red-500',
    },
    {
      titulo: 'Total de Filiais',
      valor: (data: Empresa[]) => data.reduce((total, empresa) => total + (empresa.filiais?.length || 0), 0),
      icone: MapPin,
      cor: 'bg-purple-500',
    },
  ];

  return (
    <Listagem<Empresa>
      titulo="Empresas"
      descricao="Gerencie as empresas do sistema"
      icone={<Building className="h-6 w-6" />}
      corModulo={MODULE_COLORS.inicio}
      nomeEntidade="Empresa"
      nomeEntidadePlural="Empresas"
      rotaEntidade="/configuracoes/empresas"
      rotaResumo="/configuracoes"
      hook={empresasHook}
      colunas={colunas}
      acoes={acoes}
      botaoCriar={{
        titulo: "Nova Empresa",
        icone: <Plus className="h-4 w-4" />,
        rota: "/configuracoes/empresas/nova"
      }}
      cardsResumo={cardsResumo}
      mostrarExportar={true}
      nomeArquivoExportar="empresas"
      ordenacaoPadrao="nome"
      tamanhoPaginaPadrao={20}
      camposBusca={['nome', 'cnpj', 'email', 'cidade']}
      placeholderBusca="Buscar empresa..."
    />
  );
};

export default Empresas; 