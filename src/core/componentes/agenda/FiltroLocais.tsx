
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { MockLocal } from '@/data/mockLocais';

interface FiltroLocaisProps {
  locais: MockLocal[];
  selectedLocais: string[];
  onLocalToggle: (localId: string) => void;
  isLocalSelected: (localId: string) => boolean;
}

const FiltroLocais = ({ locais, selectedLocais, onLocalToggle, isLocalSelected }: FiltroLocaisProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">Locais</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="all-locais"
            checked={isLocalSelected('all')}
            onCheckedChange={() => onLocalToggle('all')}
          />
          <Label htmlFor="all-locais" className="text-sm">
            Todos os locais
          </Label>
        </div>
        
        {locais.map((local) => (
          <div key={local.id} className="flex items-center space-x-2">
            <Checkbox
              id={`local-${local.id}`}
              checked={isLocalSelected(local.id)}
              onCheckedChange={() => onLocalToggle(local.id)}
            />
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: local.color }}
              />
              <Label htmlFor={`local-${local.id}`} className="text-sm">
                {local.name}
              </Label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiltroLocais;
