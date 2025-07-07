import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import type { MockLocal } from '@/data/mockLocais';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { memo, useMemo, useState } from 'react';

interface ModernLocationsListProps {
  selectedLocais: string[];
  locais: MockLocal[];
  allLocais: MockLocal[];
  eventCountByVenue?: Record<string, number>;
  onLocalToggle: (localId: string) => void;
  isLocalSelected: (localId: string) => boolean;
  compact?: boolean;
}

const ModernLocationsList = memo(({
  selectedLocais,
  locais,
  allLocais,
  eventCountByVenue = {},
  onLocalToggle,
  isLocalSelected,
  compact = false,
}: ModernLocationsListProps) => {
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  // Filter locais based on search
  const filteredLocais = useMemo(() => {
    if (!localSearchQuery.trim()) return allLocais;
    return allLocais.filter(local =>
      local.name.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
      local.type.toLowerCase().includes(localSearchQuery.toLowerCase())
    );
  }, [allLocais, localSearchQuery]);

  // Verificar se todos estão selecionados
  const todosSelecionados = useMemo(() => {
    return allLocais.length > 0 && allLocais.every(local => isLocalSelected(local.id));
  }, [allLocais, isLocalSelected]);

  // Verificar se alguns estão selecionados
  const algunsSelecionados = useMemo(() => {
    return allLocais.some(local => isLocalSelected(local.id)) && !todosSelecionados;
  }, [allLocais, isLocalSelected, todosSelecionados]);

  // Verificar se nenhum está selecionado
  const nenhumSelecionado = useMemo(() => {
    return allLocais.length > 0 && allLocais.every(local => !isLocalSelected(local.id));
  }, [allLocais, isLocalSelected]);

  // Função para selecionar/desselecionar todos
  const handleToggleAll = () => {
    if (todosSelecionados) {
      // Desselecionar todos - clica em cada local selecionado
      allLocais.forEach(local => {
        if (isLocalSelected(local.id)) {
          onLocalToggle(local.id);
        }
      });
    } else {
      // Selecionar todos - clica em cada local não selecionado
      allLocais.forEach(local => {
        if (!isLocalSelected(local.id)) {
          onLocalToggle(local.id);
        }
      });
    }
  };

  // NOVO VISUAL DOS CARDS DE LOCAIS
  return (
    <div className="flex-1 space-y-3 min-h-0 flex flex-col">
      {/* Card de Filtro */}
      <div className="relative p-2">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filtrar locais..."
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
          className="pl-9 h-9 text-sm border-border/50 bg-white/80"
        />
      </div>
      {localSearchQuery.trim() && (
        <div className="mt-2 text-xs text-muted-foreground">
          {filteredLocais.length} de {allLocais.length} locais
        </div>
      )}

      {/* Lista de Locais */}
      <div className="p-2 space-y-2 flex-1 min-h-0 overflow-y-auto">
        {/* Card branco para selecionar todos */}
        <div
          className={cn(
            "flex items-center gap-3 p-2 rounded-xl shadow-sm transition-colors border border-gray-200 cursor-pointer bg-white",
            todosSelecionados ? "ring-2 ring-primary/40" : "hover:bg-accent/40"
          )}
          onClick={handleToggleAll}
        >
          <Checkbox
            checked={todosSelecionados}
            onCheckedChange={handleToggleAll}
            className="mr-2 flex-shrink-0 border-gray-300 bg-white"
            tabIndex={-1}
            onClick={e => e.stopPropagation()}
          />
          <span className="font-medium text-sm truncate text-gray-700">
            {todosSelecionados ? 'Desselecionar todos' : 'Selecionar todos'}
          </span>
        </div>

        {/* Locais filtrados */}
        {filteredLocais.map((local) => {
          const isSelected = isLocalSelected(local.id);
          return (
            <div
              key={local.id}
              className={cn(
                "flex items-center gap-3 p-2 rounded-xl shadow-sm transition-colors border border-transparent cursor-pointer",
                isSelected ? "ring-2 ring-primary/40 bg-white/90" : "hover:bg-accent/40 bg-white/80"
              )}
              style={{ backgroundColor: local.color }}
              onClick={() => onLocalToggle(local.id)}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onLocalToggle(local.id)}
                className="mr-2 flex-shrink-0 border-white/60 bg-white/80"
                style={{ accentColor: local.color }}
                tabIndex={-1}
                onClick={e => e.stopPropagation()}
              />
              <span className="font-medium text-sm truncate" style={{ color: '#222' }}>{local.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

ModernLocationsList.displayName = 'ModernLocationsList';

export default ModernLocationsList;