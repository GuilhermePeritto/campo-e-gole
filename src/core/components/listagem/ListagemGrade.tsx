import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListagemCelula } from './ListagemCelula';
import { useListagem } from './ListagemContext';
import { ListagemPaginacao } from './ListagemPaginacao';

export function ListagemGrade() {
  const navigate = useNavigate();
  const {
    config,
    dados,
    paginacao,
    visibilidadeColunas,
    excluirItem,
  } = useListagem();
  
  // Garantir que dados seja um array
  const dadosSeguros = Array.isArray(dados) ? dados : [];
  
  // Colunas visíveis
  const colunasVisiveis = useMemo(() => {
    return config.colunas.filter(col => visibilidadeColunas[String(col.chave)] !== false);
  }, [config.colunas, visibilidadeColunas]);
  
  // Ações padrão
  const acoesComPadrao = useMemo(() => {
    const acoesDefault = [
      {
        titulo: 'Editar',
        onClick: (item: any) => navigate(`${config.rotaEntidade}/${item.id}`),
        variante: 'outline' as const,
        mostrar: undefined,
        icone: undefined,
        className: undefined,
      }
    ];
    
    return [...acoesDefault, ...(config.acoes || [])];
  }, [config.acoes, config.rotaEntidade, navigate]);
  
  // Handler para exclusão
  const handleDelete = async (item: any) => {
    if (confirm(`Tem certeza que deseja excluir este ${config.nomeEntidade.toLowerCase()}?`)) {
      await excluirItem(item);
    }
  };
  
  // Pegar primeira coluna como título
  const colunaTitulo = colunasVisiveis[0];
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dadosSeguros.map((item: any) => (
            <Card
              key={item.id || JSON.stringify(item)}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-lg">
                  {colunaTitulo && (
                    <ListagemCelula
                      item={item}
                      coluna={colunaTitulo}
                    />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {colunasVisiveis.slice(1, 4).map((coluna) => (
                    <div key={String(coluna.chave)} className="text-sm">
                      <span className="font-medium text-muted-foreground">
                        {coluna.titulo}:
                      </span>{' '}
                      <ListagemCelula
                        item={item}
                        coluna={coluna}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
              {acoesComPadrao.length > 0 && (
                <CardFooter className="gap-2">
                  {acoesComPadrao.map((acao, index) => {
                    if (acao.mostrar && !acao.mostrar(item)) {
                      return null;
                    }
                    
                    return (
                      <Button
                        key={index}
                        variant={acao.variante || 'outline'}
                        size="sm"
                        onClick={() => {
                          if (acao.titulo === 'Excluir') {
                            handleDelete(item);
                          } else {
                            acao.onClick(item);
                          }
                        }}
                        className={cn("flex-1", acao.className)}
                      >
                        {acao.icone}
                        {acao.titulo}
                      </Button>
                    );
                  })}
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
      
      {/* Paginação usando o novo componente */}
      {paginacao && (
        <div className="flex-shrink-0 mt-2 bg-background p-4">
          <ListagemPaginacao />
        </div>
      )}
    </div>
  );
} 