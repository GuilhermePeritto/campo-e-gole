import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import type { MockLocal } from '@/data/mockLocais';
import { Search, MapPin, Users, CheckCircle2, Circle } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

interface ListaLocaisAvancadaProps {
  locais: MockLocal[];
  todosLocais: MockLocal[];
  locaisSelecionados: string[];
  consulta: string;
  eventCountByVenue?: Record<string, number>;
  onAlternarLocal: (localId: string) => void;
  isLocalSelecionado: (localId: string) => boolean;
  onMudancaConsulta: (consulta: string) => void;
  className?: string;
}

const ListaLocaisAvancada = memo(({ 
  locais, 
  todosLocais, 
  locaisSelecionados, 
  consulta, 
  eventCountByVenue = {},
  onAlternarLocal, 
  isLocalSelecionado, 
  onMudancaConsulta,
  className
}: ListaLocaisAvancadaProps) => {
  const [showOnlyWithEvents, setShowOnlyWithEvents] = useState(false);

  const contadorSelecionados = useMemo(() => {
    return locaisSelecionados.includes('all') 
      ? todosLocais.length 
      : locaisSelecionados.length;
  }, [locaisSelecionados, todosLocais.length]);

  const locaisFiltrados = useMemo(() => {
    let filtered = locais;
    
    if (showOnlyWithEvents) {
      filtered = filtered.filter(local => (eventCountByVenue[local.id] || 0) > 0);
    }
    
    return filtered;
  }, [locais, showOnlyWithEvents, eventCountByVenue]);

  const handleSelectAll = () => {
    onAlternarLocal('all');
  };

  const handleClearAll = () => {
    // Desmarcar todos exceto 'all'
    locaisSelecionados.forEach(localId => {
      if (localId !== 'all') {
        onAlternarLocal(localId);
      }
    });
  };

  const todosSelecionados = isLocalSelecionado('all');
  const nenhumSelecionado = locaisSelecionados.length === 0;

  return (
    <div className={cn("flex flex-col h-full min-h-0", className)}>
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Locais</h3>
            <p className="text-xs text-muted-foreground">
              {contadorSelecionados} de {todosLocais.length} selecionado{contadorSelecionados !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <Badge 
          variant="secondary" 
          className="bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20"
        >
          {contadorSelecionados}
        </Badge>
      </div>

      {/* Controles */}
      <div className="space-y-3 mb-4">
        {/* Campo de busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar locais..."
            value={consulta}
            onChange={(e) => onMudancaConsulta(e.target.value)}
            className="pl-10 h-9 bg-background/50 border border-border/50 focus:border-primary/50 transition-all duration-200"
          />
        </div>

        {/* Botões de ação */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSelectAll}
              disabled={todosSelecionados}
              className="h-7 px-3 text-xs hover:bg-primary/10 hover:text-primary"
            >
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Todos
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              disabled={nenhumSelecionado}
              className="h-7 px-3 text-xs hover:bg-destructive/10 hover:text-destructive"
            >
              <Circle className="h-3 w-3 mr-1" />
              Limpar
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowOnlyWithEvents(!showOnlyWithEvents)}
            className={cn(
              "h-7 px-3 text-xs transition-all duration-200",
              showOnlyWithEvents 
                ? "bg-primary/10 text-primary border border-primary/20" 
                : "hover:bg-muted/50"
            )}
          >
            <Users className="h-3 w-3 mr-1" />
            Com eventos
          </Button>
        </div>
      </div>

      {/* Lista de locais - Ocupa todo o espaço restante */}
      <div className="flex-1 min-h-0">
        <div className="bg-gradient-to-br from-card/80 to-card/40 rounded-lg border border-border/50 shadow-sm h-full">
          {/* Opção "Todos os locais" */}
          <div className="p-3 border-b border-border/30">
            <div 
              className={cn(
                "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 cursor-pointer group",
                "hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:border-primary/20 hover:shadow-sm",
                todosSelecionados && "bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 shadow-sm"
              )}
              onClick={() => onAlternarLocal('all')}
            >
              <Checkbox
                id="todos-locais"
                checked={todosSelecionados}
                onCheckedChange={() => onAlternarLocal('all')}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all duration-200"
              />
              <div className="flex items-center space-x-3 flex-1">
                <div className="p-1.5 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform duration-200">
                  <MapPin className="h-3 w-3 text-primary" />
                </div>
                <div className="flex-1">
                  <Label 
                    htmlFor="todos-locais" 
                    className="text-sm font-medium cursor-pointer group-hover:text-primary transition-colors"
                  >
                    Todos os locais
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Exibir eventos de todos os locais
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {todosLocais.length}
              </Badge>
            </div>
          </div>

          {/* Lista scrollável de locais */}
          <ScrollArea className="h-full">
            <div className="p-2 space-y-1">
              {locaisFiltrados.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <div className="p-4 rounded-full bg-muted/30 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <MapPin className="h-6 w-6 opacity-50" />
                  </div>
                  <p className="text-sm font-medium mb-1">Nenhum local encontrado</p>
                  <p className="text-xs opacity-70">
                    {consulta ? 'Tente ajustar sua busca' : 'Nenhum local disponível'}
                  </p>
                </div>
              ) : (
                locaisFiltrados.map((local) => {
                  const isSelected = isLocalSelecionado(local.id);
                  const eventCount = eventCountByVenue[local.id] || 0;
                  
                  return (
                    <div 
                      key={local.id} 
                      className={cn(
                        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 cursor-pointer group",
                        "hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 hover:shadow-sm hover:scale-[1.02]",
                        isSelected && "bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 shadow-sm"
                      )}
                      onClick={() => onAlternarLocal(local.id)}
                    >
                      <Checkbox
                        id={`local-${local.id}`}
                        checked={isSelected}
                        onCheckedChange={() => onAlternarLocal(local.id)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all duration-200"
                      />
                      
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div 
                          className="w-4 h-4 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform duration-200 shadow-sm border border-white/20"
                          style={{ backgroundColor: local.color }}
                        />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <Label 
                              htmlFor={`local-${local.id}`} 
                              className="text-sm font-medium cursor-pointer truncate group-hover:text-primary transition-colors"
                            >
                              {local.name}
                            </Label>
                            {eventCount > 0 && (
                              <Badge 
                                variant="secondary" 
                                className="ml-2 text-xs bg-primary/10 text-primary border-primary/20"
                              >
                                {eventCount}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span className="truncate">{local.type}</span>
                            <span>•</span>
                            <span>R$ {local.hourlyRate}/h</span>
                            {local.capacity && (
                              <>
                                <span>•</span>
                                <span className="flex items-center space-x-1">
                                  <Users className="h-3 w-3" />
                                  <span>{local.capacity}</span>
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
});

ListaLocaisAvancada.displayName = 'ListaLocaisAvancada';

export default ListaLocaisAvancada;