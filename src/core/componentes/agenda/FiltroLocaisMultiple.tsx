
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { MapPin, X } from 'lucide-react';

interface Local {
  id: string;
  name: string;
  color: string;
}

interface FiltroLocaisMultipleProps {
  locais: Local[];
  locaisSelecionados: string[];
  onAlternarLocal: (localId: string) => void;
  onLimparFiltros: () => void;
}

const FiltroLocaisMultiple = ({
  locais,
  locaisSelecionados,
  onAlternarLocal,
  onLimparFiltros
}: FiltroLocaisMultipleProps) => {
  const todosLocaisSelecionados = locaisSelecionados.includes('all');
  const quantidadeSelecionados = todosLocaisSelecionados ? locais.length : locaisSelecionados.length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Filtrar Locais
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Opção "Todos" */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="todos-locais"
            checked={todosLocaisSelecionados}
            onCheckedChange={() => onAlternarLocal('all')}
          />
          <label
            htmlFor="todos-locais"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Todos os locais
          </label>
        </div>

        <Separator />

        {/* Lista de locais individuais */}
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {locais.map((local) => (
            <div key={local.id} className="flex items-center space-x-2">
              <Checkbox
                id={`local-${local.id}`}
                checked={todosLocaisSelecionados || locaisSelecionados.includes(local.id)}
                onCheckedChange={() => onAlternarLocal(local.id)}
                disabled={todosLocaisSelecionados}
              />
              <div className="flex items-center gap-2 flex-1">
                <div
                  className="w-3 h-3 rounded-full border"
                  style={{ backgroundColor: local.color }}
                />
                <label
                  htmlFor={`local-${local.id}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 truncate"
                >
                  {local.name}
                </label>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Resumo e ações */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{quantidadeSelecionados} selecionados</span>
            {!todosLocaisSelecionados && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onLimparFiltros}
                className="h-6 px-2 text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Limpar
              </Button>
            )}
          </div>

          {/* Badges dos locais selecionados */}
          {!todosLocaisSelecionados && locaisSelecionados.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {locaisSelecionados.map((localId) => {
                const local = locais.find(l => l.id === localId);
                if (!local) return null;
                
                return (
                  <Badge
                    key={localId}
                    variant="secondary"
                    className="text-xs px-2 py-1 gap-1"
                    style={{ borderColor: local.color }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: local.color }}
                    />
                    {local.name}
                  </Badge>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FiltroLocaisMultiple;
