import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Check, Search } from 'lucide-react';
import { memo, useState, useMemo } from 'react';
import type { MockLocal } from '@/data/mockLocais';

interface ModernLocationsListProps {
  selectedLocais: string[];
  locais: MockLocal[];
  allLocais: MockLocal[];
  eventCountByVenue?: Record<string, number>;
  onLocalToggle: (localId: string) => void;
  isLocalSelected: (localId: string) => boolean;
}

const ModernLocationsList = memo(({
  selectedLocais,
  locais,
  allLocais,
  eventCountByVenue = {},
  onLocalToggle,
  isLocalSelected,
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

  return (
    <div className="flex-1 space-y-3 min-h-0 flex flex-col">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Locais
      </h3>
      
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar locais..."
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
          className="pl-9 h-9"
        />
      </div>

      <ScrollArea className="flex-1 -mx-2">
        <div className="space-y-2 px-2">
          {/* All option */}
          <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent/50 transition-colors">
            <Checkbox
              id="all-venues"
              checked={selectedLocais.includes('all')}
              onCheckedChange={() => onLocalToggle('all')}
              className="sr-only peer"
            />
            <Check 
              className={cn(
                "h-4 w-4 text-primary",
                !selectedLocais.includes('all') && "invisible"
              )}
            />
            <label
              htmlFor="all-venues"
              className={cn(
                "flex-1 text-sm font-medium cursor-pointer",
                !selectedLocais.includes('all') && "text-muted-foreground/70 line-through"
              )}
            >
              Todos os Locais
            </label>
            <div className="w-3 h-3 rounded-full bg-primary/20" />
          </div>

          {/* Individual venues */}
          {filteredLocais.map((local) => {
            const isSelected = isLocalSelected(local.id);
            const eventCount = eventCountByVenue[local.id] || 0;
            
            return (
              <div 
                key={local.id}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent/50 transition-colors"
              >
                <Checkbox
                  id={local.id}
                  checked={isSelected}
                  onCheckedChange={() => onLocalToggle(local.id)}
                  className="sr-only peer"
                />
                <Check 
                  className={cn(
                    "h-4 w-4 text-primary",
                    !isSelected && "invisible"
                  )}
                />
                <label
                  htmlFor={local.id}
                  className={cn(
                    "flex-1 text-sm font-medium cursor-pointer",
                    !isSelected && "text-muted-foreground/70 line-through"
                  )}
                >
                  {local.name}
                  <div className="text-xs text-muted-foreground">
                    {local.type}
                  </div>
                  {eventCount > 0 && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({eventCount})
                    </span>
                  )}
                </label>
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: local.color }}
                />
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
});

ModernLocationsList.displayName = 'ModernLocationsList';

export default ModernLocationsList;