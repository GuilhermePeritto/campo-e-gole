
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MockLocal } from '@/data/mockLocais';

interface FiltroLocaisProps {
  locais: MockLocal[];
  selectedLocais: string[];
  onLocalToggle: (localId: string) => void;
  isLocalSelected: (localId: string) => boolean;
}

const FiltroLocais = ({ locais, selectedLocais, onLocalToggle, isLocalSelected }: FiltroLocaisProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocais = locais.filter(local =>
    local.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">Locais</h3>
      
      {/* Campo de busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar locais..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-8 text-sm"
        />
      </div>

      {/* Lista de locais */}
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {/* Opção "Todos os locais" */}
        <div className={cn(
          "flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer",
          isLocalSelected('all') && "bg-accent"
        )}>
          <Checkbox
            id="all-locais"
            checked={isLocalSelected('all')}
            onCheckedChange={() => onLocalToggle('all')}
          />
          <Label htmlFor="all-locais" className="text-sm cursor-pointer flex-1">
            Todos os locais
          </Label>
        </div>
        
        {/* Lista filtrada de locais */}
        {filteredLocais.length > 0 ? (
          filteredLocais.map((local) => (
            <div 
              key={local.id} 
              className={cn(
                "flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer",
                isLocalSelected(local.id) && "bg-accent"
              )}
            >
              <Checkbox
                id={`local-${local.id}`}
                checked={isLocalSelected(local.id)}
                onCheckedChange={() => onLocalToggle(local.id)}
              />
              <div className="flex items-center space-x-2 flex-1">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: local.color }}
                />
                <Label htmlFor={`local-${local.id}`} className="text-sm cursor-pointer truncate">
                  {local.name}
                </Label>
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-muted-foreground text-center py-2">
            Nenhum local encontrado
          </div>
        )}
      </div>
      
      {/* Contador de selecionados */}
      <div className="text-xs text-muted-foreground text-center">
        {selectedLocais.includes('all') 
          ? `Todos os ${locais.length} locais selecionados`
          : `${selectedLocais.length} de ${locais.length} locais selecionados`
        }
      </div>
    </div>
  );
};

export default FiltroLocais;
