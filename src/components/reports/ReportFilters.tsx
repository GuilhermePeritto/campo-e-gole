
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Filter, Plus, X } from 'lucide-react';
import { ReportField, ReportFilter } from '@/types/reports';

interface ReportFiltersProps {
  fields: ReportField[];
  filters: ReportFilter[];
  onFiltersChange: (filters: ReportFilter[]) => void;
}

const ReportFilters = ({ fields, filters, onFiltersChange }: ReportFiltersProps) => {
  const [newFilter, setNewFilter] = useState<Partial<ReportFilter>>({});

  const operators = [
    { value: 'equals', label: 'Igual a' },
    { value: 'contains', label: 'Contém' },
    { value: 'greater_than', label: 'Maior que' },
    { value: 'less_than', label: 'Menor que' },
    { value: 'between', label: 'Entre' },
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtros de Dados
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filtros Existentes */}
        {filters.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Filtros Ativos</h4>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter, index) => {
                const field = getFieldByName(filter.field);
                return (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {field?.label || filter.field} {filter.operator} {String(filter.value)}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => removeFilter(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        {/* Adicionar Novo Filtro */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <Select
            value={newFilter.field}
            onValueChange={(value) => setNewFilter({ ...newFilter, field: value, operator: undefined, value: undefined })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Campo" />
            </SelectTrigger>
            <SelectContent>
              {fields.map((field) => (
                <SelectItem key={field.id} value={field.name}>
                  {field.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={newFilter.operator}
            onValueChange={(value) => setNewFilter({ ...newFilter, operator: value as ReportFilter['operator'] })}
            disabled={!newFilter.field}
          >
            <SelectTrigger>
              <SelectValue placeholder="Operador" />
            </SelectTrigger>
            <SelectContent>
              {newFilter.field && getAvailableOperators(getFieldByName(newFilter.field)?.type || 'string').map((op) => (
                <SelectItem key={op.value} value={op.value}>
                  {op.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Valor"
            value={newFilter.value || ''}
            onChange={(e) => setNewFilter({ ...newFilter, value: e.target.value })}
            disabled={!newFilter.operator}
            type={getFieldByName(newFilter.field || '')?.type === 'number' ? 'number' : 'text'}
          />

          <Button
            onClick={addFilter}
            disabled={!newFilter.field || !newFilter.operator || newFilter.value === undefined}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Adicionar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportFilters;
