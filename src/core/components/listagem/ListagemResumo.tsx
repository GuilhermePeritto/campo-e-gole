import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { useListagem } from './ListagemContext';

export function ListagemResumo() {
  const { carregando, resumoDados } = useListagem();
  
  if (!resumoDados || resumoDados.length === 0) {
    return null;
  }
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {resumoDados.map((card, index) => {
        const Icon = card.icone;
        
        return (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.titulo}
              </CardTitle>
              <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center", card.cor)}>
                <Icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              {carregando ? (
                <div className="space-y-2">
                  <Skeleton className="h-7 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold">
                    {card.valor}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    {card.descricao && (
                      <span>{card.descricao}</span>
                    )}
                    {card.tendencia && (
                      <div className={cn(
                        "flex items-center gap-1 font-medium",
                        card.tendencia.tipo === 'positivo' && "text-green-600",
                        card.tendencia.tipo === 'negativo' && "text-red-600",
                        card.tendencia.tipo === 'neutro' && "text-gray-600"
                      )}>
                        {card.tendencia.tipo === 'positivo' && <ArrowUp className="h-3 w-3" />}
                        {card.tendencia.tipo === 'negativo' && <ArrowDown className="h-3 w-3" />}
                        {card.tendencia.tipo === 'neutro' && <Minus className="h-3 w-3" />}
                        <span>{card.tendencia.valor}%</span>
                        <span className="text-muted-foreground font-normal">
                          {card.tendencia.label}
                        </span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
} 