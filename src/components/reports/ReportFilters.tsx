
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Filter, Plus, X, Search, Zap } from 'lucide-react';
import { ReportField, ReportFilter } from '@/types/reports';

interface ReportFiltersProps {
  fields: ReportField[];
  filters: ReportFilter[];
  onFiltersChange: (filters: ReportFilter[]) => void;
}

const ReportFilters = ({ fields, filters, onFiltersChange }: ReportFiltersProps) => {
  const [newFilter, setNewFilter] = useState<Partial<ReportFilter>>({});

  const operators = [
    { value: 'equals', label: 'Igual a', icon: '=' },
    { value: 'contains', label: 'Contém', icon: '⊃' },
    { value: 'greater_than', label: 'Maior que', icon: '>' },
    { value: 'less_than', label: 'Menor que', icon: '<' },
    { value: 'between', label: 'Entre', icon: '⇔' },
  ];

  const getAvailableOperators = (fieldType: string) => {
    switch (fieldType) {
      case 'string':
        return operators.filter(op => ['equals', 'contains'].includes(op.value));
      case 'number':
        return operators;
      case 'date':
        return operators.filter(op => ['equals', 'greater_than', 'less_than', 'between'].includes(op.value));
      case 'boolean':
        return operators.filter(op => op.value === 'equals');
      default:
        return operators.filter(op => ['equals', 'contains'].includes(op.value));
    }
  };

  const addFilter = () => {
    if (newFilter.field && newFilter.operator && newFilter.value !== undefined) {
      const filter: ReportFilter = {
        field: newFilter.field,
        operator: newFilter.operator as ReportFilter['operator'],
        value: newFilter.value
      };
      onFiltersChange([...filters, filter]);
      setNewFilter({});
    }
  };

  const removeFilter = (index: number) => {
    const updatedFilters = filters.filter((_, i) => i !== index);
    onFiltersChange(updatedFilters);
  };

  const getFieldByName = (fieldName: string) => {
    return fields.find(f => f.name === fieldName);
  };

  const getOperatorLabel = (operatorValue: string) => {
    return operators.find(op => op.value === operatorValue)?.label || operatorValue;
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Filter className="h-4 w-4 text-blue-600" />
          </div>
          Filtros de Dados
          {filters.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {filters.length} ativo{filters.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filtros Existentes */}
        {filters.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">Filtros Ativos</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {filters.map((filter, index) => {
                const field = getFieldByName(filter.field);
                return (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {field?.entity}
                      </Badge>
                      <span className="font-medium">{field?.label || filter.field}</span>
                      <span className="text-muted-foreground">
                        {getOperatorLabel(filter.operator)}
                      </span>
                      <Badge variant="secondary">
                        {String(filter.value)}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeFilter(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                );
              })}
            </div>
            <Separator />
          </div>
        )}

        {/* Adicionar Novo Filtro */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Plus className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Adicionar Filtro</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Select
              value={newFilter.field}
              onValueChange={(value) => setNewFilter({ ...newFilter, field: value, operator: undefined, value: undefined })}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecionar campo" />
              </SelectTrigger>
              <SelectContent>
                {fields.map((field) => (
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

            <Select
              value={newFilter.operator}
              onValueChange={(value) => setNewFilter({ ...newFilter, operator: value as ReportFilter['operator'] })}
              disabled={!newFilter.field}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Operador" />
              </SelectTrigger>
              <SelectContent>
                {newFilter.field && getAvailableOperators(getFieldByName(newFilter.field)?.type || 'string').map((op) => (
                  <SelectItem key={op.value} value={op.value}>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs">{op.icon}</span>
                      {op.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Valor do filtro"
              value={newFilter.value || ''}
              onChange={(e) => setNewFilter({ ...newFilter, value: e.target.value })}
              disabled={!newFilter.operator}
              type={getFieldByName(newFilter.field || '')?.type === 'number' ? 'number' : 'text'}
              className="bg-white"
            />

            <Button
              onClick={addFilter}
              disabled={!newFilter.field || !newFilter.operator || newFilter.value === undefined}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Adicionar
            </Button>
          </div>
        </div>

        {filters.length === 0 && (
          <div className="text-center py-6 text-muted-foreground bg-gray-50 rounded-lg border-2 border-dashed">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nenhum filtro aplicado</p>
            <p className="text-xs">Os dados serão exibidos sem filtros</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportFilters;
