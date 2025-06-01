
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Download, FileText, FileSpreadsheet, Image } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ExportButtonProps {
  data: any[];
  filename: string;
  title: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ data, filename, title }) => {
  const exportToPDF = () => {
    // Simular exportação para PDF
    toast({
      title: "Exportando PDF...",
      description: `${title} está sendo exportado para PDF.`,
    });
    
    setTimeout(() => {
      toast({
        title: "PDF exportado!",
        description: `${filename}.pdf foi baixado com sucesso.`,
      });
    }, 2000);
  };

  const exportToExcel = () => {
    // Simular exportação para Excel
    toast({
      title: "Exportando Excel...",
      description: `${title} está sendo exportado para Excel.`,
    });
    
    setTimeout(() => {
      toast({
        title: "Excel exportado!",
        description: `${filename}.xlsx foi baixado com sucesso.`,
      });
    }, 2000);
  };

  const exportToJPG = () => {
    // Simular exportação para JPG
    toast({
      title: "Exportando imagem...",
      description: `${title} está sendo exportado como imagem.`,
    });
    
    setTimeout(() => {
      toast({
        title: "Imagem exportada!",
        description: `${filename}.jpg foi baixado com sucesso.`,
      });
    }, 2000);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 border-gray-300 text-black hover:bg-gray-50">
          <Download className="h-4 w-4" />
          Exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToPDF} className="gap-2">
          <FileText className="h-4 w-4" />
          Exportar PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToExcel} className="gap-2">
          <FileSpreadsheet className="h-4 w-4" />
          Exportar Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToJPG} className="gap-2">
          <Image className="h-4 w-4" />
          Exportar JPG
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportButton;
