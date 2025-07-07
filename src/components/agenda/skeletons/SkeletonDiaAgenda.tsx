import { Card, CardContent } from '@/components/ui/card';
import { memo } from 'react';
import DiaIndividualSkeleton from './DiaIndividualSkeleton';

interface SkeletonDiaAgendaProps {
  tipo?: 'month' | 'week' | 'day' | 'agenda';
}

const SkeletonDiaAgenda = memo(({ tipo = 'month' }: SkeletonDiaAgendaProps) => {
  if (tipo === 'agenda') {
    return (
      <div className="espaco-y-6 px-6">
        {Array.from({ length: 4 }).map((_, dayIndex) => (
          <div key={dayIndex} className="espaco-y-3">
            {/* Header do dia */}
            <div className="flex items-center espaco-x-2 borda-b pb-2">
              <div className="h-6 w-32 fundo-mutado rounded animate-pulse" />
              <div className="h-4 w-20 fundo-mutado rounded animate-pulse" />
              <div className="h-5 w-16 fundo-mutado rounded-full animate-pulse" />
            </div>
            
            {/* Eventos do dia */}
            <DiaIndividualSkeleton 
              tipo="agenda" 
              quantidadeEventos={Math.floor(Math.random() * 3) + 1} 
            />
          </div>
        ))}
      </div>
    );
  }

  if (tipo === 'day') {
    return (
      <div className="espaco-y-1 p-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex items-start espaco-x-3 py-2">
            <div className="h-4 w-12 fundo-mutado rounded animate-pulse flex-shrink-0" />
            <div className="flex-1 espaco-y-1">
              {Math.random() > 0.7 && (
                <DiaIndividualSkeleton tipo="day" quantidadeEventos={1} />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tipo === 'week') {
    return (
      <div className="grid grid-cols-8 gap-1 p-4">
        {/* Header dos dias */}
        <div></div>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={`header-${i}`} className="h-8 w-full fundo-mutado rounded animate-pulse" />
        ))}
        
        {/* Linhas de horário */}
        {Array.from({ length: 12 }).map((_, hour) => (
          <div key={hour} className="contents">
            <div className="h-8 w-12 fundo-mutado rounded animate-pulse" />
            {Array.from({ length: 7 }).map((_, day) => (
              <div key={`${hour}-${day}`} className="min-h-[2rem] p-1">
                {Math.random() > 0.8 && (
                  <DiaIndividualSkeleton tipo="week" quantidadeEventos={1} />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  // Para visualização mensal - skeleton individual em cada célula
  return (
    <div className="grid grid-cols-7 gap-1 p-4">
      {/* Header dos dias da semana */}
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={`weekday-${i}`} className="h-8 w-full fundo-mutado rounded animate-pulse" />
      ))}
      
      {/* Células do calendário com skeleton individual */}
      {Array.from({ length: 42 }).map((_, i) => (
        <Card key={i} className="aspect-square p-1 borda-divisor/30">
          <CardContent className="p-2 h-full">
            <div className="h-4 w-6 fundo-mutado rounded animate-pulse mb-2" />
            {Math.random() > 0.7 && (
              <DiaIndividualSkeleton tipo="month" quantidadeEventos={Math.floor(Math.random() * 2) + 1} />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
});

SkeletonDiaAgenda.displayName = 'SkeletonDiaAgenda';

export default SkeletonDiaAgenda;
