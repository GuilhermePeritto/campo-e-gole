import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import React from 'react';

interface BaseCrudEmptyStateProps {
  searchTerm?: string;
  createButton?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
}

export function BaseCrudEmptyState({ searchTerm, createButton }: BaseCrudEmptyStateProps) {
  if (searchTerm) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Search className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Nenhum resultado encontrado</h3>
        <p className="text-muted-foreground mb-4">
          Não encontramos nenhum resultado para "{searchTerm}". Tente ajustar os termos de busca.
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Limpar busca
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
        <Search className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Nenhum registro encontrado</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        Parece que ainda não há registros cadastrados. Comece criando o primeiro registro.
      </p>
      {createButton && (
        <Button onClick={createButton.onClick} className="gap-2">
          {createButton.icon || <Plus className="h-4 w-4" />}
          {createButton.label}
        </Button>
      )}
    </div>
  );
} 