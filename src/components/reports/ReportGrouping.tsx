
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Group, Plus, X, Users, BarChart3 } from 'lucide-react';
import { ReportField } from '@/types/reports';

interface ReportGroupingProps {
  fields: ReportField[];
  groupBy: string[];
  onGroupByChange: (groupBy: string[]) => void;
}

const ReportGrouping = ({ fields, groupBy, onGroupByChange }: ReportGroupingProps) => {
  const addGroupBy = (fieldName: string) => {
    if (!groupBy.includes(fieldName)) {
      onGroupByChange([...groupBy, fieldName]);
    }
  };

  const removeGroupBy = (fieldName: string) => {
    onGroupByChange(groupBy.filter(field => field !== fieldName));
  };

  const moveGroupBy = (fromIndex: number, toIndex: number) => {
    const newGroupBy = [...groupBy];
    const [movedItem] = newGroupBy.splice(fromIndex, 1);
    newGroupBy.splice(toIndex, 0, movedItem);
    onGroupByChange(newGroupBy);
  };

  const getFieldByName = (fieldName: string) => {
    return fields.find(f => f.name === fieldName);
  };

  const getFieldTypeIcon = (type: string) => {
    switch (type) {
      case 'date': return '📅';
      case 'string': return '📝';
      case 'boolean': return '✓';
      default: return '📋';
    }
  };

  // Apenas campos string, date e boolean fazem sentido para agrupamento
  const groupableFields = fields.filter(field => 
    ['string', 'date', 'boolean'].includes(field.type) && !groupBy.includes(field.name)
  );

  return (
    <Card className="border-l-4 border-l-orange-500">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Group className="h-4 w-4 text-orange-600" />
          </div>
          Agrupamento
          {groupBy.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {groupBy.length} grupo{groupBy.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Agrupamentos Existentes */}
        {groupBy.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-600">Campos de Agrupamento</span>
            </div>
            <div className="space-y-2">
              {groupBy.map((fieldName, index) => {
                const field = getFieldByName(fieldName);
                return (
                  <div key={fieldName} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs font-mono min-w-[24px] justify-center">
                        {index + 1}
                      </Badge>
                      <span className="text-lg">{getFieldTypeIcon(field?.type || 'string')}</span>
                      <Badge variant="outline" className="text-xs">
                        {field?.entity}
                      </Badge>
                      <span className="font-medium">{field?.label || fieldName}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 ml-auto">
                      {index > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveGroupBy(index, index - 1)}
                          className="h-8 w-8 p-0"
                          title="Mover para cima"
                        >
                          ↑
                        </Button>
                      )}
                      
                      {index < groupBy.length - 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveGroupBy(index, index + 1)}
                          className="h-8 w-8 p-0"
                          title="Mover para baixo"
                        >
                          ↓
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeGroupBy(fieldName)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            <Separator />
          </div>
        )}

        {/* Adicionar Novo Agrupamento */}
        {groupableFields.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">Adicionar Agrupamento</span>
            </div>
            
            <Select onValueChange={addGroupBy}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecionar campo para agrupamento" />
              </SelectTrigger>
              <SelectContent>
                {groupableFields.map((field) => (
                  <SelectItem key={field.id} value={field.name}>
                    <div className="flex items-center gap-2">
                      <span>{getFieldTypeIcon(field.type)}</span>
                      <Badge variant="outline" className="text-xs">
                        {field.entity}
                      </Badge>
                      {field.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {groupBy.length === 0 && (
          <div className="text-center py-6 text-muted-foreground bg-gray-50 rounded-lg border-2 border-dashed">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nenhum agrupamento selecionado</p>
            <p className="text-xs">Os dados serão exibidos sem agrupamento</p>
          </div>
        )}

        {groupBy.length > 0 && (
          <div className="text-xs text-muted-foreground bg-orange-50 p-3 rounded-lg border">
            <div className="flex items-start gap-2">
              <span className="text-orange-600">💡</span>
              <div>
                <strong>Dica:</strong> O agrupamento organiza os dados em categorias hierárquicas. 
                A ordem dos campos define a estrutura de agrupamento - do mais geral para o mais específico.
              </div>
            </div>
          </div>
        )}

        {groupableFields.length === 0 && groupBy.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            <p className="text-sm">Nenhum campo disponível para agrupamento</p>
            <p className="text-xs">Apenas campos de texto, data e booleanos podem ser agrupados</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportGrouping;
