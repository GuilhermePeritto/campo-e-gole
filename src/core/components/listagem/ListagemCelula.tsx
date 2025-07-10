import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';
import { useMemo } from 'react';
import { ColunaListagem } from './ListagemContext';

interface PropsListagemCelula<T> {
  item: T;
  coluna: ColunaListagem<T>;
}

export function ListagemCelula<T>({ item, coluna }: PropsListagemCelula<T>) {
  const valor = item[coluna.chave as keyof T];
  
  // Se tem função de renderização customizada, usar ela
  if (coluna.renderizar) {
    return <>{coluna.renderizar(item)}</>;
  }
  
  // Detectar tipo do valor e renderizar apropriadamente
  const tipoValor = useMemo(() => {
    if (valor === null || valor === undefined) return 'vazio';
    if (typeof valor === 'boolean') return 'booleano';
    if (typeof valor === 'number') return 'numero';
    if (valor instanceof Date) return 'data';
    
    const valorString = String(valor).toLowerCase();
    
    // Detectar padrões comuns
    if (/^\d{4}-\d{2}-\d{2}/.test(String(valor))) return 'data';
    if (/^\d+(\.\d{2})?$/.test(String(valor)) && coluna.chave.toString().includes('valor')) return 'moeda';
    if (/^[\w.-]+@[\w.-]+\.\w+$/.test(valorString)) return 'email';
    if (/^\+?\d[\d\s()-]+$/.test(valorString) && valorString.length >= 10) return 'telefone';
    if (['ativo', 'inativo', 'pendente', 'concluido', 'cancelado'].includes(valorString)) return 'status';
    if (/^#[0-9A-F]{6}$/i.test(valorString)) return 'cor';
    
    return 'texto';
  }, [valor, coluna.chave]);
  
  // Renderizar baseado no tipo
  switch (tipoValor) {
    case 'vazio':
      return <span className="text-muted-foreground">-</span>;
      
    case 'booleano':
      return (
        <div className="flex items-center">
          {valor ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <XCircle className="h-4 w-4 text-red-600" />
          )}
        </div>
      );
      
    case 'data':
      return (
        <span className="text-sm">
          {new Date(String(valor)).toLocaleDateString('pt-BR')}
        </span>
      );
      
    case 'moeda':
      return (
        <span className="font-mono text-sm">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(Number(valor))}
        </span>
      );
      
    case 'email':
      return (
        <a
          href={`mailto:${valor}`}
          className="text-sm text-blue-600 hover:underline"
        >
          {String(valor)}
        </a>
      );
      
    case 'telefone':
      return (
        <a
          href={`tel:${String(valor).replace(/\D/g, '')}`}
          className="text-sm text-blue-600 hover:underline"
        >
          {String(valor)}
        </a>
      );
      
    case 'status':
      const status = String(valor).toLowerCase();
      const statusConfig = {
        ativo: { cor: 'bg-green-100 text-green-800', icone: CheckCircle },
        inativo: { cor: 'bg-red-100 text-red-800', icone: XCircle },
        pendente: { cor: 'bg-yellow-100 text-yellow-800', icone: undefined },
        concluido: { cor: 'bg-blue-100 text-blue-800', icone: undefined },
        cancelado: { cor: 'bg-gray-100 text-gray-800', icone: undefined },
      };
      
      const config = statusConfig[status as keyof typeof statusConfig] || { cor: 'bg-gray-100 text-gray-800', icone: undefined };
      const Icon = config.icone;
      
      return (
        <Badge
          variant="secondary"
          className={cn("gap-1", config.cor)}
        >
          {Icon && <Icon className="h-3 w-3" />}
          {String(valor)}
        </Badge>
      );
      
    case 'cor':
      return (
        <div className="flex items-center gap-2">
          <div
            className="h-6 w-6 rounded border"
            style={{ backgroundColor: String(valor) }}
          />
          <span className="text-sm font-mono">{String(valor)}</span>
        </div>
      );
      
    default:
      return <span className="text-sm">{String(valor)}</span>;
  }
} 