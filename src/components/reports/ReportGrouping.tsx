
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Group, Plus, X } from 'lucide-react';
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

  const getFieldByName = (fieldName: string) => {
    return fields.find(f => f.name === fieldName);
  };

  // Apenas campos string, date e boolean fazem sentido para agrupamento
  const groupableFields = fields.filter(field => 
    ['string', 'date', 'boolean'].includes(field.type) && !groupBy.includes(field.name)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Group className="h-5 w-5" />
          Agrupamento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Agrupamentos Existentes */}
        {groupBy.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Campos de Agrupamento</h4>
            <div className="flex flex-wrap gap-2">
              {groupBy.map((fieldName, index) => {
                const field = getFieldByName(fieldName);
                return (
                  <Badge key={fieldName} variant="secondary" className="flex items-center gap-1">
                    <span className="text-xs">{index + 1}.</span>
                    {field?.label || fieldName}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => removeGroupBy(fieldName)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        {/* Adicionar Novo Agrupamento */}
        {groupableFields.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Select onValueChange={addGroupBy}>
              <SelectTrigger>
                <SelectValue placeholder="Adicionar campo para agrupamento" />
              </SelectTrigger>
              <SelectContent>
                {groupableFields.map((field) => (
                  <SelectItem key={field.id} value={field.name}>
                    {field.label} ({field.entity})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {groupBy.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Nenhum agrupamento selecionado. Os dados serão exibidos sem agrupamento.
          </p>
        )}

        {groupBy.length > 0 && (
          <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded">
            💡 <strong>Dica:</strong> O agrupamento organiza os dados em categorias, útil para análises por período, status, categoria, etc.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportGrouping;
