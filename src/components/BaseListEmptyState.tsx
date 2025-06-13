
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, FileText, Plus } from 'lucide-react';

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
          {searchTerm ? (
            // Estado de busca sem resultados
            <>
              <div className="mx-auto w-24 h-24 mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum resultado encontrado</h3>
              <p className="text-gray-500 mb-4 max-w-md">
                Não encontramos nenhum item que corresponda à sua pesquisa por "<span className="font-medium">{searchTerm}</span>".
              </p>
              <p className="text-sm text-gray-400">
                Tente ajustar os termos de busca ou verificar a ortografia.
              </p>
            </>
          ) : (
            // Estado vazio (sem dados)
            <>
              <div className="mx-auto w-24 h-24 mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <FileText className="h-12 w-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum item cadastrado</h3>
              <p className="text-gray-500 mb-6 max-w-md">
                Você ainda não tem nenhum item cadastrado. Comece criando seu primeiro registro.
              </p>
              {createButton && (
                <Button onClick={createButton.onClick} className="gap-2">
                  {createButton.icon || <Plus className="h-4 w-4" />}
                  {createButton.label}
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BaseListEmptyState;
