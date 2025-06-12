
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, Plus, X, ArrowUp, ArrowDown } from 'lucide-react';
import { ReportField } from '@/types/reports';

interface SortOrder {
  field: string;
  direction: 'asc' | 'desc';
}

interface ReportSortingProps {
  fields: ReportField[];
  orderBy: string[];
  onOrderByChange: (orderBy: string[]) => void;
}

const ReportSorting = ({ fields, orderBy, onOrderByChange }: ReportSortingProps) => {
  const parseSortOrder = (orderString: string): SortOrder => {
    const [field, direction] = orderString.split(':');
    return { field, direction: (direction as 'asc' | 'desc') || 'asc' };
  };

  const formatSortOrder = (sort: SortOrder): string => {
    return `${sort.field}:${sort.direction}`;
  };

  const sortOrders = orderBy.map(parseSortOrder);

  const addSort = (fieldName: string) => {
    const newSort: SortOrder = { field: fieldName, direction: 'asc' };
    const newOrderBy = [...orderBy, formatSortOrder(newSort)];
    onOrderByChange(newOrderBy);
  };

  const removeSort = (index: number) => {
    const newOrderBy = orderBy.filter((_, i) => i !== index);
    onOrderByChange(newOrderBy);
  };

  const toggleDirection = (index: number) => {
    const currentSort = sortOrders[index];
    const newDirection = currentSort.direction === 'asc' ? 'desc' : 'asc';
    const newSort = { ...currentSort, direction: newDirection };
    const newOrderBy = [...orderBy];
    newOrderBy[index] = formatSortOrder(newSort);
    onOrderByChange(newOrderBy);
  };

  const getFieldByName = (fieldName: string) => {
    return fields.find(f => f.name === fieldName);
  };

  const availableFields = fields.filter(field => 
    !sortOrders.some(sort => sort.field === field.name)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowUpDown className="h-5 w-5" />
          Ordenação
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Ordenações Existentes */}
        {sortOrders.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Campos de Ordenação</h4>
            <div className="space-y-2">
              {sortOrders.map((sort, index) => {
                const field = getFieldByName(sort.field);
                return (
                  <div key={index} className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <span className="text-xs">{index + 1}.</span>
                      {field?.label || sort.field}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleDirection(index)}
                      className="flex items-center gap-1"
                    >
                      {sort.direction === 'asc' ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )}
                      {sort.direction === 'asc' ? 'Crescente' : 'Decrescente'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSort(index)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Adicionar Nova Ordenação */}
        {availableFields.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Select onValueChange={addSort}>
              <SelectTrigger>
                <SelectValue placeholder="Adicionar campo para ordenação" />
              </SelectTrigger>
              <SelectContent>
                {availableFields.map((field) => (
                  <SelectItem key={field.id} value={field.name}>
                    {field.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {sortOrders.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Nenhum campo selecionado para ordenação. Os dados serão exibidos na ordem padrão.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportSorting;
