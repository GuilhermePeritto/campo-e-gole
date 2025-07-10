import ModuleHeader from '@/components/ModuleHeader';
import { ConfiguracaoListagem, ListagemProvider, useListagem } from './ListagemContext';
import { ListagemFiltros } from './ListagemFiltros';
import { ListagemResumo } from './ListagemResumo';
import { ListagemTabela } from './ListagemTabela';

interface PropsListagem<T> extends ConfiguracaoListagem<T> {}

// Componente interno que usa o contexto
function ListagemInterna<T>() {
  const { config } = useListagem<T>();
  
  return (
    <div className="h-screen bg-background flex flex-col">
      <ModuleHeader
        title={config.titulo}
        icon={config.icone}
        moduleColor={config.corModulo}
        mustReturn={true}
      />
      
      <main className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 xl:px-12 pt-6 pb-3 overflow-hidden">
        <div className="flex flex-col h-full space-y-6">          
          {/* Cards de resumo - AGORA PRIMEIRO */}
          {config.cardsResumo && config.cardsResumo.length > 0 && (
            <div className="flex-shrink-0">
              <ListagemResumo />
            </div>
          )}

          {/* Cabeçalho e descrição */}
          <div className="flex-shrink-0">
            <h2 className="text-2xl font-bold tracking-tight">
              Gerenciar {config.nomeEntidadePlural}
            </h2>
            {config.descricao && (
              <p className="text-muted-foreground mt-1">
                {config.descricao}
              </p>
            )}
          </div>
          
          {/* Filtros e controles - AGORA DEPOIS DO RESUMO */}
          <div className="flex-shrink-0">
            <ListagemFiltros />
          </div>
          
          {/* Tabela */}
          <div className="flex-1 min-h-0">
            <ListagemTabela />
          </div>
        </div>
      </main>
    </div>
  );
}

// Componente principal que provê o contexto
export function Listagem<T extends Record<string, any>>(props: PropsListagem<T>) {
  return (
    <ListagemProvider configuracao={props}>
      <ListagemInterna<T> />
    </ListagemProvider>
  );
} 