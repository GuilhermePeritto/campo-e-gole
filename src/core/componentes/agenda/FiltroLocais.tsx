
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface Local {
  id: string;
  name: string;
  color: string;
}

interface FiltroLocaisProps {
  locais: Local[];
  selectedLocais: string[];
  onToggleLocal: (localId: string) => void;
}

const FiltroLocais: React.FC<FiltroLocaisProps> = ({
  locais,
  selectedLocais,
  onToggleLocal
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">Locais</h3>
      <div className="space-y-2">
        {locais.map((local) => (
          <div 
            key={local.id} 
            className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-1 rounded"
            onClick={() => onToggleLocal(local.id)}
          >
            <Checkbox
              id={local.id}
              checked={selectedLocais.includes(local.id)}
              onCheckedChange={() => onToggleLocal(local.id)}
            />
            <div className="flex items-center space-x-2 flex-1">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: local.color }}
              />
              <label 
                htmlFor={local.id}
                className="text-sm text-foreground cursor-pointer flex-1"
              >
                {local.name}
              </label>
              {selectedLocais.includes(local.id) && (
                <Badge variant="secondary" className="text-xs px-1 py-0">
                  ✓
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiltroLocais;
