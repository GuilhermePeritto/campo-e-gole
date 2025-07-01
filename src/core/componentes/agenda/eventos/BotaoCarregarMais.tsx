
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { memo } from 'react';

interface BotaoCarregarMaisProps {
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const BotaoCarregarMais = memo(({ isLoading, hasMore, onLoadMore }: BotaoCarregarMaisProps) => {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center pt-6">
      <Button
        onClick={onLoadMore}
        disabled={isLoading}
        variant="outline"
        className="w-full max-w-xs"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Carregando...
          </>
        ) : (
          'Carregar mais eventos'
        )}
      </Button>
    </div>
  );
});

BotaoCarregarMais.displayName = 'BotaoCarregarMais';

export default BotaoCarregarMais;
