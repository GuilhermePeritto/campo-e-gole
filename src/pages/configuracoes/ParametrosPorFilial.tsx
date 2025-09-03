
import BaseList from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import { Badge } from '@/components/ui/badge';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { useFiliais } from '@/hooks/useFiliais';
import { Phone, Settings } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Filial {
  id: string;
  nome: string;
  endereco?: string;
  cidade?: string;
  telefone?: string;
  situacao: 'Ativo' | 'Inativo';
  modulos?: {
    eventos?: boolean;
    bar?: boolean;
    escolinha?: boolean;
    financeiro?: boolean;
  };
}

const ParametrosPorFilial = () => {
  const navigate = useNavigate();
  const { filiais, loading, fetchFiliais } = useFiliais();
  
  useEffect(() => {
    fetchFiliais({ limit: 100 });
  }, [fetchFiliais]);

  const columns = [
    {
      key: 'nome',
      label: 'Filial',
      sortable: true,
      render: (filial: Filial) => (
        <div>
          <div className="font-medium">{filial.nome}</div>
          <div className="text-sm text-muted-foreground">
            {filial.endereco && filial.cidade ? `${filial.endereco}, ${filial.cidade}` : 'Endereço não informado'}
          </div>
        </div>
      ),
    },
    {
      key: 'telefone',
      label: 'Telefone',
      render: (filial: Filial) => (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{filial.telefone || 'Não informado'}</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (filial: Filial) => (
        <Badge variant={filial.situacao === 'Ativo' ? 'default' : 'secondary'}>
          {filial.situacao === 'Ativo' ? 'Ativa' : 'Inativa'}
        </Badge>
      ),
    },
    {
      key: 'modulos',
      label: 'Módulos Ativos',
      render: (filial: Filial) => (
        <div className="flex gap-1 flex-wrap">
          {filial.modulos?.eventos && <Badge variant="outline" className="text-xs">Eventos</Badge>}
          {filial.modulos?.bar && <Badge variant="outline" className="text-xs">Bar</Badge>}
          {filial.modulos?.escolinha && <Badge variant="outline" className="text-xs">Escolinha</Badge>}
          {filial.modulos?.financeiro && <Badge variant="outline" className="text-xs">Financeiro</Badge>}
          {!filial.modulos?.eventos && !filial.modulos?.bar && !filial.modulos?.escolinha && !filial.modulos?.financeiro && (
            <span className="text-sm text-muted-foreground">Nenhum módulo configurado</span>
          )}
        </div>
      ),
    },
  ];

  const actions = [
    {
      label: 'Configurar',
      icon: <Settings className="h-4 w-4" />,
      onClick: (filial: Filial) => navigate(`/configuracoes/parametros/${filial.id}`),
      variant: 'default' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Parâmetros por Filial"
        icon={<Settings className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.inicio}
        mustReturn={true}
        backTo="/configuracoes"
        backLabel="Configurações"
      />

      <main className="container mx-auto p-6">
        <BaseList
          data={filiais}
          columns={columns}
          actions={actions}
          title="Configurar Parâmetros por Filial"
          description="Selecione uma filial para configurar os parâmetros específicos dos módulos"
          searchPlaceholder="Buscar filial..."
          searchFields={['nome', 'endereco', 'cidade']}
          getItemId={(filial) => filial.id}
          showExport={false}
          loading={loading}
        />
      </main>
    </div>
  );
};

export default ParametrosPorFilial;
