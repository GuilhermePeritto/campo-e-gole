
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CreateButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface BaseListEmptyStateProps {
  searchTerm: string;
  createButton?: CreateButtonProps;
}

const BaseListEmptyState: React.FC<BaseListEmptyStateProps> = ({
  searchTerm,
  createButton
}) => {
  return (
    <Card className="h-full flex items-center justify-center">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Nenhum item encontrado</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Tente ajustar sua pesquisa.' : 'Não há dados para exibir.'}
          </p>
          {createButton && !searchTerm && (
            <Button onClick={createButton.onClick} className="gap-2">
              {createButton.icon}
              {createButton.label}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BaseListEmptyState;
