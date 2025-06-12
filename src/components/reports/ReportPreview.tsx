
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { X, Eye, Download, FileSpreadsheet, Clock, Database } from 'lucide-react';
import { ReportField } from '@/types/reports';

interface ReportPreviewProps {
  data: any[];
  fields: ReportField[];
  onClose: () => void;
}

const ReportPreview = ({ data, fields, onClose }: ReportPreviewProps) => {
  const formatValue = (value: any, type: string) => {
    if (value === null || value === undefined) return '-';
    
    switch (type) {
      case 'number':
        return typeof value === 'number' ? value.toLocaleString('pt-BR') : value;
      case 'date':
        return value;
      case 'boolean':
        return value ? 'Sim' : 'Não';
      default:
        return String(value);
    }
  };

  const getEntityColor = (entity: string) => {
    const colors = {
      'eventos': 'bg-red-100 text-red-800 border-red-200',
      'financeiro': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'escolinha': 'bg-green-100 text-green-800 border-green-200',
      'bar': 'bg-blue-100 text-blue-800 border-blue-200',
      'usuarios': 'bg-purple-100 text-purple-800 border-purple-200',
    };
    return colors[entity as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'number': return '🔢';
      case 'date': return '📅';
      case 'boolean': return '✓';
      case 'string': return '📝';
      default: return '📋';
    }
  };

  const entitiesCount = new Set(fields.map(f => f.entity)).size;
  const numericFields = fields.filter(f => f.type === 'number').length;

  return (
    <Card className="border-2 border-blue-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
              Preview do Relatório
              <Badge variant="secondary" className="text-sm">
                {data.length} registros
              </Badge>
            </CardTitle>
            <CardDescription className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Database className="h-4 w-4" />
                {entitiesCount} entidade{entitiesCount !== 1 ? 's' : ''}
              </div>
              <div className="flex items-center gap-1">
                <FileSpreadsheet className="h-4 w-4" />
                {fields.length} campos
              </div>
              {numericFields > 0 && (
                <div className="flex items-center gap-1">
                  <span>🔢</span>
                  {numericFields} numéricos
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {new Date().toLocaleString('pt-BR')}
              </div>
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Resumo dos Campos */}
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-gray-700">Campos do Relatório:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {fields.map((field) => (
              <Badge 
                key={field.id} 
                variant="outline" 
                className={`text-xs ${getEntityColor(field.entity)}`}
              >
                <span className="mr-1">{getTypeIcon(field.type)}</span>
                {field.label}
                <span className="ml-1 text-xs opacity-75">({field.entity})</span>
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Tabela de Dados */}
        <div className="overflow-x-auto max-h-[600px]">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow>
                <TableHead className="w-12 text-center bg-gray-50 border-r">#</TableHead>
                {fields.map((field) => (
                  <TableHead key={field.id} className="min-w-[140px] bg-gray-50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 font-medium">
                        <span className="text-sm">{getTypeIcon(field.type)}</span>
                        {field.label}
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getEntityColor(field.entity)}`}
                        >
                          {field.entity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">({field.type})</span>
                      </div>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <TableCell className="text-center text-xs text-muted-foreground font-mono border-r">
                    {rowIndex + 1}
                  </TableCell>
                  {fields.map((field) => (
                    <TableCell key={field.id} className="max-w-[200px]">
                      <div className="truncate" title={String(row[field.name] || '-')}>
                        {formatValue(row[field.name], field.type)}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {data.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Nenhum dado encontrado</p>
            <p className="text-sm">Verifique os filtros aplicados ou tente outros campos</p>
          </div>
        )}

        {/* Rodapé com Estatísticas */}
        {data.length > 0 && (
          <div className="border-t bg-gray-50 p-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>Total de registros: <strong>{data.length}</strong></span>
                <span>Campos exibidos: <strong>{fields.length}</strong></span>
                <span>Entidades: <strong>{entitiesCount}</strong></span>
              </div>
              <div className="text-xs">
                Gerado em {new Date().toLocaleString('pt-BR')}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportPreview;
