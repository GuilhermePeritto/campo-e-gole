
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Settings, ChevronDown, ChevronRight, Save, Download, Eye, Calendar, Calculator } from 'lucide-react';
import { ReportField } from '@/types/reports';

interface AdvancedOptions {
  reportName: string;
  limit: number;
  showTotals: boolean;
  showAverages: boolean;
  showPercentages: boolean;
  dateRange: {
    start: string;
    end: string;
  };
  exportFormat: 'excel' | 'pdf' | 'csv';
  autoRefresh: boolean;
  refreshInterval: number;
}

interface ReportAdvancedOptionsProps {
  fields: ReportField[];
  options: AdvancedOptions;
  onOptionsChange: (options: AdvancedOptions) => void;
  onSaveReport: () => void;
  onExportReport: (format: string) => void;
  onPreviewReport: () => void;
}

const ReportAdvancedOptions = ({ 
  fields, 
  options, 
  onOptionsChange, 
  onSaveReport, 
  onExportReport, 
  onPreviewReport 
}: ReportAdvancedOptionsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasNumericFields = fields.some(f => f.type === 'number');
  const hasDateFields = fields.some(f => f.type === 'date');

  const updateOption = (key: keyof AdvancedOptions, value: any) => {
    onOptionsChange({ ...options, [key]: value });
  };

  const updateDateRange = (key: 'start' | 'end', value: string) => {
    onOptionsChange({
      ...options,
      dateRange: { ...options.dateRange, [key]: value }
    });
  };

  return (
    <Card>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Opções Avançadas
              </div>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Configurações Básicas */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Save className="h-4 w-4" />
                Configurações do Relatório
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reportName">Nome do Relatório</Label>
                  <Input
                    id="reportName"
                    value={options.reportName}
                    onChange={(e) => updateOption('reportName', e.target.value)}
                    placeholder="Digite um nome para salvar..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="limit">Limite de Registros</Label>
                  <Input
                    id="limit"
                    type="number"
                    value={options.limit}
                    onChange={(e) => updateOption('limit', parseInt(e.target.value) || 100)}
                    min="1"
                    max="10000"
                  />
                </div>
              </div>
            </div>

            {/* Filtros de Data */}
            {hasDateFields && (
              <div className="space-y-4">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Período de Análise
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateStart">Data Inicial</Label>
                    <Input
                      id="dateStart"
                      type="date"
                      value={options.dateRange.start}
                      onChange={(e) => updateDateRange('start', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateEnd">Data Final</Label>
                    <Input
                      id="dateEnd"
                      type="date"
                      value={options.dateRange.end}
                      onChange={(e) => updateDateRange('end', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Opções de Cálculo */}
            {hasNumericFields && (
              <div className="space-y-4">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Cálculos Automáticos
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showTotals">Exibir Totais</Label>
                    <Switch
                      id="showTotals"
                      checked={options.showTotals}
                      onCheckedChange={(checked) => updateOption('showTotals', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showAverages">Exibir Médias</Label>
                    <Switch
                      id="showAverages"
                      checked={options.showAverages}
                      onCheckedChange={(checked) => updateOption('showAverages', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showPercentages">Exibir Percentuais</Label>
                    <Switch
                      id="showPercentages"
                      checked={options.showPercentages}
                      onCheckedChange={(checked) => updateOption('showPercentages', checked)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Opções de Exportação */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exportação e Atualizações
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="exportFormat">Formato de Exportação</Label>
                  <Select value={options.exportFormat} onValueChange={(value) => updateOption('exportFormat', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                      <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                      <SelectItem value="csv">CSV (.csv)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="refreshInterval">Intervalo de Atualização (min)</Label>
                  <Input
                    id="refreshInterval"
                    type="number"
                    value={options.refreshInterval}
                    onChange={(e) => updateOption('refreshInterval', parseInt(e.target.value) || 5)}
                    min="1"
                    max="60"
                    disabled={!options.autoRefresh}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="autoRefresh">Atualização Automática</Label>
                <Switch
                  id="autoRefresh"
                  checked={options.autoRefresh}
                  onCheckedChange={(checked) => updateOption('autoRefresh', checked)}
                />
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-wrap gap-3 pt-4 border-t">
              <Button onClick={onPreviewReport} variant="outline" className="gap-2">
                <Eye className="h-4 w-4" />
                Visualizar Preview
              </Button>
              
              <Button 
                onClick={onSaveReport} 
                variant="outline" 
                className="gap-2"
                disabled={!options.reportName.trim()}
              >
                <Save className="h-4 w-4" />
                Salvar Relatório
              </Button>
              
              <Button 
                onClick={() => onExportReport(options.exportFormat)} 
                className="gap-2"
                disabled={fields.length === 0}
              >
                <Download className="h-4 w-4" />
                Exportar {options.exportFormat.toUpperCase()}
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default ReportAdvancedOptions;
