import type { MockLocal } from '@/data/mockLocais';
import { cn } from '@/lib/utils';
import React from 'react';

interface CompactLocationsListProps {
  selectedLocais: string[];
  locais: MockLocal[];
  allLocais: MockLocal[];
  eventCountByVenue?: Record<string, number>;
  onLocalToggle: (localId: string) => void;
  isLocalSelected: (localId: string) => boolean;
}

const CompactLocationsList: React.FC<CompactLocationsListProps> = ({
  selectedLocais,
  locais,
  allLocais,
  eventCountByVenue = {},
  onLocalToggle,
  isLocalSelected,
}) => {
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      {/* Card branco para selecionar todos no modo compacto */}
      <button
        type="button"
        title={selectedLocais.length === allLocais.length ? 'Desselecionar todos' : 'Selecionar todos'}
        onClick={() => {
          if (selectedLocais.length === allLocais.length) {
            allLocais.forEach(local => {
              if (isLocalSelected(local.id)) onLocalToggle(local.id);
            });
          } else {
            allLocais.forEach(local => {
              if (!isLocalSelected(local.id)) onLocalToggle(local.id);
            });
          }
        }}
        className={cn(
          "w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-primary/60 mb-1 bg-white",
          selectedLocais.length === allLocais.length ? "ring-2 ring-primary scale-110" : "opacity-60 hover:opacity-100"
        )}
      />
      {allLocais.map((local) => {
        const isSelected = isLocalSelected(local.id);
        return (
          <button
            key={local.id}
            type="button"
            title={local.name}
            onClick={() => onLocalToggle(local.id)}
            className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-primary/60 mb-1",
              isSelected ? "ring-2 ring-primary scale-110" : "opacity-60 hover:opacity-100"
            )}
            style={{ backgroundColor: local.color }}
          />
        );
      })}
    </div>
  );
};

export default CompactLocationsList; 