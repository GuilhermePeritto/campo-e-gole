
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowUpDown, Plus, X, ArrowUp, ArrowDown, SortAsc } from 'lucide-react';
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
    return { 
      field, 
      direction: (direction === 'desc' ? 'desc' : 'asc') as 'asc' | 'desc'
    };
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
    const newDirection: 'asc' | 'desc' = currentSort.direction === 'asc' ? 'desc' : 'asc';
    const newSort: SortOrder = { ...currentSort, direction: newDirection };
    const newOrderBy = [...orderBy];
    newOrderBy[index] = formatSortOrder(newSort);
    onOrderByChange(newOrderBy);
  };

  const moveSort = (fromIndex: number, toIndex: number) => {
    const newOrderBy = [...orderBy];
    const [movedItem] = newOrderBy.splice(fromIndex, 1);
    newOrderBy.splice(toIndex, 0, movedItem);
    onOrderByChange(newOrderBy);
  };

  const getFieldByName = (fieldName: string) => {
    return fields.find(f => f.name === fieldName);
  };

  const availableFields = fields.filter(field => 
    !sortOrders.some(sort => sort.field === field.name)
  );

  return (
    <Card className="border-l-4 border-l-purple-500">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 bg-purple-100 rounded-lg">
            <ArrowUpDown className="h-4 w-4 text-purple-600" />
          </div>
          Ordenação
          {sortOrders.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {sortOrders.length} campo{sortOrders.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Ordenações Existentes */}
        {sortOrders.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <SortAsc className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">Campos de Ordenação</span>
            </div>
            <div className="space-y-2">
              {sortOrders.map((sort, index) => {
                const field = getFieldByName(sort.field);
                return (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs font-mono min-w-[24px] justify-center">
                        {index + 1}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {field?.entity}
                      </Badge>
                      <span className="font-medium">{field?.label || sort.field}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 ml-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleDirection(index)}
                        className={`flex items-center gap-1 ${
                          sort.direction === 'asc' 
                            ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
                            : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                        }`}
                      >
                        {sort.direction === 'asc' ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )}
                        {sort.direction === 'asc' ? 'Crescente' : 'Decrescente'}
                      </Button>
                      
                      {index > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveSort(index, index - 1)}
                          className="h-8 w-8 p-0"
                          title="Mover para cima"
                        >
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                      )}
                      
                      {index < sortOrders.length - 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveSort(index, index + 1)}
                          className="h-8 w-8 p-0"
                          title="Mover para baixo"
                        >
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSort(index)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
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

        {/* Adicionar Nova Ordenação */}
        {availableFields.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Adicionar Ordenação</span>
            </div>
            
            <Select onValueChange={addSort}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecionar campo para ordenação" />
              </SelectTrigger>
              <SelectContent>
                {availableFields.map((field) => (
                  <SelectItem key={field.id} value={field.name}>
                    <div className="flex items-center gap-2">
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

        {sortOrders.length === 0 && (
          <div className="text-center py-6 text-muted-foreground bg-gray-50 rounded-lg border-2 border-dashed">
            <ArrowUpDown className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nenhuma ordenação definida</p>
            <p className="text-xs">Os dados serão exibidos na ordem padrão</p>
          </div>
        )}

        {sortOrders.length > 0 && (
          <div className="text-xs text-muted-foreground bg-purple-50 p-3 rounded-lg border">
            <div className="flex items-start gap-2">
              <span className="text-purple-600">💡</span>
              <div>
                <strong>Dica:</strong> A ordem dos campos define a prioridade da ordenação. 
                Use os botões de seta para reordenar os campos conforme necessário.
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportSorting;
