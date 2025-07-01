
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
    <div className="espaco-y-4">
      <div className="flex items-center justify-between">
        <h3 className="texto-sm fonte-semibold texto-principal flex items-center espaco-x-2">
          <MapPin className="h-4 w-4" />
          <span>Locais</span>
        </h3>
        <Badge variant="secondary" className="texto-xs">
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
          className="pl-10 h-9 fundo-fundo/50 borda borda-divisor/30 foco:borda-primario/50"
        />
      </div>

      {/* Lista de locais com scroll próprio */}
      <div className="fundo-cartao/30 rounded-lg borda borda-divisor/30 p-2">
        {/* Opção "Todos os locais" */}
        <div className="flex items-center espaco-x-3 p-3 rounded-lg hover:bg-accent/60 transition-all duration-200 cursor-pointer">
          <Checkbox
            id="todos-locais"
            checked={isLocalSelecionado('all')}
            onCheckedChange={() => onAlternarLocal('all')}
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <Label htmlFor="todos-locais" className="texto-sm fonte-medio cursor-pointer flex-1">
            Todos os locais
          </Label>
        </div>

        {/* Lista scrollável de locais */}
        <ScrollArea className="h-64 pr-2">
          <div className="espaco-y-1">
            {locais.length === 0 ? (
              <div className="text-center py-8 texto-mutado">
                <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="texto-sm">Nenhum local encontrado</p>
                <p className="texto-xs opacity-70">Tente ajustar sua busca</p>
              </div>
            ) : (
              locais.map((local) => (
                <div 
                  key={local.id} 
                  className="flex items-center espaco-x-3 p-3 rounded-lg hover:bg-accent/60 transition-all duration-200 cursor-pointer grupo"
                >
                  <Checkbox
                    id={`local-${local.id}`}
                    checked={isLocalSelecionado(local.id)}
                    onCheckedChange={() => onAlternarLocal(local.id)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <div className="flex items-center espaco-x-3 flex-1 cursor-pointer">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0 grupo-hover:scale-110 transition-transform duration-200 shadow-sm"
                      style={{ backgroundColor: local.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <Label 
                        htmlFor={`local-${local.id}`} 
                        className="texto-sm fonte-medio cursor-pointer block truncate grupo-hover:texto-primario transition-colors"
                      >
                        {local.name}
                      </Label>
                      <p className="texto-xs texto-mutado truncate flex items-center espaco-x-2">
                        <span>{local.type}</span>
                        <span>•</span>
                        <span>R$ {local.hourlyRate}/h</span>
                      </p>
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
