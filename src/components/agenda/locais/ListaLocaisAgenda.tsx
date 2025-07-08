import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { Local } from '@/types/eventos';
import { Search } from 'lucide-react';
import { memo, useMemo, useState } from 'react';

interface ListaLocaisAgendaProps {
  locaisSelecionados: string[];
  locais: Local[];
  todosLocais: Local[];
  eventCountByVenue?: Record<string, number>;
  aoAlternarLocal: (localId: string) => void;
  estaLocalSelecionado: (localId: string) => boolean;
  modoCompacto?: boolean;
}

const ListaLocaisAgenda = memo(({
  locaisSelecionados,
  locais,
  todosLocais,
  eventCountByVenue = {},
  aoAlternarLocal,
  estaLocalSelecionado,
  modoCompacto = false,
}: ListaLocaisAgendaProps) => {
  const [consulta, setConsulta] = useState('');

  const locaisFiltrados = useMemo(() => {
    if (!consulta.trim()) return todosLocais;
    return todosLocais.filter(local =>
      local.nome.toLowerCase().includes(consulta.toLowerCase()) ||
      local.tipo.toLowerCase().includes(consulta.toLowerCase())
    );
  }, [todosLocais, consulta]);

  const todosSelecionados = todosLocais.length > 0 && todosLocais.every(local => estaLocalSelecionado(local.id));

  const handleAlternarTodos = () => {
    if (todosSelecionados) {
      todosLocais.forEach(local => {
        if (estaLocalSelecionado(local.id)) aoAlternarLocal(local.id);
      });
    } else {
      todosLocais.forEach(local => {
        if (!estaLocalSelecionado(local.id)) aoAlternarLocal(local.id);
      });
    }
  };

  if (modoCompacto) {
    // Versão compacta (apenas ícones)
    return (
      <div className="flex flex-col items-center gap-3 py-4">
        <button
          type="button"
          title={todosSelecionados ? 'Desselecionar todos' : 'Selecionar todos'}
          onClick={handleAlternarTodos}
          className={cn(
            'w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-primary/60 mb-1 bg-white',
            todosSelecionados ? 'ring-2 ring-primary scale-110' : 'opacity-60 hover:opacity-100'
          )}
        />
        {todosLocais.map((local) => {
          const selecionado = estaLocalSelecionado(local.id);
          return (
            <button
              key={local.id}
              type="button"
              title={local.nome}
              onClick={() => aoAlternarLocal(local.id)}
              className={cn(
                'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-primary/60 mb-1',
                selecionado ? 'ring-2 ring-primary scale-110' : 'opacity-60 hover:opacity-100'
              )}
              style={{ backgroundColor: local.cor }}
            />
          );
        })}
      </div>
    );
  }

  // Versão expandida (com busca e nomes)
  return (
    <div className="flex-1 space-y-3 min-h-0 flex flex-col">
      <div className="relative p-2">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filtrar locais..."
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)}
          className="pl-9 h-9 text-sm border-border/50 bg-white/80"
        />
      </div>
      {consulta.trim() && (
        <div className="mt-2 text-xs text-muted-foreground">
          {locaisFiltrados.length} de {todosLocais.length} locais
        </div>
      )}
      <div className="p-2 space-y-2 flex-1 min-h-0 overflow-y-auto">
        <div
          className={cn(
            'flex items-center gap-3 p-2 rounded-xl shadow-sm transition-colors border border-gray-200 cursor-pointer bg-white',
            todosSelecionados ? 'ring-2 ring-primary/40' : 'hover:bg-accent/40'
          )}
          onClick={handleAlternarTodos}
        >
          <Checkbox
            checked={todosSelecionados}
            onCheckedChange={handleAlternarTodos}
            className="mr-2 flex-shrink-0 border-gray-300 bg-white"
            tabIndex={-1}
            onClick={e => e.stopPropagation()}
          />
          <span className="font-medium text-sm truncate text-gray-700">
            {todosSelecionados ? 'Desselecionar todos' : 'Selecionar todos'}
          </span>
        </div>
        {locaisFiltrados.map((local) => {
          const selecionado = estaLocalSelecionado(local.id);
          return (
            <div
              key={local.id}
              className={cn(
                'flex items-center gap-3 p-2 rounded-xl shadow-sm transition-colors border border-transparent cursor-pointer',
                selecionado ? 'ring-2 ring-primary/40 bg-white/90' : 'hover:bg-accent/40 bg-white/80'
              )}
              style={{ backgroundColor: local.cor }}
              onClick={() => aoAlternarLocal(local.id)}
            >
              <Checkbox
                checked={selecionado}
                onCheckedChange={() => aoAlternarLocal(local.id)}
                className="mr-2 flex-shrink-0 border-white/60 bg-white/80"
                style={{ accentColor: local.cor }}
                tabIndex={-1}
                onClick={e => e.stopPropagation()}
              />
              <span className="font-medium text-sm truncate" style={{ color: '#222' }}>{local.nome}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

ListaLocaisAgenda.displayName = 'ListaLocaisAgenda';

export default ListaLocaisAgenda; 