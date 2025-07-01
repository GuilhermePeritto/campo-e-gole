
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { MockLocal } from '@/data/mockLocais';
import { Search } from 'lucide-react';

interface FiltroLocaisProps {
  locais: MockLocal[];
  allLocais: MockLocal[];
  selectedLocais: string[];
  searchQuery: string;
  onLocalToggle: (localId: string) => void;
  isLocalSelected: (localId: string) => boolean;
  onSearchChange: (query: string) => void;
}

const FiltroLocais = ({ 
  locais, 
  allLocais, 
  selectedLocais, 
  searchQuery, 
  onLocalToggle, 
  isLocalSelected, 
  onSearchChange 
}: FiltroLocaisProps) => {
  const selectedCount = selectedLocais.includes('all') 
    ? allLocais.length 
    : selectedLocais.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Locais</h3>
        <Badge variant="secondary" className="text-xs">
          {selectedCount} selecionado{selectedCount !== 1 ? 's' : ''}
        </Badge>
      </div>

      {/* Campo de busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar locais..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-9"
        />
      </div>

      {/* Lista de locais */}
      <ScrollArea className="h-80 pr-4">
        <div className="space-y-3">
          {/* Opção "Todos os locais" */}
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
            <Checkbox
              id="all-locais"
              checked={isLocalSelected('all')}
              onCheckedChange={() => onLocalToggle('all')}
            />
            <Label htmlFor="all-locais" className="text-sm font-medium cursor-pointer flex-1">
              Todos os locais
            </Label>
          </div>

          {/* Lista filtrada de locais */}
          {locais.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">Nenhum local encontrado</p>
            </div>
          ) : (
            locais.map((local) => (
              <div 
                key={local.id} 
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <Checkbox
                  id={`local-${local.id}`}
                  checked={isLocalSelected(local.id)}
                  onCheckedChange={() => onLocalToggle(local.id)}
                />
                <div className="flex items-center space-x-2 flex-1 cursor-pointer">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: local.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <Label htmlFor={`local-${local.id}`} className="text-sm font-medium cursor-pointer block truncate">
                      {local.name}
                    </Label>
                    <p className="text-xs text-muted-foreground truncate">
                      {local.type} • R$ {local.hourlyRate}/h
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FiltroLocais;
