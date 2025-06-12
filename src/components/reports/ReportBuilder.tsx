
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, X, GripVertical } from 'lucide-react';
import { ReportField, ReportConfig } from '@/types/reports';

interface ReportBuilderProps {
  selectedFields: ReportField[];
  onFieldRemove: (fieldId: string) => void;
  reportConfig: ReportConfig;
  onConfigChange: (config: ReportConfig) => void;
}

const ReportBuilder = ({ 
  selectedFields, 
  onFieldRemove, 
  reportConfig, 
  onConfigChange 
}: ReportBuilderProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'field',
    drop: (item: ReportField) => {
      // Lógica de drop seria implementada aqui se necessário
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleNameChange = (name: string) => {
    onConfigChange({ ...reportConfig, name });
  };

  const getFieldTypeColor = (type: string) => {
    switch (type) {
      case 'string': return 'bg-blue-100 text-blue-800';
      case 'number': return 'bg-green-100 text-green-800';
      case 'date': return 'bg-purple-100 text-purple-800';
      case 'boolean': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEntityColor = (entity: string) => {
    const colors = {
      'eventos': 'bg-red-100 text-red-800',
      'financeiro': 'bg-yellow-100 text-yellow-800',
      'escolinha': 'bg-green-100 text-green-800',
      'bar': 'bg-blue-100 text-blue-800',
      'usuarios': 'bg-purple-100 text-purple-800',
    };
    return colors[entity as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Configuração do Relatório */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Configuração do Relatório
          </CardTitle>
          <CardDescription>
            Configure o nome e estrutura do seu relatório
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="report-name">Nome do Relatório</Label>
              <Input
                id="report-name"
                placeholder="Digite o nome do relatório..."
                value={reportConfig.name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campos Selecionados */}
      <Card>
        <CardHeader>
          <CardTitle>Campos Selecionados</CardTitle>
          <CardDescription>
            {selectedFields.length === 0 
              ? 'Nenhum campo selecionado. Escolha campos na lista ao lado.'
              : `${selectedFields.length} campo(s) selecionado(s)`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            ref={drop}
            className={`min-h-[200px] 3xl:min-h-[250px] 4xl:min-h-[300px] border-2 border-dashed rounded-lg p-4 transition-colors ${
              isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
          >
            {selectedFields.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Arraste campos aqui ou selecione da lista</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      <div className="flex flex-col">
                        <span className="font-medium">{field.label}</span>
                        <span className="text-sm text-muted-foreground">{field.name}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getEntityColor(field.entity)}`}
                      >
                        {field.entity}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getFieldTypeColor(field.type)}`}
                      >
                        {field.type}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onFieldRemove(field.id)}
                        className="h-8 w-8 p-0 hover:bg-red-100"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Resumo */}
      {selectedFields.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resumo do Relatório</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{selectedFields.length}</div>
                <div className="text-sm text-muted-foreground">Campos</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {new Set(selectedFields.map(f => f.entity)).size}
                </div>
                <div className="text-sm text-muted-foreground">Entidades</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {selectedFields.filter(f => f.type === 'number').length}
                </div>
                <div className="text-sm text-muted-foreground">Campos Numéricos</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReportBuilder;
