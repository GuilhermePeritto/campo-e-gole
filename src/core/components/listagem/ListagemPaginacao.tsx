import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import React from 'react';
import { useListagem } from './ListagemContext';

export function ListagemPaginacao() {
  const {
    paginaAtual,
    tamanhoPagina,
    totalPaginas,
    temPaginaAnterior,
    temProximaPagina,
    indiceInicial,
    indiceFinal,
    definirPaginaAtual,
    definirTamanhoPagina,
    paginacao,
  } = useListagem();
  
  const totalItems = paginacao?.totalItems || 0;
  
  // Gerar array de páginas para navegação
  const obterPaginasVisiveis = () => {
    const paginas = [];
    const maxPaginasVisiveis = 5;
    
    if (totalPaginas <= maxPaginasVisiveis) {
      // Mostrar todas as páginas
      for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
      }
    } else {
      // Lógica para mostrar páginas com elipses
      if (paginaAtual <= 3) {
        // Início
        for (let i = 1; i <= 4; i++) {
          paginas.push(i);
        }
        paginas.push('...');
        paginas.push(totalPaginas);
      } else if (paginaAtual >= totalPaginas - 2) {
        // Fim
        paginas.push(1);
        paginas.push('...');
        for (let i = totalPaginas - 3; i <= totalPaginas; i++) {
          paginas.push(i);
        }
      } else {
        // Meio
        paginas.push(1);
        paginas.push('...');
        for (let i = paginaAtual - 1; i <= paginaAtual + 1; i++) {
          paginas.push(i);
        }
        paginas.push('...');
        paginas.push(totalPaginas);
      }
    }
    
    return paginas;
  };
  
  const handlePaginaClick = (pagina: number | string) => {
    if (typeof pagina === 'number') {
      definirPaginaAtual(pagina);
    }
  };
  
  if (!totalItems || totalItems === 0) {
    return null;
  }
  
  return (
    <div className="flex items-center justify-between px-2 py-4">
      {/* Informações de paginação */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>
          {indiceInicial}-{indiceFinal} de {totalItems}
        </span>
        
        {/* Seletor de tamanho da página */}
        <div className="flex items-center gap-2">
          <span>Por página:</span>
          <Select
            value={String(tamanhoPagina)}
            onValueChange={(value) => definirTamanhoPagina(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Controles de navegação */}
      <div className="flex items-center gap-1">
        {/* Primeira página */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => definirPaginaAtual(1)}
          disabled={!temPaginaAnterior}
          className="h-8 w-8 p-0"
        >
          <ChevronsLeft className="h-4 w-4" />
          <span className="sr-only">Primeira página</span>
        </Button>
        
        {/* Página anterior */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => definirPaginaAtual(paginaAtual - 1)}
          disabled={!temPaginaAnterior}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Página anterior</span>
        </Button>
        
        {/* Números de página */}
        <div className="flex items-center gap-1">
          {obterPaginasVisiveis().map((pagina, index) => (
            <React.Fragment key={index}>
              {pagina === '...' ? (
                <span className="px-2 text-muted-foreground">...</span>
              ) : (
                <Button
                  variant={pagina === paginaAtual ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handlePaginaClick(pagina)}
                  className="h-8 min-w-[32px]"
                >
                  {pagina}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Próxima página */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => definirPaginaAtual(paginaAtual + 1)}
          disabled={!temProximaPagina}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Próxima página</span>
        </Button>
        
        {/* Última página */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => definirPaginaAtual(totalPaginas)}
          disabled={!temProximaPagina}
          className="h-8 w-8 p-0"
        >
          <ChevronsRight className="h-4 w-4" />
          <span className="sr-only">Última página</span>
        </Button>
      </div>
    </div>
  );
} 