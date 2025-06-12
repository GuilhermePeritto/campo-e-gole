
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { BarChart3, Download, Eye, Save, AlertTriangle, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FieldSelector from '@/components/reports/FieldSelector';
import ReportBuilder from '@/components/reports/ReportBuilder';
import ReportPreview from '@/components/reports/ReportPreview';
import { ReportField, ReportConfig } from '@/types/reports';
import ExportButton from '@/components/ExportButton';

const CustomReport = () => {
  const navigate = useNavigate();
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

  const handleFieldSelect = useCallback((field: ReportField) => {
    setSelectedFields(prev => {
      if (prev.find(f => f.id === field.id)) {
        return prev.filter(f => f.id !== field.id);
      }
      return [...prev, field];
    });
  }, []);

  const handleFieldRemove = useCallback((fieldId: string) => {
    setSelectedFields(prev => prev.filter(f => f.id !== fieldId));
  }, []);

  const analyzeQueryCost = useCallback(() => {
    const fieldCount = selectedFields.length;
    const joinCount = new Set(selectedFields.map(f => f.entity)).size - 1;
    const estimatedRows = 10000; // Estimativa base
    
    let cost = fieldCount * 10 + joinCount * 50;
    if (joinCount > 3) cost += 200;
    if (fieldCount > 15) cost += 300;
    
    const isHigh = cost > 500;
    const message = isHigh 
      ? `Consulta muito complexa (${joinCount} joins, ${fieldCount} campos). Considere reduzir campos ou adicionar filtros.`
      : `Consulta otimizada (${joinCount} joins, ${fieldCount} campos). Performance adequada.`;

    setQueryCost({ cost, isHigh, message });
    return !isHigh;
  }, [selectedFields]);

  const generatePreview = useCallback(() => {
    if (selectedFields.length === 0) {
      return;
    }

    if (!analyzeQueryCost()) {
      return;
    }

    // Simular dados de preview baseados nos campos selecionados
    const mockData = Array.from({ length: 10 }, (_, index) => {
      const row: any = { id: index + 1 };
      selectedFields.forEach(field => {
        switch (field.type) {
          case 'string':
            row[field.name] = `Exemplo ${field.name} ${index + 1}`;
            break;
          case 'number':
            row[field.name] = Math.floor(Math.random() * 1000) + 100;
            break;
          case 'date':
            row[field.name] = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString();
            break;
          case 'boolean':
            row[field.name] = Math.random() > 0.5;
            break;
          default:
            row[field.name] = `Valor ${index + 1}`;
        }
      });
      return row;
    });

    setPreviewData(mockData);
    setShowPreview(true);
  }, [selectedFields, analyzeQueryCost]);

  const handleSaveReport = useCallback(() => {
    if (selectedFields.length === 0) {
      return;
    }

    const config: ReportConfig = {
      name: reportConfig.name || 'Relatório Personalizado',
      fields: selectedFields,
      filters: reportConfig.filters,
      groupBy: reportConfig.groupBy,
      orderBy: reportConfig.orderBy
    };

    // Aqui você salvaria o relatório no backend
    console.log('Salvando relatório:', config);
    
    // Simular salvamento
    alert('Relatório salvo com sucesso!');
  }, [selectedFields, reportConfig]);

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
            <div className="lg:col-span-2">
              <ReportBuilder
                selectedFields={selectedFields}
                onFieldRemove={handleFieldRemove}
                reportConfig={reportConfig}
                onConfigChange={setReportConfig}
              />

              {/* Análise de Custo */}
              {queryCost && (
                <Card className="mt-6">
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
                    <div className="mt-4 flex items-center gap-2">
                      <Badge variant={queryCost.isHigh ? "destructive" : "default"}>
                        Custo: {queryCost.cost}
                      </Badge>
                      <Badge variant="outline">
                        {selectedFields.length} campos
                      </Badge>
                      <Badge variant="outline">
                        {new Set(selectedFields.map(f => f.entity)).size} tabelas
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Ações */}
              <div className="mt-6 flex flex-wrap gap-3">
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
                  disabled={selectedFields.length === 0}
                  variant="outline"
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  Salvar Relatório
                </Button>

                {previewData.length > 0 && (
                  <ExportButton
                    data={previewData}
                    filename={reportConfig.name || 'relatorio-personalizado'}
                    title="Relatório Personalizado"
                  />
                )}
              </div>
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
