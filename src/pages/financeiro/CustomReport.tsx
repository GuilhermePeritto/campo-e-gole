
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { BarChart3, Eye, AlertTriangle, Database, Save, Download } from 'lucide-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FieldSelector from '@/components/reports/FieldSelector';
import ReportBuilder from '@/components/reports/ReportBuilder';
import ReportPreview from '@/components/reports/ReportPreview';
import { ReportField, ReportConfig } from '@/types/reports';
import { generateRelatedData } from '@/utils/reportDataGenerator';
import ExportButton from '@/components/ExportButton';

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
    
    reportConfig.filters.forEach(filter => {
      console.log('Aplicando filtro:', filter);
    });

    if (reportConfig.orderBy.length > 0) {
      console.log('Aplicando ordenação:', reportConfig.orderBy);
    }

    if (reportConfig.groupBy.length > 0) {
      console.log('Aplicando agrupamento:', reportConfig.groupBy);
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

      <main className="max-w-7xl 3xl:max-w-9xl 4xl:max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16 py-8">
        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 3xl:gap-8 4xl:gap-10">
            {/* Seletor de Campos */}
            <div className="lg:col-span-1">
              <FieldSelector
                onFieldSelect={handleFieldSelect}
                selectedFields={selectedFields}
              />
            </div>

            {/* Construtor do Relatório */}
            <div className="lg:col-span-2 space-y-6">
              <ReportBuilder
                selectedFields={selectedFields}
                onFieldRemove={handleFieldRemove}
                onFieldAdd={handleFieldAdd}
                onFieldsReorder={handleFieldsReorder}
                reportConfig={reportConfig}
                onConfigChange={setReportConfig}
              />

              {/* Configurações Básicas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Save className="h-5 w-5" />
                    Configurações do Relatório
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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

              {/* Análise de Performance */}
              {queryCost && (
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
              )}

              {/* Ações */}
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
          </div>

          {/* Preview dos Dados */}
          {showPreview && previewData.length > 0 && (
            <div className="mt-8">
              <ReportPreview
                data={previewData}
                fields={selectedFields}
                onClose={() => setShowPreview(false)}
              />
            </div>
          )}
        </DndProvider>
      </main>
    </div>
  );
};

export default CustomReport;
