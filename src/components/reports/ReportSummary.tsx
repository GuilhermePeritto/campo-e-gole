
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReportField } from '@/types/reports';

interface ReportSummaryProps {
  selectedFields: ReportField[];
}

const ReportSummary = ({ selectedFields }: ReportSummaryProps) => {
  if (selectedFields.length === 0) return null;

  return (
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
  );
};

export default ReportSummary;
