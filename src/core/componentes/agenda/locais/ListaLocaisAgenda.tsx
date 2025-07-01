
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { MockLocal } from '@/data/mockLocais';
import { Search, MapPin } from 'lucide-react';
import { memo, useMemo } from 'react';

interface ListaLocaisAgendaProps {
  locais: MockLocal[];
  todosLocais: MockLocal[];
  locaisSelecionados: string[];
  consulta: string;
  onAlternarLocal: (localId: string) => void;
  isLocalSelecionado: (localId: string) => boolean;
  onMudancaConsulta: (consulta: string) => void;
}

const ListaLocaisAgenda = memo(({ 
  locais, 
  todosLocais, 
  locaisSelecionados, 
  consulta, 
  onAlternarLocal, 
  isLocalSelecionado, 
  onMudancaConsulta 
}: ListaLocaisAgendaProps) => {
  const contadorSelecionados = useMemo(() => {
    return locaisSelecionados.includes('all') 
      ? todosLocais.length 
      : locaisSelecionados.length;
  }, [locaisSelecionados, todosLocais.length]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center space-x-2">
          <MapPin className="h-4 w-4" />
          <span>Locais</span>
        </h3>
        <Badge variant="secondary" className="text-xs">
          {contadorSelecionados} selecionado{contadorSelecionados !== 1 ? 's' : ''}
        </Badge>
      </div>

      {/* Campo de busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar locais..."
          value={consulta}
          onChange={(e) => onMudancaConsulta(e.target.value)}
          className="pl-10 h-9 bg-background/50 border border-border/30 focus:border-primary/50"
        />
      </div>

      {/* Container da lista com scroll próprio */}
      <div className="bg-card/30 rounded-lg border border-border/30 overflow-hidden">
        {/* Opção "Todos os locais" */}
        <div className="p-3 border-b border-border/20">
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/60 transition-all duration-200 cursor-pointer group">
            <Checkbox
              id="todos-locais"
              checked={isLocalSelecionado('all')}
              onCheckedChange={() => onAlternarLocal('all')}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label htmlFor="todos-locais" className="text-sm font-medium cursor-pointer flex-1 group-hover:text-primary transition-colors">
              Todos os locais
            </Label>
            <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              {todosLocais.length}
            </div>
          </div>
        </div>

        {/* Lista scrollável de locais */}
        <ScrollArea className="max-h-64">
          <div className="p-2 space-y-1">
            {locais.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Nenhum local encontrado</p>
                <p className="text-xs opacity-70">Tente ajustar sua busca</p>
              </div>
            ) : (
              locais.map((local) => (
                <div 
                  key={local.id} 
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/60 transition-all duration-200 cursor-pointer group"
                  onClick={() => onAlternarLocal(local.id)}
                >
                  <Checkbox
                    id={`local-${local.id}`}
                    checked={isLocalSelecionado(local.id)}
                    onCheckedChange={() => onAlternarLocal(local.id)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <div className="flex items-center space-x-3 flex-1 cursor-pointer">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform duration-200 shadow-sm ring-1 ring-black/10"
                      style={{ backgroundColor: local.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <Label 
                        htmlFor={`local-${local.id}`} 
                        className="text-sm font-medium cursor-pointer block truncate group-hover:text-primary transition-colors"
                      >
                        {local.name}
                      </Label>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span className="truncate">{local.type}</span>
                        <span className="text-muted-foreground/60">•</span>
                        <span className="font-medium text-primary/80">R$ {local.hourlyRate}/h</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
});

ListaLocaisAgenda.displayName = 'ListaLocaisAgenda';

export default ListaLocaisAgenda;
