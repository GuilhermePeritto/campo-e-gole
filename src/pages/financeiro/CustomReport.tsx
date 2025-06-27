
import ExportButton from '@/components/ExportButton';
import ModuleHeader from '@/components/ModuleHeader';
import FieldSelector from '@/components/reports/FieldSelector';
import ReportBuilder from '@/components/reports/ReportBuilder';
import ReportFilters from '@/components/reports/ReportFilters';
import ReportGrouping from '@/components/reports/ReportGrouping';
import ReportSorting from '@/components/reports/ReportSorting';
import ReportSummary from '@/components/reports/ReportSummary';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { ReportConfig, ReportField } from '@/types/reports';
import { generateRelatedData } from '@/utils/reportDataGenerator';
import { AlertTriangle, BarChart3, Database, Download, Eye, Save } from 'lucide-react';
import { useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from 'sonner';

const CustomReport = () => {
  const [selectedFields, setSelectedFields] = useState<ReportField[]>([]);
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    name: '',
    fields: [],
    filters: [],
    groupBy: [],
    orderBy: []
  });
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [queryCost, setQueryCost] = useState<{ cost: number; isHigh: boolean; message: string } | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [reportName, setReportName] = useState('');
  const [dataLimit, setDataLimit] = useState(100);

  const handleFieldSelect = useCallback((field: ReportField) => {
    setSelectedFields(prev => {
      if (prev.find(f => f.id === field.id)) {
        return prev.filter(f => f.id !== field.id);
      }
      return [...prev, field];
    });
  }, []);

  const handleFieldAdd = useCallback((field: ReportField) => {
    setSelectedFields(prev => {
      if (prev.find(f => f.id !== field.id)) {
        return [...prev, field];
      }
      return prev;
    });
  }, []);

  const handleFieldRemove = useCallback((fieldId: string) => {
    setSelectedFields(prev => prev.filter(f => f.id !== fieldId));
  }, []);

  const handleFieldsReorder = useCallback((fields: ReportField[]) => {
    setSelectedFields(fields);
  }, []);

  const analyzeQueryCost = useCallback(() => {
    const fieldCount = selectedFields.length;
    const joinCount = new Set(selectedFields.map(f => f.entity)).size - 1;
    const filterCount = reportConfig.filters.length;
    const groupCount = reportConfig.groupBy.length;
    
    let cost = fieldCount * 10 + joinCount * 50 + filterCount * 20 + groupCount * 30;
    if (joinCount > 3) cost += 200;
    if (fieldCount > 15) cost += 300;
    if (filterCount > 5) cost += 150;
    
    const isHigh = cost > 500;
    const message = isHigh 
      ? `Consulta muito complexa (${joinCount} joins, ${fieldCount} campos, ${filterCount} filtros). Considere simplificar.`
      : `Consulta otimizada (${joinCount} joins, ${fieldCount} campos, ${filterCount} filtros). Performance adequada.`;

    setQueryCost({ cost, isHigh, message });
    return !isHigh;
  }, [selectedFields, reportConfig]);

  const generatePreview = useCallback(() => {
    if (selectedFields.length === 0) {
      toast.error('Selecione pelo menos um campo para gerar o preview');
      return;
    }

    if (!analyzeQueryCost()) {
      toast.warning('Consulta muito complexa. Considere reduzir a complexidade.');
      return;
    }

    let filteredData = generateRelatedData(selectedFields);
    
    if (dataLimit && filteredData.length > dataLimit) {
      filteredData = filteredData.slice(0, dataLimit);
    }
    
    setPreviewData(filteredData);
    setShowPreview(true);
    toast.success('Preview gerado com sucesso!');
  }, [selectedFields, reportConfig, dataLimit, analyzeQueryCost]);

  const handleSaveReport = useCallback(() => {
    if (!reportName.trim()) {
      toast.error('Digite um nome para salvar o relatório');
      return;
    }
    
    if (selectedFields.length === 0) {
      toast.error('Selecione pelo menos um campo antes de salvar');
      return;
    }

    const reportData = {
      name: reportName,
      fields: selectedFields,
      config: reportConfig,
      limit: dataLimit,
      createdAt: new Date().toISOString()
    };
    
    console.log('Salvando relatório:', reportData);
    toast.success(`Relatório "${reportName}" salvo com sucesso!`);
  }, [selectedFields, reportConfig, reportName, dataLimit]);

  const handleExportReport = useCallback((format: string) => {
    if (previewData.length === 0) {
      toast.error('Gere um preview antes de exportar');
      return;
    }

    console.log(`Exportando relatório em formato ${format}:`, {
      data: previewData,
      fields: selectedFields,
      config: reportConfig
    });
    
    toast.success(`Relatório exportado em ${format.toUpperCase()}!`);
  }, [previewData, selectedFields, reportConfig]);

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Relatório Personalizado"
        icon={<BarChart3 className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.financial}
        backTo="/financeiro/relatorios"
        backLabel="Relatórios"
      />

      <main className="max-w-none 3xl:max-w-9xl 4xl:max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16 py-8">
        <DndProvider backend={HTML5Backend}>
          {/* Layout Principal - Duas Colunas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Coluna Esquerda - Campos Disponíveis */}
            <div className="space-y-6">
              <FieldSelector
                onFieldSelect={handleFieldSelect}
                selectedFields={selectedFields}
              />
            </div>

            {/* Coluna Direita - Campos Selecionados */}
            <div className="space-y-6">
              <ReportBuilder
                selectedFields={selectedFields}
                onFieldRemove={handleFieldRemove}
                onFieldAdd={handleFieldAdd}
                onFieldsReorder={handleFieldsReorder}
                reportConfig={reportConfig}
                onConfigChange={setReportConfig}
              />
            </div>
          </div>

          {/* Filtros e Configurações Avançadas */}
          {selectedFields.length > 0 && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReportSummary selectedFields={selectedFields} />

              <ReportFilters
                fields={selectedFields}
                filters={reportConfig.filters}
                onFiltersChange={(filters) => setReportConfig({ ...reportConfig, filters })}
              />

              <ReportSorting
                fields={selectedFields}
                orderBy={reportConfig.orderBy}
                onOrderByChange={(orderBy) => setReportConfig({ ...reportConfig, orderBy })}
              />

              <ReportGrouping
                fields={selectedFields}
                groupBy={reportConfig.groupBy}
                onGroupByChange={(groupBy) => setReportConfig({ ...reportConfig, groupBy })}
              />
            </div>
          )}

          {/* Análise de Performance */}
          {queryCost && (
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Análise de Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert variant={queryCost.isHigh ? "destructive" : "default"}>
                    {queryCost.isHigh && <AlertTriangle className="h-4 w-4" />}
                    <AlertDescription>
                      {queryCost.message}
                    </AlertDescription>
                  </Alert>
                  <div className="mt-4 flex items-center gap-2 flex-wrap">
                    <Badge variant={queryCost.isHigh ? "destructive" : "default"}>
                      Custo: {queryCost.cost}
                    </Badge>
                    <Badge variant="outline">
                      {selectedFields.length} campos
                    </Badge>
                    <Badge variant="outline">
                      {new Set(selectedFields.map(f => f.entity)).size} tabelas
                    </Badge>
                    <Badge variant="outline">
                      {reportConfig.filters.length} filtros
                    </Badge>
                    <Badge variant="outline">
                      {reportConfig.groupBy.length} agrupamentos
                    </Badge>
                    <Badge variant="outline">
                      {reportConfig.orderBy.length} ordenações
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Configurações do Relatório */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Save className="h-5 w-5" />
                  Configurações do Relatório
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reportName">Nome do Relatório</Label>
                    <Input
                      id="reportName"
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)}
                      placeholder="Digite um nome para salvar..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="limit">Limite de Registros</Label>
                    <Input
                      id="limit"
                      type="number"
                      value={dataLimit}
                      onChange={(e) => setDataLimit(parseInt(e.target.value) || 100)}
                      min="1"
                      max="10000"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ações */}
          <div className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={generatePreview}
                    disabled={selectedFields.length === 0}
                    className="gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Gerar Preview
                  </Button>

                  <Button 
                    onClick={handleSaveReport} 
                    variant="outline" 
                    className="gap-2"
                    disabled={!reportName.trim()}
                  >
                    <Save className="h-4 w-4" />
                    Salvar Relatório
                  </Button>

                  {previewData.length > 0 && (
                    <>
                      <Button 
                        onClick={() => handleExportReport('excel')} 
                        variant="outline"
                        className="gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Exportar Excel
                      </Button>
                      
                      <ExportButton
                        data={previewData}
                        filename={reportName || "relatorio-personalizado"}
                        title={reportName || "Relatório Personalizado"}
                      />
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview dos Dados */}
          {showPreview && (
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Preview do Relatório
                      <Badge variant="secondary">
                        {previewData.length} registros
                      </Badge>
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)}>
                      ✕
                    </Button>
                  </div>
                  <CardDescription>
                    Visualização dos dados com os campos e filtros selecionados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {previewData.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-border">
                        <thead>
                          <tr className="bg-muted">
                            {selectedFields.map((field) => (
                              <th key={field.id} className="border border-border p-2 text-left font-medium">
                                {field.label}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {previewData.map((row, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                              {selectedFields.map((field) => (
                                <td key={field.id} className="border border-border p-2">
                                  {row[field.name] || '-'}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="mx-auto w-24 h-24 mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                        <BarChart3 className="h-12 w-12 text-blue-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum dado encontrado</h3>
                      <p className="text-gray-500 mb-4">Não há registros para exibir com os filtros aplicados.</p>
                      <Button variant="outline" onClick={generatePreview}>
                        Gerar novos dados
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </DndProvider>
      </main>
    </div>
  );
};

export default CustomReport;
